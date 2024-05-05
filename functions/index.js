const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const { oauthKeys } = require('./info');

// Assuming the service account JSON is stored securely and referenced appropriately
const serviceAccount = require('./htmx-app-firebase-adminsdk-6b6fd-c18e1d21e4.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const { clientID, clientSecret, scopes } = oauthKeys;
const REDIRECT_URI = `https://us-central1-${serviceAccount.project_id}.cloudfunctions.net/auth`;

exports.login = functions.https.onRequest((req, res) => {
    const scope = scopes.join(' ');  // Convert array of scopes to a space-separated string
    const discordUrl = `https://discord.com/oauth2/authorize?client_id=1236756015958069259&response_type=code&redirect_uri=https%3A%2F%2Fus-central1-htmx-app.cloudfunctions.net%2Fauth&scope=identify+guilds+email`;
    res.redirect(discordUrl);
});

exports.auth = functions.https.onRequest(async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const tokenParams = new URLSearchParams({
            client_id: clientID,
            client_secret: clientSecret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        }).toString();

        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', tokenParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${tokenResponse.data.access_token}`
            }
        });

        // Check if user exists, if not, create a new one
        const userRecord = await admin.auth().getUserByEmail(userResponse.data.email).catch(async () => {
            return await admin.auth().createUser({
                uid: `discord:${userResponse.data.id}`,
                email: userResponse.data.email,
                displayName: userResponse.data.username,
                photoURL: userResponse.data.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.data.id}/${userResponse.data.avatar}.png` : undefined,
                emailVerified: userResponse.data.verified
            });
        });

        const db = admin.firestore();
        await db.collection('users').doc(userRecord.uid).set({
            discordId: userResponse.data.id,
            username: userResponse.data.username,
            avatar: userResponse.data.avatar,
            discriminator: userResponse.data.discriminator,
            joinedServers: userResponse.data.guilds || []
        }, { merge: true });

        // Generate a Firebase custom authentication token
        const firebaseToken = await admin.auth().createCustomToken(userRecord.uid);
        res.redirect(`https://htmx-app.web.app?token=${encodeURIComponent(firebaseToken)}`);
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Error during authentication process: ' + error.message);
    }
});
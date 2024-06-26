# NOT HTMX Project

[Hosted Site](https://htmx-app.web.app)

Now, I'll be honest. I was, for some unknown reason, under the impression that HTMX and React were compatible with each other, and I realized this after hours of work in React.

I really shot myself in the foot in that regard, but I did use HTMX to make a cool single page app. Instead of slapping on a database some API calls to get credit for this assignment, I decided it was more fun and interesting to finish the NOT HTMX project and fill in the missing requirements here.

- [Repo](https://github.com/LukeLeimbach/WebDesignHomework/tree/main/Assignment13)
- [Hosted Site](https://lukeleimbach.github.io/WebDesignHomework/Assignment13/index.html)

## Requirements
To access the site, you need to sign in with a valid Discord account.

The database and API requirements are fulfilled by Firebase Authentication through the Discord OAuth2 system. Authentication is managed with Firebase Functions which acts as an auth API. The `auth.currentUser` object contains all the information from the user that I'm comfortable handling (email, profile picture, and displayName) since my current method of authentication is quite crude and unsafe. I do have a Firestore holding user info, but it's not as efficient as accessing the `auth` object. If I were to pursue this project further, I would figure out a secure way to authenticate users and send their private data to Firestore.

I hope this weird Frankenstein of assignments is somewhat sufficient.
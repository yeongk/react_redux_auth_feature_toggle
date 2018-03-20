# Authentication and Feature Toggle Check from the front-end javascript

For this POC, authentication checks can be done via locally running auth server in one of two ways: 1) use Eze Castle authentication, or 2) use locally configured Mongo database with Passport authentication strategy. After the authentication step, feature toggle check is done from the front-end javascript using ezeFeatureToggle via LaunchDarkly as a service. So, this setup allows testing either authenticated or unauthenticated scenarios.


# Local auth server setup
(A) Use Eze Castle auth on the backend
1. clone from https://stash.ezesoft.net/users/ykim/repos/auth_server_castle/browse
2. npm install
3. npm run
4. server listens on port 3000

(B) Use locally configured Mongo DB
1. install Mongo DB
2. add test users. key fields are username, password, and firmAuthToken
3. for the auth server with Passport, clone from https://stash.ezesoft.net/users/ykim/repos/passport_mongo_auth/browse
4. npm install
5. npm run
6. server listens on port 3000


NOTE: For testing the authenticated user scenario, auth server needs to be set up. Between Option A and Option B, Option A would be simpler to set up.




# To set up feature toggle library ezeFeatureToggle

```
npm i  https://github.com/yeongk/feature_toggle_js.git --save
```



# To set up POC
```
after clone,

npm install
```


# To run
In window #1:
```
webpack --watch
```
NOTE: 
For Windows users, install webpack and webpack-cli globally (npm i -g webpack webpack-cli). 
For Mac users, brew install webpack

In window #2:
```
npm start
```

Browser:
connect to http://localhost:8082

# Authentication and Feature Toggle Check from the front-end javascript

Checks authentication via Passport and check feature toggle from the front-end javascript using ezeFeatureToggle via LaunchDarkly as a service.


# Auth server using Passport-local strategy and Mongo

For authentication, auth server needs to be set up, listening on http://localhost:3000.


NOTE: For the Auth server setup, refer to https://stash.ezesoft.net/users/ykim/repos/passport_mongo_auth/browse


# To set up feature toggle library ezeFeatureToggle

```
npm i  https://github.com/yeongk/feature_toggle_js.git --save
```

# To run
In window #1:
```
webpack --watch
```

In window #2:
```
npm start
```

Browser:
connect to http://localhost:8082

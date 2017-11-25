# Madison's Lumber Directory

[![Build Status on CircleCI](https://circleci.com/gh/adriandgr/madison-lumber.svg?style=shield)](https://circleci.com/gh/adriandgr/madison-lumber)

* * *

New web app to drive one of British Columbia's largest databases of lumber suppliers.


## Tech Stack

- MongoDB - Persist information to this document based database.
- Mongoose - ORM library
- ExpressJS - NodeJS app using express
- React - client rendered app with `react-router-dom`.


## Build react client

```bash
$ cd client
$ yarn
$ yarn build
```

## Local Development

Instructions to set up local development server

```bash
$ cd server

# copy .env template and set your own environment variables
$ cp .env.example ./.env

$ yarn
# only run seed:admin once to add admin user.
$ yarn run seed:admin
$ yarn start
```


## Automatic Deployment to VPS

Pushing site updates to Digitalocean

```
$ git push live master
```

### Issue with OS X and watching tests

During development I encountered fsevent errors when running `yarn test` in watch mode. Installing watchman via homebrew solved the problem.

- [Error handling for OS X system limits](https://github.com/strongloop/fsevents/issues/42)
- [MacOS Sierra Error with EMFILE upon NPM start](https://github.com/facebook/react-native/issues/10028)
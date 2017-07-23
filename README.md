## Madison's Lumber Directory

New web app to drive one of British Columbia's largest databases of lumber suppliers.


## Tech Stack

- MongoDB - Persist information to this document based database.
- Mongoose - ORM library
- ExpressJS - NodeJS app using express
- React - client rendered app with `react-router-dom`.


## Local Development

Instructions to set up local development

```bash
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
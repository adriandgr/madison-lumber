## Madison's Lumber Directory

New web app to drive one of British Columbia's largest databases of lumber suppliers.


## Tech Stack

- MongoDB - Persist information to this document based database.
- ExpressJS - NodeJS app using express
- EJS Templates - Since the view requirements are simple, site uses server-rendered templates using EJS.


## Local Development

Instructions to set up local development

```bash
# copy .env.example and set your own environment variables
$ cp .env.example ./.env
$ yarn
$ yarn start
```

## Automatic Deployment to VPS

Pushing site updates to Digitalocean

```
$ git push live master
```
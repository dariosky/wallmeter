# WALL-METER #

Wall-meter is a personal financial manager with solid features and great potential :-)

### What is this for? ###

Wall meter helps you to

* Track your expenses and earnings
* Report stats for your behaviour and get the point of your budgets
* Remember recurring timelines
* Use some shared part of your management with family or friends

### How do I get set up? ###

* Clone and cd into the repository
* Install meteor and meteorite with npm
  `npm install -g meteor meteorite`
* update dependencies with meteorite:
  `mrt install`
* Setup DB connection and mail server (to send mail for registration)
  Set your environment variables (in ~/.bash_profile)
  (here with mongolab for mongodb hosting and mandrill as email server and kadira for reporting)

```
#!bash

  export MONGO_URL=mongodb://user:pass@host.mongolab.com:45017/dbname
  export MAIL_URL=smtp://user%40email.com:pass@smtp.mandrillapp.com:587/
  export KADIRA_APP_ID=<yourAppId>
  export KADIRA_APP_SECRET=<yourAppSecret>
  
```
*  Run (on port 3000) with
  `meteor`
*  Connect and use it on http://localhost:3000

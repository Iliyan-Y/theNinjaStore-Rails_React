# README

- Ruby version

* '2.7.1'

- System dependencies

- Configuration

```
> bundle install
> npm install
```

- Database creation

```
> rails db:create
```

- Database initialization

```
> rails db:migrate
```

- How to run the test suite

```
> bundle exec rspec
> npm test
```

- To start the app

  - Start the server

  ```
   rails server
  ```

  - Navigate to http://localhost:3000/

- Environment variables required
  in the root dir of the app create .env file `touch .env`
  open the .env file and add the following variables:

```
JWT_SECRET=REPLACE_WITH_YOUR_VALUE
ADMIN_EMAIL=REPLACE_WITH_EMAIL_OF_THE_ADMIN
MAILER_SENDER=REPLACE_WITH_Mailing_Service_EMAIL
MAILER_PASSWORD=REPLACE_WITH_Mailing_Service_PASSWORD
STRIPE_PUBLISHABLE_KEY=FROM_STRIPE_API
STRIPE_SECRET_KEY=FROM_STRIPE_API
END_POINT=STRIPE_HOOK_SUCCESSFUL_PAYMENT_TOKEN
AWS_ACCESS_KEY_ID=AMAZON_S3_STORAGE_ID
AWS_SECRET_ACCESS_KEY=AMAZON_S3_STORAGE_KEY
KEY_BASE=RAILS_SECRET_KEY_BASE
```

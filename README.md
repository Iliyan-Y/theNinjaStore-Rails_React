# Description

E-commerce app allowing small businesses to sell their products directly to their customers cutting out the middleman fees.

## Demo

https://enigmatic-sierra-23464.herokuapp.com/

# Tech Stack:

React, Ruby on Rails, Redux, Postgresql, Stripe, Jest, Rspec, RTL, Docker, AWS S3, SES

- Ruby version

* '2.7.1'

- System dependencies

- Configuration

```
> bundle install
> yarn install
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
> yarn test
```

- To start the app

  - Start the server

  ```
   rails server
  ```

  - Navigate to http://localhost:3000/

# Usage

In order to use the app in production AWS and Stripe accounts are required

- Environment variables required:
  - create .env file `touch .env`
  - open the .env file and add the following variables:

```
JWT_SECRET=REPLACE_WITH_YOUR_VALUE
ADMIN_EMAIL=REPLACE_WITH_EMAIL_OF_THE_ADMIN
FROM_EMAIL_ADDRESS=example@me.com
MAILER_SENDER=REPLACE_WITH_Mailing_Service_EMAIL
MAILER_PASSWORD=REPLACE_WITH_Mailing_Service_PASSWORD
AWS_SES_SERVER=YOUR_AWS_SERVER_ADDRESS
STRIPE_PUBLISHABLE_KEY=FROM_STRIPE_API
STRIPE_SECRET_KEY=FROM_STRIPE_API
END_POINT=STRIPE_HOOK_SUCCESSFUL_PAYMENT_TOKEN
AWS_ACCESS_KEY_ID=AMAZON_S3_STORAGE_ID
AWS_SECRET_ACCESS_KEY=AMAZON_S3_STORAGE_KEY
KEY_BASE=RAILS_SECRET_KEY_BASE
```

- Register user and promote it to admin from the rails console

```
rails c
user = User.where(email: admin@email.com)[0]
user.admin = true
user.save
```

- Log in with the admin user and create a products

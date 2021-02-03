FROM ruby:2.7.2-alpine3.13

ENV RAILS_ROOT /rails-app
ENV RAILS_ENV=production
ENV NODE_ENV=production

RUN apk update \
&& apk upgrade \
&& apk add --update --no-cache \
build-base curl-dev tzdata postgresql-dev \
yaml-dev zlib-dev nodejs yarn

WORKDIR ${RAILS_ROOT}

COPY Gemfile* package.json yarn.lock ./
RUN bundle install --without development test && yarn install

COPY . .

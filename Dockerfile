FROM ruby:2.7.2-buster

ENV RAILS_ROOT /deploy

# Add node js to source list 
RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -

# Add yarn to source list 
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
&& echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list 

RUN apt-get update && \
  apt-get install -y \
  build-essential \
  nodejs \
  yarn \
  libpq-dev && \
  mkdir -p ${RAILS_ROOT} && \
  apt-get clean autoclean && \
  apt-get autoremove -y && \
  rm -rf /var/lib/apt /var/lib/dpkg /var/lib/cache /var/lib/log

WORKDIR ${RAILS_ROOT}

#ENV RAILS_ENV='development'
ENV RAILS_ENV='production'

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN bundle exec rails assets:precompile

FROM ruby:2.7.2-buster

ENV RAILS_ROOT /deploy

# Add node js to source list 
RUN curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -

# Add yarn to source list 
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - \
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

ENV RAILS_ENV='development'
# ENV RAILS_ENV='production'
ENV SECRET_KEY_BASE='329290263de0022b211b97ed9192ed987a8f8f56213d2fc220700ce228aecc4cd796948f41cc1587e4789832b0682be7a57659a3f45ff5e299adc8f5210938fc'

COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock

RUN bundle install --jobs 20 --retry 5

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install --check-files

COPY . .

RUN bundle exec rails assets:precompile

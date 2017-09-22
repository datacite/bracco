[![Build Status](https://travis-ci.org/datacite/bracco.svg?branch=test)](https://travis-ci.org/datacite/bracco)

# Bracco

A web frontend to the DataCite DOI Fabrica service.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd bracco`
* `cp .env.example .env`
* `npm install`
* `yarn`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

The application is deployed to Amazon S3 via Travis CI. See `.travis.yml` for the configuration.
Assets are served from S3, everything else is redirected to `index.html` so that the Ember router
can handle all requests.

```
server {
    server_name example.org;
    listen 8080;
    set $frontend http://example.org.s3.amazonaws.com;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;

        proxy_pass $frontend;
    }

    location /assets {
        proxy_pass $frontend;
    }
```

### Note on Patches/Pull Requests

* Fork the project
* Write tests for your new feature or a test that reproduces a bug
* Implement your feature or make a bug fix
* Do not mess with Rakefile, version or history
* Commit, push and make a pull request. Bonus points for topical branches.

## License
**bracco** is released under the [MIT License](https://github.com/datacite/bracco/blob/master/LICENSE).

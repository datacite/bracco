[![Identifier](https://img.shields.io/badge/doi-10.5438%2Fcxe5--rg55-fca709.svg)](https://doi.org/10.5438/cxe5-rg55)
![Release](https://github.com/datacite/bracco/workflows/Release/badge.svg)
[![bracco](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/8j7yje&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/8j7yje/runs)
[![Code Climate](https://codeclimate.com/github/datacite/bracco/badges/gpa.svg)](https://codeclimate.com/github/datacite/bracco)
[![Test Coverage](https://codeclimate.com/github/datacite/bracco/badges/coverage.svg)](https://codeclimate.com/github/datacite/bracco/coverage)

# Bracco

The web frontend for the DataCite Fabrica service.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with NPM) - 18.x
- [Ember CLI](https://ember-cli.com/) - 3.24
- [Yarn Classic](https://classic.yarnpkg.com/) - 1.29.x


## Installation

- `git clone <repository-url>` this repository
- `cd bracco`
- `cp .env.example .env`
- `yarn`

## Running / Development

- `yarn ember serve`
- Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `ember test`
- `ember test --server`

### Linting

- `npm run lint:hbs`
- `npm run lint:js`
- `npm run lint:js -- --fix`

### Building

- `ember build` (development)
- `ember build --environment production` (production)

### Deploying

The application as Docker containers via GitHub Actions and AWS Fargate.

#### Nginx

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

#### Cloudfront (using [terraform](https://www.terraform.io/))

```
custom_error_response {
  error_code            = "404"
  error_caching_min_ttl = "5"
  response_code         = "200"
  response_page_path    = "/index.html"
}
```

### Note on Patches/Pull Requests

- Fork the project
- Write tests for your new feature or a test that reproduces a bug
- Implement your feature or make a bug fix
- Do not mess with Rakefile, version or history
- Commit, push and make a pull request. Bonus points for topical branches.

## License

**bracco** is released under the [MIT License](https://github.com/datacite/bracco/blob/master/LICENSE).

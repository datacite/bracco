import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | url-format', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    validator = this.owner.lookup('validator:url-format');
  });

  test('url', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('offirgolan', options);
    assert.equal(message, 'Please enter a valid URL.');

    message = validator.validate('http://www.offirgolan.com', builtOptions);
    assert.equal(message, true);
  });

  test('ftp url', function(assert) {
    assert.expect(1);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('ftp://ftp.library.noaa.gov/noaa_documents.lib/2013%20NOAA%205%20Year%20Plan_FINAL%20version.pdf', builtOptions);
    assert.equal(message, true);
  });

  test('don\'t allow ftp url', function(assert) {
    assert.expect(1);

    options = {
      protocols: [ 'http','https' ],
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate('ftp://ftp.library.noaa.gov/noaa_documents.lib/2013%20NOAA%205%20Year%20Plan_FINAL%20version.pdf', options);
    assert.equal(message, 'Please enter a valid URL.');
  });

  test('localhost url', function(assert) {
    assert.expect(1);

    options = {
      require_tld: false,
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate('http://localhost:8080', options);
    assert.equal(message, true);
  });

  test('don\'t allow localhost url', function(assert) {
    assert.expect(1);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('http://localhost:8080', builtOptions);
    assert.equal(message, 'Please enter a valid URL.');
  });

  // test('info uri', function(assert) {
  //   assert.expect(1);

  //   options = {
  //     require_host: false,
  //     protocols: [ 'http','https','info' ],
  //   };
  //   options = validator.buildOptions(options, {}).toObject();

  //   message = validator.validate('info:eu-repo/semantics/openAccess', options);
  //   assert.equal(message, true);
  // });

  test('allow blank', function(assert) {
    assert.expect(2);

    options = {
      allowBlank: true,
    };
    options = validator.buildOptions(options, {}).toObject();

    message = validator.validate(undefined, options);
    assert.equal(message, true);

    message = validator.validate('url', options);
    assert.equal(message, 'Please enter a valid URL.');
  });
});

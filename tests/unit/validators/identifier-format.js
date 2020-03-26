import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let options, builtOptions, validator, message;

module('Unit | Validator | identifier-format', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    validator = this.owner.lookup('validator:identifier-format');
  });

  test('it works', function(assert) {
    let validator = this.owner.lookup('validator:identifier-format');
    assert.ok(validator);
  });

  test('ark', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('offirgolan', options, {relatedIdentifierType: 'ARK'});
    assert.equal(message, 'Please enter a valid URL.');

    message = validator.validate('http://www.offirgolan.com', builtOptions, {relatedIdentifierType: 'ARK'});
    assert.equal(message, true);
  });

  test('doi', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('.org/10.3205', options, {relatedIdentifierType: 'DOI'});
    assert.equal(message, 'Please enter a valid DOI.');

    message = validator.validate('https://doi.org/10.3205/11dgii122 ', builtOptions, {relatedIdentifierType: 'DOI'});
    assert.equal(message, true);
  });

  test('arXiv', function(assert) {
    assert.expect(2);

    builtOptions = validator.buildOptions({}).toObject();

    message = validator.validate('arsXiv:0706.0001', options, {relatedIdentifierType: 'arXiv'});
    assert.equal(message, 'Please enter a valid URL.');

    message = validator.validate('arXiv:0706.0001', builtOptions, {relatedIdentifierType: 'arXiv'});
    assert.equal(message, true);
  });

});

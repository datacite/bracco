import { test } from 'qunit';
import moduleForAcceptance from 'bracco/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | anonymous | client');

test('visiting client AWI', function(assert) {
  visit('/clients/tib.awi');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI settings', function(assert) {
  visit('/clients/tib.awi/settings');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI users', function(assert) {
  visit('/clients/tib.awi/users');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI prefixes', function(assert) {
  visit('/clients/tib.awi/prefixes');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

test('visiting client AWI dois', function(assert) {
  visit('/clients/tib.awi/dois');

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('div.motto h1').text(), 'DataCite DOI Fabrica');
  });
});

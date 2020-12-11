import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

let builtOptions, validator, message;

module('Unit | Validator | identifier-format', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    validator = this.owner.lookup('validator:identifier-format');
  });

  test('it works', function (assert) {
    assert.ok(validator);
  });

  test('identifier', function (assert) {
    assert.expect(34);

    let validIdentifiers = [
      { type: 'ARK', identifier: 'ark:/13030/tqb3kh97gh8w' },
      { type: 'arXiv', identifier: 'arXiv:0706.0001' },
      { type: 'bibcode', identifier: '2014Wthr...69...72C' },
      { type: 'DOI', identifier: '10.3205/11dgii122' },
      { type: 'EAN13', identifier: '9783468111242' },
      { type: 'EISSN', identifier: '1562-6865' },
      { type: 'Handle', identifier: '10013/epic.10033' },
      { type: 'IGSN', identifier: 'IECUR0097' },
      { type: 'ISBN', identifier: '978-3-905673-82-1' },
      { type: 'ISSN', identifier: '1562-6865' },
      { type: 'ISTC', identifier: '0A9 2002 12B4A105 7' },
      { type: 'LISSN', identifier: '1188-1534' },
      { type: 'LSID', identifier: 'urn:lsid:ubio.org:namebank:11815' },
      { type: 'PMID', identifier: '12082125' },
      { type: 'PURL', identifier: 'http://purl.oclc.org/foo/bar' },
      { type: 'UPC', identifier: '123456789999' },
      { type: 'URL', identifier: 'http://www.heatflow.und.edu/index2.html' },
      { type: 'URN', identifier: 'urn:nbn:de:101:1-201102033592' },
      {
        type: 'w3id',
        identifier: 'https://w3id.org/games/spec/coil#Coil_Bomb_Die_Of_Age'
      }
    ];

    let invalidIdentifiers = [
      { type: 'DOI', identifier: '10.3205' },
      { type: 'DOI', identifier: '20.3205/11dgii122' },
      { type: 'PMID', identifier: '1208212A' },
      { type: 'PMID', identifier: '120821' },
      { type: 'URL', identifier: 'mailto:info@example.org' },
      { type: 'ISSN', identifier: '1188-153A' },
      { type: 'EISSN', identifier: '1188-153B' },
      { type: 'LISSN', identifier: '1188-153C' },
      { type: 'ARK', identifier: 'ark:/130/tqb3kh97gh8w' },
      { type: 'arXiv', identifier: 'arXiv:07.0001' },
      { type: 'bibcode', identifier: '2014Wthr...69...72' },
      { type: 'LSID', identifier: 'lsid:ubio.org:namebank:11815' },
      { type: 'PURL', identifier: 'http://oclc.org/foo/bar' },
      { type: 'URN', identifier: 'urn:NBN:de:101:1-201102033592' },
      { type: 'ISBN', identifier: '978-3-905673-82' }
    ];

    validIdentifiers.forEach((identifier) =>
      assert.equal(
        validator.validate(identifier.identifier, builtOptions, {
          relatedIdentifierType: identifier.type
        }),
        true,
        `validation of ${identifier.type} must succeed`
      )
    );
    invalidIdentifiers.forEach((identifier) =>
      assert.equal(
        validator.validate(identifier.identifier, builtOptions, {
          relatedIdentifierType: identifier.type
        }),
        `Please enter a valid ${identifier.type}.`,
        `validation of ${identifier.type} must fail`
      )
    );
  });

  test('missing identifier', function (assert) {
    assert.expect(1);

    message = validator.validate(null, builtOptions, {
      relatedIdentifierType: 'DOI'
    });
    assert.equal(message, 'Please enter a valid DOI.');
  });

  test('missing identifier type', function (assert) {
    assert.expect(1);

    message = validator.validate(null, builtOptions, {
      relatedIdentifierType: null
    });
    assert.equal(message, 'Please enter a valid related identifier type.');
  });
});

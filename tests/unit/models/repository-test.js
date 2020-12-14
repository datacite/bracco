import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import { run } from '@ember/runloop';

module('Unit | Model | repository', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );
    assert.ok(!!model);
  });

  test('should belong to a provider', function (assert) {
    const Repository = this.owner
      .lookup('service:store')
      .modelFor('repository');

    // lookup the relationship on the repository model
    /* eslint-disable-next-line ember/no-get */
    const relationship = get(Repository, 'relationshipsByName').get('provider');

    assert.equal(
      relationship.key,
      'provider',
      'has relationship with provider'
    );
    assert.equal(
      relationship.kind,
      'belongsTo',
      'kind of relationship is belongsTo'
    );
  });

  test('should correctly compute domainList', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );
    model.set('domains', 'datacite.org, datacite.de, datacite.fr');

    assert.equal(model.domainList, 'datacite.org,datacite.de,datacite.fr');
  });

  test('should correctly compute badgeUrl', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );

    model.set('re3data', 'https://doi.org/10.17616/R3088K');
    assert.equal(model.re3data, 'https://doi.org/10.17616/R3088K');
    assert.equal(
      model.badgeUrl,
      'https://api.stage.datacite.org/re3data/10.17616/R3088K/badge'
    );
  });

  test('no badgeUrl', function (assert) {
    let model = run(() =>
      this.owner.lookup('service:store').createRecord('repository')
    );

    model.set('re3data', null);
    assert.equal(model.re3data, null);
    assert.equal(model.badgeUrl, null);
  });
});

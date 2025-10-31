import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Model | ror', function (hooks) {
  setupTest(hooks);

  test('normalizes ROR v2 response correctly', function (assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('ror');

    let payload = {
      id: 'https://ror.org/038sjwq14',
      names: [
        { value: 'European Bioinformatics Institute', types: ['ror_display'] },
        { value: 'EBI', types: ['alias'] }
      ],
      country: { country_name: 'United Kingdom' },
      links: ['https://www.ebi.ac.uk'],
      aliases: ['EBI'],
      acronyms: ['EBI'],
      wikipedia_url: 'https://en.wikipedia.org/wiki/European_Bioinformatics_Institute'
    };

    let normalized = serializer.normalizeSingleResponse(store, store.modelFor('ror'), payload);

    assert.strictEqual(normalized.data.attributes.name, 'European Bioinformatics Institute');
    assert.strictEqual(normalized.data.attributes.country, 'United Kingdom');
    assert.deepEqual(normalized.data.attributes.aliases, ['EBI']);
  });
});

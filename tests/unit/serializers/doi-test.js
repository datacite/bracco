import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Serializer | application', function (hooks) {
  setupTest(hooks);

  module('serialize', function () {
    module('normalizeResponse', function () {
      module('repository', function () {
        test('it is normalized according to remapped naming', function (assert) {
          assert.expect(1);

          let store = this.owner.lookup('service:store');
          let serializer = store.serializerFor('repository');

          run(() => {
            let payload = {
              data: {
                type: 'dois',
                id: '1',
                attributes: {},
                relationships: {
                  client: {
                    links: {
                      self:
                        'https://host.test/api/dois/1/relationships/clients',
                      related: 'https://host.test/api/dois/1/clients'
                    },
                    data: [{ type: 'clients', id: '10' }]
                  }
                }
              },
              included: [
                {
                  type: 'clients',
                  id: '10',
                  attributes: {},
                  links: {
                    self: 'https://host.test/api/clients/10'
                  }
                }
              ]
            };

            let normalizedPayload = serializer.normalizeResponse(
              store,
              store.modelFor('repository'),
              payload,
              1,
              'findAll'
            );
            let expectedPayload = {
              data: {
                attributes: {},
                id: '1',
                relationships: {
                  repository: {
                    data: [{ id: '10', type: 'repository' }],
                    links: {
                      self:
                        'https://host.test/api/dois/1/relationships/clients',
                      related: 'https://host.test/api/dois/1/clients'
                    }
                  }
                },
                type: 'doi'
              },
              included: [
                {
                  attributes: {},
                  id: '10',
                  relationships: {},
                  type: 'repository'
                }
              ]
            };

            assert.deepEqual(
              normalizedPayload.data.relationships,
              expectedPayload.data.relationships
            );
          });
        });
      });
    });
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Serializer | geo-location', function (hooks) {
  setupTest(hooks);

  module('serialize', function () {
    module('serialize', function () {
      module('geoLocation', function () {
        test('it is normalized according to remapped naming', function (assert) {
          assert.expect(1);

          let store = this.owner.lookup('service:store');
          let payload = {
            geoLocationPlace: null,
            geoLocationPoint: {
              pointLatitude: 42
            },
            geoLocationBox: {
              westBoundLongitude: 30,
              southBoundLatitude: null,
              eastBoundLongitude: ''
            }
          };

          run(() => {
            let model = store.createRecord('geo-location', payload);

            let serializedPayload = model.serialize(payload);
            let expectedPayload = {
              geoLocationPoint: {
                pointLatitude: 42
              },
              geoLocationBox: {
                westBoundLongitude: 30
              }
            };

            assert.deepEqual(serializedPayload, expectedPayload);
          });
        });
      });
    });
  });
});

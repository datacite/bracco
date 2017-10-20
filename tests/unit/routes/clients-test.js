import { moduleFor, test } from 'ember-qunit';

moduleFor('route:clients', 'Unit | Route | clients', {
  needs: ['service:google-analytics', 'service:can']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

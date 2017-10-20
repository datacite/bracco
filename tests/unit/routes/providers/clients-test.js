import { moduleFor, test } from 'ember-qunit';

moduleFor('route:providers/show/clients', 'Unit | Route | providers/show/clients', {
  needs: ['service:google-analytics', 'service:can']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});

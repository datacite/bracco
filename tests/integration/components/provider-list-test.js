import { find } from '@ember/test-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('provider-list', 'Integration | Component | provider list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{provider-list}}`);

  assert.equal(find('*').textContent.trim(), 'No providers found.');

  // Template block usage:
  this.render(hbs`
    {{#provider-list}}
      No providers found.
    {{/provider-list}}
  `);

  assert.equal(find('*').textContent.trim(), 'No providers found.');
});

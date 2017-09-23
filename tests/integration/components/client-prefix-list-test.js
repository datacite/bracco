import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('client-prefix-list', 'Integration | Component | client prefix list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{client-prefix-list}}`);

  assert.equal(this.$().text().trim(), 'No prefixes found.');

  // Template block usage:
  this.render(hbs`
    {{#client-prefix-list}}
      
    {{/client-prefix-list}}
  `);

  assert.equal(this.$().text().trim(), 'No prefixes found.');
});

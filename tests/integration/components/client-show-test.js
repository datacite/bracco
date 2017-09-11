import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('client-show', 'Integration | Component | client show', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{client-show}}`);

  assert.equal(this.$().text().trim(), 'Client ID');

  // Template block usage:
  this.render(hbs`
    {{#client-show}}
      
    {{/client-show}}
  `);

  assert.equal(this.$().text().trim(), 'Client ID');
});

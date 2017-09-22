import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('doi-list', 'Integration | Component | doi list', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{doi-list}}`);

  assert.equal(this.$().text().trim(), 'No DOIs found.');

  // Template block usage:
  this.render(hbs`
    {{#doi-list}}
      
    {{/doi-list}}
  `);

  assert.equal(this.$().text().trim(), 'No DOIs found.');
});

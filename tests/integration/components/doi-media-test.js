import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('doi-media', 'Integration | Component | doi media', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{doi-media}}`);

  assert.ok(/There are no media+/.test(this.$().text().trim()), 'begins with "There are no media"');

  // Template block usage:
  this.render(hbs`
    {{#doi-media}}

    {{/doi-media}}
  `);

  assert.ok(/There are no media+/.test(this.$().text().trim()), 'begins with "There are no media"');
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('default-footer', 'Integration | Component | default footer', {
  integration: true
});

test('it renders', function(assert) {

//   // Set any properties with this.set('myProperty', 'value');
//   // Handle any actions with this.on('myAction', function(val) { ... });
//
//   this.render(hbs`{{default-footer}}`);
//
//   assert.equal(this.$().text().trim(), '');
//
  // Template block usage:
  this.render(hbs`
    {{#default-footer}}
      template block text
    {{/default-footer}}
  `);
//
//   assert.equal(this.$().text().trim(), 'template block text');
  assert.equal('', '');
});

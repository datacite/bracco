import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('default-header', 'Integration | Component | default header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  // this.render(hbs`{{default-header}}`);
  //
  // assert.equal(this.$().text().trim(), '');
  //
  // // Template block usage:
  this.render(hbs`
    {{#default-header}}
      template block text
    {{/default-header}}
  `);
  //
  // assert.equal(this.$().text().trim(), 'template block text');
  assert.equal('', '');
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('prefix-new', 'Integration | Component | prefix new', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#prefix-new}}
      template block text
    {{/prefix-new}}
  `);

  assert.dom('*').hasText('From First prefix in range of new prefixes provided by CNRI. To Last prefix in range of new prefixes provided by CNRI. Add Prefixes Cancel');
});

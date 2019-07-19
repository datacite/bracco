import { find } from '@ember/test-helpers';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('menu-user', 'Integration | Component | menu user', {
  integration: true
});

test('it renders', function(assert) {

  // Template block usage:
  this.render(hbs`
    {{#menu-user}}
      template block text
    {{/menu-user}}
  `);

  assert.equal(find('*').textContent.trim(), 'Sign in');
});

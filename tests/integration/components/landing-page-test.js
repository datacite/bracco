import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('landing-page', 'Integration | Component | landing page', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{landing-page}}`);

  assert.ok(/^DataCite DOI Registration Service+/.test(this.$().text().trim()), 'begins with "DataCite DOI Registration Service"');

  // Template block usage:
  this.render(hbs`
    {{#landing-page}}

    {{/landing-page}}
  `);

  assert.ok(/^DataCite DOI Registration Service+/.test(this.$().text().trim()), 'begins with "DataCite DOI Registration Service"');
});

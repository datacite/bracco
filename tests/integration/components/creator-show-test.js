import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | creator-show', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('creators', [
      {
        "nameType": "Person",
        "displayName": "Empbh R. Goh",
        "givenName": "Empbh R.",
        "familyName": "Goh"
      }, {
        "nameType": "Person",
        "displayName": "M. Barrgow",
        "givenName": "M.",
        "familyName": "Barrgow"
      }, {
        "nameType": "Person",
        "displayName": "M. Barrgoe",
        "givenName": "M.",
        "familyName": "Barrgoe"
      }
    ]);

    await render(hbs` {{creator-show creators=creators}}`);

    assert.equal(this.element.textContent.trim(), "Empbh R. Goh, \n      M. Barrgow & \n      M. Barrgoe");
  });
});

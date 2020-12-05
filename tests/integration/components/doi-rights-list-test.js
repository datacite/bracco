import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';

module('Integration | Component | doi rights-list', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('spdx', {
      spdxList: [
        {
          rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
          name: 'CC-BY 3.0'
        }
      ]
    });
    await render(hbs`{{doi-rights-list model=model spdx=spdx}}`);
    await click('#add-rights');
    let rightsArray = this.element.querySelectorAll('[data-test-rights-uri]');

    await fillIn(
      rightsArray[0],
      'http://creativecommons.org/licenses/by/3.0/de/deed.en'
    );

    assert
      .dom('[data-test-rights-uri]')
      .hasValue('http://creativecommons.org/licenses/by/3.0/de/deed.en');
  });

  test('add multiple values', async function (assert) {
    this.set('model', make('doi'));
    this.set('spdx', {
      spdxList: [
        {
          rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
          name: 'CC-BY 3.0'
        }
      ]
    });
    await render(hbs`{{doi-rights-list model=model spdx=spdx}}`);
    await click('#add-rights');
    await click('#add-rights');
    let rightsArray = this.element.querySelectorAll('[data-test-rights-uri]');

    await fillIn(
      rightsArray[0],
      'http://creativecommons.org/licenses/by/3.0/de/deed.en'
    );

    assert
      .dom('[data-test-rights-uri]')
      .hasValue('http://creativecommons.org/licenses/by/3.0/de/deed.en');
  });
});

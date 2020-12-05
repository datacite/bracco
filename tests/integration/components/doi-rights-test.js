import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi rights', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('rights'));
    this.set('spdx', {
      spdxList: [
        {
          rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
          name: 'CC-BY 3.0'
        }
      ]
    });
    await render(
      hbs`{{doi-rights model=model fragment=fragment spdx=spdx index=0}}`
    );

    assert.dom(this.element).hasText('Rights URI The URI of the license.');
  });

  test('it renders add add right', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('rights'));
    this.set('spdx', {
      spdxList: [
        {
          rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
          name: 'CC-BY 3.0'
        }
      ]
    });
    await render(
      hbs`{{doi-rights model=model fragment=fragment spdx=spdx index=0}}`
    );

    assert
      .dom('[data-test-rights-uri]')
      .hasValue('http://creativecommons.org/licenses/by/3.0/de/deed.en');
  });

  test('it renders add add right with list', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('rights'));
    this.set('spdx', {
      spdxList: [
        {
          rightsUri: 'http://creativecommons.org/licenses/by/3.0/de/deed.en',
          name: 'CC-BY 3.0'
        }
      ]
    });
    await render(
      hbs`{{doi-rights model=model fragment=fragment spdx=spdx index=0}}`
    );

    assert
      .dom('[data-test-rights-uri]')
      .hasValue('http://creativecommons.org/licenses/by/3.0/de/deed.en');
  });
});

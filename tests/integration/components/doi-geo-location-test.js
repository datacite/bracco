import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi geo-location', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('geoLocation'));
    await render(
      hbs`{{doi-geo-location model=model fragment=fragment index=0}}`
    );

    assert
      .dom('*')
      .hasText(
        'Geolocation Place Description of a geographic location. Geolocation Point A point location in space. A point contains a single longitude-latitude pair. More .. Geolocation Box The spatial limits of a box. A box is defined by two geographic points. Left low corner and right upper corner. Each point is defined by its longitude and latitude. More ..'
      );
  });
});

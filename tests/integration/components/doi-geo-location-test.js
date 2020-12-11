import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
// import { selectChoose } from 'ember-power-select/test-support';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi geo-location', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('geoLocation'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiGeoLocation @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}} />
      </BsForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Geolocation Place Description of a geographic location. Geolocation Point A point location in space. A point contains a single longitude-latitude pair. More .. Geolocation Box The spatial limits of a box. A box is defined by two geographic points. Left low corner and right upper corner. Each point is defined by its longitude and latitude. More ..'
      );
  });
});

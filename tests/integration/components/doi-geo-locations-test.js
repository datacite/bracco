import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | doi geo-locations', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-geo-locations model=model}}`);
    await click('#add-geolocation');
    let geoLocations = this.element.querySelectorAll('input.geo-location-place-field');

    await fillIn(geoLocations[0], 'Chihuahahu, Mexico, 1890');
    assert.dom(geoLocations[0]).hasValue('Chihuahahu, Mexico, 1890');
  });

  test('add multiple values', async function(assert) {
    this.set('model', make('doi'));
    await render(hbs`{{doi-geo-locations model=model}}`);
    await click('#add-geolocation');
    await click('#add-geolocation');
    let geoLocations = this.element.querySelectorAll('input.geo-location-place-field');

    await fillIn(geoLocations[0], 'motzstrasse 56, berlin');
    await fillIn(geoLocations[1], 'Chihuahahu, Mexico, 1890');

    assert.dom(geoLocations[0]).hasValue('motzstrasse 56, berlin');
    assert.dom(geoLocations[1]).hasValue('Chihuahahu, Mexico, 1890');
  });
});

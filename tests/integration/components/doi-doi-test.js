import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import Service from '@ember/service';

const currentUserStub = Service.extend({
  uid: 'tib.awi',
  name: 'Alfred Wegener Institute',
  role_id: 'client_admin',
  provider_id: 'tib',
  client_id: 'tib.awi',
});

module('Integration | Component | doi-doi', function(hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(async function() {
    this.owner.register('service: ', currentUserStub);
  });

  test('no doi', async function(assert) {
    this.set('doi', make('doi'));
    this.set('repository', make('repository'));

    await render(hbs`{{doi-doi model=doi repository=repository}}`);
    await fillIn('#suffix-field','');

    assert.dom('#suffix-field').hasNoValue();
    assert.dom('#suffix-field').hasClass('has_error');
  });

  test('unpermitted doi', async function(assert) {
    this.set('doi', make('doi'));
    this.set('repository', make('repository'));

    await render(hbs`{{doi-doi model=doi repository=repository}}`);
    await click('button#add-creator');
    await click('button#add-creator');
    await click('button#add-creator');
    let creators = this.element.querySelectorAll('input.creator-field');
    await fillIn(creators[0], 'Teresa May');
    await fillIn(creators[1], 'Billy Corgan');
    let persons = this.element.querySelectorAll('.select-person');
    let organisations = this.element.querySelectorAll('.select-organisation');

    assert.equal(persons[0].checked,true);
    assert.equal(organisations[0].checked,false);
    assert.equal(creators[0].value,'Teresa May');
    assert.equal(creators[1].value,'Billy Corgan');
    assert.equal(creators[0].className, 'form-control creator-field ember-text-field ember-view');  // there is no changes in format
    assert.equal(creators[1].className, 'form-control creator-field ember-text-field ember-view');
  });
});

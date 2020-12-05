import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import Service from '@ember/service';

const currentUserStub = Service.extend({
  uid: 'tib.awi',
  name: 'Alfred Wegener Institute',
  role_id: 'client_admin',
  provider_id: 'tib',
  client_id: 'tib.awi'
});

module('Integration | Component | doi-doi', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(async function () {
    this.owner.register('service: ', currentUserStub);
  });

  test('no doi', async function (assert) {
    this.set('doi', make('doi'));
    this.set('repository', make('repository'));

    await render(hbs`
      <BsForm @model={{doi}} as |form|>
        <DoiDoi @model={{doi}} @repository={{repository}} @form={{form}}/>
      </BsForm>
    `);
    await fillIn('#suffix-field', '');

    assert.dom('#suffix-field').hasNoValue();
  });
});

import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';
import { render } from '@ember/test-helpers';

module('Integration | Helper | provider-form-errors', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('errors', async function (assert) {
    this.set(
      'model',
      make('provider', {
        technicalContact: { email: 'john' },
        billingContact: { email: 'jack' },
        serviceContact: { email: 'jane' },
        secondaryTechnicalContact: { email: 'joe' },
        secondaryBillingContact: { email: 'jasper' },
        secondaryServiceContact: { email: 'joanne' },
        votingContact: { email: 'jil' }
      })
    );

    await render(hbs`{{provider-form-errors model}}`);

    assert
      .dom(this.element)
      .hasText(
        'member ID, provider name, provider display name, system email, technical contact email, secondary technical contact email, service contact email, secondary service contact email, billing contact email, secondary billing contact email, voting contact email'
      );
  });

  test('errors consortium_organization', async function (assert) {
    this.set(
      'model',
      make('carl', {
        technicalContact: { email: 'john' },
        billingContact: { email: 'jack' },
        serviceContact: { email: 'jane' },
        secondaryTechnicalContact: { email: 'joe' },
        secondaryBillingContact: { email: 'jasper' },
        secondaryServiceContact: { email: 'joanne' }
      })
    );

    await render(hbs`{{provider-form-errors model}}`);

    assert
      .dom(this.element)
      .hasText(
        'technical contact email, secondary technical contact email, service contact email, secondary service contact email'
      );
  });

  test('no errors', async function (assert) {
    this.set('model', make('ands'));

    await render(hbs`{{provider-form-errors model}}`);

    assert.dom(this.element).hasText('');
  });
});

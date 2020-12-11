import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { setupFactoryGuy, make } from 'ember-data-factory-guy';

module('Integration | Component | doi-subject', function (hooks) {
  setupRenderingTest(hooks);
  setupFactoryGuy(hooks);

  test('it renders', async function (assert) {
    this.set('model', make('doi'));
    this.set('fragment', make('subject'));
    await render(hbs`
      <BsForm @model={{model}} as |form|>
        <DoiSubject @model={{model}} @fragment={{fragment}} @form={{form}} @index={{0}}/>
      </BsForm>
    `);
    assert
      .dom(this.element)
      .hasText(
        'The default subject scheme is provided by the OECD Fields of Science and Technology (FOS) . Subject Scheme The name of the subject scheme or classification code or authority if one is used. Subject Scheme URI The URI of the subject identifier scheme. For example http://id.loc.gov/authorities/subjects'
      );
  });
});

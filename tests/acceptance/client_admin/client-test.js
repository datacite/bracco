import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit, fillIn } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | client_admin | client', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting client AWI', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi');

    assert.equal(currentURL(), '/clients/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Info');
  });

  test('visiting client AWI settings', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/settings');

    assert.equal(currentURL(), '/clients/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-client').includesText('Update Account');
    assert.dom('button#delete-client').doesNotExist();
  });

  test('visiting client AWI prefixes', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/prefixes');

    assert.equal(currentURL(), '/clients/tib.awi/prefixes');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Prefixes');
  });

  test('visiting client AWI dois', async function(assert) {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/dois');

    assert.equal(currentURL(), '/clients/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('DOIs');
    assert.dom('a#new-doi').includesText('Create DOI (Form)');
    assert.dom('a#upload-doi').includesText('Create DOI (File Upload)');
    assert.dom('a#transfer-dois').doesNotExist();
  });

  // test('creating a new DOI for client AWI renders', async function(assert) {
  //   await authenticateSession({
  //     uid: 'tib.awi',
  //     name: 'Alfred Wegener Institute',
  //     role_id: 'client_admin',
  //     provider_id: 'tib',
  //     client_id: 'tib.awi'
  //   });
  //   await visit('/clients/tib.awi/dois/new');
  //   //on landing
  //   assert.equal(currentURL(), '/clients/tib.awi/dois/new');
  //   assert.dom('h3').hasText('Create DOI (Form)');
  //   assert.dom('input#url-field').hasNoValue();
  //   assert.dom('input#publisher-field').hasNoValue();
  //   assert.dom('input#publication-year-field').hasNoValue();
  //   assert.dom('input#draft-radio').isChecked();
  //   assert.dom('input#registered-radio').isNotChecked();
  //   assert.dom('input#findable-radio').isNotChecked();
  //   assert.dom('input#suffix-field').hasAnyValue();
  // });

  // test('creating a new DOI for client AWI', async function(assert) {
  //   assert.expect(5);
  //   await authenticateSession({
  //     uid: 'tib.awi',
  //     name: 'Alfred Wegener Institute',
  //     role_id: 'client_admin',
  //     provider_id: 'tib',
  //     client_id: 'tib.awi'
  //   });
  //   await visit('/clients/tib.awi/dois/new');
  //   await fillIn('input#url-field', 'http://bbc.co.uk');
  //   await fillIn('input#publisher-field', 'the BBC');
  //   await fillIn('input#publication-year-field', 1928);

  //   assert.dom('input#url-field').hasValue('http://bbc.co.uk');
  //   assert.dom('input#publisher-field').hasValue('the BBC');
  //   assert.dom('input#publication-year-field').hasValue("1928");
  //   assert.dom('input#url-field').hasStyle({color:'rgb(46, 204, 113)'});
  //   assert.dom('input#publisher-field').hasStyle({color:'rgb(46, 204, 113)'});
  // });
});

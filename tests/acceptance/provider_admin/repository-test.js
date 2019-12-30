import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';

module('Acceptance | provider_admin | repository', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting repository AWI', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting repository AWI settings', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/repositories/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Repository');
    assert.dom('button#delete-repository').includesText('Delete');
  });

  // test('visiting repository AWI prefixes', async function(assert) {
  //   await authenticateSession({
  //     uid: 'tib',
  //     name: 'Technische Informationsbibliothek',
  //     role_id: 'provider_admin',
  //     provider_id: 'tib'
  //   });
  //   await visit('/repositories/tib.awi/prefixes');

  //   assert.equal(currentURL(), '/repositories/tib.awi/prefixes');
  //   assert.dom('h2.work').hasText('Alfred Wegener Institute');
  //   assert.dom('li a.nav-link.active').hasText('Prefixes');
  // });

  test('visiting repository AWI dois', async function(assert) {
    await authenticateSession({
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/repositories/tib.awi/dois');

    assert.equal(currentURL(), '/repositories/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    
    // assert.dom('h3.work').doesNotExist();
    // assert.dom('a#new-doi').doesNotExist();
    // assert.dom('a#upload-doi').doesNotExist();
    // assert.dom('a#transfer-dois').includesText('Transfer DOIs');
  });

  test('fail creating a new DOI for repository', async function(assert) {
    await authenticateSession({
      token_type: 'Bearer',
      uid: 'tib',
      name: 'Technische Informationsbibliothek',
      role_id: 'provider_admin',
      provider_id: 'tib'
    });
    await visit('/repositories/tib.awi/dois');

    assert.dom('new-doi').doesNotExist();
  });

});

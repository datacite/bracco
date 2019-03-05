// import { module, test } from 'qunit';
// import { setupApplicationTest } from 'ember-qunit';
// import { currentURL, visit, fillIn, click, waitUntil} from '@ember/test-helpers';
// import { authenticateSession } from 'ember-simple-auth/test-support';
// import { setupFactoryGuy } from 'ember-data-factory-guy';
// // import { selectChoose, selectSearch, removeMultipleOption, clearSelected } from 'ember-power-select/test-support';
// import ENV from 'bracco/config/environment';

// module('Acceptance | client_admin | client', function(hooks) {
//   setupApplicationTest(hooks);
//   setupFactoryGuy(hooks);


//   test('visiting client AWI', async function(assert) {
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi');

//     assert.equal(currentURL(), '/clients/tib.awi');
//     assert.dom('h2.work').hasText('Alfred Wegener Institute');
//     assert.dom('a.nav-link.active').hasText('Info');
//   });

//   test('visiting client AWI settings', async function(assert) {
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi/settings');

//     assert.equal(currentURL(), '/clients/tib.awi/settings');
//     assert.dom('h2.work').hasText('Alfred Wegener Institute');
//     assert.dom('a.nav-link.active').hasText('Settings');
//     assert.dom('button#edit-client').includesText('Update Account');
//     assert.dom('button#delete-client').doesNotExist();
//   });

//   test('visiting client AWI prefixes', async function(assert) {
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi/prefixes');

//     assert.equal(currentURL(), '/clients/tib.awi/prefixes');
//     assert.dom('h2.work').hasText('Alfred Wegener Institute');
//     assert.dom('a.nav-link.active').hasText('Prefixes');
//   });

//   test('visiting client AWI dois', async function(assert) {
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi/dois');

//     assert.equal(currentURL(), '/clients/tib.awi/dois');
//     assert.dom('h2.work').hasText('Alfred Wegener Institute');
//     assert.dom('a.nav-link.active').hasText('DOIs');
//     assert.dom('a#new-doi').includesText('Create DOI (Form)');
//     assert.dom('a#upload-doi').includesText('Create DOI (File Upload)');
//     assert.dom('a#transfer-dois').doesNotExist();
//   });

//   test('creating a new DOI for client AWI renders', async function(assert) {
//     assert.expect(9);
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi/dois/new');

//     // Maybe we do not need this one
//     await waitUntil(() => {
//       let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
//       let suffix = this.element.querySelector('input#suffix-field');
//       let status = this.element.querySelector('input#draft-radio:checked');
//       if (prefix[0].innerText && suffix.value && status.value ){
//         return true;
//       }
//       return false;
//     });
//     //on landing

//     assert.equal(currentURL(), '/clients/tib.awi/dois/new');
//     assert.dom('h3').hasText('Create DOI (Form)');
//     assert.dom('input#url-field').hasNoValue();
//     assert.dom('input#publisher-field').hasNoValue();
//     assert.dom('input#publication-year-field').hasNoValue();
//     assert.dom('input#draft-radio').isChecked();
//     assert.dom('input#registered-radio').isNotChecked();
//     assert.dom('input#findable-radio').isNotChecked();
//     assert.dom('input#suffix-field').hasAnyValue();
//   });

//   test('adding multiple fields for a new DOI for client AWI', async function(assert) {
    
//     // assert.expect(11);
//     await authenticateSession({
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });


//     await visit('/clients/tib.awi/dois/new');
//     await fillIn('input#url-field', 'http://bbc.co.uk');
//     await fillIn('input#publisher-field', 'the BBC');
//     await fillIn('input#publication-year-field', 1928);

//     await click('button#add-title')
//     await click('button#add-title')

//     var titles = this.element.querySelectorAll('input.title-field');
 
//     await fillIn(titles[0], "Abhinandan: Crowds gather for Indian pilots release")
//     await fillIn(titles[1], "Tornadoes kill at least 23 in Lee County, Alabama")

//     await click('button#add-creator')
//     await click('button#add-creator')

//     var creators = this.element.querySelectorAll('input.creator-field');
 
//     await fillIn(creators[0], "Teresa May")
//     await fillIn(creators[1], "Billy Corgan")

//     await click('button#add-description')
//     await click('button#add-description')

//     var descriptions = this.element.querySelectorAll('textarea.description-field');
 
//     var desc1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio";
//     var desc2 = 'Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci';

//     await fillIn(descriptions[0], desc1)
//     await fillIn(descriptions[1], desc2)

//     assert.equal(this.element.querySelectorAll('input.title-field')[0].value,'Abhinandan: Crowds gather for Indian pilots release');
//     assert.equal(this.element.querySelectorAll('input.title-field')[1].value,'Tornadoes kill at least 23 in Lee County, Alabama');

//     assert.equal(this.element.querySelectorAll('input.creator-field')[0].value,'Teresa May');
//     assert.equal(this.element.querySelectorAll('input.creator-field')[1].value,'Billy Corgan');

//     assert.equal(this.element.querySelectorAll('textarea.description-field')[0].value,desc1);
//     assert.equal(this.element.querySelectorAll('textarea.description-field')[1].value,desc2);

//     assert.dom('input#url-field').hasValue('http://bbc.co.uk');
//     assert.dom('input#publisher-field').hasValue('the BBC');
//     assert.dom('input#publication-year-field').hasValue("1928");

//     // assert.dom('input#url-field').hasStyle({color:'rgb(46, 204, 113)'});
//     // assert.dom('input#publisher-field').hasStyle({color:'rgb(46, 204, 113)'});
//   });

//   test('creating a new DOI for client AWI', async function(assert) {
//     assert.expect(3);
//     await authenticateSession({
//       access_token: ENV.API_JWT,
//       token_type: 'Bearer',
//       uid: 'tib.awi',
//       name: 'Alfred Wegener Institute',
//       role_id: 'client_admin',
//       provider_id: 'tib',
//       client_id: 'tib.awi'
//     });
//     await visit('/clients/tib.awi/dois/new');

//     var titles = this.element.querySelectorAll('input.title-field');
//     let suffix = Math.random().toString(36).substring(7);
 
//     await fillIn('input#suffix-field', suffix);
//     await click('input#draft-radio');
//     await fillIn('input#url-field', 'http://bbc.co.uk');
//     await fillIn(titles[0], "Abhinandan: Crowds gather for Indian pilots release")
//     await fillIn('input#publisher-field', 'the BBC');
//     await fillIn('input#publication-year-field', 1928);
//     await fillIn('input.creator-field', 'Alexander Payne');

//     // Maybe we do not need this one
//     await waitUntil(() => {
//       let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
//       let suffix = this.element.querySelector('input#suffix-field');
//       let status = this.element.querySelector('input#draft-radio:checked');
//       if (prefix[0].innerText && suffix.value && status.value ){
//         return true;
//       }
//       return false;
//     });
//     await click('button#create');
  

//     assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F'+suffix);
//     assert.equal(this.element.querySelectorAll('h2.work')[1].innerText,'10.2312/'+suffix);
//     assert.equal(this.element.querySelector('h3.work').innerText,'Abhinandan: Crowds gather for Indian pilots release');
//   });


//   test('edit multiple fields for a new DOI for client AWI', async function(assert) {
//     // assert.expect(3);
//     await authenticateSession({
//       access_token: ENV.API_JWT,
//       token_type: 'Bearer',
//       uid: 'estdoi.bio',
//       name: 'Tartu Ülikooli Loodusmuuseum',
//       role_id: 'client_admin',
//       provider_id: 'estdoi',
//       client_id: 'estdoi.bio'
//     });


//     await visit('/clients/estdoi.bio/dois/10.15156%2F1xqt-rz35/edit');

//     var desc1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio";
//     var desc2 = 'Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci';

  
//     assert.dom('input#url-field').hasValue('https://schema.datacite.org/meta/kernel-4.1/index.html');
//     assert.dom('input#publisher-field').hasValue('University of Tartu');
//     assert.dom('input#publication-year-field').hasValue("2016");
//     assert.equal(this.element.querySelectorAll('input.title-field')[1].value,'Chapter |');
//     assert.equal(this.element.querySelectorAll('input.title-field')[0].value,'My doi');
//     assert.equal(this.element.querySelectorAll('input.creator-field')[0].value,'De vito, Danny');
//     assert.equal(this.element.querySelectorAll('input.creator-field')[1].value,'corgan, billy');
//     assert.equal(this.element.querySelectorAll('textarea.description-field')[0].value,desc1);
//     assert.equal(this.element.querySelectorAll('textarea.description-field')[1].value,desc2);
//   });
// });

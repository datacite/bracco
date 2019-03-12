import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, visit, fillIn, click, waitUntil, pauseTest} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupFactoryGuy } from 'ember-data-factory-guy';

// import { selectChoose, selectSearch, removeMultipleOption, clearSelected } from 'ember-power-select/test-support';
import ENV from 'bracco/config/environment';

module('Acceptance | client_admin | client', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  let goodDoi = {
    titles: ["Abhinandan: Crowds gather for Indian pilots release", "Tornadoes kill at least 23 in Lee County, Alabama"],
    creators: ["Teresa May", "Billy Corgan"],
    descriptions: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio","Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci" ],
    yop: "1990",
    publisher: "the BBC",
    url: 'http://bbc.co.uk'
  }

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
  });

  hooks.afterEach(async function() {


 
  });

  test('visiting client AWI', async function(assert) {

    await visit('/clients/tib.awi');

    assert.equal(currentURL(), '/clients/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Info');
  });

  test('visiting client AWI settings', async function(assert) {

    await visit('/clients/tib.awi/settings');

    assert.equal(currentURL(), '/clients/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-client').includesText('Update Account');
    assert.dom('button#delete-client').doesNotExist();
  });

  test('visiting client AWI prefixes', async function(assert) {

    await visit('/clients/tib.awi/prefixes');

    assert.equal(currentURL(), '/clients/tib.awi/prefixes');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('Prefixes');
  });

  test('visiting client AWI dois', async function(assert) {

    await visit('/clients/tib.awi/dois');

    assert.equal(currentURL(), '/clients/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('a.nav-link.active').hasText('DOIs');
    assert.dom('a#new-doi').includesText('Create (Form)');
    assert.dom('a#upload-doi').includesText('Create (File Upload)');
    assert.dom('a#transfer-dois').doesNotExist();
  });

  test('creating a new DOI for client AWI renders', async function(assert) {
    assert.expect(9);

    await visit('/clients/tib.awi/dois/new');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value ){
        return true;
      }
      return false;
    });
    //on landing

    assert.equal(currentURL(), '/clients/tib.awi/dois/new');
    assert.dom('h3').hasText('Create DOI (Form)');
    assert.dom('input#url-field').hasNoValue();
    assert.dom('input#publisher-field').hasNoValue();
    assert.dom('input#publication-year-field').hasNoValue();
    assert.dom('input#draft-radio').isChecked();
    assert.dom('input#registered-radio').isNotChecked();
    assert.dom('input#findable-radio').isNotChecked();
    assert.dom('input#suffix-field').hasAnyValue();
  });

  test('adding multiple fields for a new DOI for client AWI', async function(assert) {
    
    // assert.expect(11);



    await visit('/clients/tib.awi/dois/new');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.yop);

    await click('button#add-title')
    await click('button#add-title')

    var titles = this.element.querySelectorAll('input.title-field');
 
    await fillIn(titles[0], goodDoi.titles[0])
    await fillIn(titles[1], goodDoi.titles[1])

    await click('button#add-creator')
    await click('button#add-creator')

    var creators = this.element.querySelectorAll('input.creator-field');
 
    await fillIn(creators[0], goodDoi.creators[0])
    await fillIn(creators[1],  goodDoi.creators[1])

    await click('button#add-description')
    await click('button#add-description')

    var descriptions = this.element.querySelectorAll('textarea.description-field');
 
    await fillIn(descriptions[0], goodDoi.descriptions[0])
    await fillIn(descriptions[1], goodDoi.descriptions[1])

    assert.equal(this.element.querySelectorAll('input.title-field')[0].value,goodDoi.titles[0]);
    assert.equal(this.element.querySelectorAll('input.title-field')[1].value,goodDoi.titles[1]);

    assert.equal(this.element.querySelectorAll('input.creator-field')[0].value,goodDoi.creators[0]);
    assert.equal(this.element.querySelectorAll('input.creator-field')[1].value, goodDoi.creators[1]);

    assert.equal(this.element.querySelectorAll('textarea.description-field')[0].value,goodDoi.descriptions[0]);
    assert.equal(this.element.querySelectorAll('textarea.description-field')[1].value,goodDoi.descriptions[1]);

    assert.dom('input#url-field').hasValue('http://bbc.co.uk');
    assert.dom('input#publisher-field').hasValue(goodDoi.publisher);
    assert.dom('input#publication-year-field').hasValue(goodDoi.yop);

    // assert.dom('input#url-field').hasStyle({color:'rgb(46, 204, 113)'});
    // assert.dom('input#publisher-field').hasStyle({color:'rgb(46, 204, 113)'});
  });

  test('creating a draft new DOI for client AWI', async function(assert) {
    assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/dois/new');
  

    var titles = this.element.querySelectorAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);
 
    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0])
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.yop);
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value ){
        return true;
      }
      return false;
    });
    await click('button#create');
  

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F'+suffix);
    assert.equal(this.element.querySelectorAll('h2.work')[1].innerText,'10.2312/'+suffix);
    assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[0]);
  });

  test('creating a new DOI for client AWI', async function(assert) {
    assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/dois/new');

    var titles = this.element.querySelectorAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

 
    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0])
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.yop);
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value ){
        return true;
      }
      return false;
    });
    await click('button#create');
  

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F'+suffix);
    assert.equal(this.element.querySelectorAll('h2.work')[1].innerText,'10.2312/'+suffix);
    assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[0]);
  });


  test('edit multiple fields for a new DOI for client AWI', async function(assert) {
    // assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'estdoi.bio',
      name: 'Tartu Ülikooli Loodusmuuseum',
      role_id: 'client_admin',
      provider_id: 'estdoi',
      client_id: 'estdoi.bio'
    });


    await visit('/clients/estdoi.bio/dois/10.15156%2F1xqt-rz35/edit');

  
    assert.dom('input#url-field').hasValue('https://schema.datacite.org/meta/kernel-4.1/index.html');
    assert.dom('input#publisher-field').hasValue('University of Tartu');
    assert.dom('input#publication-year-field').hasValue("2016");
    assert.equal(this.element.querySelectorAll('input.title-field')[1].value,'Chapter |');
    assert.equal(this.element.querySelectorAll('input.title-field')[0].value,'My doi');
    assert.equal(this.element.querySelectorAll('input.creator-field')[0].value,'De vito, Danny');
    assert.equal(this.element.querySelectorAll('input.creator-field')[1].value,'corgan, billy');
    assert.equal(this.element.querySelectorAll('textarea.description-field')[0].value,goodDoi.descriptions[0]);
    assert.equal(this.element.querySelectorAll('textarea.description-field')[1].value,goodDoi.descriptions[1]);
  });

  test('fail creating a new DOI without yop and publisher ', async function(assert) {
    assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi'
    });
    await visit('/clients/tib.awi/dois/new');

    var titles = this.element.querySelectorAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);
 
    await fillIn('input#suffix-field', suffix);
    await click('input#findable-radio');
    await fillIn('input#url-field', 'http://bbc.co.uk');
    await fillIn(titles[0], "Abhinandan: Crowds gather for Indian pilots release")
    await fillIn('input#publisher-field', '');
    await fillIn('input#publication-year-field', 'aass');
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = this.element.querySelectorAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#findable-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value ){
        return true;
      }
      return false;
    });
    await click('button#create');
  
    assert.equal(currentURL(), '/clients/tib.awi/dois/new');
    assert.equal(this.element.querySelector("div#publisher").className, 'form-group has-error has-feedback ember-view');
    assert.equal(this.element.querySelector("div#publication-year").className, 'form-group has-error has-feedback ember-view');
  });
});

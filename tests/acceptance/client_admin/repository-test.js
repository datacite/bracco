import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  findAll,
  visit,
  fillIn,
  click,
  typeIn,
  waitUntil,
  triggerKeyEvent,
} from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { build, make, mockFindRecord } from 'ember-data-factory-guy';
import ENV from 'bracco/config/environment';

module('Acceptance | client_admin | repository', function(hooks) {
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  let goodDoi = {
    titles: [ 'Abhinandan: Crowds gather for Indian pilots release', 'Tornadoes kill at least 23 in Lee County, Alabama' ],
    creators: [ 'Teresa May', 'Billy Corgan' ],
    descriptions: [ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis blandit odio. Donec justo ex, feugiat non imperdiet ut, ultrices a purus. Mauris molestie elementum finibus. Duis augue odio','Suspendisse tristique risus neque, non posuere lacus vestibulum et. Maecenas pellentesque mollis lectus, ac viverra nunc pellentesque sed. Sed nibh orci' ],
    publicationYear: '1990',
    publisher: 'the BBC',
    url: 'http://bbc.co.uk',
  };

  hooks.beforeEach(async function() {
    await authenticateSession({
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
  });

  hooks.afterEach(async function() {
  });

  test('visiting repository AWI', async function(assert) {
    await visit('/repositories/tib.awi');

    assert.equal(currentURL(), '/repositories/tib.awi');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Info');
  });

  test('visiting repository AWI settings', async function(assert) {
    await visit('/repositories/tib.awi/settings');

    assert.equal(currentURL(), '/repositories/tib.awi/settings');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Settings');
    assert.dom('button#edit-repository').includesText('Update Account');
    assert.dom('button#delete-repository').doesNotExist();
  });

  test('visiting repository AWI prefixes', async function(assert) {
    await visit('/repositories/tib.awi/prefixes');

    assert.equal(currentURL(), '/repositories/tib.awi/prefixes');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('Prefixes');
  });

  test('visiting repository AWI dois', async function(assert) {
    await visit('/repositories/tib.awi/dois');

    assert.equal(currentURL(), '/repositories/tib.awi/dois');
    assert.dom('h2.work').hasText('Alfred Wegener Institute');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('a#new-doi').includesText('Create (Form)');
    assert.dom('a#upload-doi').includesText('Create (File Upload)');
    assert.dom('a#transfer-dois').doesNotExist();
  });

  test('unpermitted suffix', async function(assert) {
    let suffix = Math.random().toString(36).substring(7);

    await visit('/clients/tib.awi/dois/new');
    await typeIn('input#suffix-field', suffix + '#:aswde3#'); // trigger validation
    await click('#suffix.suffix.form-group'); // trigger validation
    await click('input#draft-radio:checked'); // trigger validation
    // await pauseTest();

    let group = findAll('#suffix.suffix.form-group')[0].className;

    assert.equal(group, 'suffix form-group has-error has-feedback ember-view');
  });

  test('empty suffix', async function(assert) {
    await visit('/clients/tib.awi/dois/new');
    await fillIn('input#suffix-field', '');
    await triggerKeyEvent('input#suffix-field', 'keyup', 'Tab'); // trigger validation

    await click('#suffix.suffix.form-group'); // trigger validation
    await click('input#draft-radio:checked'); // trigger validation
    let group = findAll('#suffix.suffix.form-group')[0].className;

    assert.equal(group, 'suffix form-group has-error has-feedback ember-view');
  });

  test('creating a new DOI for repository AWI renders', async function(assert) {
    assert.expect(9);

    await visit('/repositories/tib.awi/dois/new');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = findAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value) {
        return true;
      }
      return false;
    });
    // on landing

    assert.equal(currentURL(), '/repositories/tib.awi/dois/new');
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
    await fillIn('input#publication-year-field', goodDoi.publicationYear);

    await click('button#add-title');
    await click('button#add-title');

    let titles = findAll('input.title-field');

    await fillIn(titles[0], goodDoi.titles[0]);
    await fillIn(titles[1], goodDoi.titles[1]);

    await click('button#add-creator');
    await click('button#add-creator');

    let creators = findAll('input.creator-field');

    await fillIn(creators[0], goodDoi.creators[0]);
    await fillIn(creators[1],  goodDoi.creators[1]);

    await click('button#add-description');
    await click('button#add-description');

    let descriptions = findAll('textarea.description-field');

    await fillIn(descriptions[0], goodDoi.descriptions[0]);
    await fillIn(descriptions[1], goodDoi.descriptions[1]);

    assert.equal(findAll('input.title-field')[0].value,goodDoi.titles[0]);
    assert.equal(findAll('input.title-field')[1].value,goodDoi.titles[1]);

    assert.equal(findAll('input.creator-field')[0].value,goodDoi.creators[0]);
    assert.equal(findAll('input.creator-field')[1].value, goodDoi.creators[1]);

    assert.equal(findAll('textarea.description-field')[0].value,goodDoi.descriptions[0]);
    assert.equal(findAll('textarea.description-field')[1].value,goodDoi.descriptions[1]);

    assert.dom('input#url-field').hasValue('http://bbc.co.uk');
    assert.dom('input#publisher-field').hasValue(goodDoi.publisher);
    assert.dom('input#publication-year-field').hasValue(goodDoi.publicationYear);

    assert.dom('input#url-field').hasStyle({color: 'rgb(46, 204, 113)'});
    assert.dom('input#publisher-field').hasStyle({color: 'rgb(46, 204, 113)'});
  });

  test('creating a new draft DOI for client AWI', async function(assert) {
    assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    await visit('/clients/tib.awi/dois/new');

    let titles = findAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0]);
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.publicationYear);
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = findAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value) {
        return true;
      }
      return false;
    });
    await click('button#create');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix);
    assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
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
      client_id: 'tib.awi',
    });
    await visit('/clients/tib.awi/dois/new');

    let titles = findAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0]);
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.publicationYear);
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = findAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#draft-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value) {
        return true;
      }
      return false;
    });
    await click('button#create');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix);
    assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
    assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[0]);
  });

  test('modify values for a DOI from client AWI', async function(assert) {
    // assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    await visit('/clients/tib.awi/dois/new');
    assert.equal(currentURL(), '/clients/tib.awi/dois/new');

    let titles = findAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0]);
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.publicationYear);
    await fillIn('input.creator-field', 'Alexander Payne');

    await click('button#create');

    await waitUntil(() => {
      let doiName = findAll('h2.work')[1].innerText;
      console.log(doiName);
      if (doiName == '10.2312/' + suffix) {
        return true;
      }
      return false;
    });
    // await pauseTest()
    await click('#edit-doi');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix + '/edit');
    assert.dom('input#publisher-field').hasValue(goodDoi.publisher);

    let updatedTitles = findAll('input.title-field');

    await fillIn(updatedTitles[0], goodDoi.titles[1]);
    await fillIn('input#publisher-field', 'ITV4');
    await fillIn('input#publication-year-field', '2000');
    await fillIn('input.creator-field', 'Frank Ohara');


    await click('#update-doi');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix);
    assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
    assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[1]);
    assert.dom('h3.work ~ div.metadata').includesText('2000');
    assert.dom('h3.work ~ div.metadata').includesText('ITV');
  });

  test('remove values for a DOI from client AWI', async function(assert) {
    // assert.expect(3);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    await visit('/clients/tib.awi/dois/new');

    let titles = findAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

    await fillIn('input#suffix-field', suffix);
    await click('input#draft-radio');
    await fillIn('input#url-field', goodDoi.url);
    await fillIn(titles[0], goodDoi.titles[0]);
    await fillIn('input#publisher-field', goodDoi.publisher);
    await fillIn('input#publication-year-field', goodDoi.publicationYear);
    await fillIn('input.creator-field', 'Alexander Payne');

    await click('button#create');

    await waitUntil(() => {
      let doiName = findAll('h2.work')[1].innerText;
      console.log(doiName);
      if (doiName == '10.2312/' + suffix) {
        return true;
      }
      return false;
    });
    // await pauseTest()
    await click('#edit-doi');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix + '/edit');
    assert.dom('input#publisher-field').hasValue(goodDoi.publisher);

    let updatedTitles = findAll('input.title-field');

    await fillIn(updatedTitles[0], goodDoi.titles[1]);
    await fillIn('input#publisher-field', '');
    await fillIn('input#publication-year-field', '');
    await fillIn('input.creator-field', '');


    await click('#update-doi');

    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F' + suffix);
    assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
    assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[1]);
    assert.dom('h3.work ~ div.metadata').doesNotIncludeText('2000');
    assert.dom('h3.work ~ div.metadata').doesNotIncludeText('ITV');
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
      client_id: 'estdoi.bio',
    });


    await visit('/clients/estdoi.bio/dois/10.15156%2F1xqt-rz35/edit');


    assert.dom('input#url-field').hasValue('https://schema.datacite.org/meta/kernel-4.1/index.html');
    assert.dom('input#publisher-field').hasValue('University of Tartu');
    assert.dom('input#publication-year-field').hasValue('2016');
    assert.equal(findAll('input.title-field')[1].value,'Chapter |');
    assert.equal(findAll('input.title-field')[0].value,'My doi');
    assert.equal(findAll('input.creator-field')[0].value,'De vito, Danny');
    assert.equal(findAll('input.creator-field')[1].value,'corgan, billy');
    assert.equal(findAll('textarea.description-field')[0].value,goodDoi.descriptions[0]);
    assert.equal(findAll('textarea.description-field')[1].value,goodDoi.descriptions[1]);
  });

  test('view full DOI in the form', async function(assert) {
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });

    await visit('/clients/tib.awi/dois/10.2312%2F7qw1-th81/edit');


    let nameIdentifiers = findAll('input.name-identifier-field');
    let givenNames = findAll('input.given-name-field');
    let familyNames = findAll('input.family-name-fields');
    let titles = findAll('input.title-field');
    let titleTypes = findAll('.power-select-fragment.title-type span.ember-power-select-selected-item');
    let titleLangs = findAll('.power-select-fragment.title-lang span.ember-power-select-selected-item');
    let descTypes = findAll('.description-types.ember-view span.ember-power-select-selected-item');
    let descLangs = findAll('.power-select-fragment.description-langs span.ember-power-select-selected-item');
    let organisations = findAll('input.select-organisation');
    let persons = findAll('input.select-person');

    assert.dom('input#url-field').hasValue('https://www.dane.de');
    assert.dom('input#publisher-field').hasValue('VS Code');
    assert.dom('input#publication-year-field').hasValue('1996');
    assert.equal(titles[0].value,'Brexit: EU points finger at UK for Theresa May\'s deal defeatff');
    assert.equal(titles[1].value,'Deadly shooting at Brazilian school');
    assert.equal(nameIdentifiers[0].value,'https://orcid.org/0000-0003-3484-6875');
    assert.equal(nameIdentifiers[1].value,'');
    assert.equal(nameIdentifiers[2].value,'');
    assert.equal(givenNames[0].value,'Kristian');
    assert.equal(givenNames[1].value,'Cristiano');
    assert.equal(familyNames[0].value,'Garza');
    assert.equal(familyNames[1].value,'Ronaldo');
    // assert.equal(findAll(' span.ember-power-select-selected-item')[0].value,'Manchester University');
    assert.dom(organisations[0]).isNotChecked();
    assert.dom(organisations[1]).isNotChecked();
    assert.dom(organisations[2]).isChecked();

    assert.dom(persons[0]).isChecked();
    assert.dom(persons[1]).isChecked();
    assert.dom(persons[2]).isNotChecked();


    assert.dom(titleTypes[0]).hasText('TranslatedTitle');
    assert.dom(titleLangs[0]).hasText('English');

    assert.dom(descTypes[0]).hasText('Other');
    assert.dom(descTypes[1]).hasText('Abstract');
    assert.dom(descLangs[0]).hasText('Assamese');


    assert.equal(findAll('input.creator-field')[0].value,'Garza, Kristian');
    assert.equal(findAll('input.creator-field')[1].value,'Ronaldo, Cristiano');
    assert.equal(findAll('input.creator-field')[2].value,'Datacite');
    assert.equal(findAll('textarea.description-field')[0].value,'European politician after European politician tweeted to say how disappointed they were, how businesses and citizens across the EU and UK now faced more agonising uncertainty and that the vote in the House of Commons brought everyone much closer to a no-deal Brexit.');
    assert.equal(findAll('textarea.description-field')[1].value,'Continuing disarray in the House of Commons just makes the EU wonder what the point could now be in delaying Brexit by just a few weeks - if the prime minister does request a short extension of the leaving process.');

    await click('#update-doi');
    assert.equal(currentURL(), '/clients/tib.awi/dois/10.2312%2F7qw1-th81');
    assert.equal(findAll('h2.work')[1].innerText,'10.2312/7qw1-th81');
  });

  test('fail creating a new DOI without publicationYear and publisher ', async function(assert) {
    assert.expect(4);
    await authenticateSession({
      access_token: ENV.API_JWT,
      token_type: 'Bearer',
      uid: 'tib.awi',
      name: 'Alfred Wegener Institute',
      role_id: 'client_admin',
      provider_id: 'tib',
      client_id: 'tib.awi',
    });
    await visit('/clients/tib.awi/dois/new');

    let titles = findAll('input.title-field');
    let suffix = Math.random().toString(36).substring(7);

    await fillIn('input#suffix-field', suffix);
    await click('input#findable-radio');
    await fillIn('input#url-field', 'http://bbc.co.uk');
    await fillIn(titles[0], '');
    await fillIn('input#publisher-field', '');
    await fillIn('input#publication-year-field', 'thisIs not a year');
    await fillIn('input.creator-field', 'Alexander Payne');

    // Maybe we do not need this one
    await waitUntil(() => {
      let prefix = findAll('span.ember-power-select-selected-item');
      let suffix = this.element.querySelector('input#suffix-field');
      let status = this.element.querySelector('input#findable-radio:checked');
      if (prefix[0].innerText && suffix.value && status.value) {
        return true;
      }
      return false;
    });
    await click('button#create');

    assert.equal(currentURL(), '/clients/tib.awi/dois/new');
    assert.equal(this.element.querySelector('div#publisher').className, 'form-group has-error has-feedback ember-view');
    assert.equal(findAll('input.title-field')[0].className, 'form-control title-field');
    assert.equal(this.element.querySelector('div#publication-year').className, 'form-group has-error has-feedback ember-view');
  });
});

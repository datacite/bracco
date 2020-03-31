import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import {
  currentURL,
  visit,
  click,
  fillIn,
  waitUntil,
  // triggerKeyEvent,
  findAll,
  // pauseTest,
} from '@ember/test-helpers';
import ENV from 'bracco/config/environment';
import { setupFactoryGuy } from 'ember-data-factory-guy';
// import { authenticateSession } from 'ember-simple-auth/test-support';
// import { setupQunit as setupPolly } from '@pollyjs/core';

module('Acceptance | staff_admin | doi', function(hooks) {
  // setupPolly(hooks, {
  //   matchRequestsBy: {
  //     headers: {
  //       exclude: [ 'authorization' ],
  //     },
  //   },
  // });
  setupApplicationTest(hooks);
  setupFactoryGuy(hooks);

  hooks.beforeEach(async function() {
    // const { server } = this.polly;

    // server.any().on('beforePersist', (req, recording) => {
    //   /* we only want to perform this task when recording */
    //   if (req.action !== 'record') {
    //     return;
    //   }
    //   /* hide password and token in oauth password grant requests */
    //   if (recording.request.url == 'https://api.test.datacite.org/token') {
    //     recording.request.postData.text = 'INFORMATION_HIDDEN';
    //     recording.response.content.text = 'INFORMATION_HIDDEN';
    //   }

    //   /* filter out authorization tokens */
    //   recording.request.headers = recording.request.headers.filter(({ name }) => name !== 'authorization');
    // });

    await visit('/sign-in');
    await fillIn('input#account-field', 'ADMIN');
    await fillIn('input#password-field', ENV.STAFF_ADMIN_PASSWORD);
    await click('button[type=submit]');

    // await authenticateSession({
    //   uid: 'admin',
    //   name: 'Admin',
    //   role_id: 'staff_admin',
    // });
  });

  test('visiting dois', async function(assert) {
    await visit('/dois');

    assert.equal(currentURL(), '/dois');
    assert.dom('h2.work').hasText('DataCite');
    assert.dom('li a.nav-link.active').hasText('DOIs');
    assert.dom('div#search').exists();

    // at least one doi exists
    assert.dom('[data-test-results]').includesText('DOIs');
    assert.dom('[data-test-doi]').exists();
    assert.dom('div.panel.facets').exists();

    // admin can't add dois here (needs to go to repository)
    assert.dom('a#new-doi').doesNotExist();
    assert.dom('a#upload-doi').doesNotExist();
    assert.dom('a#transfer-dois').doesNotExist();
  });

  test('visiting dois with click', async function(assert) {
    await visit('/dois');

    // first DOI in list
    await click('h3.work:first-child a');

    // see buttons for single DOI
    assert.dom('a#edit-doi').includesText('Update DOI (Form)');
    assert.dom('a#modify-doi').includesText('Update DOI (File Upload)');
  });

  test('visiting specific doi', async function(assert) {
    await visit('/dois/10.80225%2Fda52-7919');

    assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919');
    assert.dom('h2.work').hasText('10.80225/da52-7919');
  });

  // test('visiting specific doi draft', async function(assert) {
  //   await visit('/dois/10.14454%2F0sd6-bh17');

  //   assert.equal(currentURL(), '/dois/10.14454%2F0sd6-bh17');
  //   assert.dom('h2.work').hasText('10.14454/0sd6-bh17');
  // });

  test('new DOI form for repository Test', async function(assert) {
    assert.expect(22);

    await visit('/repositories/datacite.test/dois/new');

    assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
    assert.dom('input#suffix-field').exists();
    // assert.dom('input#draft-radio').exists();

    assert.dom('input#url-field').exists();

    assert.dom('[data-test-name-identifier]').exists();
    assert.dom('input.select-person').exists();
    assert.dom('[data-test-given-name]').exists();
    assert.dom('[data-test-family-name]').exists();
    assert.dom('[data-test-name]').exists();
    assert.dom('[data-test-geo-location-place]').exists();
    assert.dom('[data-test-title]').exists();
    assert.dom('input#publisher-field').exists();
    assert.dom('input#publication-year-field').exists();
    assert.dom('input#resource-type-field').exists();
    assert.dom('[data-test-description]').exists();
    assert.dom('[doi-subject]').exists();
    assert.dom('#doi-language').exists();
    assert.dom('[doi-contributor]').exists();
    assert.dom('[data-test-alternate-identifier]').exists();
    assert.dom('[data-test-related-identifier]').exists();
    assert.dom('[data-test-funder-name]').exists();
    assert.dom('[data-test-funder-identifier-type]').exists();
    assert.dom('[ data-test-award-number]').exists();

    //   assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
    //   assert.dom('input#suffix-field').exists();
    //   // assert.dom('input#draft-radio').exists();

    //   assert.dom('input#url-field').exists();

    //   assert.dom('[data-test-name-identifier]').exists();
    //   assert.dom('input.select-person').exists();
    //   assert.dom('[data-test-given-name]').exists();
    //   assert.dom('[data-test-family-name]').exists();
    //   assert.dom('[data-test-name]').exists();
    //   assert.dom('[data-test-geo-location-place]').exists();
    //   assert.dom('[data-test-title]').exists();
    //   assert.dom('input#publisher-field').exists();
    //   assert.dom('input#publication-year-field').exists();
    //   assert.dom('input#resource-type-field').exists();
    //   assert.dom('[data-test-description]').exists();
    //   assert.dom('[doi-subject]').exists();
    //   assert.dom('#doi-language').exists();
    //   assert.dom('[doi-contributor]').exists();
    //   assert.dom('[data-test-alternate-identifier]').exists();

  //   assert.dom('button#doi-create').exists();
  });

  test('upload DOI form for repository DataCite Test', async function(assert) {
    assert.expect(6);

    await visit('/repositories/datacite.test/dois/upload');

    assert.equal(currentURL(), '/repositories/datacite.test/dois/upload');
    assert.dom('input#suffix-field').exists();
    // assert.dom('input#draft-radio').exists();

    assert.dom('input#url-field').exists();

    assert.dom('#upload-file').exists();
    assert.dom('textarea#metadata-field').exists();

    assert.dom('button#doi-create').exists();
  });

  test('edit DOI form for repository DataCite Test', async function(assert) {
    assert.expect(20);

    await visit('/dois/10.80225%2Fda52-7919/edit');
    assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919/edit');
    assert.dom('input#doi-field').exists();
    // assert.dom('input#draft-radio').exists();

    assert.dom('input#url-field').exists();

    assert.dom('[data-test-name-identifier]').exists();
    assert.dom('input.select-person').exists();
    assert.dom('[data-test-given-name]').exists();
    assert.dom('[data-test-family-name]').exists();
    assert.dom('[data-test-name]').exists();
    // assert.dom('[data-test-geo-location-place]').exists();
    assert.dom('[data-test-title]').exists();
    assert.dom('input#publisher-field').exists();
    assert.dom('input#publication-year-field').exists();
    assert.dom('input#resource-type-field').exists();
    assert.dom('[data-test-description]').exists();
    assert.dom('[doi-subject]').exists();
    assert.dom('#doi-language').exists();
    assert.dom('[doi-contributor]').exists();
    assert.dom('[data-test-alternate-identifier]').exists();
    assert.dom('[data-test-related-identifier]').exists();
    // assert.dom('[data-test-related-metadata-scheme]').exists();
    assert.dom('[data-test-funder-name]').exists();


    assert.dom('button#doi-update').exists();
  });

  // TODO fix validations
  test('modify DOI form for repository DataCite Test', async function(assert) {
    assert.expect(6);

    await visit('/dois/10.80225%2Fda52-7919/modify');

    assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919/modify');
    assert.dom('input#doi-field').exists();
    // assert.dom('input#draft-radio').exists();

    assert.dom('input#url-field').exists();

    assert.dom('#upload-file').exists();
    assert.dom('textarea#metadata-field').exists();

    assert.dom('button#doi-modify').exists();
  });

  // test('unpermitted suffix', async function(assert) {
  //   let suffix = Math.random().toString(36).substring(7);

  //   await visit('/repositories/datacite.test/dois/new');
  //   await fillIn('input#suffix-field', suffix + '#:aswde3#'); // trigger validation
  //   await click('#suffix.suffix.form-group'); // trigger validation
  //   // await click('input#draft-radio:checked'); // trigger validation
  //   // await pauseTest();

  //   let group = findAll('#suffix.suffix.form-group')[0].className;

  //   assert.equal(group, 'suffix form-group ember-view');
  // });

  // test('empty suffix', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');
  //   await fillIn('input#suffix-field', '');
  //   await triggerKeyEvent('input#suffix-field', 'keyup', 'Tab'); // trigger validation

  //   await click('#suffix.suffix.form-group'); // trigger validation
  //   // await click('input#draft-radio:checked'); // trigger validation
  //   let group = findAll('#suffix.suffix.form-group')[0].className;

  //   assert.equal(group, 'suffix form-group ember-view');
  // });

  test('creating a new DOI for repository DataCite Test renders', async function(assert) {
    await visit('/repositories/datacite.test/dois/new');

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

    assert.equal(currentURL(), '/repositories/datacite.test/dois/new');
    assert.dom('h3').hasText('Create DOI (Form)');
    assert.dom('input#url-field').hasNoValue();
    assert.dom('input#publisher-field').hasNoValue();
    assert.dom('input#publication-year-field').hasNoValue();
    assert.dom('input#draft-radio').isChecked();
    assert.dom('input#registered-radio').isNotChecked();
    assert.dom('input#findable-radio').isNotChecked();
    assert.dom('input#suffix-field').hasAnyValue();
  });

  // test('create draft doi', async function(assert) {
  //   await visit('repositories/datacite.test/dois/new');
  //   let suffix = '1234-5678';
  //   await fillIn('input#suffix-field', suffix);

  //   await click('button#doi-create');
  //   await pauseTest();
  //   assert.equal(currentURL(), '/dois/10.80225%2F' + suffix);

  // await visit('repositories/datacite.test/dois/10.80225%2F' + suffix + '/delete');
  // await fillIn('input#confirmDoi', '10.80225%2F' + suffix);
  // await click('button#destroy');
  // assert.equal(currentURL(), '/repositories/datacite.test/dois');
  // });

  test('update draft doi', async function(assert) {
    await visit('/dois/10.80225%2Fda52-7919/edit');

    assert.dom('input#url-field').exists();
    await fillIn('input#url-field', 'https://blog.datacite.org/pids-for-instruments-a-way-forward');

    assert.dom('button#doi-update').exists();
    await click('button#doi-update');

  //  assert.equal(currentURL(), '/dois/10.80225%2Fda52-7919');
  //  await pauseTest();
  //  assert.dom('input#url-field').hasValue('https://support.datacite.org/docs/doi-states');
  });

  // test('filling out fields for a new DOI for repository DataCite Test', async function(assert) {
  //   this.set('model', make('doi'));

  //   await visit('/repositories/datacite.test/dois/new');
  //   await fillIn('input#url-field', this.model.url);
  //   await fillIn('input#publisher-field', this.model.publisher);
  //   await fillIn('input#publication-year-field', this.model.publicationYear);

  //   await click('button#add-title');
  //   let titles = findAll('input.title-field');
  //   await fillIn(titles[0], this.model.titles[0]);

  //   await click('button#add-creator');
  //   let creators = findAll('input.creator-field');
  //   await fillIn(creators[0], this.model.creators[0]);

  //   await click('button#add-description');
  //   let descriptions = findAll('textarea.description-field');
  //   await fillIn(descriptions[0], this.model.descriptions[0]);

  //   assert.equal(findAll('input.title-field')[0].value, this.model.titles[0]);
  //   assert.equal(findAll('input.creator-field')[0].value, this.model.creators[0]);
  //   assert.equal(findAll('textarea.description-field')[0].value, this.model.descriptions[0]);

  //   assert.dom('input#url-field').hasValue('http://bbc.co.uk');
  //   assert.dom('input#publisher-field').hasValue(this.model.publisher);
  //   assert.dom('input#publication-year-field').hasValue(this.model.publicationYear);

  //   assert.dom('input#url-field').hasStyle({color: 'rgb(46, 204, 113)'});
  //   assert.dom('input#publisher-field').hasStyle({color: 'rgb(46, 204, 113)'});
  // });

  // test('creating a new draft DOI for repository DataCite Test', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');

  //   let titles = findAll('input.title-field');
  //   let suffix = Math.random().toString(36).substring(7);

  //   await fillIn('input#suffix-field', suffix);
  //   await click('input#draft-radio');
  //   await fillIn('input#url-field', '');
  //   await fillIn(titles[0], '');
  //   await fillIn('input#publisher-field', 'DataCite Test');
  //   await fillIn('input#publication-year-field', '2020');
  //   await fillIn('input.given-name-field', 'Alexander');
  //   await fillIn('input.family-name-field', 'Payne');

  //   // Maybe we do not need this one
  //   await waitUntil(() => {
  //     let prefix = findAll('span.ember-power-select-selected-item');
  //     let suffix = this.element.querySelector('input#suffix-field');
  //     // let status = this.element.querySelector('input#draft-radio:checked');
  //     if (prefix[0].innerText && suffix.value) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   await click('button#doi-create');

  //   assert.equal(currentURL(), '/dois/10.70048%2F' + suffix);
  //   assert.equal(findAll('h2.work')[1].innerText, '10.2312/' + suffix);
  //   assert.equal(this.element.querySelector('h3.work').innerText, '');
  // });

  // test('creating a new DOI for repository DataCite Test', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');

  //   let titles = findAll('input.title-field');
  //   let suffix = Math.random().toString(36).substring(7);

  //   await fillIn('input#suffix-field', suffix);
  //   await click('input#draft-radio');
  //   await fillIn('input#url-field', goodDoi.url);
  //   await fillIn(titles[0], goodDoi.titles[0]);
  //   await fillIn('input#publisher-field', goodDoi.publisher);
  //   await fillIn('input#publication-year-field', goodDoi.publicationYear);
  //   await fillIn('input.creator-field', 'Alexander Payne');

  //   // Maybe we do not need this one
  //   await waitUntil(() => {
  //     let prefix = findAll('span.ember-power-select-selected-item');
  //     let suffix = this.element.querySelector('input#suffix-field');
  //     let status = this.element.querySelector('input#draft-radio:checked');
  //     if (prefix[0].innerText && suffix.value && status.value) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   await click('button#create');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F' + suffix);
  //   assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
  //   assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[0]);
  // });

  // test('modify values for a DOI from repository DataCite Test', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');
  //   assert.equal(currentURL(), '/repositories/datacite.test/dois/new');

  //   let titles = findAll('input.title-field');
  //   let suffix = Math.random().toString(36).substring(7);

  //   await fillIn('input#suffix-field', suffix);
  //   await click('input#draft-radio');
  //   await fillIn('input#url-field', goodDoi.url);
  //   await fillIn(titles[0], goodDoi.titles[0]);
  //   await fillIn('input#publisher-field', goodDoi.publisher);
  //   await fillIn('input#publication-year-field', goodDoi.publicationYear);
  //   await fillIn('input.creator-field', 'Alexander Payne');

  //   await click('button#create');

  //   await waitUntil(() => {
  //     let doiName = findAll('h2.work')[1].innerText;
  //     console.log(doiName);
  //     if (doiName == '10.2312/' + suffix) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   // await pauseTest()
  //   await click('#edit-doi');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F' + suffix + '/edit');
  //   assert.dom('input#publisher-field').hasValue(goodDoi.publisher);

  //   let updatedTitles = findAll('input.title-field');

  //   await fillIn(updatedTitles[0], goodDoi.titles[1]);
  //   await fillIn('input#publisher-field', 'ITV4');
  //   await fillIn('input#publication-year-field', '2000');
  //   await fillIn('input.creator-field', 'Frank Ohara');

  //   await click('#update-doi');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F' + suffix);
  //   assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
  //   assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[1]);
  //   assert.dom('h3.work ~ div.metadata').includesText('2000');
  //   assert.dom('h3.work ~ div.metadata').includesText('ITV');
  // });

  // test('remove values for a DOI from repository DataCite Test', async function(assert) {
  //   await visit('/repositories/datacite.test/dois/new');

  //   let titles = findAll('input.title-field');
  //   let suffix = Math.random().toString(36).substring(7);

  //   await fillIn('input#suffix-field', suffix);
  //   await click('input#draft-radio');
  //   await fillIn('input#url-field', goodDoi.url);
  //   await fillIn(titles[0], goodDoi.titles[0]);
  //   await fillIn('input#publisher-field', goodDoi.publisher);
  //   await fillIn('input#publication-year-field', goodDoi.publicationYear);
  //   await fillIn('input.creator-field', 'Alexander Payne');

  //   await click('button#create');

  //   await waitUntil(() => {
  //     let doiName = findAll('h2.work')[1].innerText;
  //     console.log(doiName);
  //     if (doiName == '10.2312/' + suffix) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   // await pauseTest()
  //   await click('#edit-doi');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F' + suffix + '/edit');
  //   assert.dom('input#publisher-field').hasValue(goodDoi.publisher);

  //   let updatedTitles = findAll('input.title-field');

  //   await fillIn(updatedTitles[0], goodDoi.titles[1]);
  //   await fillIn('input#publisher-field', '');
  //   await fillIn('input#publication-year-field', '');
  //   await fillIn('input.creator-field', '');

  //   await click('#update-doi');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F' + suffix);
  //   assert.equal(findAll('h2.work')[1].innerText,'10.2312/' + suffix);
  //   assert.equal(this.element.querySelector('h3.work').innerText,goodDoi.titles[1]);
  //   assert.dom('h3.work ~ div.metadata').doesNotIncludeText('2000');
  //   assert.dom('h3.work ~ div.metadata').doesNotIncludeText('ITV');
  // });

  // test('edit multiple fields for a new DOI for repository DataCite Test', async function(assert) {
  //   await visit('/dois/10.80225%2Fe605-dg05/edit');

  //   assert.dom('input#url-field').hasValue('https://schema.datacite.org/meta/kernel-4.1/index.html');
  //   assert.dom('input#publisher-field').hasValue('University of Tartu');
  //   assert.dom('input#publication-year-field').hasValue('2016');
  //   assert.equal(findAll('input.title-field')[1].value,'Chapter |');
  //   assert.equal(findAll('input.title-field')[0].value,'My doi');
  //   assert.equal(findAll('input.creator-field')[0].value,'De vito, Danny');
  //   assert.equal(findAll('input.creator-field')[1].value,'corgan, billy');
  //   assert.equal(findAll('textarea.description-field')[0].value,goodDoi.descriptions[0]);
  //   assert.equal(findAll('textarea.description-field')[1].value,goodDoi.descriptions[1]);
  // });

  // test('view full DOI in the form', async function(assert) {
  //   await visit('/dois/10.80225%2Fe605-dg05/edit');

  //   let nameIdentifiers = findAll('input.name-identifier-field');
  //   let givenNames = findAll('input.given-name-field');
  //   let familyNames = findAll('input.family-name-fields');
  //   let titles = findAll('input.title-field');
  //   let titleTypes = findAll('.power-select-fragment.title-type span.ember-power-select-selected-item');
  //   let titleLangs = findAll('.power-select-fragment.title-lang span.ember-power-select-selected-item');
  //   let descTypes = findAll('.description-types.ember-view span.ember-power-select-selected-item');
  //   let descLangs = findAll('.power-select-fragment.description-langs span.ember-power-select-selected-item');
  //   let organisations = findAll('input.select-organisation');
  //   let persons = findAll('input.select-person');

  //   assert.dom('input#url-field').hasValue('https://www.dane.de');
  //   assert.dom('input#publisher-field').hasValue('VS Code');
  //   assert.dom('input#publication-year-field').hasValue('1996');
  //   assert.equal(titles[0].value,'Brexit: EU points finger at UK for Theresa May\'s deal defeatff');
  //   assert.equal(titles[1].value,'Deadly shooting at Brazilian school');
  //   assert.equal(nameIdentifiers[0].value,'https://orcid.org/0000-0003-3484-6875');
  //   assert.equal(nameIdentifiers[1].value,'');
  //   assert.equal(nameIdentifiers[2].value,'');
  //   assert.equal(givenNames[0].value,'Kristian');
  //   assert.equal(givenNames[1].value,'Cristiano');
  //   assert.equal(familyNames[0].value,'Garza');
  //   assert.equal(familyNames[1].value,'Ronaldo');
  //   // assert.equal(findAll(' span.ember-power-select-selected-item')[0].value,'Manchester University');
  //   assert.dom(organisations[0]).isNotChecked();
  //   assert.dom(organisations[1]).isNotChecked();
  //   assert.dom(organisations[2]).isChecked();

  //   assert.dom(persons[0]).isChecked();
  //   assert.dom(persons[1]).isChecked();
  //   assert.dom(persons[2]).isNotChecked();

  //   assert.dom(titleTypes[0]).hasText('TranslatedTitle');
  //   assert.dom(titleLangs[0]).hasText('English');

  //   assert.dom(descTypes[0]).hasText('Other');
  //   assert.dom(descTypes[1]).hasText('Abstract');
  //   assert.dom(descLangs[0]).hasText('Assamese');

  //   assert.equal(findAll('input.creator-field')[0].value,'Garza, Kristian');
  //   assert.equal(findAll('input.creator-field')[1].value,'Ronaldo, Cristiano');
  //   assert.equal(findAll('input.creator-field')[2].value,'Datacite');
  //   assert.equal(findAll('textarea.description-field')[0].value,'European politician after European politician tweeted to say how disappointed they were, how businesses and citizens across the EU and UK now faced more agonising uncertainty and that the vote in the House of Commons brought everyone much closer to a no-deal Brexit.');
  //   assert.equal(findAll('textarea.description-field')[1].value,'Continuing disarray in the House of Commons just makes the EU wonder what the point could now be in delaying Brexit by just a few weeks - if the prime minister does request a short extension of the leaving process.');

  //   await click('#update-doi');
  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/10.2312%2F7qw1-th81');
  //   assert.equal(findAll('h2.work')[1].innerText,'10.2312/7qw1-th81');
  // });

  // test('fail creating a new DOI without publicationYear and publisher ', async function(assert) {
  //   await visit('/repositories/datacite.rph/dois/new');

  //   let titles = findAll('input.title-field');
  //   let suffix = Math.random().toString(36).substring(7);

  //   await fillIn('input#suffix-field', suffix);
  //   await click('input#findable-radio');
  //   await fillIn('input#url-field', 'http://bbc.co.uk');
  //   await fillIn(titles[0], '');
  //   await fillIn('input#publisher-field', '');
  //   await fillIn('input#publication-year-field', 'thisIs not a year');
  //   await fillIn('input.creator-field', 'Alexander Payne');

  //   // Maybe we do not need this one
  //   await waitUntil(() => {
  //     let prefix = findAll('span.ember-power-select-selected-item');
  //     let suffix = this.element.querySelector('input#suffix-field');
  //     let status = this.element.querySelector('input#findable-radio:checked');
  //     if (prefix[0].innerText && suffix.value && status.value) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   await click('button#create');

  //   assert.equal(currentURL(), '/repositories/datacite.rph/dois/new');
  //   assert.equal(this.element.querySelector('div#publisher').className, 'form-group has-error has-feedback ember-view');
  //   assert.equal(findAll('input.title-field')[0].className, 'form-control title-field');
  //   assert.equal(this.element.querySelector('div#publication-year').className, 'form-group has-error has-feedback ember-view');
  // });
});

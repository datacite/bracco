import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'fragment.nameIdentifier': [
    validator('name-identifier', true)
  ],
});

const nameIdentifierSchemeList = [
  'ISNI',
  'ORCID'
];

// const nameIdentifierSchemeOrganizationList = [
//   'ISNI',
//   'ROR'
// ];

const schemeUriList = {
  isni: 'https://isni.org',
  orcid: 'https://orcid.org',
  ror: 'https://ror.org'
};

export default Component.extend(Validations, {
  store: service(),

  nameIdentifierSchemeList,
  nameIdentifierSchemes: nameIdentifierSchemeList,
  errorMessage: computed('validations.messages', function () {
    if (this.get('validations.messages').length > 0) {
      return this.get('validations.messages').get('firstObject');
    } else {
      return null;
    }
  }),

  validateOrcidIdentifier(id) {
    let self = this;
    this.store.findRecord('person', id).then(function(person) {
      self.creator.set('givenName', person.givenName);
      self.creator.set('familyName', person.familyName);
      self.setNameParts(person.givenName, person.familyName);
      self.setNameType('Personal');
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }
    });
  },
  validateRorIdentifier(id) {
    let self = this;
    this.store.findRecord('organization', id).then(function(organization) {
      self.creator.set('name', organization.name);
      self.setNameType('Organizational');
    }).catch(function(reason){
      if (console.debug) {
        console.debug(reason);
      } else {
        console.log(reason);
      }
    });
  },

  actions: {
    searchNameIdentifierScheme(query) {
      var nameIdentifierSchemes = nameIdentifierSchemeList.filter(function (nameIdentifierScheme) {
        return nameIdentifierScheme.toLowerCase().startsWith(query.toLowerCase());
      })
      this.set('nameIdentifierSchemes', nameIdentifierSchemes);
    },
    selectNameIdentifierScheme(nameIdentifierScheme) {
      this.fragment.set('nameIdentifierScheme', nameIdentifierScheme);
      this.fragment.set('schemeUri', schemeUriList[nameIdentifierScheme]);
      this.set('nameIdentifierSchemes', nameIdentifierSchemeList);
    },
    updateNameIdentifier(value) {
      if (value.startsWith('https://orcid.org') || value.startsWith('http://orcid.org')) {
        let id = value.substr(value.indexOf('0'));
        this.fragment.set('schemeUri', 'https://orcid.org');
        this.fragment.set('nameIdentifierScheme', 'ORCID');
        this.fragment.set('nameIdentifier', 'https://orcid.org/' + id);

        const re = /^(http|https):\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/;
        if (re.test(value)) {
          this.validateOrcidIdentifier(id);
        }
      } else if (value.startsWith('http://isni.org')) {
        this.fragment.set('schemeUri', 'http://isni.org');
        this.fragment.set('nameIdentifierScheme', 'ISNI');
        this.fragment.set('nameIdentifier', value);
      } else if (value.startsWith('https://ror.org')) {
        let id = value.substr(8);

        this.fragment.set('schemeUri', 'https://ror.org');
        this.fragment.set('nameIdentifierScheme', 'ROR');
        this.fragment.set('nameIdentifier', value);

        const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
        if (re.test(value)) {
          this.validateRorIdentifier(id);
        }
      } else {
        this.fragment.set('nameIdentifierScheme', 'Other');
        this.fragment.set('nameIdentifier', value);
      }
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    validateNameIdentifier() {
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    deleteNameIdentifier() {
      this.creator.get('nameIdentifiers').removeObject(this.fragment);
    },
  }
});

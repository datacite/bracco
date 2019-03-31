import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'fragment.nameIdentifier': [
    validator('name-identifier', true)
  ],
});

export default Component.extend(Validations, {
  store: service(),

  errorMessage: computed('validations.messages', function () {
    if (this.get('validations.messages').length > 0) {
      return this.get('validations.messages').get('firstObject');
    } else {
      return null;
    }
  }),
  isValidating: false,

  validateOrcidIdentifier(id) {
    let self = this;
    this.store.findRecord('person', id).then(function(person) {
      self.creator.set('givenName', person.givenName);
      self.creator.set('familyName', person.familyName);
      self.joinNameParts({ givenName: person.givenName, familyName: person.familyName, nameIdentifierScheme: 'ORCID' });
    }).catch(function() {
      self.creator.set('givenName', null);
      self.creator.set('familyName', null);
      self.joinNameParts({});
    });
  },
  validateRorIdentifier(id) {
    let self = this;
    this.store.findRecord('organization', id).then(function(organization) {
      self.creator.set('name', organization.name);
      self.joinNameParts({ name: organization.name, nameIdentifierScheme: 'ROR' });
      self.setReadOnly(true);
    }).catch(function() {
      self.creator.set('name', null);
      self.setReadOnly(false);
    });
  },

  actions: {
    updateNameIdentifier(value) {
      if (value.startsWith('https://orcid.org') || value.startsWith('http://orcid.org')) {
        let id = value.substr(value.indexOf('0'));
        this.fragment.set('schemeUri', 'https://orcid.org');
        this.fragment.set('nameIdentifierScheme', 'ORCID');
        this.fragment.set('nameIdentifier', 'https://orcid.org/' + id);

        const re = /^(http|https):\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/;
        if (re.test(value)) {
          this.validateOrcidIdentifier(id);
        } else {
          this.creator.set('givenName', null);
          this.creator.set('familyName', null);
          this.joinNameParts({});
        }
      } else if (value.startsWith('https://ror.org')) {
        let id = value.substr(8);

        this.fragment.set('schemeUri', 'https://ror.org');
        this.fragment.set('nameIdentifierScheme', 'ROR');
        this.fragment.set('nameIdentifier', value);

        const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
        if (re.test(value)) {
          this.validateRorIdentifier(id);
        } else {
          this.creator.set('name', null);
          this.setReadOnly(false);
        }
      } else if (value.startsWith('http://isni.org')) {
        this.fragment.set('schemeUri', 'http://isni.org');
        this.fragment.set('nameIdentifierScheme', 'ISNI');
        this.fragment.set('nameIdentifier', value);
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

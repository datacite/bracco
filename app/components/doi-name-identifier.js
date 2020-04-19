import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  validateOrcidIdentifier(id) {
    let self = this;
    this.store.findRecord('person', id).then(function(person) {
      self.joinNameParts({ givenName: person.givenName, familyName: person.familyName, nameIdentifierScheme: 'ORCID' });
    }).catch(function() {
      self.joinNameParts({ givenName: null, familyName: null, nameIdentifierScheme: 'ORCID' });
    });
  },
  validateRorIdentifier(value) {
    let self = this;
    let id = 'ror.org/' + value.substr(value.indexOf('0'));
    this.store.findRecord('ror', id).then(function(ror) {
      self.joinNameParts({ name: ror.name, nameIdentifierScheme: 'ROR' });
    }).catch(function() {
      self.joinNameParts({ name: null, nameIdentifierScheme: 'ROR' });
    });
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
    } else if (value.startsWith('https://ror.org')) {
      let id = value.substr(8);

      this.fragment.set('schemeUri', 'https://ror.org');
      this.fragment.set('nameIdentifierScheme', 'ROR');
      this.fragment.set('nameIdentifier', value);

      const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
      if (re.test(value)) {
        this.validateRorIdentifier(id);
      }
    } else if (value.startsWith('http://isni.org')) {
      this.fragment.set('schemeUri', 'http://isni.org');
      this.fragment.set('nameIdentifierScheme', 'ISNI');
      this.fragment.set('nameIdentifier', value);
    } else if (value.length == 0) {
      this.fragment.set('nameIdentifierScheme', null);
      this.fragment.set('nameIdentifier', null);
      this.joinNameParts({});
    } else {
      this.fragment.set('nameIdentifierScheme', 'Other');
      this.fragment.set('nameIdentifier', value);
    }
  },

  actions: {
    updateNameIdentifier(value) {
      this.updateNameIdentifier(value);
    },
    deleteNameIdentifier() {
      this.creator.get('nameIdentifiers').removeObject(this.fragment);
    },
  },
});

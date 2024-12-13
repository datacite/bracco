// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

export default class DoiNameIdentifier extends Component {
  @service
  store;

  validateOrcidIdentifier(id) {
    let self = this;
    this.store
      .findRecord('person', id)
      .then(function (person) {
        self.joinNameParts({
          givenName: person.givenName,
          familyName: person.familyName,
          nameIdentifierScheme: 'ORCID'
        });
      })
      .catch(function () {
        self.joinNameParts({
          givenName: null,
          familyName: null,
          nameIdentifierScheme: 'ORCID'
        });
      });
  }

  validateRorIdentifier(value) {
    let self = this;
    let id = 'ror.org/' + value.substr(value.indexOf('0'));
    this.store
      .findRecord('ror', id)
      .then(function (ror) {
        self.joinNameParts({ name: ror.name, nameIdentifierScheme: 'ROR' });
      })
      .catch(function () {
        self.joinNameParts({ name: null, nameIdentifierScheme: 'ROR' });
      });
  }

  updateNameIdentifier(value) {
    if (
      value.startsWith('https://orcid.org') ||
      value.startsWith('http://orcid.org')
    ) {
      let id = value.substr(value.indexOf('0'));
      this.fragment.schemeUri = 'https://orcid.org';
      this.fragment.nameIdentifierScheme = 'ORCID';
      this.fragment.nameIdentifier = 'https://orcid.org/' + id;

      const re =
        /^(http|https):\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{3}[0-9X]+$/;
      if (re.test(value)) {
        this.validateOrcidIdentifier(id);
      }
    } else if (value.startsWith('https://ror.org')) {
      let id = value.substr(8);

      this.fragment.schemeUri = 'https://ror.org';
      this.fragment.nameIdentifierScheme = 'ROR';
      this.fragment.nameIdentifier = value;

      const re = /^https:\/\/ror\.org\/0\w{6}\d{2}$/;
      if (re.test(value)) {
        this.validateRorIdentifier(id);
      }
    } else if (value.startsWith('http://isni.org')) {
      this.fragment.schemeUri = 'http://isni.org';
      this.fragment.nameIdentifierScheme = 'ISNI';
      this.fragment.nameIdentifier = value;
    } else if (value.length == 0) {
      this.fragment.nameIdentifierScheme = null;
      this.fragment.nameIdentifier = null;
      this.joinNameParts({});
    } else {
      this.fragment.nameIdentifierScheme = 'Other';
      this.fragment.nameIdentifier = value;
    }
  }

  @action
  updateNameIdentifierAction(value) {
    this.updateNameIdentifier(value);
  }

  @action
  deleteNameIdentifierAction() {
    this.creator.nameIdentifiers.removeObject(this.fragment);
  }
}

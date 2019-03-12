import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'fragment.nameIdentifier': [
    validator('format', {
      regex: /(http|https|ftp):\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
      allowBlank: true,
      message: 'Please enter a name identifier in URL format.'
    }),
    validator('presence', {
      presence: true,
      isWarning: computed('model.state', 'model.prefix', function () {
        return (this.get('model.state') === 'draft' || this.get('model.prefix') === '10.5072');
      })
    })
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
    // let self = this;
    this.store.findRecord('person', id).then(function(person) {
      console.log(person)
      return person;
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

        // this.validateOrcidIdentifier(id);

      } else if (value.startsWith('http://isni.org')) {
        let id = value.substr(value.indexOf('0'));

        this.fragment.set('schemeUri', 'http://isni.org');
        this.fragment.set('nameIdentifierScheme', 'ISNI');
        this.fragment.set('nameIdentifier', id);
      } else if (value.startsWith('https://ror.org')) {
        let id = value.substr(value.indexOf('0'));

        this.fragment.set('schemeUri', 'https://ror.org');
        this.fragment.set('nameIdentifierScheme', 'ROR');
        this.fragment.set('nameIdentifier', id);
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

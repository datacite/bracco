import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'fragment.name': [
    validator('presence', {
      presence: true,
      isWarning: computed('model.model.state', 'model.model.prefix', function () {
        return (this.get('model.model.state') === 'draft' || this.get('model.model.prefix') === '10.5072');
      }),
      disabled: computed('model.model.mode', function () {
        return !["new", "edit"].includes(this.get('model.model.mode'));
      })
    })
  ]
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
  showPersonal: computed('fragment.nameType', function () {
    return this.get('fragment.nameType') === 'Personal';
  }),
  isValidating: false,
  hasErrors: false,
  isReadonly: false,
  isReadonlyNameType: false,
  isReadonlyNameParts: false,
  organizations: [],
  organization: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('organization', this.fragment.get('affiliation'));
    this.selectNameType(this.fragment.get('nameType'));
    this.joinNameParts({});

    if (!this.fragment.get('nameIdentifiers')) {
      this.fragment.set('nameIdentifiers', []);
    }
    if (this.fragment.get('nameIdentifiers').length == 0) {
      this.fragment.get('nameIdentifiers').createFragment();
    }
  },

  joinNameParts(options = {}) {
    options.givenName = options.givenName || this.fragment.get('givenName');
    options.familyName = options.familyName || this.fragment.get('familyName');

    console.log(options.nameIdentifierScheme)

    if (options.nameIdentifierScheme === 'ORCID') {
      this.fragment.set('nameType', 'Personal')
      this.set('nameType', 'Personal')
      this.set('isReadonlyNameParts', true);
    } else if (options.nameIdentifierScheme === 'ROR') {
      this.fragment.set('nameType', 'Organizational')
      this.set('nameType', 'Organizational')
    } else {
      this.set('isReadonlyNameParts', false);
    }

    if (this.fragment.get('nameType') === 'Personal') {
      this.set('isReadonly', true);

      if (options.givenName && options.familyName) {
        this.fragment.set('name', options.familyName + ', ' + options.givenName);
      } else if (options.givenName) {
        this.fragment.set('name', options.givenName);
      } else if (options.familyName) {
        this.fragment.set('name', options.familyName);
      } else {
        this.fragment.set('name', '');
      }
    } else {
      this.fragment.set('givenName', null);
      this.fragment.set('familyName', null);
      this.fragment.set('affiliation', null);
      this.set('isReadonly', false);
    }
  },
  selectNameType(value) {
    this.fragment.set('nameType', value);
    this.set('nameType', value);
    if (value == "Personal") {
      this.set('isReadonly', true);
    } else {
      this.set('isReadonly', false);
    }
  },
  
  actions: {
    updateName(value) {
      this.fragment.set('name', value);
      this.set('isValidating', !!value);
      this.setIsValidating(!!value);
      this.setHasErrors(!value);
    },
    validateName() {
      this.set('isValidating', !!this.get('fragment.name'));
      this.setIsValidating(!!this.get('fragment.name'));
      this.setHasErrors(!this.get('fragment.name'));
    },
    updateGivenName(value) {
      this.fragment.set('givenName', value);
      this.joinNameParts({ givenName: value });
      this.set('isValidating', false);
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    validateGivenName() {
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    updateFamilyName(value) {
      this.fragment.set('familyName', value);
      this.joinNameParts({ familyName: value });
      this.set('isValidating', false);
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    validateFamilyName() {
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    searchOrganization(query) {
      let self = this;
      this.store.query('organization', { 'query': query, qp: 'multiMatch' }).then(function (orgs) {
        let organizations = orgs.mapBy('name');
        self.set('organizations', organizations);
        return organizations;
      });
    },
    selectOrganization(organization) {
      this.fragment.set('affiliation', organization);
      this.set('organization', organization)
      this.set('isValidating', false);
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    selectNameType(value) {
      this.selectNameType(value);
    },
    addNameIdentifier() {
      this.fragment.get('nameIdentifiers').createFragment();
    },
    deleteCreator() {
      this.model.get('creators').removeObject(this.fragment);
    },
    setIsValidating(value) {
      this.set('isValidating', value);
    },
    setHasErrors(value) {
      this.set('hasErrors', value);
    },
    setReadOnly(value) {
      this.set('isReadonly', value);
    },
    joinNameParts(options) {
      this.joinNameParts(options);
    }
  }
});

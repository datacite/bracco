import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

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
  isReadonlyNameType: false,
  isValidating: false,
  hasErrors: false,
  isReadonly: false,
  isReadonlyNameParts: false,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectNameType(this.fragment.get('nameType'));
    this.joinNameParts({});

    if (!this.fragment.get('nameIdentifiers')) {
      this.fragment.set('nameIdentifiers', []);
    }
    if (this.fragment.get('nameIdentifiers').length == 0) {
      this.fragment.get('nameIdentifiers').createFragment();
    }
    if (!this.fragment.get('affiliation')) {
      this.fragment.set('affiliation', []);
    }
    if (!isArray(this.fragment.get('affiliation'))) {
      this.fragment.set('affiliation', [this.fragment.get('affiliation')]);
    }
    if (this.fragment.get('affiliation').length == 0) {
      this.fragment.get('affiliation').pushObject(null);
    }
  },

  joinNameParts(options = {}) {
    options.givenName = options.givenName || this.fragment.get('givenName');
    options.familyName = options.familyName || this.fragment.get('familyName');

    if (options.nameIdentifierScheme === 'ORCID') {
      this.fragment.set('nameType', 'Personal')
      this.set('nameType', 'Personal')
      this.set('isReadonlyNameParts', true);
      this.set('isReadonlyNameType', true);
    } else if (options.nameIdentifierScheme === 'ROR') {
      this.fragment.set('nameType', 'Organizational')
      this.set('nameType', 'Organizational')
      this.set('isReadonlyNameType', true);
    } else {
      this.set('isReadonlyNameParts', false);
      this.set('isReadonlyNameType', false);
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
    selectNameType(value) {
      this.selectNameType(value);
    },
    addNameIdentifier() {
      this.fragment.get('nameIdentifiers').createFragment();
    },
    addAffiliation() {
      this.fragment.get('affiliation').pushObject(null);
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

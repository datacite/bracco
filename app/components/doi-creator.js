import Component from '@ember/component';
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
  errorMessage: computed('validations.messages', function () {
    if (this.get('validations.messages').length > 0) {
      return this.get('validations.messages').get('firstObject');
    } else {
      return null;
    }
  }),
  isValidating: false,
  isReadonly: false,
  showPersonal: true,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectNameType(this.fragment.get('nameType'));
    this.joinNameParts(null, null);
  },

  joinNameParts(givenName, familyName) {
    givenName = givenName || this.fragment.get('givenName');
    familyName = familyName || this.fragment.get('familyName');

    if (this.fragment.get('nameType') === 'Personal') {
      this.set('isReadonly', true);

      if (givenName && familyName) {
        this.fragment.set('name', familyName + ', ' + givenName);
      } else if (givenName) {
        this.fragment.set('name', givenName);
      } else if (familyName) {
        this.fragment.set('name', familyName);
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
      this.set('showPersonal', true);
      this.set('isReadonly', true);
    } else {
      this.set('showPersonal', false);
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
      this.joinNameParts(value, this.fragment.get('familyName'))
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
      this.joinNameParts(this.fragment.get('givenyName'), value)
      this.set('isValidating', false);
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    validateFamilyName() {
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    updateAffiliation(value) {
      this.fragment.set('affiliation', value);
      this.set('isValidating', false);
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    validateAffiliation() {
      this.setIsValidating(false);
      this.setHasErrors(false);
    },
    selectNameType(value) {
      this.selectNameType(value);
    },
    deleteCreator() {
      this.model.get('creators').removeObject(this.fragment);
    }
  }
});

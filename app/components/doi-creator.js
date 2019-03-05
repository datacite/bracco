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

  didReceiveAttrs() {
    this._super(...arguments);

    this.joinNameParts(null, null);
  },

  joinNameParts(givenName, familyName) {
    givenName = givenName || this.fragment.get('givenName');
    familyName = familyName || this.fragment.get('familyName');

    if (givenName && familyName) {
      this.fragment.set('name', familyName + ', ' + givenName);
      this.fragment.set('nameType', 'Personal');
      this.set('isReadonly', true);
    } else if (givenName) {
      this.fragment.set('name', givenName);
      this.fragment.set('nameType', 'Personal');
      this.set('isReadonly', true);
    } else if (familyName) {
      this.fragment.set('name', familyName);
      this.fragment.set('nameType', 'Personal');
      this.set('isReadonly', true);
    } else {
      this.fragment.set('name', '');
      this.fragment.set('nameType', 'Organizational');
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
    deleteCreator() {
      this.model.get('creators').removeObject(this.fragment);
    }
  }
});

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
  isValidating: false,
  isReadonly: false,
  showPersonal: true,
  organizations: [],
  organization: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('organization', this.fragment.get('affiliation'));
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
    joinNameParts(givenName, familyName) {
      this.joinNameParts(givenName, familyName);
    }
  }
});

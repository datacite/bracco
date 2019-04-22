import Component from '@ember/component';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

export default Component.extend({
  showPersonal: computed('fragment.nameType', function () {
    return this.get('fragment.nameType') === 'Personal';
  }),
  isReadonlyNameType: false,
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

    if (this.fragment.get('nameType') === "Personal") {
      this.set('isReadonly', true);
    } else {
      this.set('isReadonly', false);
    }
  },
  
  actions: {
    updateName(value) {
      this.fragment.set('name', value);
      this.setValidationClass();
    },
    updateGivenName(value) {
      this.fragment.set('givenName', value);
      this.joinNameParts({ givenName: value });
      this.setValidationClass();
    },
    updateFamilyName(value) {
      this.fragment.set('familyName', value);
      this.joinNameParts({ familyName: value });
      this.setValidationClass();
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
    setReadOnly(value) {
      this.set('isReadonly', value);
    },
    joinNameParts(options) {
      this.joinNameParts(options);
    }
  }
});

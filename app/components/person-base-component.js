import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  showPersonal: computed('fragment.nameType', function () {
    return this.fragment.nameType !== 'Organizational';
  }),
  isReadonlyNameType: false,
  isReadonly: false,
  isReadonlyNameParts: false,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectNameType(this.fragment.nameType);

    // if no givenName and familyName, and set for nameType "Personal"
    if (
      this.fragment.name &&
      this.fragment.nameType === 'Personal' &&
      (!this.fragment.givenName || this.fragment.familyName)
    ) {
      let familyName = this.fragment.name.split(',', 2)[0];
      let givenName = this.fragment.name.split(',', 2)[1];
      familyName = familyName ? familyName.trim() : null;
      givenName = givenName ? givenName.trim() : null;
      this.fragment.set('givenName', givenName);
      this.fragment.set('familyName', familyName);
    }
    this.joinNameParts({});

    if (!this.fragment.nameIdentifiers) {
      this.fragment.set('nameIdentifiers', []);
    }
    if (this.fragment.nameIdentifiers.length == 0) {
      this.fragment.nameIdentifiers.createFragment();
    }

    if (!this.fragment.affiliation) {
      this.fragment.set('affiliation', []);
    }
    if (this.fragment.affiliation.length == 0) {
      this.fragment.affiliation.createFragment();
    }
  },

  joinNameParts(options = {}) {
    if (options.nameIdentifierScheme === 'ORCID') {
      this.fragment.set('nameType', 'Personal');
      this.set('nameType', 'Personal');
      this.set('isReadonlyNameParts', true);
      this.set('isReadonlyNameType', true);
    } else if (options.nameIdentifierScheme === 'ROR') {
      this.fragment.set('nameType', 'Organizational');
      this.set('nameType', 'Organizational');
      this.set('isReadonlyNameType', true);
    } else {
      options.givenName = options.givenName || this.fragment.givenName;
      options.familyName = options.familyName || this.fragment.familyName;
      options.name = options.name || this.fragment.name;

      this.set('isReadonlyNameParts', false);
      this.set('isReadonlyNameType', false);
    }
    switch (true) {
      case this.fragment.nameType === 'Personal':
        this.set('isReadonly', true);

        this.fragment.set('givenName', options.givenName);
        this.fragment.set('familyName', options.familyName);

        if (options.givenName && options.familyName) {
          this.fragment.set(
            'name',
            options.familyName + ', ' + options.givenName
          );
        } else if (options.givenName) {
          this.fragment.set('name', options.givenName);
        } else if (options.familyName) {
          this.fragment.set('name', options.familyName);
        } else {
          this.fragment.set('name', '');
        }
        return true;
      case this.fragment.nameType === 'Organizational':
        this.fragment.set('givenName', null);
        this.fragment.set('familyName', null);
        this.fragment.set('name', options.name);
        this.set('isReadonly', false);
        return true;
      default:
        this.fragment.set('givenName', options.givenName);
        this.fragment.set('familyName', options.familyName);
        this.fragment.set('name', options.name);
        this.set('isReadonly', false);
        return true;
    }
  },
  selectNameType(value) {
    this.fragment.set('nameType', value);
    this.set('nameType', value);

    if (this.fragment.nameType === 'Personal') {
      this.set('isReadonly', true);
      this.joinNameParts();
    } else {
      this.set('isReadonly', false);
    }
  },

  actions: {
    updateName(value) {
      this.joinNameParts({ name: value });
    },
    updateGivenName(value) {
      this.joinNameParts({ givenName: value });
    },
    updateFamilyName(value) {
      this.joinNameParts({ familyName: value });
    },
    selectNameType(value) {
      this.selectNameType(value);
    },
    addNameIdentifier() {
      this.fragment.nameIdentifiers.createFragment();
    },
    addAffiliation() {
      this.fragment.affiliation.createFragment();
    },
    setReadOnly(value) {
      this.set('isReadonly', value);
    },
    joinNameParts(options) {
      this.joinNameParts(options);
    }
  }
});

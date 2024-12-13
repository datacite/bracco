// Finish conversion of this component to a @glimmer component.
import { action, computed } from '@ember/object';
import Component from '@ember/component';

export default class PersonBaseComponent extends Component {
  @computed('fragment.nameType')
  get showPersonal() {
    return this.fragment.nameType !== 'Organizational';
  }

  isReadonlyNameType = false;
  isReadonly = false;
  isReadonlyNameParts = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

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
      this.fragment.givenName = givenName;
      this.fragment.familyName = familyName;
    }
    this.joinNameParts({});

    this.selectNameType(this.fragment.nameType);
  }

  joinNameParts(options = {}) {
    if (options.nameIdentifierScheme === 'ORCID') {
      this.fragment.nameType = 'Personal';
      this.nameType = 'Personal';
      this.isReadonlyNameParts = true;
      this.isReadonlyNameType = true;
    } else if (options.nameIdentifierScheme === 'ROR') {
      this.fragment.nameType = 'Organizational';
      this.nameType = 'Organizational';
      this.isReadonlyNameType = true;
    } else {
      options.givenName = options.givenName || this.fragment.givenName;
      options.familyName =
        options.familyName || this.fragment.familyName;
      options.name = options.name || this.fragment.name;

      this.isReadonlyNameParts = false;
      this.isReadonlyNameType = false;
    }
    switch (true) {
      case this.fragment.nameType === 'Personal':
        this.isReadonly = true;

        this.fragment.givenName = options.givenName;
        this.fragment.familyName = options.familyName;

        if (options.givenName && options.familyName) {
          this.fragment.set(
            'name',
            options.familyName + ', ' + options.givenName
          );
        } else if (options.givenName) {
          this.fragment.name = options.givenName;
        } else if (options.familyName) {
          this.fragment.name = options.familyName;
        } else {
          this.fragment.name = '';
        }
        return true;
      case this.fragment.nameType === 'Organizational':
        this.fragment.name = options.name;
        this.isReadonly = false;
        return true;
      default:
        this.fragment.givenName = options.givenName;
        this.fragment.familyName = options.familyName;
        this.fragment.name = options.name;
        this.isReadonly = false;
        return true;
    }
  }

  selectNameType(value) {
    this.fragment.nameType = value;
    this.nameType = value;

    if (this.fragment.nameType === 'Personal') {
      this.isReadonly = true;
      this.joinNameParts();
    } else {
      this.isReadonly = false;
    }
  }

  @action
  updateName(value) {
    this.joinNameParts({ name: value });
  }

  @action
  updateGivenName(value) {
    this.joinNameParts({ givenName: value });
  }

  @action
  updateFamilyName(value) {
    this.joinNameParts({ familyName: value });
  }

  @action
  doSelectNameType(value) {
    this.selectNameType(value);
  }

  @action
  addNameIdentifier() {
    this.fragment.nameIdentifiers.createFragment();
  }

  @action
  addAffiliation() {
    this.fragment.affiliation.createFragment();
  }

  @action
  setReadOnly(value) {
    this.isReadonly = value;
  }

  @action
  doJoinNameParts(options) {
    this.joinNameParts(options);
  }
}

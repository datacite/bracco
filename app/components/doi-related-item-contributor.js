import Component from '@ember/component';
import { computed } from '@ember/object';
import { pascalCase } from 'pascal-case';
import humanizeString from 'humanize-string';
import { isBlank } from '@ember/utils';

const contributorTypes = [
  'ContactPerson',
  'DataCollector',
  'DataCurator',
  'DataManager',
  'Distributor',
  'Editor',
  'HostingInstitution',
  'Producer',
  'ProjectLeader',
  'ProjectManager',
  'ProjectMember',
  'RegistrationAgency',
  'RegistrationAuthority',
  'RelatedPerson',
  'Researcher',
  'ResearchGroup',
  'RightsHolder',
  'Sponsor',
  'Supervisor',
  'WorkPackageLeader',
  'Other',
];

const humanContributorTypes = contributorTypes.map(type => humanizeString(type));

const organizationalContributorTypes = [
  'HostingInstitution',
  'RegistrationAgency',
  'RegistrationAuthority',
  'ResearchGroup',
  'Distributor',
];

const personalContributorTypes = [
  'ContactPerson',
  'DataCurator',
  'Editor',
  'ProjectLeader',
  'ProjectManager',
  'ProjectMember',
  'RelatedPerson',
  'Researcher',
  'Supervisor',
  'WorkPackageLeader',
];

export default Component.extend({
  humanContributorTypes,
  humanContributorType: computed('fragment.contributorType', function() {
    return isBlank(this.get('fragment.contributorType')) ? null : humanizeString(this.get('fragment.contributorType'));
  }),
  showPersonal: computed('fragment.nameType', function() {
    return this.get('fragment.nameType') !== 'Organizational';
  }),
  isReadonlyNameType: false,
  isReadonly: false,
  isReadonlyNameParts: false,

  didReceiveAttrs() {
    this._super(...arguments);

    this.selectNameType(this.fragment.get('nameType'));

    // if no givenName and familyName, and set for nameType "Personal"
    if (this.fragment.get('name') && this.fragment.get('nameType') === 'Personal' && (!this.fragment.get('givenName') || this.fragment.get('familyName'))) {
      let familyName = this.fragment.get('name').split(',', 2)[0];
      let givenName = this.fragment.get('name').split(',', 2)[1];
      familyName = (familyName) ? familyName.trim() : null;
      givenName = (givenName) ? givenName.trim() : null;
      this.fragment.set('givenName', givenName);
      this.fragment.set('familyName', familyName);
    }
    this.joinNameParts({});
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
      options.givenName = options.givenName || this.fragment.get('givenName');
      options.familyName = options.familyName || this.fragment.get('familyName');
      options.name = options.name || this.fragment.get('name');

      this.set('isReadonlyNameParts', false);
      this.set('isReadonlyNameType', false);
    }
    switch (true) {
      case this.fragment.get('nameType') === 'Personal':
        this.set('isReadonly', true);

        this.fragment.set('givenName', options.givenName);
        this.fragment.set('familyName', options.familyName);

        if (options.givenName && options.familyName) {
          this.fragment.set('name', options.familyName + ', ' + options.givenName);
        } else if (options.givenName) {
          this.fragment.set('name', options.givenName);
        } else if (options.familyName) {
          this.fragment.set('name', options.familyName);
        } else {
          this.fragment.set('name', options.name);
        }
        return true;
      case this.fragment.get('nameType') === 'Organizational':
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

    if (this.fragment.get('nameType') === 'Personal') {
      this.set('isReadonly', true);
      this.joinNameParts();
    } else {
      this.set('isReadonly', false);
    }
  },

  selectContributorType(contributorType) {
    if (contributorType) {
      let contributorTypeId = pascalCase(contributorType);
      this.fragment.set('contributorType', contributorTypeId);
      this.set('contributorType', contributorType);

      if (organizationalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Organizational');
      }

      if (personalContributorTypes.includes(contributorTypeId)) {
        this.selectNameType('Personal');
      }

    } else {
      this.fragment.set('contributorType', null);
    }
    this.set('humanContributorTypes', humanContributorTypes);
  },

  actions: {
    updateName(value) {
      this.joinNameParts({ name: value });
    },
    selectContributorType(contributorType) {
      this.selectContributorType(contributorType);
    },
    deleteRelatedItemContributor() {
      this.creator.get('contributors').removeObject(this.fragment);
    },
  },
});

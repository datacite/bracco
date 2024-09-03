import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
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
  'Other'
];

const humanContributorTypes = contributorTypes.map((type) =>
  humanizeString(type)
);

@classic
export default class DoiRelatedItemContributor extends Component {
  humanContributorTypes = humanContributorTypes;

  @computed('fragment.contributorType')
  get humanContributorType() {
    return isBlank(this.get('fragment.contributorType'))
      ? null
      : humanizeString(this.get('fragment.contributorType'));
  }

  @computed('fragment.nameType')
  get showPersonal() {
    return this.get('fragment.nameType') !== 'Organizational';
  }

  isReadonlyNameType = false;
  isReadonly = false;
  isReadonlyNameParts = false;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
  }

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
      options.familyName =
        options.familyName || this.fragment.get('familyName');
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
          this.fragment.set(
            'name',
            options.familyName + ', ' + options.givenName
          );
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
  }

  selectContributorType(contributorType) {
    if (contributorType) {
      let contributorTypeId = pascalCase(contributorType);
      this.fragment.set('contributorType', contributorTypeId);
      this.set('contributorType', contributorType);
    } else {
      this.fragment.set('contributorType', null);
    }
    this.set('humanContributorTypes', humanContributorTypes);
  }

  @action
  updateName(value) {
    this.fragment.set('name', value);
  }

  @action
  selectContributorType(contributorType) {
    this.selectContributorType(contributorType);
  }

  @action
  deleteRelatedItemContributor() {
    this.creator.get('contributors').removeObject(this.fragment);
  }
}

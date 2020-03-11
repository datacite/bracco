import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('provider', {
  default: {
    name: 'Australian Research Data Commons',
    displayName: 'Australian Research Data Commons',
    symbol: 'ANDS',
    website: 'https://ardc.edu.au/',
    systemEmail: 'services@ardc.edu.au',
    groupEmail: null,
    description: '',
    region: 'APAC',
    country: 'AU',
    logoUrl: 'https://assets.datacite.org/images/members/ands.png?1583249855',
    memberType: 'direct_member',
    organizationType: 'nationalInstitution',
    focusArea: 'general',
    nonProfitStatus: 'non-profit',
    isActive: true,
    hasPassword: true,
    joined: '2010-02-05',
    rorId: 'https://ror.org/038sjwq14',
  },

  ands: {
    id: 'ands',
    name: 'Australian National Data Service',
    systemEmail: 'adrian.burton@ands.org.au',
  },
});

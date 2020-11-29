import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('provider', {
  ands: {
    id: 'ands',
    name: 'Australian Research Data Commons',
    displayName: 'Australian Research Data Commons',
    symbol: 'ANDS',
    website: 'https://ardc.edu.au/',
    systemEmail: 'services@ardc.edu.au',
    groupEmail: null,
    description: '',
    region: 'APAC',
    country: 'AU',
    logoUrl: 'https://datacite.org/images/members/ands.png?1583249855',
    memberType: 'direct_member',
    organizationType: 'nationalInstitution',
    focusArea: 'general',
    nonProfitStatus: 'non-profit',
    isActive: true,
    hasPassword: true,
    joined: '2010-02-05',
    rorId: 'https://ror.org/038sjwq14'
  },

  carl: {
    id: 'carl',
    name: 'Canadian Association of Research Libraries',
    displayName: 'Canadian Association of Research Libraries',
    symbol: 'CARL',
    website: '',
    systemEmail: 'portageservices@carl-abrc.ca',
    groupEmail: null,
    description: '',
    region: 'AMER',
    country: 'CA',
    logoUrl: null,
    memberType: 'consortium_organization',
    organizationType: null,
    focusArea: null,
    nonProfitStatus: 'non-profit',
    isActive: true,
    hasPassword: true,
    joined: null,
    rorId: 'https://ror.org/001tw8739'
  }
});

import FactoryGuy from 'ember-data-factory-guy';
// TODO correctly set repository symbol
FactoryGuy.define('repository', {
  default: {
    id: 'ands.centre66',
    name: 'Australian Data Archive',
    systemEmail: 'ada@anu.edu.au',
    domains: 'ada.edu.au,nesstar.ada.edu.au',
    created: '2017-09-27T14:08:02.000Z',
    updated: '2017-09-27T14:08:02.000Z',
    isActive: true,
    serviceContact: FactoryGuy.belongsTo('contact'),
    provider: FactoryGuy.belongsTo('ands')
  },
  carl: {
    id: FactoryGuy.generate((num) => `carl.frdr${num}`),
    name: 'Federated Research Data Repository',
    systemEmail: 'developers@frdr.ca',
    domains: null,
    isActive: true,
    provider: FactoryGuy.belongsTo('provider')
  }
});

FactoryGuy.define('contact', {
  default: {
    name: 'Patel, Mitesh',
    givenName: 'Mitesh',
    familyName: 'Patel',
    email: 'patel@example.org'
  }
});

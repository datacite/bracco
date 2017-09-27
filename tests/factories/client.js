import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('client', {
  default: {
    isActive: true
  },
  client: {
    id: 'ands.centre87',
    name: 'Australian Data Archive',
    contactName: 'Dr. Steven McEachern',
    contactEmail: 'ada@anu.edu.au',
    domains: 'ada.edu.au,nesstar.ada.edu.au'
  }
});

import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('client', {
  default: {
    id: FactoryGuy.generate((num)=> `ands.centre #${num}`),
    name: 'Australian Data Archive',
    contactName: 'Dr. Steven McEachern',
    contactEmail: 'ada@anu.edu.au',
    domains: 'ada.edu.au,nesstar.ada.edu.au',
    isActive: true
  }
});

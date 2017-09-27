import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('provider', {
  default: {
    isActive: true
  },

  ands: {
    id: 'ands',
    name: 'Australian National Data Service',
    contactName: 'Adrian Burton',
    contactEmail: 'adrian.burton@ands.org.au'
  }
});

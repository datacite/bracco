import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('repository', {
  default: {
    id: FactoryGuy.generate((num)=> `ands.centre #${num}`),
    name: 'Australian Data Archive',
    systemEmail: 'ada@anu.edu.au',
    domains: 'ada.edu.au,nesstar.ada.edu.au',
    isActive: true,
    provider: FactoryGuy.belongsTo('provider')
  },
});

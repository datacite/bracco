import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('repository', {
  default: {
    id: FactoryGuy.generate((num)=> `ands.centre #${num}`),
    name: 'Australian Data Archive',
    systemEmail: 'ada@anu.edu.au',
    domains: 'ada.edu.au,nesstar.ada.edu.au',
    isActive: true,
    provider: FactoryGuy.belongsTo('provider'),
  },
  carl: {
    id: FactoryGuy.generate((num)=> `carl.frdr #${num}`),
    name: 'Federated Research Data Repository',
    systemEmail: 'developers@frdr.ca',
    domains: null,
    isActive: true,
    provider: FactoryGuy.belongsTo('provider'),
  },
});

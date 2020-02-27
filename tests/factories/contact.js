import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('contact', {
  default: {
    givenName: 'John',
    familyName: 'Smith',
    email: 'john.smith@gmail.com',
  },
});
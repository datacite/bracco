import Ember from 'ember';

export function initialize(/* application */) {
  var inflector = Ember.Inflector.inflector;
  inflector.uncountable('status');
  inflector.uncountable('settings');
}

export default {
  name: 'inflector',
  initialize: initialize
};

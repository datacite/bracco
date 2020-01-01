import Inflector from 'ember-inflector';

export function initialize(/* application */) {
  const inflector = Inflector.inflector;

  inflector.uncountable('re3data');
}

export default {
  name: 'custom-inflector-rules',
  initialize,
};

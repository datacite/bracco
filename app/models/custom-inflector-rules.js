import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.uncountable('status');
inflector.uncountable('settings');
inflector.irregular('prefix', 'prefixes');

// Modules must have an export, so we just export an empty object here
export default {};
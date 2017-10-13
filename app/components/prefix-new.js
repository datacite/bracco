import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstPrefix: [
    validator('presence', true),
    validator('format', {
      regex: /^10\.\d{4,5}$/,
      message: 'Must be a valid DOI prefix'
    })
  ],
  lastPrefix: [
    validator('presence', true),
    validator('format', {
      regex: /^10\.\d{4,5}$/,
      message: 'Must be a valid DOI prefix'
    }),
    validator('number-range', true)
  ]
});

export default Ember.Component.extend(Validations, {
  store: Ember.inject.service(),

  firstPrefix: '',
  lastPrefix: '',

  addPrefixes() {
    let first = this.get('firstPrefix').split('.').get('lastObject');
    let last = this.get('lastPrefix').split('.').get('lastObject')

    while(first <= last) {
      var prefix = this.get('store').createRecord('prefix', { id: '10.' + first });
      prefix.save();

      first++;
    }
  },

  actions: {
    new() {
      
    },
    submitFirstPrefix(firstPrefix) {
      this.set('firstPrefix', firstPrefix);
    },
    submitLastPrefix(lastPrefix) {
      this.set('lastPrefix', lastPrefix);
    },
    submit() {
      this.addPrefixes()
      this.get('router').transitionTo('prefixes');
    },
    cancel() {
      this.get('router').transitionTo('prefixes');
    }
  }
});

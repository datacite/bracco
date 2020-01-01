import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';
import { A } from '@ember/array';

const Validations = buildValidations({
  firstPrefix: [
    validator('presence', true),
    validator('format', {
      regex: /^10\.\d{4,5}$/,
      message: 'Must be a valid DOI prefix',
    }),
  ],
  lastPrefix: [
    validator('presence', true),
    validator('format', {
      regex: /^10\.\d{4,5}$/,
      message: 'Must be a valid DOI prefix',
    }),
    validator('number-range', true),
  ],
});

export default Component.extend(Validations, {
  store: service(),

  firstPrefix: '',
  lastPrefix: '',

  addPrefixes() {
    let first = A(this.firstPrefix.split('.')).get('lastObject');
    let last = A(this.lastPrefix.split('.')).get('lastObject');

    while (first <= last) {
      let prefix = this.store.createRecord('prefix', { id: '10.' + first });
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
      this.addPrefixes();
      this.router.transitionTo('prefixes');
    },
    cancel() {
      this.router.transitionTo('prefixes');
    },
  },
});

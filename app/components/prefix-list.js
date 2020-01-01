import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';

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

  tagName: 'div',
  classNames: [ 'row' ],
  new: false,
  firstPrefix: '',
  lastPrefix: '',

  addPrefixes() {
    let first = this.firstPrefix.split('.').get('lastObject');
    let last = this.lastPrefix.split('.').get('lastObject');

    while (first <= last) {
      let prefix = this.store.createRecord('prefix', { id: '10.' + first });
      prefix.save();

      first++;
    }
  },
  reset() {
    this.set('firstPrefix', '');
    this.set('lastPrefix', '');
    this.set('new', false);
  },

  actions: {
    new() {
      this.set('new', true);
    },
    submitFirstPrefix(firstPrefix) {
      this.set('firstPrefix', firstPrefix);
    },
    submitLastPrefix(lastPrefix) {
      this.set('lastPrefix', lastPrefix);
    },
    submit() {
      this.addPrefixes();
      this.reset();
    },
    cancel() {
      this.reset();
    },
  },
});

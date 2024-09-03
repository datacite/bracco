import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { validator, buildValidations } from 'ember-cp-validations';
import { A } from '@ember/array';

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

@classic
export default class PrefixNew extends Component.extend(Validations) {
  @service
  store;

  @service
  prefixes;

  @service
  router;

  firstPrefix = '';
  lastPrefix = '';

  addPrefixes() {
    let first = A(this.firstPrefix.split('.')).get('lastObject');
    let last = A(this.lastPrefix.split('.')).get('lastObject');

    while (first <= last) {
      let prefix = this.store.createRecord('prefix', { id: '10.' + first });
      prefix.save();

      first++;
    }
  }

  @action
  new() {}

  @action
  submitFirstPrefixAction(firstPrefix) {
    this.set('firstPrefix', firstPrefix);
  }

  @action
  submitLastPrefixAction(lastPrefix) {
    this.set('lastPrefix', lastPrefix);
  }

  @action
  submitAction() {
    this.addPrefixes();
    this.router.transitionTo('prefixes');
  }

  @action
  cancelAction() {
    this.router.transitionTo('prefixes');
  }
}

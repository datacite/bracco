import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { fragmentArray, array } from 'ember-data-model-fragments/attributes';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'name': [
    validator('presence', {
      presence: true,
      isWarning: computed('model.model.state', 'model.model.prefix', function () {
        return (this.get('model.model.state') === 'draft' || this.get('model.model.prefix') === '10.5072');
      }),
      disabled: computed('model.model.mode', function () {
        return !["new", "edit"].includes(this.get('model.model.mode'));
      })
    })
  ]
});

export default Fragment.extend(Validations, {
  name: attr('string'),
  givenName: attr('string', { defaultValue: null }),
  familyName: attr('string', { defaultValue: null }),
  nameType: attr('string', { defaultValue: "Personal" }),
  affiliation: array(),
  nameIdentifiers: fragmentArray('name-identifier')
});

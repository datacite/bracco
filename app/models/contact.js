import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { computed } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  email: [
    validator('email-format', {
      allowBlank: true,
    }),
  ],
});

export default Fragment.extend(Validations, {
  email: DS.attr('string'),
  givenName: DS.attr('string'),
  familyName: DS.attr('string'),

  name: computed('givenName', 'familyName', function() {
    let name = null;
    if (this.givenName || this.familyName) {
      name = [ this.givenName, this.familyName ].join(' ');
    }
    return name;
  }),
});

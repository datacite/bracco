import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  'description': [
    validator('format', {
      regex: /(.+), (\d)\((\d)\), (\d)-(\d)$/,
      message: 'Series information not in recommended format of: Title, volume(issue), firstpage-lastpage',
      disabled: computed('attribute', function () {
        return this.get('model.descriptionType') != 'SeriesInformation';
      }).volatile(),
      isWarning: true
    })
  ]
});

export default Fragment.extend(Validations, {
  description: attr('string'),
  descriptionType: attr('string', { defaultValue: "Abstract" }),
  lang: attr('string', { defaultValue: null })
});

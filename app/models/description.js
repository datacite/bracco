import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { computed } from '@ember/object';

const Validations = buildValidations({
  description: [
    validator('format', {
      regex: /^([^,]+)(, \w+(\(\w+\))?, \w+(-\w+)?)?$/,
      message: 'Series information not in recommended format of series title, followed by comma and optional volume(issue), firstpage-lastpage',
      disabled: computed('model.descriptionType', function() {
        return this.model.get('descriptionType') !== 'SeriesInformation';
      }),
      isWarning: true,
    }),
  ],
});

export default Fragment.extend(Validations, {
  description: DS.attr('string', { defaultValue: null }),
  descriptionType: DS.attr('string', { defaultValue: 'Abstract' }),
  lang: DS.attr('string', { defaultValue: null }),
});

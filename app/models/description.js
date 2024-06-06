import classic from 'ember-classic-decorator';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
// import { validator, buildValidations } from 'ember-cp-validations';
// import { computed } from '@ember/object';

// const Validations = buildValidations({
//   description: [
//     validator('format', {
//       regex: /^([^,]+)(, \w+(\(\w+\))?, \w+(-\w+)?)?$/,
//       message: 'Series information not in recommended format of series title, followed by comma and optional volume(issue), firstpage-lastpage',
//       disabled: computed('model.descriptionType', function() {
//         return this.model.get('descriptionType') !== 'SeriesInformation';
//       }),
//       isWarning: true,
//     }),
//   ],
// });

@classic
export default class Description extends Fragment {
  @attr('string', { defaultValue: null })
  description;

  @attr('string', { defaultValue: 'Abstract' })
  descriptionType;

  @attr('string', { defaultValue: null })
  lang;
}

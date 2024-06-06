import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  subjectSchemeUri: [
    validator('url-format', {
      allowBlank: true,
      require_tld: false,
      message: 'Please enter a valid URL.'
    })
  ]
});

@classic
export default class Subject extends Fragment.extend(Validations) {
  @attr('string')
  subject;

  @attr('string', { defaultValue: null })
  subjectScheme;

  @attr('string', { defaultValue: null })
  schemeUri;

  @attr('string', { defaultValue: null })
  valueUri;

  @attr('string', { defaultValue: null })
  classificationCode;

  @attr('string', { defaultValue: null })
  lang;

  @computed('schemeUri')
  get subjectSchemeUri() {
    return this.schemeUri || '';
  }
}

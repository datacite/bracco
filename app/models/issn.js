import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  'issnl': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN-L is in the wrong format.'
    })
  ],
  'electronic': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN (electronic) is in the wrong format.'
    })
  ],
  'print': [
    validator('format', {
      allowBlank: true,
      regex: /^\d{4}(-)?\d{3}[0-9X]+\$/,
      message: 'ISSN (print) is in the wrong format.'
    })
  ]
});

export default Fragment.extend(Validations, {
  issnl: attr('string'),
  electronic: attr('string'),
  print: attr('string')
});

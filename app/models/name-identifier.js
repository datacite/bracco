import classic from 'ember-classic-decorator';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
// import { validator, buildValidations } from 'ember-cp-validations';

// const Validations = buildValidations({
//   nameIdentifier: [
//     validator('name-identifier', true),
//   ],
// });

@classic
export default class NameIdentifier extends Fragment {
  @attr('string')
  nameIdentifier;

  @attr('string')
  nameIdentifierScheme;

  @attr('string')
  schemeUri;
}

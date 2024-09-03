import classic from 'ember-classic-decorator';
import Model, { attr } from '@ember-data/model';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true)
});

@classic
export default class ResourceType extends Model.extend(Validations) {
  @attr('string')
  title;

  @attr('date')
  updated;
}

import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';
import { validator, buildValidations } from 'ember-cp-validations';
import { isBlank } from '@ember/utils';

const Validations = buildValidations({
  funderName: [
    validator('presence', {
      presence: true,
      message: 'Funder Name must be included if you input a funderIdentifier.',
      disabled: computed('model.{funderIdentifier,state}', function () {
        return this.model.get('state') === 'draft';
      })
    })
  ],
  awardUri: [
    validator('url-format', {
      allowBlank: true,
      message: 'Please enter a valid URI'
    })
  ]
});

@classic
export default class FundingReference extends Fragment.extend(Validations) {
  @attr('string', { defaultValue: null })
  funderName;

  @attr('string', { defaultValue: null })
  funderIdentifier;

  @attr('string', { defaultValue: null })
  funderIdentifierType;

  // schemeUri: attr('string', { defaultValue: null }),
  @attr('string', { defaultValue: null })
  awardNumber;

  @attr('string', { defaultValue: null })
  awardUri;

  @attr('string', { defaultValue: null })
  awardTitle;
}

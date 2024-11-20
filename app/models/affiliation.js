import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

export default class Affiliation extends Fragment {
  @attr('string')
  name;

  @attr('string', { defaultValue: null })
  affiliationIdentifier;

  @attr('string', { defaultValue: null })
  affiliationIdentifierScheme;

  @attr('string', { defaultValue: null })
  schemeUri;
}

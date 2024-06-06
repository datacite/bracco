import classic from 'ember-classic-decorator';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

@classic
export default class Publisher extends Fragment {
  @attr('string', { defaultValue: null })
  name;

  @attr('string', { defaultValue: null })
  lang;

  @attr('string', { defaultValue: null })
  publisherIdentifier;

  @attr('string', { defaultValue: null })
  publisherIdentifierScheme;

  @attr('string', { defaultValue: null })
  schemeUri;
}

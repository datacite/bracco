import classic from 'ember-classic-decorator';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

@classic
export default class Issn extends Fragment {
  @attr('string')
  issnl;

  @attr('string')
  electronic;

  @attr('string')
  print;
}

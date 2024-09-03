import classic from 'ember-classic-decorator';
import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

@classic
export default class Types extends Fragment {
  @attr('string')
  ris;

  @attr('string')
  bibtex;

  @attr('string')
  citeproc;

  @attr('string')
  resourceTypeGeneral;

  @attr('string')
  resourceType;

  @attr('string')
  schemaOrg;
}

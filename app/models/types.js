import { attr } from '@ember-data/model';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  ris: attr('string'),
  bibtex: attr('string'),
  citeproc: attr('string'),
  resourceTypeGeneral: attr('string'),
  resourceType: attr('string'),
  schemaOrg: attr('string')
});

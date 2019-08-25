import DS from 'ember-data';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default DS.Model.extend({
  meta: DS.attr(),

  name: DS.attr('string'),
  givenNames: DS.attr('string'),
  familyName: DS.attr('string'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),

  orcid: computed('id', function() {
    return 'https://orcid.org/' + this.get('id');
  }),
  doiCount: computed('meta.dois', function() {
    return this.get('meta.dois');
  }),
  totalDoiCount: computed('meta.dois', function() {
    return this.get('meta.dois').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  resourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes');
  }),
  totalresourceTypeCount: computed('meta.resourceTypes', function() {
    return this.get('meta.resourceTypes').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  currentDoiCount: computed('doiCount', function() {
    let currentYear = A(this.doiCount).findBy('id', 2019);
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});

import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import { A } from '@ember/array';

export default Model.extend({
  meta: attr(),

  name: attr('string'),
  givenName: attr('string'),
  familyName: attr('string'),
  createdAt: attr('date'),
  updatedAt: attr('date'),

  orcid: computed('id', function () {
    return 'https://orcid.org/' + this.id;
  }),
  doiCount: reads('meta.published'),
  totalDoiCount: computed('meta.published', function () {
    return this.get('meta.published').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  resourceTypeCount: reads('meta.resourceTypes'),
  totalResourceTypeCount: computed('meta.resourceTypes', function () {
    return this.get('meta.resourceTypes').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalCitationCount: computed('meta.citations', function () {
    return this.get('meta.citations').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalViewCount: computed('meta.views', function () {
    return this.get('meta.views').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalDownloadCount: computed('meta.downloads', function () {
    return this.get('meta.downloads').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  currentDoiCount: computed('doiCount', function () {
    let currentYear = A(this.doiCount).findBy(
      'id',
      new Date().getFullYear().toString()
    );
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  })
});

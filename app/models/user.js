import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
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
  doiCount: computed.reads('meta.published'),
  totalDoiCount: computed('meta.published', function () {
    return this.meta.published.reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  resourceTypeCount: computed.reads('meta.resourceTypes'),
  totalResourceTypeCount: computed('meta.resourceTypes', function () {
    return this.meta.resourceTypes.reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalCitationCount: computed('meta.citations', function () {
    return this.meta.citations.reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalViewCount: computed('meta.views', function () {
    return this.meta.views.reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }),
  totalDownloadCount: computed('meta.downloads', function () {
    return this.meta.downloads.reduce(function (a, b) {
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

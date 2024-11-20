import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';
import Model, { attr } from '@ember-data/model';
import { A } from '@ember/array';

export default class User extends Model {
  @attr()
  meta;

  @attr('string')
  name;

  @attr('string')
  givenName;

  @attr('string')
  familyName;

  @attr('date')
  createdAt;

  @attr('date')
  updatedAt;

  @computed('id')
  get orcid() {
    return 'https://orcid.org/' + this.id;
  }

  @reads('meta.published')
  doiCount;

  @computed('meta.published')
  get totalDoiCount() {
    return this.get('meta.published').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }

  @reads('meta.resourceTypes')
  resourceTypeCount;

  @computed('meta.resourceTypes')
  get totalResourceTypeCount() {
    return this.get('meta.resourceTypes').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }

  @computed('meta.citations')
  get totalCitationCount() {
    return this.get('meta.citations').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }

  @computed('meta.views')
  get totalViewCount() {
    return this.get('meta.views').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }

  @computed('meta.downloads')
  get totalDownloadCount() {
    return this.get('meta.downloads').reduce(function (a, b) {
      return a + b.count;
    }, 0);
  }

  @computed('doiCount')
  get currentDoiCount() {
    let currentYear = A(this.doiCount).findBy(
      'id',
      new Date().getFullYear().toString()
    );
    if (currentYear) {
      return currentYear.count;
    } else {
      return 0;
    }
  }
}

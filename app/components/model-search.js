import { notEmpty } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

const placeholders = {
  doi: 'DOI',
  contact: 'Contact',
  provider: 'Provider',
  organization: 'Organization',
  repository: 'Repository',
  prefix: 'Prefix',
  'repository-prefix': 'Prefix',
  'provider-prefix': 'Prefix'
};

export default Component.extend({
  router: service(),

  classNames: ['div'],

  hasInput: notEmpty('query'),
  hasFilters: true,
  helpText: null,
  filters: null,
  query: null,
  sort: null,
  queryParams: {},
  modelName: null,

  didReceiveAttrs() {
    this._super(...arguments);

    if (!this.model) {
      return;
    }

    this.set('query', this.model.get('query.query'));
    this.set('sort', this.model.get('query.sort'));
    this.set('filters', this.model.get('query'));

    if (this.name) {
      this.set('modelName', this.name);
    } else {
      this.set('modelName', placeholders[this.model.get('modelName')]);
    }

    if (this.modelName === 'DOI') {
      this.set('formats', {
        '-updated': 'Sort by Date Updated',
        '-created': 'Sort by Date Created',
        name: 'Sort by DOI',
        title: 'Sort Alphabetically',
        relevance: 'Sort by Relevance'
      });
    } else if (this.modelName === 'Prefix') {
      this.set('formats', {
        name: 'Sort by Prefix',
        '-created': 'Sort by Date Created'
      });
    } else {
      this.set('formats', {
        name: 'Sort by Name',
        '-created': 'Sort by Date Joined',
        relevance: 'Sort by Relevance'
      });
    }
  },

  search() {
    let params = assign(this.model.get('query'), {
      query: this.query,
      sort: this.sort
    });

    this.router.transitionTo({ queryParams: params });
  },

  actions: {
    doSearch(query) {
      if (query) {
        this.set('sort', 'relevance');
      } else if (this.sort === 'relevance') {
        this.set('sort', null);
      }

      this.set('query', query);
      this.search();
    },
    clear() {
      this.set('query', null);
      this.set('sort', null);
      this.search();
    },
    selectMetadata(metadata) {
      this.showMetadata(metadata);
    },
    sort(sort) {
      this.set('sort', sort);
      this.search();
    }
  }
});

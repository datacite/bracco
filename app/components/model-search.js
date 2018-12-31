import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Component.extend(RouteMixin, {
  classNames: ['div'],

  hasInput: notEmpty('query'),
  hasFilters: true,
  helpText: null,
  filters: null,
  query: null,
  sort: null,
  queryParams: {},

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.model.get('otherParams.query'));
    this.set('sort', this.model.get('otherParams.sort'));
    this.set('filters', this.model.get('otherParams'));
  },

  search() {
    let params = Object.assign(this.model.get('otherParams'), { query: this.query, sort: this.sort });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "totalPages" };

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
  },

  didInsertElement() {
    let placeholders = { 'doi': 'DOI',
                         'provider': 'Provider',
                         'client': 'Client',
                         'prefix': 'Prefix',
                         'client-prefix': 'Prefix',
                         'provider-prefix': 'Prefix' }
    this.set('modelName', placeholders[this.model.get("modelName")]);

    if (this.model.get("modelName") === "doi") {
      this.set('formats', { '-created': 'Sort by Date Created', 'name': 'Sort by DOI', 'relevance': 'Sort by Relevance' });
    } else if (['prefix', 'provider-prefix', 'client-prefix'].includes(this.model.get("modelName"))) {
      this.set('formats', { 'name': 'Sort by Prefix', '-created': 'Sort by Date Created' });
    } else {
      this.set('formats', { 'name': 'Sort by Name', '-created': 'Sort by Date Joined', 'relevance': 'Sort by Relevance' });
    }
  }
});

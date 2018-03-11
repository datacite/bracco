import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Component.extend(RouteMixin, {
  classNames: ['div'],

  hasInput: Ember.computed.notEmpty('query'),
  helpText: null,
  query: null,
  sort: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('query', this.get('model').get('otherParams.query'));
    this.set('sort', this.get('model').get('otherParams.sort'));
  },

  search() {
    let params = Object.assign(this.get('model').get('otherParams'), { query: this.get('query'), sort: this.get('sort') });

    params.paramMapping = { page: "page[number]",
                            perPage: "page[size]",
                            total_pages: "total-pages" };

    this.get('router').transitionTo({ queryParams: params });
  },

  actions: {
    doSearch(query) {
      this.set('query', query);
      this.search();
    },
    clear() {
      this.set('query', null);
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
    this.set('modelName', placeholders[this.get('model').get("modelName")]);

    if (this.get('model').get("modelName") === "doi") {
      this.set('formats', { '-created': 'Sort by Date Registered', 'name': 'Sort by Name' });
      this.set('helpText', 'Search for (exact) DOI.');
    } else if (['prefix', 'provider-prefix', 'client-prefix'].includes(this.get('model').get("modelName"))) {
      this.set('formats', { '-created': 'Sort by Date Created', 'name': 'Sort by Name' });
    } else {
      this.set('formats', { 'name': 'Sort by Name', '-created': 'Sort by Date Joined' });
    }
  }
});

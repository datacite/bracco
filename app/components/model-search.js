// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import { notEmpty } from '@ember/object/computed';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

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

@classNames('div')
export default class ModelSearch extends Component {
  @service
  router;

  @notEmpty('query')
  hasInput;

  hasFilters = true;
  helpText = null;
  filters = null;
  @tracked query = null;
  sort = null;
  queryParams = {};
  modelName = null;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    if (!this.model) {
      return;
    }

    this.query = this.model.query.query;
    this.sort = this.model.query.sort;
    this.filters = this.model.query;

    if (this.name) {
      this.modelName = this.name;
    } else {
      this.modelName = placeholders[this.model.modelName];
    }

    if (this.modelName === 'DOI') {
      this.formats = {
        '-updated': 'Sort by Date Updated',
        '-created': 'Sort by Date Created',
        name: 'Sort by DOI',
        title: 'Sort Alphabetically',
        relevance: 'Sort by Relevance'
      };
    } else if (this.modelName === 'Prefix') {
      this.formats = {
        name: 'Sort by Prefix',
        '-created': 'Sort by Date Created'
      };
    } else {
      this.formats = {
        name: 'Sort by Name',
        '-created': 'Sort by Date Joined',
        relevance: 'Sort by Relevance'
      };
    }
  }

  search() {
    let params = Object.assign(this.model.query, {
      query: this.query,
      sort: this.sort
    });

    this.router.transitionTo({ queryParams: params });
  }

  @action
  doSearch(query) {
    if (query) {
      this.sort = 'relevance';
    } else if (this.sort === 'relevance') {
      this.sort = null;
    }
    
    this.query = query;
    this.search();
  }

  @action
  clear() {
    this.query = null;
    this.sort = null;
    this.search();
  }

  @action
  selectMetadata(metadata) {
    this.showMetadata(metadata);
  }

  @action
  sort(sort) {
    this.sort = sort;
    this.search();
  }
}

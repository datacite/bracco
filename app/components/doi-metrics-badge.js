import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: 'div',
  classNames: [ 'panel-footer' ],
  data: null,
  citations: 0,
  views: 0,
  downloads: 0,
  label: '',
  metrics: [],
  store: service(),
  hasUsage: computed('views','downloads', function() {
    return ((this.model.views + this.model.downloads) > 0) ?  true  : false;
  }),
  hasMetrics: computed('citations','views','downloads', function() {
    return ((this.model.views + this.model.downloads + this.model.citations) > 0) ?  true  : false;
  }),

  init() {
    this._super();
  },

  didReceiveAttrs() {
    this._super(...arguments);

    this.passMetrics();
  },
  passMetrics() {
    let self = this;
    self.set('citations' , this.model.citations);
    self.set('views',(this.model.views));
    self.set('downloads',(this.model.downloads));
  },
});

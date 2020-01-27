import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  classNames: [ 'panel-body' ],
  isList: false,
  citations: 0,
  views: 0,
  downloads: 0,
  store: service(),
  hasUsage: computed('views','downloads', function() {
    return ((this.views + this.downloads) > 0) ?  true  : false;
  }),
  hasMetrics: computed('views','downloads','citations',function() {
    return ((this.views + this.downloads + this.citations) > 0) ?  true  : false;
  }),
  didReceiveAttrs() {
    this._super(...arguments);

    this.passMetrics();
  },
  passMetrics() {
    let self = this;
    self.set('citations' , this.model.citations || 0);
    self.set('views', this.model.views || 0);
    self.set('downloads',this.model.downloads || 0);
  },
});

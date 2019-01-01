import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  currentPage: computed.alias("model.meta.page"),
  totalPages: computed.alias("model.meta.totalPages"),
  hasPages: computed.gt('totalPages', 1),
  truncatePages: true,
  numPagesToShow: 25,
  pageItems: [{ dots: true}, { current: true }],

  canStepForward: computed("currentPage", "totalPages", function() {
    const page = Number(this.get("currentPage"));
    const totalPages = Number(this.get("totalPages"));
    return page < totalPages;
  }),

  canStepBackward: computed("currentPage", function() {
    const page = Number(this.get("currentPage"));
    return page > 1;
  }),

  actions: {
    pageClicked: function(number) {
      this.set("currentPage", number);
      this.sendAction('action',number);
    },
    incrementPage: function(num) {
      const currentPage = Number(this.get("currentPage")),
           totalPages = Number(this.get("totalPages"));

      if(currentPage === totalPages && num === 1) { return false; }
      if(currentPage <= 1 && num === -1) { return false; }
      this.incrementProperty('currentPage', num);

      const newPage = this.get('currentPage');
      this.sendAction('action',newPage);
    }
  }
});

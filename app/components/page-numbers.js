import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  currentPage: computed.alias("model.meta.page"),
  totalPages: computed.alias("model.meta.totalPages"),

  pageItems: computed("currentPage","totalPages", function() {
    const page = Number(this.get("currentPage"));
    const totalPages = Number(this.get("totalPages"));

    return Array.from(Array(totalPages).keys()).reduce(function (sum, i) {
      if (i < 2 || (i > (page - 4) && i < (page + 2)) || i > (totalPages - 3)) {
        let item = { page: i + 1, current: page == i + 1 };
        sum.pushObject(item);
      } else if (i == page - 4 || i == page + 2) {
        let item = { dots: true };
        sum.pushObject(item);
      }
      return sum;
    }, []);
  }),

  nextPage: computed("currentPage", "totalPages", function() {
    const page = Number(this.get("currentPage"));
    const totalPages = Number(this.get("totalPages"));
    if (page < totalPages) {
      return page + 1;
    } else {
      return null;
    }
  }),

  previousPage: computed("currentPage", function() {
    const page = Number(this.get("currentPage"));
    if (page > 1) {
      return page - 1;
    } else {
      return null;
    }
  })
});

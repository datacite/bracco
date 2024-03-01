import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Component.extend({
  currentPage: alias('model.meta.page'),
  totalPages: alias('model.meta.totalPages'),

  pageItems: computed('currentPage', 'totalPages', function () {
    const page = Number(this.currentPage || 1);
    const totalPages = Number(this.totalPages || 1);

    return Array.from(Array(totalPages).keys()).reduce(function (sum, i) {
      if (i < 2 || (i > page - 4 && i < page + 2) || i > totalPages - 3) {
        let item = { page: i + 1, current: page == i + 1 };
        A(sum).pushObject(item);
      } else if (i == page - 4 || i == page + 2) {
        let item = { dots: true };
        A(sum).pushObject(item);
      }
      return sum;
    }, []);
  }),

  nextPage: computed('currentPage', 'totalPages', function () {
    const page = Number(this.currentPage || 1);
    const totalPages = Number(this.totalPages || 1);
    if (page < totalPages) {
      return page + 1;
    } else {
      return null;
    }
  }),

  previousPage: computed('currentPage', function () {
    const page = Number(this.currentPage || 1);
    if (page > 1) {
      return page - 1;
    } else {
      return null;
    }
  })
});

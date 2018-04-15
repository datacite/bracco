import Component from '@ember/component';
import moment from 'moment';

const yearList = Array.from(new Array(25), (x,i) => i + 1995);

export default Component.extend({
  yearList,
  years: [],

  didReceiveAttrs() {
    this._super(...arguments);

    var timestamp = new Date(Date.parse(this.get('model').get('published')));
    let published = moment(timestamp).utc().format('Y');
    this.get('model').set('published', published);
    this.set('years', yearList);
  },

  searchPublished(query) {
    var years = yearList.filter(function(year) {
      return year.toString().startsWith(query);
    })
    this.set('years', years);
  },
  selectPublished(published) {
    this.get('model').set('published', published);
  },

  actions: {
    searchPublished(query) {
      this.searchPublished(query);
    },
    selectPublished(published) {
      this.selectPublished(published);
    }
  }
});

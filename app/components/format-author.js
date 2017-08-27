import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: ['author'],

  didInsertElement: function() {
    let authors = this.get('authors').map(function(a) {
      let name = a.literal || [a.given, a.family].join(" ");
      if (a.orcid) {
        return { name: name, orcid: a.orcid };
      } else {
        return { name: name};
      }
    });

    if (authors.length < 25) { authors = authors.slice(0, 24); }
    this.set('authors', authors);
  }
});

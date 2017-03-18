import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      links: Ember.$.getJSON("https://assets.datacite.org/data/links.json")
    });
  }
});

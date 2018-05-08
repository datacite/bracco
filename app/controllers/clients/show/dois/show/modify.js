import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  store: service(),

  setEvent(stateChange) {
    if (stateChange[1] === 'draft') {
      return 'start';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'registered') {
      return 'register';
    } else if (stateChange[0] === 'draft' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'registered' && stateChange[1] === 'findable') {
      return 'publish';
    } else if (stateChange[0] === 'findable' && stateChange[1] === 'registered') {
      return 'hide';
    }
  },

  actions: {
    submit(doi) {
      // change state via event if there is a change
      let stateChange = doi.changedAttributes().state;
      if (typeof stateChange !== 'undefined') {
        doi.set('event', this.setEvent(stateChange));
      }

      // set individual attributes to null so that they don't overwrite what is in the xml attribute
      doi.set('author', null);
      doi.set('title', null);
      doi.set('publisher', null);
      doi.set('published', null);
      doi.set('resourceTypeSubtype', null);
      doi.set('resource-type', null);
      doi.set('description', null);
    
      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client.id'), doi);
      });
    },
    cancel() {
      this.get('model').rollbackAttributes();
      this.transitionToRoute('clients.show.dois.show', this.get('model').get('client.id'), this.get('model'));
    }
  }
});
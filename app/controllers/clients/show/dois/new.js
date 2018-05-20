import Ember from 'ember';

export default Ember.Controller.extend({
  setEvent(state) {
    if (state === 'draft') {
      return 'start';
    } else if (state === 'registered') {
      return 'register';
    } else if (state === 'findable') {
      return 'publish';
    }
  },

  actions: {
    submit(doi) {
      doi.set('event', this.setEvent(doi.get('state')));

      //convert authors back into array, and then to JSON
      let authorList = doi.get('author').split("\n").map(function(a) { return { name: a } });
      doi.set('author', JSON.stringify(authorList));

      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function(reason){
        Ember.Logger.assert(false, reason);
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois', this.get('model.client.id'));
    }
  }
});
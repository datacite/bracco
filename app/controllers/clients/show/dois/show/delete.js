import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  store: service(),

  client: null,

  actions: {
    destroy() {
      this.set('client', this.get('model').get('client'));
      let self = this;
      this.get('store').findRecord("doi", this.get('model').get('id'), { backgroundReload: false }).then(function(doi) {
        doi.destroyRecord().then(function () {
          self.transitionToRoute('clients.show.dois', self.get('client'));
        });
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois.show', this.get('model').get('client.id'), this.get('model'));
    }
  }
});
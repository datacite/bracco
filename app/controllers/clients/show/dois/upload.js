import Controller from '@ember/controller';

export default Controller.extend({
  setEvent(state) {
    if (state === 'registered') {
      return 'register';
    } else if (state === 'findable') {
      return 'publish';
    } else {
      return null;
    }
  },

  actions: {
    submit(doi) {
      doi.set('event', this.setEvent(doi.get('state')));

      doi.set('titles', null);
      doi.set('descriptions', null);
      doi.set('types', null);
      doi.set('creators', null);
      doi.set('rightsList', null);

      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois', this.get('model.client.id'));
    }
  }
});

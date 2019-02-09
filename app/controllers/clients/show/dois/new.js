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

      // convert title and description back into array
      if (doi.get('titles')) {
        doi.set('titles', [{ title: doi.get('titles') }]);
      }
      if (doi.get('descriptions')) {
        doi.set('descriptions', [{ description: doi.get('descriptions'), descriptionType: 'Abstract' }]);
      }

      doi.set("source", "fabricaForm");

      let self = this;
      doi.save().then(function (doi) {
        self.transitionToRoute('clients.show.dois.show', doi.get('client').get('id'), doi);
      }).catch(function (reason) {
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
        self.get('flashMessages').warning('This DOI name already exists. Please use a different DOI name.', {componentName: 'duplicated-doi'});
      });
    },
    cancel() {
      this.transitionToRoute('clients.show.dois', this.get('model.client.id'));
    }
  }
});

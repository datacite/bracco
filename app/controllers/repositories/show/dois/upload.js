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

      let self = this;
      doi.save().then(function(doi) {
        self.transitionToRoute('dois.show', doi);
      }).catch(function(reason){
        if (console.debug) {
          console.debug(reason);
        } else {
          console.log(reason);
        }
      });
    },
    cancel() {
      this.transitionToRoute('repositories.show.dois', this.get('model.repository.id'));
    }
  }
});

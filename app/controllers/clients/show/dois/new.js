import Controller from '@ember/controller';
import Ember from 'ember';

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

      // convert creators back into array, and then to JSON
      let creatorList = doi.get('creators').split("\n").reduce(function (sum, a) {
        if (a.length > 0) {
          let names = a.split(",")
          let creator = {}
          if (names.length > 1) {
            creator = {familyName: names[0].trim(), givenName: names[1].trim()};
          } else {
            creator = { name: a };
          }
          sum.pushObject(creator);
        }
        return sum;
      }, []);
      doi.set('creators', creatorList);

      // convert title and description back into array
      if (doi.get('titles')) {
        doi.set('titles', [{ title: doi.get('titles') }]);
      }
      if (doi.get('descriptions')) {
        doi.set('descriptions', [{ description: doi.get('descriptions'), descriptionType: 'Abstract' }]);
      }
      
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

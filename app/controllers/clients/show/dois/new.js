import Ember from 'ember';

export default Ember.Controller.extend({
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
      let creatorList = doi.get('creator').split("\n").reduce(function (sum, a) {
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
      doi.set('creator', creatorList);

      // convert title and description back into array
      doi.set('titles', [{ title: doi.get('title') }]);
      doi.set('descriptions', [{ description: doi.get('description'), descriptionType: 'Abstract' }]);

      // generate types object
      doi.set('types'), { resourceTypeGeneral: doi.get('resourceTypeGeneral'), resourceType: doi.get('resourceType') }

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

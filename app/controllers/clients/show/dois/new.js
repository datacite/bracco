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

      //convert authors back into array, and then to JSON
      let authorList = doi.get('author').split("\n").reduce(function (sum, a) {
        if (a.length > 0) {
          let names = a.split(",")
          let author = {}
          if (names.length > 1) {
            author = {familyName: names[0].trim(), givenName: names[1].trim()};
          } else {
            author = { name: a };
          }
          sum.pushObject(author);
        }
        return sum;
      }, []);
      doi.set('author', authorList);

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

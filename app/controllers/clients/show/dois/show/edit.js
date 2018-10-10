import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  store: service(),

  setEvent(stateChange) {
    if (stateChange[0] === 'draft' && stateChange[1] === 'registered') {
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

      // schema-version will be determined by API
      doi.set('schemaVersion', null);

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
        self.transitionToRoute('clients.show.dois.show', doi.get('client.id'), doi);
      });
    },
    cancel() {
      this.get('model').rollbackAttributes();
      this.transitionToRoute('clients.show.dois.show', this.get('model').get('client.id'), this.get('model'));
    }
  }
});

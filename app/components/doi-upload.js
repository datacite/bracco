import Ember from 'ember';
const { service } = Ember.inject;

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

export default Ember.Component.extend({
  currentUser: service(),
  store: service(),

  stateList,
  states: null,
  state: null,

  didReceiveAttrs() {
    this._super(...arguments);

    this.get('model').set('confirmDoi', this.get('model').get('doi'));
    this.setStates(this.get('model').get('state'));
  },

  setStates(state) {
    // test prefix uses only draft state
    if (this.get('model').get('prefix') === '10.5072') {
      this.set('states', ['draft']);
      this.get('model').set('state', 'draft');
    } else {
      this.set('states', stateList[state]);
    }
  },
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
  b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  },

  actions: {
    selectState(state) {
      this.get('model').set('state', state);
    },
    didSelectFiles(files, resetInput) {
      var reader = new FileReader();
      let self = this;
      reader.onload = function(e) {
        var data = e.target.result;
        var xml = self.b64DecodeUnicode(data.split(",")[1]);
        self.get('model').set('xml', xml);
      }
      reader.readAsDataURL(files[0]);

      resetInput();
    },
    submit(doi) {
      // change state via event if there is a change
      let stateChange = doi.changedAttributes().state;
      if (typeof stateChange !== 'undefined') {
        doi.set('event', this.setEvent(stateChange));
      }

      let self = this;
      doi.save().then(function() {
        self.get('router').transitionTo('dois.show.index', self.get('model'));
      });
    },
    cancel() {
      this.get('router').transitionTo('dois.show.index', this.get('model'));
    }
  }
});
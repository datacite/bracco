import Ember from 'ember';
const { service } = Ember.inject;

const stateList = {
  undetermined: ['undetermined', 'registered', 'findable'],
  draft: ['draft', 'registered', 'findable'],
  registered: ['registered', 'findable'],
  findable: ['registered', 'findable']
}

const yearList = Array.from(new Array(50), (x,i) => i + 1970);

export default Ember.Controller.extend({
  store: service(),

  client: null,

  init: function () {
    this._super(...arguments);

    //this.get('model').set('confirmDoi', this.get('model').get('doi'));

    // var timestamp = new Date(Date.parse(this.get('model').get('published')));
    // let published = moment(timestamp).utc().format('Y');
    // this.get('model').set('published', published);

    // this.setStates(this.get('model').get('state'));
    // this.searchResourceType(null);
    // this.searchPublished(null);
    // this.set('years', yearList);
  },

  searchPublished(query) {
    var years = yearList.filter(function(year) {
      return year.toString().startsWith(query);
    })
    this.set('years', years);
  },
  selectPublished(published) {
    this.get('doi').set('published', published);
  },
  searchResourceType(query) {
    this.set('resourceTypes', this.get('store').query('resource-type', { 'query': query, sort: 'name', 'page[size]': 100 }));
  },
  selectResourceType(resourceType) {
    this.set('resourceType', resourceType)
    this.get('doi').set('resource-type', resourceType);
  },
  setStates(state) {
    // test prefix uses only draft state
    if (this.get('doi').get('prefix') === '10.5072') {
      this.set('states', ['draft']);
      this.get('doi').set('state', 'draft');
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
    searchPublished(query) {
      this.searchPublished(query);
    },
    selectPublished(published) {
      this.selectPublished(published);
    },
    selectResourceType(resourceType) {
      this.selectResourceType(resourceType);
    },
    searchResourceType(query) {
      this.searchResourceType(query);
    },
    selectState(state) {
      this.get('doi').set('state', state);
    },
    didSelectFiles(files, resetInput) {
      var reader = new FileReader();
      let self = this;
      reader.onload = function(e) {
        var data = e.target.result;
        var xml = self.b64DecodeUnicode(data.split(",")[1]);
        self.get('doi').set('xml', xml);

        self.get('doi').set('creator', null);
        self.get('doi').set('title', null);
        self.get('doi').set('publisher', null);
        self.get('doi').set('published', null);
        self.get('doi').set('resourceType', null);
        self.get('doi').set('resourceTypeSubtype', null);
        self.get('doi').set('description', null);
        self.get('doi').set('license', null);
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
      doi.save().then(function(doi) {
        self.transitionToRoute('dois.show.index', doi);
      });
    },
    cancel() {
      this.transitionToRoute('dois.show.index', this.get('model'));
    }
  }
});
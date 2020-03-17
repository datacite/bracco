import Component from '@ember/component';


export default Component.extend({


  actions: {
    updateIdentifier(value) {
      this.fragment.set('identifier', value);
    },
    updateIdentifierType(value) {
      this.fragment.set('identifierType', value);
    },
    deleteIdentifier() {
      this.model.get('identifiers').removeObject(this.fragment);
    },
  },
});

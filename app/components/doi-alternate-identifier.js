import Component from '@ember/component';


export default Component.extend({


  actions: {
    updateIdentifier(value) {
      this.fragment.set('identifier', value);
      // this.setValidationClass();
    },
    updateIdentifierType(value) {
      this.fragment.set('identifierType', value);
      // this.setValidationClass();
    },
    deleteIdentifier() {
      this.model.get('identifiers').removeObject(this.fragment);
    },
    selectIdentifierType(identifierType) {
      this.fragment.set('identifierType', identifierType);
    },
  },
});

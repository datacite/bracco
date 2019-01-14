import Component from '@ember/component';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.model.get("source") == "fabricaForm") {
      this.set('metadataFieldsDisabled', false);
    } else {
      this.set('metadataFieldsDisabled', true);
    }
  }

});

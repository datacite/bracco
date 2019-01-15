import Component from '@ember/component';

export default Component.extend({

  didReceiveAttrs() {
    this._super(...arguments);

    this.set('metadataFieldsDisabled', true);
    if (this.model.get("source") == "fabricaForm") {
      this.set('metadataFieldsDisabled', false);
    }
  }

});

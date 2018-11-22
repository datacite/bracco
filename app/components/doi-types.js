import Component from '@ember/component';
const resourceTypeGeneralList = [
  'Audiovisual',
  'Collection',
  'DataPaper',
  'Dataset',
  'Event',
  'Image',
  'InteractiveResource',
  'Model',
  'PhysicalObject',
  'Service',
  'Software',
  'Sound',
  'Text',
  'Workflow',
  'Other'
]

export default Component.extend({
  resourceTypeGeneralList,
  resourceTypesGeneral: resourceTypeGeneralList,

  didReceiveAttrs() {
    this._super(...arguments);

    if (this.get('model').get('types')) {
      this.get('model').set('resourceType', this.get('model').get('types').resourceType);
      this.get('model').set('resourceTypeGeneral', this.get('model').get('types').resourceTypeGeneral);
    }
  },

  searchResourceTypeGeneral(query) {
    var resourceTypesGeneral = resourceTypeGeneralList.filter(function(resourceTypeGeneral) {
      return resourceTypeGeneral.startsWith(query.toLowerCase());
    })
  },
  selectResourceTypeGeneral(resourceTypeGeneral) {
    this.get('model').set('resourceTypeGeneral', resourceTypeGeneral);
    this.set('resourceTypesGeneral', resourceTypeGeneralList);
  },

  actions: {
    selectResourceTypeGeneral(resourceTypeGeneral) {
      this.selectResourceTypeGeneral(resourceTypeGeneral);
    },
    searchResourceTypeGeneral(query) {
      this.searchResourceTypeGeneral(query);
    }
  }
});
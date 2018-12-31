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

  searchResourceTypeGeneral(query) {
    this.resourceTypesGeneral = resourceTypeGeneralList.filter(function(resourceTypeGeneral) {
      return resourceTypeGeneral.startsWith(query.toLowerCase());
    })
  },
  selectResourceTypeGeneral(resourceTypeGeneral) {
    this.model.set('types', { 'resourceTypeGeneral': resourceTypeGeneral });
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
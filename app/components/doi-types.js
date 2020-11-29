import Component from '@ember/component';
import { pascalCase } from 'pascal-case';

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
];

export default Component.extend({
  resourceTypeGeneralList,
  resourceTypesGeneral: resourceTypeGeneralList,

  selectResourceTypeGeneral(resourceTypeGeneral) {
    this.model.set('types', {
      resourceTypeGeneral: pascalCase(resourceTypeGeneral)
    });
    this.set('resourceTypesGeneral', resourceTypeGeneralList);
  },

  actions: {
    selectResourceTypeGeneral(resourceTypeGeneral) {
      this.selectResourceTypeGeneral(resourceTypeGeneral);
    }
  }
});

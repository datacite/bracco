import Component from '@ember/component';
import { pascalCase } from 'pascal-case';

const resourceTypeGeneralList = [
  'Audiovisual',
  'Book',
  'BookChapter',
  'Collection',
  'ComputationalNotebook',
  'ConferencePaper',
  'ConferenceProceeding',
  'DataPaper',
  'Dataset',
  'Dissertation',
  'Event',
  'Image',
  'Instrument',
  'InteractiveResource',
  'Journal',
  'JournalArticle',
  'Model',
  'OutputManagementPlan',
  'PeerReview',
  'PhysicalObject',
  'Preprint',
  'Report',
  'Service',
  'Software',
  'Sound',
  'Standard',
  'StudyRegistration', 
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

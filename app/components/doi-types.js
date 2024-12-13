// Finish conversion of this component to a @glimmer component.
import { action } from '@ember/object';
import Component from '@ember/component';
import { pascalCase } from 'pascal-case';
import { tracked } from '@glimmer/tracking';

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

export default class DoiTypes extends Component {
  resourceTypeGeneralList = resourceTypeGeneralList;
  resourceTypesGeneral = resourceTypeGeneralList;

  selectResourceTypeGeneral(resourceTypeGeneral) {
    this.model.types = {
      resourceTypeGeneral: pascalCase(resourceTypeGeneral)
    };
    this.resourceTypesGeneral = resourceTypeGeneralList;
  }

  @action
  selectResourceTypeGeneralAction(resourceTypeGeneral) {
    this.selectResourceTypeGeneral(resourceTypeGeneral);
  }
}

import Component from '@ember/component';
import { pascalCase } from 'pascal-case';
import { RESOURCE_TYPE_GENERAL_LIST } from '../constants/resource-type-general-list';

const resourceTypeGeneralList = RESOURCE_TYPE_GENERAL_LIST

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

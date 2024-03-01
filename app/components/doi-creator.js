import PersonBaseComponent from './person-base-component';

export default PersonBaseComponent.extend({
  actions: {
    deleteCreator() {
      this.model.get('creators').removeObject(this.fragment);
    }
  }
});

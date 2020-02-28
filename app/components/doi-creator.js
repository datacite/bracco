import PersonBaseComponent from '../components/person';

export default PersonBaseComponent.extend({
  actions: {
    deleteCreator() {
      this.model.get('creators').removeObject(this.fragment);
    },
  },
});

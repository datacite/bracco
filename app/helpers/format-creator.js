import Ember from 'ember';

export function formatCreator([creators]) {
  let creatorList = creators.map(function(a) {
    let name = (a.familyName) ? [a.givenName, a.familyName]].join(" ") : a.name;
    return a.id ? '<a href="' + a.id + '">' + name + '</a>' : name
  });

  switch(true) {
    case (creatorList.length < 3):
      return creatorList.join(" & ")
    case (creatorList.length < 25):
      return creatorList.slice(0, -1).join(", ") + ' & ' + creatorList[creatorList.length - 1];
    default:
      return creatorList.slice(0, 24).join(", ") + ' … & ' + creatorList[creatorList.length - 1];
  }
}

export default Ember.Helper.helper(formatCreator);

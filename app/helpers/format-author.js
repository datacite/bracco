import Ember from 'ember';

export function formatAuthor([authors]) {
  let authorList = authors.map(function(a) {
    let name = a.literal || [a.given, a.family].join(" ");
    return a.orcid ? '<a href="' + a.orcid + '">' + name + '</a>' : name
  });

  switch(true) {
    case (authorList.length < 3):
      return authorList.join(" & ")
    case (authorList.length < 25):
      return authorList.slice(0, -1).join(", ") + ' … & ' + authorList[authorList.length - 1];
    default:
      return authorList.slice(0, 24).join(", ") + ' … & ' + authorList[authorList.length - 1];
  }
}

export default Ember.Helper.helper(formatAuthor);

import Ember from 'ember';

export function formatAuthor([authors]) {
  // turn single author object into an array
  if (!Array.isArray(authors)) { authors = [authors]; }

  let authorList = authors.map(function(a) {
    let name = (a.familyName) ? [a.givenName, a.familyName].join(" ") : a.name;
    return a.id ? '<a href="/users/' + a.id.split('/').pop() + '">' + name + '</a>' : name
  });

  switch(true) {
    case (authorList.length < 3):
      return authorList.join(" & ")
    case (authorList.length == 3):
        return authorList.slice(0, -1).join(", ") + ' & ' + authorList[authorList.length - 1];
    case (authorList.length < 25):
      return authorList.slice(0, -1).join(", ") + ' … & ' + authorList[authorList.length - 1];
    default:
      return authorList.slice(0, 24).join(", ") + ' … & ' + authorList[authorList.length - 1];
  }
}

export default Ember.Helper.helper(formatAuthor);

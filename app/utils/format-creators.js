export default function formatCreators(creators, hash) {
  let limit = creators.length;

  if (hash.showOnly) {
    limit = hash.showOnly;
  }

  let names = [];
  let name;

  creators.forEach((element, index, array) => {
    name = '';

    if (element.givenName && element.familyName) {
      name = element.givenName + ' ' + element.familyName;
    } else if (element.familyName) {
      name = element.familyName;
    } else if (element.givenName) {
      name = element.givenName;
    } else if (element.name) {
      name = element.name;
    } else {
      name = '';
    }

    if (name) {
      names.push(name);
    }
  });

  let ret = '';

  names.forEach((element, index, array) => {
    if (limit > index + 2) {
      ret = ret + element + ', ';
    } else if (limit > index + 1) {
      ret = ret + element + ' & ';
    } else {
      ret = ret + element;
    }
  });

  return ret;
}

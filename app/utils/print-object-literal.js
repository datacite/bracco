export default function printObjectLiteral(obj) {
  let result = '{';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += key + ': ';
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result += printObjectLiteral(obj[key]);
      } else if (typeof obj[key] === 'string') {
        result += '"' + obj[key] + '"';
      } else {
        result += obj[key];
      }
      result += ', ';
    }
  }
  if (result.length > 1) {
    result = result.slice(0, -2);
  }
  result += '}';
  return result;
}

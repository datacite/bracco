import { helper as buildHelper } from '@ember/component/helper';

export function settingsRoute(route) {
  if (route == "index") {return "settings";}
  return route + '.settings';
}

export default buildHelper(settingsRoute);

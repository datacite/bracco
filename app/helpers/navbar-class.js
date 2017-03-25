import Ember from 'ember';

export function navbarClass(params) {
  var navbarClassName = (params[0] === "index") ? "navbar-ct-transparent" : "navbar-default"
  return "navbar " + navbarClassName + " " + " navbar-static-top";
}

export default Ember.Helper.helper(navbarClass);

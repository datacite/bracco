export default function isAbleTo(self = null) {
  let ret = false;

  if (self) {
    if (self.get('currentUser.role_id') === 'consortium_admin') {
      if (
        self.get('model.provider.id') === undefined && 
        self.get('model.provider.consortium.id') === undefined
      ) {
        // 'this.get('model.provider. ...') === undefined' -  Happens only on contact deletion 
        //  as the result of destroyRecord which destroys the contact/provider relationship.
        ret = true;
      } else {
        ret =
        (self.get('model.provider.memberType') === 'consortium_organization' &&
          self.get('currentUser.provider_id') ===
            self.get('model.provider.consortium.id')) ||
        (self.get('model.provider.memberType') === 'consortium' &&
          self.get('currentUser.provider_id') ===
            self.get('model.provider.id'));
      }
    }
  }

  return ret;
}

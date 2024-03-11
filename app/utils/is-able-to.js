export default function isAbleTo(self = null) {
  let ret = false;

  if (self) {
    if (self.get('currentUser.role_id') === 'consortium_admin') {
      ret =
        (self.get('model.provider.memberType') === 'consortium_organization' &&
          self.get('currentUser.provider_id') ===
            self.get('model.provider.consortium.id')) ||
        (self.get('model.provider.memberType') === 'consortium' &&
          self.get('currentUser.provider_id') ===
            self.get('model.provider.id'));
    }
  }

  return ret;
}

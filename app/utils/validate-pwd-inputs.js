export default function validatePwdInputs(route) {
  // Return true for any of the following routes.
  return (
    route == 'providers.show.change' ||
    route == 'repositories.show.change' ||
    route == 'change'
  );
}

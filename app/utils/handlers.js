import ENV from 'bracco/config/environment';

export const basicLinksHandler = {
  request(context, next) {
    let { request } = context;

    return next(request).then((response) => {
      if (response.request.op == null) {
        const type = response.content.data.type;
        const schema = response.request.store.schema.fields({ type: type});
        var relationshipFields = Object.keys(response.content.data.relationships);
        
        for (const field of relationshipFields) {
          const fieldSchema = schema.get(field);
          maybeAddLinks(response.content.data.relationships[field], fieldSchema);
        }

        if ('included' in response.content) {
          for (let i = 0; i < response.content.included.length; i++) {
            relationshipFields = Object.keys(response.content.included[i].relationships);

            for (const field of relationshipFields) {
              const fieldSchema = schema.get(field);
              maybeAddLinks(response.content.included[i].relationships[field], fieldSchema);
            }
          }
        }
      }

      // debugger;
      return response;
    });
  }
}

function maybeAddLinks(relationship, fieldSchema) {
  if (isValid(relationship.data) && !relationship.links?.related) {
    relationship.links ??= {};
    relationship.links.related = ENV.API_URL + '/' + relationship.data.type + `/?ids=${(Array.isArray(relationship.data) ? relationship.data : [relationship.data]).map(v => encodeURIComponent(v.id)).join(',')}`;
  }
}

function isValid(variable) {
  if (variable === undefined || variable === null) {
    return false;
  }
  if (Array.isArray(variable) && variable.length === 0) {
    return false;
  }
    
  if (typeof variable === 'object' && Object.keys(variable).length === 0) {
    return false;
  }

  return true;
}

const db = require('../data/db-config')

module.exports = {
    getResources,
    postResource,
    getResourcesById,
    updateResource,
    removeRosource
}


function getResources () {
    return db("resource");
}

function getResourcesById (id) {
    return db("resource").where({id}).first();
}

function postResource (resource ) {
    return db("resource").insert(resource)
} 

function updateResource(changed, id) {
    return db('resource')
      .where({ id })
      .update(changed);
  }

  function removeRosource(id) {
    return db('resource')
        .where({id})
        .del();
  } 
const models = require("../../../models");

const createTags = async ({tags, todoId}) => {
  try {
    console.log(todoId)
    const transformedTags = []
    tags.forEach(tag => {
      if(tag) 
     transformedTags.push({name: tag})
    })
    const newtags = await models.Tag.bulkCreate(transformedTags)
    if(newtags){
      for(var i = 0; i < newtags.length; i++){
        await newtags[i].addTask(todoId)
      }
    } 
    return newtags
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

const createStatus = async ({ status: name }) => {
  try {
    const [status, created] = await models.Status.findOrCreate({
      where: { name },
      defaults: { name }
    });
    if (!created) return null;
    return status;
  } catch (err) {
    console.log("ERROR from service --> ", err);
    throw new Error(err);
  }
};

module.exports = {
  createTags,
  createStatus
};

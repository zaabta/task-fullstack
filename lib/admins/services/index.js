const models = require("../../../models")


const getAllUsers = async() => {
    try{
        const users = await models.User.findAll()
        return users
    } catch(err){
        throw new Error(err)
    }
}


module.exports = {
    getAllUsers
}
const models = require("../../../models")


const getAllUsers = async() => {
    try{
        const users = await models.User.findAll({
            include: [{
                model: models.UserType,
                as: "Type",
                attributes: ["type"]
            }],
            paranoid: false,
            attributes: ["id", "name", "email", "createdAt", "deletedAt"]
        })
        return users
    } catch(err){
        throw new Error(err)
    }
}


module.exports = {
    getAllUsers
}
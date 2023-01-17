const models = require("../../../models");
const { Op } = require("sequelize");
const auth_services = require("../../auth services");

const createUser = async ({ username: name, email, password }) => {
  try {
    const userType = await models.UserType.findOne({
        where:{
            type: "user"
        }
    })
    const [user, created] = await models.User.findOrCreate({
      where: {
        [Op.and]: [{ [Op.or]: [{ email }, { name }] }, { deletedAt: null }]
      },
      defaults: {
        name,
        password: auth_services.hashPassword(password),
        email,
        userTypeId: userType.id
      }
    });
    if (!created) return null;
    return user;
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const findUser = async ({ account, password }) => {
  try {
    const user = await models.User.findOne({
      where: {
        [Op.and]: [
          { [Op.or]: [{ name: account }, { email: account }] },
          { deletedAt: null }
        ]
      },
      include:[
        {
            model: models.UserType,
            as: "Type"
        }
      ]
    });
    console.log(user)
    return user
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

const getUser = async ({userId: id})=>{
  try {
    const user = await models.User.findByPk(id, {
      include: [
        {
          model: models.UserType,
          as: "Type"
        },
        {
          model: models.Task,
          where: {
            deletedAt: null
          },
          paranoid: false
          ,
          include:[
            { model: models.Status, attributes: ["id", "name"]}
          ]
        },
    ]
    })
    return user
  } catch(err){
    throw new Error(err)
  }
}


const updateUser = async ({username,email,password,userId,}) => {
  try {
    if (userId) {
      const user = await models.User.findByPk(userId);
      if (user)
        await user.update({
            name: username,
            email,
            password:auth_services.hashPassword(password)
          }
        );
      return user;
    }
  } catch (err) {
    console.log("ERROR FROM SERVİCE-->", err);
    throw new Error(err);
  }
};

module.exports = {
  createUser,
  findUser,
  getUser,
  updateUser
};

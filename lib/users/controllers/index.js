const response = require("../../helper/responses");
const services = require("../services");
const auth_services = require("../../auth services")
const transformers = require("../../transformers");

const register = async (req, res, next) => {
  try {
    const { username, password, email, passwordConfirmation } = req.body;
    if (username?.length < 3)
      return response.failedWithMessage(
        "name is must be more than 3 chars",
        res
      );
    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
      return response.failedWithMessage("email is invalid", res);

    if (password?.length < 6)
      return response.failedWithMessage("password is invalid", res);

    if (password.localeCompare(passwordConfirmation))
      return response.failedWithMessage("password dose not match !", res);

    const user = await services.createUser({ username, email, password });
    if (!user)
      return response.failedWithMessage("this user already exist !", res);
    return response.successWithMessage("account created successfully", res);
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const login = async (req, res, next) => {
  try {
    const { account, password } = req.body;
    if (!account || !password)
      return response.failedWithMessage(
        "please fill the account and password !",
        res
      );
    const user = await services.findUser({ account, password });
    if (!user)
      return response.failedWithMessage(
        "user not found please create an account",
        res
      );
    if(!auth_services.checkPassword(password, user?.password))  
    return response.failedWithMessage(
        "please check your password",
        res
      );
      const transformeredUser = transformers.userTransformer(user);
      const token = auth_services.tokenGenerator(transformeredUser)
      res.cookie("token", token)
    return response.successWithMessage("logged successfully", res, {
        user: transformeredUser,
        token
    });
  } catch (err) {
    console.log("ERROR--> ", err);
    return response.serverError(res);
  }
};

const index = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await services.getUser({userId})
    if(!user) return response.failedWithMessage("failed to get info", res)
    return response.successWithMessage("user info got successfully", res, user)
  } catch(err) {

  }
}

const destroy = async (req, res, next) =>{
  try {
   const email = req.user.email
  const user = await services.findUser({account: email})
     if(user){
       user.destroy()
       return response.successWithMessage("Account deleted successfully", res)
     }else{
       response.failedWithMessage("User not found", res)
     }
  }catch(err){
   console.log("ERROR--> ", err);
   return response.serverError(res);
  }
 }

module.exports = {
  register,
  login,
  index,
  destroy
};

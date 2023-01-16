const userTransformer = (user)=> {
    const transformereduser = {}
    if(user) {
        transformereduser.id = user?.id,
        transformereduser.email = user?.email,
        transformereduser.name = user?.name,
        transformereduser.type = user?.Type.type
        return transformereduser
    }
    return user
} 

module.exports = {
    userTransformer
}
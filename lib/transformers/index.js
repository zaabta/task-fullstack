const userTransformer = (user)=> {
    const transformeredUser = {}
    if(user) {
        transformeredUser.id = user?.id,
        transformeredUser.email = user?.email,
        transformeredUser.name = user?.name,
        transformeredUser.type = user?.Type.type
        return transformeredUser
    }
    return user
}


const todoTransformer = (todo) => {
    console.log(todo)
    const transformeredTodo = {}
    if(todo) {
        transformeredTodo.id = todo?.id
        transformeredTodo.content = todo?.content
        transformeredTodo.startDate = todo?.startDate?.toJSON()?.substring(0, 10)
        transformeredTodo.endDate = todo?.endDate?.toJSON()?.substring(0, 10) || null
        transformeredTodo.status = todo?.Status?.name
        return transformeredTodo
    }
    return todo
}

const todoesTransformer = (todoes) => {
    if(todoes.length > 0){
        const result = todoes.map(todo => todoTransformer(todo))
        return result
    }
    return todoes

}

module.exports = {
    userTransformer,
    todoTransformer,
    todoesTransformer
}
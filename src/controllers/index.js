let users = require('../mocks/users.js')

module.exports =
  {
    listUsers(req, response){
      const {orderBy} = req.query
      const sortedUsers = users.toSorted((a,b) => {
        if(orderBy === 'desc') {
          return a.id < b.id ? 1 : -1
        }
        return a.id > b.id ? 1 : -1
      })
      response.send(200,sortedUsers)
    },
    getUserById(req,response){
      const {id} = req.params;
      const findUser = users.filter((user) => user.id === Number(id));
      if(!findUser.length) {
        return req.send(400,{ error: 'User not Found' })
      } 
      response.send(200,findUser)
    },
    createUser(req,response){
        const {body} = req;
        const lastUserId = users[users.length -1].id;
        const newUser = {
          id: lastUserId + 1,
          nome: body.nome
        };
        users.push(newUser);
        response.send(200,newUser);
    },
    updateUser(req, response) {
      let { id } = req.params;
      const {nome} = req.body;
      id = Number(id);
      const userExists = users.filter((user) => user.id === id);
      if(!userExists){
        return response.send(400,{ error: 'Usuario nao encontrado'})
      }
      users = users.map((user) => {
        if(user.id === id) {
          return {
            ...user,
            nome
          }
        }
        return user
      })
      response.send(200,{id,nome})
    },
    deleteUser(req,response){
      let {id} = req.params;
      id = Number(id)

      const existe = users.findIndex((user) => user.id === id)

      if(existe !== -1) {
        users.splice(existe,1)
        return response.send(201,{status: 'Deletado com sucesso'})
      }
      response.send(400,{ error: 'Usuario nao encontrado'})
    }
  }

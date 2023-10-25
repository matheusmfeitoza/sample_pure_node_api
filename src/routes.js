const controller = require('./controllers/index')

module.exports = [
  {
    method: 'GET',
    url: '/users',
    handler: controller.listUsers
  }, 
  {
    method: 'GET',
    url: '/users/:id',
    handler: controller.getUserById
  },
  {
    method: 'POST',
    url: '/users',
    handler: controller.createUser
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: controller.updateUser
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: controller.deleteUser
  }
]
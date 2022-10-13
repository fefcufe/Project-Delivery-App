const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const UsersModel = require ('../../../database/models/users');

describe('src/models/users', () => {
  const User = UsersModel(sequelize, dataTypes)
  const users = new User()
  
  checkModelName(User)('User')
  
  context('properties', () => {
    ;['id', 'name', 'email', 'password', 'role'].forEach(checkPropertyExists(users))
  })
})
import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    lastname: 'admin',
    email: 'admin@mail.com',
    role: 'Admin',
    password: bcrypt.hashSync('So123456!', 10),
    isAdmin: true,
  },
  {
    name: 'User',
    lastname: 'user',
    email: 'user@mail.com',
    role: 'User',
    password: bcrypt.hashSync('So123456!', 10),
  },
  {
    name: 'Private',
    lastname: 'private',
    email: 'private@mail.com',
    role: 'Private',
    password: bcrypt.hashSync('So123456!', 10),
  },
]

export default users

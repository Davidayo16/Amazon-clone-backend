import bcrypt from 'bcryptjs'

const users=[
 {
    name:"User",
    email:"user@email.com",
    password:bcrypt.hashSync('12345', 10),
 },
 {
    name:"Admin",
    email:"admin@email.com",
    password:bcrypt.hashSync('123777', 10),
    isAdmin:true,
 },
  {
    name:"Jesse",
    email:"jesse@email.com",
    password:bcrypt.hashSync('123885', 10),

 },

]
export default users
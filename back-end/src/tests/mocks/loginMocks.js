const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NjQzNjc0MDZ9.yDzbhmjfSxCpaa7mkEnnk94HqJQdbtg6_uVntYqpHwQ"

const loginUser = {
    email: 'zebirita@email.com',
    password: '$#zebirita#$'
}

const loggedUserResponse = {
    id: 3,
    name: "Cliente Zé Birita",
    email: "zebirita@email.com",
    role: "customer",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NjQzNjc0MDZ9.yDzbhmjfSxCpaa7mkEnnk94HqJQdbtg6_uVntYqpHwQ"
} 

module.exports = {
    token, loginUser, loggedUserResponse
};
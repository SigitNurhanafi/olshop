const UserModel = require('./src/model/User.mode');

UserModel.createUser('user@mail.com', 'password', (res) => {
    console.log(res);
})
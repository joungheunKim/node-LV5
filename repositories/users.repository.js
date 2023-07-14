const { Users } = require('../models')
const { Op } =require('sequelize')

class UserRepository {
    createUser = async(nickname, password) =>{
        // ORM인 Sequelize에서 Users 모델의 create 메소드를 사용해 데이터를 요청합니다.
        return await Users.create({ nickname, password });
    
    }

    findUser = async (target) => {
        // ORM인 Sequelize에서 Users 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
        return await Users.findOne({where:{[Op.and]: target}, raw:true, nest:true});

    }

}

module.exports = UserRepository
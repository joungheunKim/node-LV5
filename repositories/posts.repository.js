const { Posts, Users } = require('../models')
const { Op, Sequelize } = require('sequelize')

class PostRepository {
    findAll = async () =>{
        return await Posts.findAll({
            include:[{ model: Users }],
            attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE PostId = Posts.postId)`), 'like']] },
            raw: true,
            nest: true 
        })
    }

    findOne = async (target) =>{
        return await Posts.findOne({where: {[Op.and]: target}, include: [{ model: Users }], attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE PostId = Posts.postId)`), 'like']] }, raw: true, nest: true } )
    }

    createOne = async (data) => {
        return await Posts.create(data)
    }

    updateOne = async ( data, target) =>{
        return await Posts.update( data, {where:{[Op.and]: target} })
    }

    deleteOne = async (target) => {
        return await Posts.destroy({where: {[Op.and]: target}})
    }
}

module.exports = PostRepository
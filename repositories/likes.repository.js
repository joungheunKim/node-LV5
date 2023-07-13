const { Posts, Likes, Users } = require('../models');
const { Op, Sequelize } = require('sequelize')

class LikeRepository {

    findAll = async (target) => {
        return await Likes.findAll({
            where: {[Op.and]:target},
            attributes: { include: [[Sequelize.literal(`(SELECT COUNT(*) FROM Likes WHERE PostId = Post.postId)`), 'like']] },
            include: [{model: Posts}, {model: Users}],
            raw: true,
            nest: true
        })
    }

    findOne = async (target) => {
        return await Likes.findOne({where: {[Op.and]: target}})
    }

    createOne = async (data) => {
        return await Likes.create(data)
    }

    deleteOne = async (target) =>{
        return await Likes.destroy({where: {[Op.and]: target}})
    }
}

module.exports = LikeRepository
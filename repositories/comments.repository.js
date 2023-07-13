const { Posts, Comments, Users } = require('../models')
const { Op, Sequelize } = require('sequelize')

class CommentRepository {

    findAll = async () => {
        return await Comments.findAll({
            include: [{ model: Users }]
        })
    }

    findOne = async (target) => {
        return await Comments.findOne({ where: {[Op.and]: target}, include: [{model: Users}], raw: true, nest: true })
    }

    createOne = async (data) => {
        return await Comments.create(data)
    }

    updateOne = async (data, target) => {
        return await Comments.update(data, {where: {[Op.and]: target}})
    }

    deleteOne = async (target) => {
        return await Comments.destroy({where: {[Op.and]: target}})
    }
}

module.exports = CommentRepository
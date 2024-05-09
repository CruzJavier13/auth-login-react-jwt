const { and, where } = require('sequelize');
const { models } = require('../lib/sequelize');

class UserService {

    constructor(){}

    async findUser(username){
        try{
            const res = await models.User.findOne({where: {username:username}});
            return res;
        } catch(err){
            console.log(err)
        }
    }

    async find(){
        const res = await models.User.findAll();
        return res;
    }

    async findOne(id){
        const res = await models.User.findByPk(id);
        return res;
    }
    
    async create(data){
        const res = await models.User.create(data);
        return res;
    }

    async update(data){
        const model = await this.findOne(data.id);
        const res = await models.update(model)
        return res;
    }

    async delete(id){
        const model = await this.findOne(id);
        await model.destroy();
        return {deleted: true};
    }
}

module.exports = UserService

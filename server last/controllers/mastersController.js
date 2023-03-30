const uuid = require('uuid'); // для генерации случайных айдишников
const path = require('path');
const {Masters, MastersInfo} = require('../models/models');

class MastersController {
    async create(req, res){
        let {name, price, typeId, info} = req.body
        const {img} = req.files
        let fileName = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const masters = await Masters.create({name, price, typeId, img:fileName})
        if(info){
            info = JSON.parse(info)
            info.forEach(i => {
                MastersInfo.create({
                    title: i.title,
                    description: i.description,
                    masterId: i.id,
                })
            })
        }
        return res.json(masters)
    }
    async getAll(req, res){
        const {typeId} = req.query; // получение из строки запроса
        let masters;
        if(typeId){
            masters = await Masters.findAll()
        }
        if(typeId){
            masters = await Masters.findAll({where:{typeId}})
        }
        return res.json(masters);
    }
    async getOne(req, res){
        const{id} = req.params;
        const master = await Masters.findOne({
            where: {id},
            include: [{model: MastersInfo, as:'info'}],
        });
        return res.json(master);
    }
}

module.exports = new MastersController();





const {CutType} = require('../models/models');

class CuttypeController {
    async create(req, res){
        const {name} = req.body; // тк это пост запрос то у него есть тело
        const type = await CutType.create({name});
        return res.json(type);
    }
    async getAll(req, res){
        const types = await CutType.findAll();
        return res.json(types);
    }
}
module.exports = new CuttypeController();
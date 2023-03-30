const { Masters, MastersInfo } = require('../models/models');
const { Op } = require('sequelize');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'static'));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, uuid.v4() + ext);
    }
});

const upload = multer({ storage });

class MastersController {
    async create(req, res) {
        try {
            const { name, price, info, description, descriptionOfCut, nameCut } = req.body;
            const { image } = req.files;
            if (!image) {
                return res.status(400).json({ message: 'Image file is required' });
            }
            const fileName = image.name;
            await image.mv(path.resolve(__dirname, '..', 'static', fileName));
            const { imageCut } = req.files;
            if (!imageCut) {
                return res.status(400).json({ message: 'Image file is required' });
            }
            const fileNameCut = imageCut.name;
            await imageCut.mv(path.resolve(__dirname, '..', 'static', fileNameCut));
            const t = await Masters.sequelize.transaction();
            try {
                const master = await Masters.create({ name, price, image: fileName,imageCut: fileNameCut, description,descriptionOfCut, nameCut }, { transaction: t });
                if (info) {
                    const parsedInfo = JSON.parse(info);
                    const mastersInfo = parsedInfo.map(i => ({
                        title: i.title,
                        description: i.description,
                        masterId: master.id,
                    }));
                    await MastersInfo.bulkCreate(mastersInfo, { transaction: t });
                }
                await t.commit();
                return res.json(master);
            } catch (err) {
                await t.rollback();
                throw err;
            }
        } catch (err) {
            console.error(err);

            return res.status(500).json({ message: 'Failed to create master' });
        }
    }
    async getAll(req, res){
        const types = await Masters.findAll()
        return res.json(types)
    }
    async getOne(req, res) {
        const {id} = req.params;
        const master = await Masters.findOne({
            where: {id},
            include: [{model: MastersInfo, as: 'info'}],
        });
        return res.json(master);
    }
    async deleteByName(req, res) {
        try {
            const { name } = req.params;
            const master = await Masters.findOne({ where: { name } });
            if (!master) {
                return res.status(404).json({ message: 'Мастер не найден' });
            }
            await master.destroy();
            return res.json({ message: 'Мастер успешно удалён' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Не удалось удалить мастера' });
        }
    }
}

module.exports = new MastersController();





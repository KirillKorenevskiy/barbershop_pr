const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {  // первый параметр это имя модели
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Records = sequelize.define('records', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const RecordsMasters = sequelize.define('records_masters', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Masters = sequelize.define('masters', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER,  allowNull: false, defaultValue: 55 },
    image: { type: DataTypes.STRING, allowNull: false },
    description: {type: DataTypes.STRING, allowNull:false},
    nameCut: {type: DataTypes.STRING, allowNull:false},
    descriptionOfCut: {type: DataTypes.STRING, allowNull:false},
    imageCut: {type: DataTypes.STRING, allowNull:false}
});

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
});

const MastersInfo = sequelize.define('masters_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

const CutType = sequelize.define('cut_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
});

User.hasOne(Records);
Records.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Records.hasMany(RecordsMasters);
RecordsMasters.belongsTo(Records);

/*CutType.hasMany(Masters);
Masters.belongsTo(CutType);*/

/*Masters.hasMany(Rating);
Rating.belongsTo(Masters);*/

Masters.hasMany(RecordsMasters);
RecordsMasters.belongsTo(Masters);

Masters.hasMany(MastersInfo, {as: 'info'});
MastersInfo.belongsTo(Masters);

module.exports = {
    User,
    CutType,
    Masters,
    MastersInfo,
    Rating,
    Records,
    RecordsMasters,
}
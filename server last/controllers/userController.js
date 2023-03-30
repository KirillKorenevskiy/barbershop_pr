const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const { User, Records } = require('../models/models');

const generateJwt = (id, email, role) => {
    return Jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
}

class UserController {
    async registration(req, res) {
        const { email, password, role } = req.body;
        const candidate = await User.findOne({ where: { email } });
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const records = await Records.create({ userId: user.id });
        const jwt = generateJwt(user.id, user.email, user.role);
        return res.json(jwt);
    }
    async login(req, res) {  
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        let comparePassword = bcrypt.compareSync(password, user.password);
        const token = generateJwt(user.id, user.email, user.role);
        return res.json( token );
    }
    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role); 
        return res.json( token );
    }
}

module.exports = new UserController();  
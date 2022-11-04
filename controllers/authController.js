const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); // Unauthorized
    // check password
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        res.status(200).json(foundUser);
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin }
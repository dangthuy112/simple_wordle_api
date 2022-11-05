const User = require('../model/User');

const updateUser = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({ 'message': `No user matches ID${req.body.id}` });

    user.previousGames = req.body.previousGames;

    const result = await user.save();
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({ 'message': `No user matches ID${req.body.id}` });

    res.json(user);
}

module.exports = { updateUser }
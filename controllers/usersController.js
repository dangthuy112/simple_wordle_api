const User = require('../model/User');
const mongoose = require('mongoose');

const updateHistory = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) return res.status(204).json({ 'message': `No user matches ID${req.body.id}` });

    user.history = req.body.history;

    const result = await user.save();
    res.json(result);
}

const getHistory = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }
    if (req.params.id == 'null') {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) return res.status(204).json({ 'message': `No user matches ID${req.body.id}` });

    res.json(user);
}

// const getUser = async (req, res) => {
//     if (!req?.params?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) return res.status(204).json({ 'message': `No user matches ID${req.body.id}` });

//     res.json(user);
// }

module.exports = { updateHistory, getHistory }
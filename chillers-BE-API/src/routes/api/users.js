require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/users');
const logger = require('../../utils/logger');

const createUser = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const { userId: id, userType, fullName, address, phone, email, password } = req.body;
        const user = new User({ id, userType, fullName, address, phone, email, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`createUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json(user);
    } catch (err) {
        logger.error(`deleteUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const deleteUserById = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const { id } = req.params;
        const user = await User.findOne({ id });
        if (!user) {
            throw new Error('Couldn\'t delete user - User was not found!')
        }
        await user.remove();
        res.status(200).json(user);
    } catch (err) {
        logger.error(`deleteUserById failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { userId: id, password } = req.body;
        const user = await User.findByCredentials(id, password);
        const token = await user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (err) {
        logger.error(`loginUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const editUser = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (loggedInUser.userType !== '1') {
            throw new Error('User is not an Admin.');
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ['password', 'userType', 'fullName', 'address', 'phone', 'email'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            throw Error('Error: You can\'t change user id');
        }
        const { id } = req.params;
        const user = await User.findOne({ id });
        if (!user) {
            throw new Error('Couldn\'t edit user - User was not found!')
        }
        updates.forEach(update => (user[update] = req.body[update]));
        await user.save();
        res.status(200).json(user);
    } catch (err) {
        logger.error(`editUser failed: ${err.message}`);
        res.status(400).json({ code: err.code, message: err.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(err.code).json({ code: err.code, message: err.message });
    }
};

router.get('/get', auth, getUser);
router.get('/get/all', auth, getUsers);
router.patch('/edit/:id', auth, editUser);
router.post('/create', auth, createUser);
router.post('/login', loginUser);
router.delete('/delete', auth, deleteUser);
router.delete('/delete/:id', auth, deleteUserById);

module.exports = router;

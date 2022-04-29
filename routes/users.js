const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, createUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;

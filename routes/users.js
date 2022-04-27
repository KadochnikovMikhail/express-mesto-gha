const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar,
} = require('../controllers/users');

router.get('/:userId', getUserById);

router.patch('/me', updateUser);

router.get('/', getUsers);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;

const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateUserAvatar, createUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);
router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

module.exports = router;

const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

module.exports.getUsersById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user == null) {
          res.status(404).send({ data: 'Пользователь с данным Id не найден' });
        } else {
          res.send({ data: user });
        }
      })
      .catch((err) => {
        res.status(500).send({ data: err.message });
      });
  } else {
    res.status(400).send({ data: 'Введен некорректный id' });
  }
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ data: err.message });
    });
};

// module.exports.updateUser = (req, res, next) => {
//   const { name, about } = req.body;
//
//   User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
//     .then((user) => {
//       if (!user) {
//         next(new NotFoundError('Пользователь по указанному _id не найден.'));
//       } else {
//         res.send({ user });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
//       } else if (err.name === 'CastError') {
//         next(new NotFoundError('Передан некорректный _id пользователя.'));
//       } else {
//         next(err);
//       }
//     });
// };
//
// module.exports.updateUserAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//
//   User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
//     .then((user) => {
//       if (!user) {
//         next(new NotFoundError('Пользователь по указанному _id не найден.'));
//       } else {
//         res.send({ user });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         next(new BadRequestError('Переданы некорректные данные при обновлении аватара.'));
//       } else if (err.name === 'CastError') {
//         next(new NotFoundError('Передан некорректный _id пользователя.'));
//       } else {
//         next(err);
//       }
//     });
// };

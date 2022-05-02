const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

module.exports.getUserById = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.userId)) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user == null) {
          res.status(404).send({ data: 'Пользователь с данным Id не найден' });
        } else {
          res.status(200).send({ data: user });
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
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Возникла ошибка ${err.message}` });
      } else {
        res.status(500).send({ message: `Возникла ошибка ${err.message}` });
      }
      res.send({ data: err.message });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })

    .then((user) => {
      if (!user) {
        res.status(404).send({ data: 'Пользователь с данным Id не найден' });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Возникла ошибка ${err.message}` });
      } else {
        res.status(500).send({ message: `Возникла ошибка ${err.message}` });
      }
      res.send({ data: err.message });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ data: 'Пользователь с данным Id не найден' });
      } else {
        res.status(200).send({ user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Возникла ошибка ${err.message}` });
      } else {
        res.status(500).send({ message: `Возникла ошибка ${err.message}` });
      }
      res.send({ data: err.message });
    });
};

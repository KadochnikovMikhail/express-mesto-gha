const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ data: err.message }));
};

module.exports.deleteCard = (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.cardId)) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (card == null) {
          res.status(404).send({ data: 'Карточка с данным Id не найдена' });
        } else {
          res.status(200).send({ data: card });
        }
      })
      .catch((err) => res.status(500).send({ data: err.message }));
  } else {
    res.status(400).send({ data: 'Введен некорректный id карточки' });
  }
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => () => {
      if (err.name === 'ValidationError') {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ data: err.message });
    });
};

// module.exports.likeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Передан несуществующий _id карточки.');
//       } else {
//         res.send({ card });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
//       } else {
//         next(err);
//       }
//     });
// };
//
// module.exports.dislikeCard = (req, res, next) => {
//   Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } },
//     { new: true },
//   )
//     .then((card) => {
//       if (!card) {
//         throw new NotFoundError('Передан несуществующий _id карточки.');
//       } else {
//         res.send({ card });
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка.'));
//       } else {
//         next(err);
//       }
//     });
// };

import express from 'express';
import { celebrate, Joi, errors } from 'celebrate';

const router = express.Router();

/* GET users listing. */
router.get('/', 
  celebrate({
    query: {
      'yearlyConsumption': Joi.number().min(0).required()
    }
  }),
  (req, res, next) => {
    res.status(200).json({ data: 'Amount ' + req.query.yearlyConsumption});
  }
);

export default router;
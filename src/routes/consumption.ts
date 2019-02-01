import express from 'express';
import { celebrate, Joi, errors } from 'celebrate';
import ProductRepository from '../repositories/product';
const router = express.Router();

// In a real project I'll use some DI or IOC library in order for the project to scale properly
const products = new ProductRepository().getAll();

router.get(
  '/',
  celebrate({
    query: {
      yearlyConsumption: Joi.number()
        .min(0)
        .required()
    }
  }),
  (req, res, next) => {
    const consumption = req.query.yearlyConsumption;
    const result = products
      .map(product => ({
        name: product.name,
        amount: product.calculateCost(consumption)
      }))
      .sort((a, b) => a.amount - b.amount);

    res.status(200).json({ result });
  }
);

export default router;

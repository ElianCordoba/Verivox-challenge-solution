import express, { Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import ProductRepository from '../repositories/product';
const router = express.Router();

// In a real project I'll use some DI or IOC library as this pattern does not scale well
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
  (req: Request, res: Response) => {
    const consumption: number = req.query.yearlyConsumption;
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

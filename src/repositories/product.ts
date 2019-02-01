export interface Product {
  name: string;
  baseCost: number;
  costPerKWh: number;
  calculateCost: (kWhConsumptionYearly: number) => number;
}

// Static factories
class ProductA implements Product {
  name = 'Basic electricity tariff';
  baseCost = 5;
  costPerKWh = 0.22;

  calculateCost(kWhConsumptionYearly: number) {
    return this.baseCost * 12 + kWhConsumptionYearly * this.costPerKWh;
  }
}

class ProductB implements Product {
  name = 'Packaged tariff';
  baseCost = 800;
  costPerKWh = 0.3;

  calculateCost(kWhConsumptionYearly: number) {
    console.log(this.baseCost, this.costPerKWh, kWhConsumptionYearly);
    if (kWhConsumptionYearly <= 4000) {
      return this.baseCost;
    } else {
      return this.baseCost + this.costPerKWh * (kWhConsumptionYearly - 4000);
    }
  }
}

/* 
  I putted the logic here so it stays encapsulated and, in hypothetical future in witch you want
  to change the source of the products you only do it here, as long as you follow the implementation.
*/
export default class ProductRepository {
  private products: Array<Product> = [];

  constructor() {
    this.products.push(new ProductA(), new ProductB());
  }

  getAll(): Array<Product> {
    return this.products;
  }
}

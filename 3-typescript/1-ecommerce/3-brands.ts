/**
 *  Challenge 4: Get Countries with Brands and Amount of Products
 *
 * Create a function that takes an array of brands and products, and returns the countries with the amount of products available in each country.
 *
 * Requirements:
 * - The function should accept an array of Brand objects and an array of Product objects.
 * - Each brand should have a country property. -- brands.headquarters
 * - Each product should have a brandId property that corresponds to the id of a brand. --products.brandId
 * - The function should return an array of objects, each containing a country and the amount of products available in that country. [{country: USA, amountProducts: 10}]
 * - The amount of products should be calculated by counting the number of products that have a brandId matching the id of a brand in the same country. brands.id === products.brandId ? amountProducts += 1 : amountProducts;
 * - The return should be a type that allow us to define the country name as a key and the amount of products as a value.
 */

import { IProduct, IBrand } from "./1-types";
import readJson from "./utils/read-json.util";

interface ICountriesBrandProductCount {
  country: string; // brands.headquarters
  amountProductAvailable: number;
}

const productsFilePath = "./data/products.json";
const brandsFilePath = "./data/brands.json";

async function getCountriesWithBrandsAndProductCount(
  brands: IBrand[],
  products: IProduct[],
): Promise<ICountriesBrandProductCount[]> {
  const brandIdAndCountry: Record<string, string> = {};
  const countryAndAmount: Record<string, number> = {};

  brands.forEach((brand) => {
    const locations = brand.headquarters.split(",");
    const country = locations[locations.length - 1].trim();
    brandIdAndCountry[brand.id] = country;
  });

  products.forEach((product) => {
    const country = brandIdAndCountry[product.brandId];
    if (country) {
      countryAndAmount[country] = (countryAndAmount[country] || 0) + 1;
    }
  });

  return Object.entries(countryAndAmount).map(([country, amount]) => ({
    country,
    amountProductAvailable: amount,
  }));
}

async function execute() {
  const [brand, product] = await Promise.all([
    readJson<IBrand>(brandsFilePath),
    readJson<IProduct>(productsFilePath),
  ]);
  const result = await getCountriesWithBrandsAndProductCount(brand, product);
  console.log(result);
}

execute();

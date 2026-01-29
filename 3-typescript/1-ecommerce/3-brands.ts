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

import { TProduct, TBrand } from "./1-types";
import readJson from "./utils/read-json.util";

interface TCountriesBrandProductCount {
  country: string; // brands.headquarters
  amountProductAvailable: number;
}

const productsFilePath = __dirname + "/data/products.json";
const brandsFilePath = __dirname + "/data/brands.json";

function getCountriesWithBrandsAndProductCount(
  brands: TBrand[],
  products: TProduct[],
): TCountriesBrandProductCount[] {
  const brandCountryMap = new Map<TBrand["id"], string>(
    brands.map((brand) => {
      const parts = brand.headquarters.split(",");
      const country = parts[parts.length - 1].trim();
      return [String(brand.id), country];
    }),
  );

  const countryCounts = new Map<string, number>();

  products.forEach((product) => {
    const country = brandCountryMap.get(String(product.brandId));
    if (country) {
      const currentCount = countryCounts.get(country) ?? 0;
      countryCounts.set(country, currentCount + 1);
    }
  });

  return Array.from(countryCounts, ([country, amountProductAvailable]) => ({
    country,
    amountProductAvailable,
  }));
}

async function execute() {
  const [brand, product] = await Promise.all([
    readJson<TBrand>(brandsFilePath),
    readJson<TProduct>(productsFilePath),
  ]);
  const result = await getCountriesWithBrandsAndProductCount(brand, product);
  console.log(result);
}

execute();

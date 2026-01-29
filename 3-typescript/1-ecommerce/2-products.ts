/**
 * Products - Challenge 1: Product Price Analysis
 *
 * Create a function that analyzes pricing information from an array of products.
 *
 * Requirements:
 * - Create a function called `analyzeProductPrices` that accepts an array of Product objects
 * - The function should return an object containing:
 *   - totalPrice: The sum of all product prices
 *   - averagePrice: The average price of all products (rounded to 2 decimal places)
 *   - mostExpensiveProduct: The complete Product object with the highest price
 *   - cheapestProduct: The complete Product object with the lowest price
 *   - onSaleCount: The number of products that are currently on sale
 *   - averageDiscount: The average discount percentage for products on sale (rounded to 2 decimal places)
 * - Prices should be manage in regular prices and not in sale prices
 * - Use proper TypeScript typing for parameters and return values
 * - Implement the function using efficient array methods
 *
 *
 **/

import { TProduct, TBrand, TImage } from "./1-types";
import readJson from "./utils/read-json.util";

type TAnalyzeProductPrices = {
  totalPrice: number; // products.price
  averagePrice: number; // products.price
  mostExpensiveProduct: TProduct; // products
  cheapestProduct: TProduct; // products
  onSaleCount: number; // sum(products.salePrice)
  averageDiscount: number;
};

// type TProductCalculation = {
//   mostExpensiveProduct: TProduct;
//   cheapestProduct: TProduct;
//   totalPrice: number;
//   onSaleCount: number;
//   totalDiscountPercentage: number;
// };

const productFilePath = __dirname + "/data/products.json";
const brandFilePath = __dirname + "/data/brands.json";

function analyzeProductPrices(products: TProduct[]): TAnalyzeProductPrices {
  if (!products || products.length === 0)
    throw new Error("Something went wrong! There are no records in the array");

  const { totalDiscountSum, ...calculations } = products.reduce(
    (acc, curr) => {
      if (curr.price > acc.mostExpensiveProduct.price)
        acc.mostExpensiveProduct = curr;
      if (curr.price < acc.cheapestProduct.price) acc.cheapestProduct = curr;
      acc.totalPrice += curr.price;
      if (curr.onSale) {
        acc.totalDiscountSum += (curr.price - curr.salePrice) / curr.price;
        acc.onSaleCount++;
      }
      return acc;
    },
    {
      totalPrice: 0,
      averagePrice: 0,
      mostExpensiveProduct: products[0],
      cheapestProduct: products[0],
      onSaleCount: 0,
      totalDiscountSum: 0,
    } as TAnalyzeProductPrices & { totalDiscountSum: number },
  );
  return {
    ...calculations,
    averagePrice: Number(
      (calculations.totalPrice / products.length).toFixed(2),
    ),
    averageDiscount: calculations.onSaleCount
      ? Number(((totalDiscountSum / calculations.onSaleCount) * 100).toFixed(2))
      : 0,
  };
}
// **************Uncomment to execute this function
// async function firstFunction(filePath: string) {
//   const data = (await readJson(filePath)) as TProduct[];
//   const result = analyzeProductPrices(data);
//   console.log(result);
// }

// firstFunction(productFilePath);

/**
 *  Challenge 2: Build a Product Catalog with Brand Metadata
 *
 * Create a function that takes arrays of Product and Brand, and returns a new array of enriched product entries. 
 * Each entry should include brand details embedded into the product, under a new brandInfo property (excluding the id and isActive fields).
 *  e.g
 *  buildProductCatalog(products: Product[], brands: Brand[]): EnrichedProduct[]

  Requirements:
  - it should return an array of enriched product entries with brand details
  - Only include products where isActive is true and their corresponding brand is also active.
  - If a product’s brandId does not match any active brand, it should be excluded.
  - The brandInfo field should include the rest of the brand metadata (name, logo, description, etc.).

  if (products.isActive && brands.isActive){
    if (product.brandId === brands.id)
    {
    
    }
  }
  [
    {
      product,
      brandInfo: {
        ...brand
      }
  
    } 
  ]

 */

// interface IEnrichedProduct extends TProduct {
//   brandInfo: TBrandInfo;
// }

type TBrandInfo = Omit<TBrand, "id" | "isActive">;

type TEnrichedProduct = TProduct & {
  brandInfo: TBrandInfo;
};

function buildProductCatalog(
  products: TProduct[],
  brands: TBrand[],
): TEnrichedProduct[] {
  const activeBrandMap = new Map<string, TBrandInfo>(
    brands
      .filter((b) => b.isActive)
      .map(({ id, isActive, ...metadata }) => [id, metadata]),
  );

  return products
    .filter(
      (product) =>
        product.isActive && activeBrandMap.has(String(product.brandId)),
    )
    .map((product) => ({
      ...product,
      brandInfo: activeBrandMap.get(String(product.brandId))!,
    }));
}

// **************Uncomment to execute this function
// async function firstFunction(filePath: string, filePath2: string) {
//   const [brands, products] = await Promise.all([
//     readJson<TBrand>(filePath),
//     readJson<TProduct>(filePath2),
//   ]);
//   const result = await buildProductCatalog(products, brands);
//   console.log(result);
// }

// firstFunction(brandFilePath, productFilePath);

/**
 * Challenge 3: One image per product
 *
 * Create a function that takes an array of products and returns a new array of products, each with only one image.
 *
 * Requirements:
 * - The function should accept an array of Product objects.
 * - Each product should have only one image in the images array.
 * - The image should be the first one in the images array.
 * - If a product has no images, it should be excluded from the result.
 * - The function should return an array of Product objects with the modified images array.
 * - Use proper TypeScript typing for parameters and return values.
 *
 *  [
 *    {
 *      TProduct
 *    }
 * ]
 *
 */

type TProductWithOneImage = Omit<TProduct, "images"> & {
  image: TImage;
};

function filterProductsWithOneImage(
  products: TProduct[],
): TProductWithOneImage[] {
  // Implement the function logic here

  const filteredProductsByImages = products.filter(
    (product) => product.images.length > 0,
  );

  const productWithOneImage = filteredProductsByImages.map((product) => {
    const { images, ...productProperties } = product;
    return {
      ...productProperties,
      image: product.images[0],
    };
  });

  return productWithOneImage;
}

// **************Uncomment to execute this function
// async function productsWithOneImage(productFilePath: string) {
//   const productData = await readJson<TProduct>(productFilePath);
//   const result = filterProductsWithOneImage(productData);

//   for (const image of result) {
//     console.groupCollapsed(image.id);
//     console.log(image);
//     console.groupEnd();
//   }
// }

// productsWithOneImage(productFilePath);

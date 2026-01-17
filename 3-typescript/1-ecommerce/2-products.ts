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

import { IProduct, IBrand, IImage } from "./1-types";
import readJson from "./utils/read-json.util";

interface IAnalyzeProductPrices {
  totalPrice: number; // products.price
  averagePrice: number; // products.price
  mostExpensiveProduct: IProduct; // products
  cheapestProduct: IProduct; // products
  onSaleCount: number; // sum(products.salePrice)
  averageDiscount: number;
}

const productFilePath = "./data/products.json";
const brandFilePath = "./data/brands.json";

async function analyzeProductPrices(
  products: IProduct[],
): Promise<IAnalyzeProductPrices> {
  if (!products || products.length === 0) {
    throw new Error("Something went wrong! There are no records in the array");
  }

  try {
    const initialObject = {
      mostExpensiveProduct: products[0],
      cheapestProduct: products[0],
      totalPrice: 0,
      onSaleCount: 0,
      totalDiscountPercentage: 0,
    };
    const calculations = products.reduce((acc, curr) => {
      if (curr.price > acc.mostExpensiveProduct.price) {
        acc.mostExpensiveProduct = curr;
      }
      if (curr.price < acc.cheapestProduct.price) {
        acc.cheapestProduct = curr;
      }
      acc.totalPrice += curr.price;
      if (curr.onSale) {
        const discountPercent = (curr.price - curr.salePrice) / curr.price;
        acc.totalDiscountPercentage += discountPercent;
        acc.onSaleCount += 1;
      }

      return acc;
    }, initialObject);

    const productsQuantity = products.length;
    let averagePrice = calculations.totalPrice / productsQuantity;
    const averageDiscount =
      (calculations.totalDiscountPercentage / calculations.onSaleCount) * 100;
    return {
      totalPrice: calculations.totalPrice,
      averagePrice: Number(averagePrice.toFixed(2)),
      mostExpensiveProduct: calculations.mostExpensiveProduct,
      cheapestProduct: calculations.cheapestProduct,
      onSaleCount: calculations.onSaleCount,
      averageDiscount: Number(averageDiscount.toFixed(2)),
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error";
    console.log("Something went wrong!", errorMessage);
    throw error;
  }
}
// **************Uncomment to execute this function
// async function firstFunction(filePath: string) {
//   const data = (await readJson(filePath)) as IProduct[];
//   const result = await analyzeProductPrices(data);
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

interface IEnrichedProduct extends IProduct {
  brandInfo: TBrandInfo;
}

type TBrandInfo = Omit<IBrand, "id" | "isActive">;

async function buildProductCatalog(
  products: IProduct[],
  brands: IBrand[],
): Promise<IEnrichedProduct[]> {
  const activeBrands: Record<string, TBrandInfo> = {};

  const filteredBrands = brands.filter((brand) => brand.isActive);

  filteredBrands.forEach((activeBrand) => {
    const { id, isActive, ...metadata } = activeBrand;
    activeBrands[id] = metadata;
  });

  const filteredProducts = products.filter(
    (product) => product.isActive && activeBrands[product.brandId],
  );

  const enrichedProducts = filteredProducts.map((product) => ({
    ...product,
    brandInfo: activeBrands[product.brandId],
  }));

  return enrichedProducts;
}

// **************Uncomment to execute this function
// async function firstFunction(filePath: string, filePath2: string) {
//   const [brands, products] = await Promise.all([
//     readJson<IBrand>(filePath),
//     readJson<IProduct>(filePath2),
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
 *      IProduct
 *    }
 * ]
 *
 */

interface IProductWithOneImage extends Omit<IProduct, "images"> {
  images: [IImage];
}

async function filterProductsWithOneImage(
  products: IProduct[],
): Promise<IProductWithOneImage[]> {
  // Implement the function logic here

  const filteredProducts = products.filter(
    (product) => product.images.length > 0,
  );

  const productWithOneImage = filteredProducts.map((product) => ({
    ...product,
    images: [product.images[0]] as [IImage],
  }));

  return productWithOneImage;
}

// **************Uncomment to execute this function
// async function productsWithOneImage(productFilePath: string) {
//   const productData = await readJson<IProduct>(productFilePath);
//   const result = await filterProductsWithOneImage(productData);

//   for (const image of result) {
//     console.groupCollapsed(image.id);
//     console.log(image);
//     console.groupEnd();
//   }
// }

// productsWithOneImage(productFilePath);

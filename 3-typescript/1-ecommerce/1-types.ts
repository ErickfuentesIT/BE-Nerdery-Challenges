/**
 * Challenge 1: Type Definitions for Product Catalog
 *
 * You need to define proper TypeScript types for the product catalog data.
 * These types should accurately represent the structure of the JSON data and establish
 * the relationships between different entities (e.g., products and brands).
 *
 * The JSON data is provided in the `data` folder.
 *
 * Consider:
 * - Handle all of the properties in the JSON data as accurately as possible in typescript types
 * - Use appropriate types for each property (e.g., string, number, boolean, etc.)
 * - Optional properties and mandatory properties
 * - The use of union types for properties that can have multiple types
 * - The use of enums for properties that can have a limited set of values
 * - The use of interfaces and type aliases to create a clear and maintainable structure
 */

// import readJson from "./utils/read-json.util";

// PRODUCTS JSON
//! Add necessary type definitions for the products json file

export interface IProduct extends TOptionalProduct {
  id: number;
  name: string;
  departmentId: number;
  categoryId: number;
  brandId: number;
  linkId: string;
  refId: string;
  isVisible: boolean;
  description: string;
  descriptionShort: string;
  releaseDate: string;
  keywords: string;
  title: string;
  isActive: boolean;
  taxCode: string;
  metaTagDescription: string;
  supplierId: number;
  showWithoutStock: boolean;
  score: number;
  price: number;
  salePrice: number;
  onSale: boolean;
  colors: string[];
  sizes: number[];
  tags: string[];
  images: IImage[];
  specifications: ISpecification;
}

type TOptionalProduct = Partial<IOptionalProduct>;

interface IOptionalProduct {
  adWordsRemarketingCode: string;
  lomadeeCampaignCode: string;
}

export interface IImage {
  id: number;
  url: string;
  alt: string;
  isMain: boolean;
}
interface ISpecification extends TOptionalSpecification {
  material: string;
  weight: string;
  closure: string;
}

type TOptionalSpecification = Partial<IOptionalSpecification>;

interface IOptionalSpecification {
  cushioning: string;
  insulation: string;
  archSupport: string;
  heelDrop: string;
  shaftHeight: string;
  ankleSupport: string;
  waterprofing: string;
  flexibility: string;
  lining: string;
  heelHeight: string;
}

// CATEGORIES JSON

//! Add necessary type definitions for the brands json file

export interface ICategory {
  id: number;
  name: string;
  departmentId: number;
  description: string;
  keywords: string;
  isActive: boolean;
  iconUrl: string;
  bannerUrl: string;
  displayOrder: number;
  metaDescription: string;
  filters: ICategoryFilters[];
}

interface ICategoryFilters {
  name: string;
  values: string[];
}

// BRANDS JSON
//! Add necessary type definitions for the brands json file

type TId = string | number;

export interface IBrand {
  id: TId;
  name: string;
  logo: string;
  description: string;
  foundedYear: number;
  website: string;
  isActive: boolean;
  headquarters: string;
  signature: string;
  socialMedia: ISocialMedia;
}

interface ISocialMedia {
  instagram: string;
  twitter: string;
  facebook: string;
}

export interface IDepartment {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  displayOrder: number;
  iconUrl: string;
  bannerUrl: string;
  metaDescription: string;
  featuredCategroies: number[];
  slug: string;
}

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

export interface IProduct {
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
  adWordsRemarketingCode: string;
  lomadeeCampaignCode: string;
  score: number;
  salePrice: number;
  onSale: boolean;
  colors: string[];
  sizes: number[];
  tags: string[];
  images: IImage[];
  specifications: ISpecification;
}

interface IImage {
  id: number;
  url: string;
  alt: string;
  isMain: boolean;
}

interface ISpecification {
  material: string;
  weight: string;
  cushioning?: string;
  insulation?: string;
  closure: string;
  archSupport?: string;
  heelDrop?: string;
  shaftHeight?: string;
  ankleSupport?: string;
}

//   {
//     "id": 1101,
//     "name": "Horizon Trail Rush Desert Tan",
//     "departmentId": 3001,
//     "categoryId": 4004,
//     "brandId": 445566,
//     "linkId": "horizon-trail-rush-desert-tan",
//     "refId": "htr_desert_1101",
//     "isVisible": true,
//     "description": "Designed for serious trail runners, the Horizon Trail Rush features aggressive lugs for maximum traction on varied terrain. The breathable upper keeps feet cool while protective overlays shield against rocks and debris.",
//     "descriptionShort": "Maximum trail traction with desert-inspired colorway.",
//     "releaseDate": "2024-04-05T00:00:00",
//     "keywords": "Horizon,Trail,Rush,Desert,Tan,Outdoor",
//     "title": "Horizon Trail Rush Desert Tan",
//     "isActive": true,
//     "taxCode": "TRAIL888",
//     "metaTagDescription": "Conquer any trail with superior grip and all-day comfort.",
//     "supplierId": 5,
//     "showWithoutStock": false,
//     "adWordsRemarketingCode": "",
//     "lomadeeCampaignCode": "",
//     "score": 4.7,
//     "price": 139.95,
//     "salePrice": 119.95,
//     "onSale": true,
//     "colors": ["Desert Tan", "Forest Green", "Slate Blue"],
//     "sizes": [7, 8, 9, 10, 11, 12],
//     "tags": ["Trail", "Performance", "New Arrival"],
//     "images": [
//       {
//         "id": 10111,
//         "url": "products/horizon-trail-rush-desert-tan-main.jpg",
//         "alt": "Horizon Trail Rush Desert Tan - Main View",
//         "isMain": true
//       },
//       {
//         "id": 10112,
//         "url": "products/horizon-trail-rush-desert-tan-side.jpg",
//         "alt": "Horizon Trail Rush Desert Tan - Side View",
//         "isMain": false
//       }
//     ],
//     "specifications": {
//       "material": "Ripstop nylon mesh with TPU overlays, rubber outsole",
//       "weight": "315g (size 9)",
//       "cushioning": "Responsive rock plate and EVA foam",
//       "closure": "Quick-pull lacing system",
//       "archSupport": "Medium to High"
//     }
//   }

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

//   {
//     "id": 4001,
//     "name": "Running Shoes",
//     "departmentId": 3001,
//     "description": "Shoes designed specifically for running and jogging activities, featuring enhanced cushioning and support.",
//     "keywords": "running, jogging, marathon, athletic footwear",
//     "isActive": true,
//     "iconUrl": "categories/running_icon.png",
//     "bannerUrl": "categories/running_banner.jpg",
//     "displayOrder": 1,
//     "metaDescription": "Discover premium running shoes designed for comfort, support, and performance on any terrain.",
//     "filters": [
//       {
//         "name": "Support Type",
//         "values": ["Neutral", "Stability", "Motion Control"]
//       },
//       {
//         "name": "Cushioning",
//         "values": ["Minimal", "Moderate", "Maximum"]
//       },
//       {
//         "name": "Terrain",
//         "values": ["Road", "Trail", "Track"]
//       }
//     ]
//   }
// BRANDS JSON

//! Add necessary type definitions for the brands json file

type ID = string | number;

export interface IBrand {
  id: ID;
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

//   {
//     "id": "445566",
//     "name": "SportyStep",
//     "logo": "sportystep_logo.png",
//     "description": "Innovative footwear brand specializing in high-performance athletic shoes for all sports.",
//     "foundedYear": 1990,
//     "website": "https://www.sportystep.com",
//     "isActive": true,
//     "headquarters": "Los Angeles, USA",
//     "signature": "SportyStep Cushioning",
//     "socialMedia": {
//       "instagram": "@sportystep",
//       "twitter": "@sportystep",
//       "facebook": "SportyStepOfficial"
//     }
//   },

// DEPARTMENTS JSON
//! Add necessary type definitions for the departments json file

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

//   {
//     "id": 3001,
//     "name": "Athletic Performance",
//     "description": "Footwear designed specifically for athletic activities and sports performance, featuring technical innovations for enhanced performance.",
//     "isActive": true,
//     "displayOrder": 1,
//     "iconUrl": "departments/athletic_icon.png",
//     "bannerUrl": "departments/athletic_banner.jpg",
//     "metaDescription": "Discover high-performance athletic footwear engineered for serious athletes and fitness enthusiasts.",
//     "featuredCategories": [4001, 4003, 4004],
//     "slug": "athletic-performance"
//   },

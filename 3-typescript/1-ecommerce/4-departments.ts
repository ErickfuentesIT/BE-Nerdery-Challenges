/**
 *  Challenge 5: Get Departments with Product Count
 *
 * Create a function that takes an array of departments and products, and returns a new array of departments with the amount of products available in each department.
 *
 * Requirements:
 * - The function should accept an array of Department objects and an array of Product objects.
 * - Each department should include the quantity of products available in that department. productAvailableInDepartment: 23
 * - The department should be idetified just by its name and id other properties should be excluded. departmentName: Sears, id: 8080
 * - In the information of the department, include the amount of products available in that department and
 *   just the name and id of the department.
 * - Add the name of the products in an array called productsNames inside the department object.
 * [
 *  {
 *    id: number --> departments.id
 *    departmentName: string, --> departments.name
 *    productAvailableInDepartment: number, --> products.id === departments.id ? productAvailableInDepartment += 1 : productAvailableInDepartment;
 *    productsNames: string[] --> products.name
 *  }
 * ]
 *
 */

import { IDepartment, IProduct } from "./1-types";
import readJson from "./utils/read-json.util";
const departmentsFilePath = "./data/departments.json";
const productsFilePath = "./data/products.json";

interface IProductsPerDepartment {
  id: number;
  departmentName: string;
  productAvailableInDepartment: number;
  productName: string[];
}

async function getDepartmentsWithProductCount(
  departments: IDepartment[],
  products: IProduct[],
): Promise<IProductsPerDepartment[]> {
  // Implement the function logic here

  const departmentIdAndName: Record<string, IProductsPerDepartment> = {};

  departments.forEach((department) => {
    departmentIdAndName[department.id] = {
      id: department.id,
      departmentName: department.name,
      productAvailableInDepartment: 0,
      productName: [],
    };
  });

  products.forEach((product) => {
    const department = departmentIdAndName[product.departmentId];
    if (department) {
      department.productAvailableInDepartment += 1;
      department.productName.push(product.name);
    }
  });

  return Object.values(departmentIdAndName);
}

async function execute() {
  const [department, product] = await Promise.all([
    readJson<IDepartment>(departmentsFilePath),
    readJson<IProduct>(productsFilePath),
  ]);
  const result = await getDepartmentsWithProductCount(department, product);
  console.log(result);
}

execute();

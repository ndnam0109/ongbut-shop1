import { BaseModel, CrudRepository } from "./crud.repo";
import { Product, ProductService } from "./product.repo";

export interface Category extends BaseModel {
  memberId: string;
  name: string;
  code: string;
  productIds: string[];
  hidden: boolean;
  priority: number;
  products: Product[];
}
export class CategoryRepository extends CrudRepository<Category> {
  apiName = "SysProductCategory";
  displayName = "danh mục";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    productIds: [ID]
    priority: Int`);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    productIds: [ID]
    priority: Int
  `);
  shortFragmentWithProducts: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
  image: String
    name: String
categories {
        image
        name
      }

    priority: Int
  `);
  fullFragmentWithProducts: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
 
    name: String
  image: String
    productIds: [ID]
    priority: Int
 
    products {
      ${ProductService.fullFragment}
    }: [Product]
  `);
  async copyCategory(categoryId: string, parentCategoryId: string): Promise<Category> {
    return await this.mutate({
      mutation: `copyCategory(categoryId: "${categoryId}", parentCategoryId: "${parentCategoryId}") {
          ${this.shortFragment}
        }`,
      clearStore: true,
    }).then((res) => {
      return res.data["g0"];
    });
  }
}

export const CategoryService = new CategoryRepository();

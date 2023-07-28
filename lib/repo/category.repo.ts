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
  apiName = "Category";
  displayName = "danh mục";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    code: String
    productIds: [ID]
    hidden: Boolean
    priority: Int`);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    code: String
    productIds: [ID]
    priority: Int
    hidden: Boolean
  `);
  shortFragmentWithProducts: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    code: String
    hidden: Boolean
    priority: Int
  `);
  fullFragmentWithProducts: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    code: String
    productIds: [ID]
    priority: Int
    hidden: Boolean
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

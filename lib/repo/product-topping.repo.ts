import { BaseModel, CrudRepository } from "./crud.repo";

export interface ProductTopping extends BaseModel {
  memberId?: string;
  name: string;
  required?: boolean;
  min?: number;
  max?: number;
  options?: ToppingOption[];
  selectedOptions?: ToppingOption[];
}
export interface ToppingOption {
  name: string;
  price: number;
  isDefault?: boolean;
  [key: string]: any;
}
export interface OrderItemToppingInput {
  toppingId: string;
  toppingName: string;
  optionName: string;
  price: number;
}
export class ProductToppingRepository extends CrudRepository<ProductTopping> {
  apiName = "ProductTopping";
  displayName = "mẫu topping";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    required: Boolean
    min: Int
    max: Int
    options {
      name: String
      price: Float
      isDefault: Boolean
    }: [ToppingOption]
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    required: Boolean
    min: Int
    max: Int
    options {
      name: String
      price: Float
      isDefault: Boolean
    }: [ToppingOption]
  `);
}

export const ProductToppingService = new ProductToppingRepository();

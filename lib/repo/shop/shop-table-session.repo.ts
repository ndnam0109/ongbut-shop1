import { BaseModel, CrudRepository } from "../crud.repo";
import { Product } from "../product.repo";

export interface ShopTableSession extends BaseModel {
  code?: string;
  memberId?: string;
  branchId?: string;
  itemIds: string[];
  amount: number;
  subtotal: number;
  toppingAmount: number;
  itemCount: number;
  note: string;
  status: "OPEN" | "CLOSE";
}

export interface ShopTableSessionItem extends BaseModel {
  shopTableId: string;
  sellerId: string;
  productId: string;
  productName: string;
  basePrice: number;
  qty: number;
  amount: number;
  product: Product;
  note: string;
  toppings: ShopTableSessionItemTopping[];
}
export interface ShopTableSessionItemTopping extends BaseModel {
  toppingId: string;
  toppingName: string;
  optionName: string;
  price: number;
}

export class ShopTableSessionRepository extends CrudRepository<ShopTableSession> {
  apiName = "ShopTableSession";
  displayName = "Phiên bàn";
  shortFragment: string = this.parseFragment(`
    id createdAt updatedAt
    code
    shopTableId
    status
    itemIds
    itemCount
    itemText
    amount
    subtotal
    toppingAmount
    seller{
      id: String
      name: String
      code: string
      address: String
      shopLogo: string
      shopName: String
    }:Member
  `);
  fullFragment: string = this.parseFragment(`
    id createdAt updatedAt
    code
    shopTableId
    status
    itemIds
    itemCount
    itemText
    amount
    subtotal
    toppingAmount
    items {
      id
      createdAt
      updatedAt
      shopTableSessionId
      sellerId
      note
      productId
      productName
      basePrice
      qty
      amount
      product {
        id
        image
      }: Product
      toppings {
        toppingId
        toppingName
        optionName
        price
      }: [ShopTableSessionItemTopping]
    }: [ShopTableSessionItem]
    seller{
      id
      name
      code
      address
      shopLogo
      shopName
    }:Member
  `);

  async getOneByCode(code: string) {
    return await this.query({
      query: `getOneShopTableSessionByCode(code: "${code}") { ${this.fullFragment} }`,
    }).then((res) => res.data.g0);
  }
}

export const ShopTableSessionService = new ShopTableSessionRepository();

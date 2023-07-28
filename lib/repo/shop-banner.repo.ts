import { BaseModel, CrudRepository } from "./crud.repo";
import { Product, ProductService } from "./product.repo";
import { ShopVoucher, ShopVoucherService } from "./shop-voucher.repo";

export interface ShopBanner extends BaseModel {
  image: string;
  title: string;
  subtitle: string;
  actionType: string;
  link: string;
  productId: string;
  voucherId: string;
  isPublic: boolean;
  product: Product;
  voucher: ShopVoucher;
  type: "youtube" | "image";
  youtubeLink: string;
}
export class ShopBannerRepository extends CrudRepository<ShopBanner> {
  apiName = "ShopBanner";
  displayName = "banner cửa hàng";
  shortFragment: string = this.parseFragment(`
  image: String
  title: String
  subtitle: String
  actionType: String
  link: String
  productId: ID
  voucherId: ID
  isPublic: Boolean
  `);
  fullFragment: string = this.parseFragment(`
  image: String
  title: String
  subtitle: String
  actionType: String
  link: String
  productId: ID
  voucherId: ID
  isPublic: Boolean
  product{
    ${ProductService.shortFragment}
  }
  voucher{
    ${ShopVoucherService.shortFragment}
  }`);
}
export const ShopBannerService = new ShopBannerRepository();

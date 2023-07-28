import { BaseModel, CrudRepository } from "./crud.repo";
import { ShopVoucher, ShopVoucherService } from "./shop-voucher.repo";

export interface CustomerVoucher extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  memberId: string;
  code: string;
  customerId: string;
  voucherId: string;
  voucherCode: string;
  issueNumber: number;
  used: number;
  expiredDate: string;
  status: "STILL_ALIVE" | "EXPIRED";
  voucher: ShopVoucher;
}
export class CustomerVoucherRepository extends CrudRepository<CustomerVoucher> {
  apiName = "CustomerVoucher";
  displayName = "khuyến mãi";
  shortFragment: string = this.parseFragment(`
  id: String
  createdAt: DateTime
  updatedAt: DateTime
  memberId: ID
  customerId: ID
  voucherId: ID
  voucherCode: String
  issueNumber: Int
  used: Int
  expiredDate: DateTime
  status: String
  voucher{${ShopVoucherService.shortFragment}}: ShopVoucher
  `);
  fullFragment: string = this.parseFragment(`
  id: String
  createdAt: DateTime
  updatedAt: DateTime
  memberId: ID
  customerId: ID
  voucherId: ID
  voucherCode: String
  issueNumber: Int
  used: Int
  expiredDate: DateTime
  status: String
  voucher{${ShopVoucherService.fullFragment}}: ShopVoucher
  `);
}
export const CustomerVoucherService = new CustomerVoucherRepository();

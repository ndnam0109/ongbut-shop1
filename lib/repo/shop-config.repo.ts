import { BaseModel, CrudRepository } from "./crud.repo";
import { Product } from "./product.repo";
import { ShopBanner } from "./shop-banner.repo";

export interface ShopConfig extends BaseModel {
  memberId: string;
  shipPreparationTime: string;
  shipDefaultDistance: number;
  shipDefaultFee: number;
  shipNextFee: number;
  shipOneKmFee: number;
  shipUseOneKmFee: boolean;
  shipNote: string;
  rating: number;
  ratingQty: number;
  soldQty: number;
  banners: ShopBanner[];
  productGroups: ShopProductGroup[];
  tags: ShopTag[];
  upsaleTitle: string;
  primaryColor: string;
  accentColor: string;
  smsOrder: boolean;
  smsOtp: boolean;
  limitOpenOrder: number;
  limitItem: number;
  banks: Bank[];
  rewardPointConfig: RewardPointConfig;
  supportConfig: SupportConfig;
  notifyConfig: NotifyConfig;
  orderConfig: OrderConfig;
  domainConfig: DomainConfig;
  analyticConfig: AnalyticConfig;
  intro: string;
}

export interface AnalyticConfig {
  googleAnalytic: string;
  facebookPixel: string;
}

export interface ZaloConfig {
  active: boolean;
  status: string;
  oaInfo: any;
  eventFollowOA: any;
}

export interface NotifyConfig {
  orderPending: string;
  orderCanceled: string;
  orderConfirmed: string;
  orderCompleted: string;
  orderFailure: string;
  orderRewardPoint: string;
  colRegisSuccess: string;
  orderPendingForStaff: string;
  orderCanceledForStaff: string;
  orderConfirmedForStaff: string;
  orderCompletedForStaff: string;
  orderFailureForStaff: string;
  ahamoveNotifyEnabled: boolean;
}

export interface DomainConfig {
  active: boolean;
  hostName: string;
  status: "pending" | "connected" | "disconnected";
}

export interface RewardPointConfig {
  active: boolean;
  rewardBy: string;
  rewardUnit: string;
  value: number;
}

export interface SupportConfig {
  menu: { label: string; url: string }[];
  hotline: string;
  email: string;
}

export interface OrderConfig {
  allowCancel: boolean;
  ahamoveEnabled: boolean;
  ahamoveFastForward: boolean;
  skipCart: boolean;
  ahamoveShipFee: boolean;
  ahamoveFastForwardDelay: number;
}

export interface ManychatConfig {
  active: boolean;
  status: string;
  pageInfo: {
    about: string;
    avatar_link: string;
    category: string;
    description: string;
    id: string;
    is_pro: boolean;
    name: string;
    timezone: string;
    username: null;
  };
  mappingField: string;
}

export interface Bank {
  bankName: string;
  ownerName: string;
  bankNumber: string;
  branch: string;
  note: string;
  active: boolean;
}

export interface CassoUser {
  bankAccs: {
    balance: number;
    bank: {
      bin: number;
      codeName: string;
    };
    bankAccountName: string;
    bankSubAccId: string;
    connectStatus: number;
    id: number;
    memo: string;
    planStatus: number;
  }[];
  user: {
    id: number;
    email: string;
  };
  business: {
    id: number;
    name: string;
  };
}

export interface ShopTag {
  name: string;
  icon: string;
  qty: number;
}

export interface ShopProductGroup {
  name: string;
  isPublic: boolean;
  productIds: string[];
  products: Product[];
}

export class ShopConfigRepository extends CrudRepository<ShopConfig> {
  apiName = "ShopConfig";
  displayName = "cấu hình cửa hàng";
  shortFragment: string = this.parseFragment(`
    id: String 
    createdAt: DateTime
    updatedAt: DateTime`);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    shipPreparationTime: String
    shipDefaultDistance: Int
    shipDefaultFee: Float
    shipNextFee: Float
    shipOneKmFee: Float
    shipUseOneKmFee: Boolean
    shipNote: String
    rating: Float
    ratingQty: Int
    soldQty: Int
    upsaleTitle: String
    primaryColor: string
    accentColor: string
    smsOrder: Boolean
    smsOtp: Boolean
    limitOpenOrder: number
    limitItem: number
    codEnabled: boolean
    supportConfig{
      menu: [Mixed];
      hotline: String;
      email: String;
    }: SupportConfig;
    rewardPointConfig{
      active: Boolean
      rewardBy: String
      rewardUnit: String
      value: Int
    }
   
    notifyConfig{
      orderPending: String
      orderCanceled: String
      orderConfirmed: String
      orderCompleted: String
      orderFailure: String
      orderPendingForStaff: String
      orderCanceledForStaff: String
      orderConfirmedForStaff: String
      orderCompletedForStaff: String
      orderFailureForStaff: String
      orderRewardPoint: String
    }
    banners {
      type: String
      image: String
      title: String
      subtitle: String
      actionType: String
      link: String
      productId: ID
      voucherId: ID
      isPublic: Boolean
      product {
        id: String
        code: String
        name: String
      }: Product
      voucher {
        id: String
        code: String
        description: String
      }: ShopVoucher
      youtubeLink: String
    }: [ShopBanner]
    productGroups {
      name: String
      isPublic: Boolean
      productIds: [ID]
      products {
        id: String
        code: String
        name: String
        allowSale: Boolean
        basePrice: Float
        downPrice: Float
        saleRate: Int
        subtitle: String
        image: String
        image_16_9: String
        cover: String
        rating: Float
        soldQty: Int
        labelIds: [ID]
        labels {
          id: String
          name: String
          color: String
        }: [ProductLabel]
      }: [Product]
    }: [ShopProductGroup]
    orderConfig{
      allowCancel: Boolean
      skipCart: Boolean
    }: OrderConfig
    tags { 
      name: String
      icon: String
      qty: Int 
    }: [ShopTag]
    banks {
      bankName: string
      ownerName: string
      bankNumber: string
      branch: string
      note: string
      active: boolean
    }  
    domainConfig{
      active: Boolean
      hostName: String
      status: String
    }: DomainConfig
    analyticConfig {
      googleAnalytic: String
      facebookPixel: String
    }
    intro: String;
  `);

  async getShopConfig(): Promise<ShopConfig> {
    return this.query({
      query: `getShopConfig {
          ${this.fullFragment}
        }`
    })
      .then((res) => res.data.g0)
      .catch((err) => {
        throw err;
      });
  }

  async cancelShopDomain() {
    return this.mutate({
      mutation: `
      cancelShopDomain
      `
    }).then((res) => res);
  }
}

export const ShopConfigService = new ShopConfigRepository();

export const SHOP_BANNER_ACTIONS: Option[] = [
  { value: "NONE", label: "Không có" },
  { value: "PRODUCT", label: "Món" },
  { value: "VOUCHER", label: "Voucher" },
  { value: "WEBSITE", label: "Trang web" }
];

export const SHOP_BANNER_TYPES: Option[] = [
  { value: "image", label: "Ảnh" },
  { value: "youtube", label: "Youtube" }
];

export const SHOP_KM_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10].map((km) => ({
  value: km,
  label: `${km}km đầu tiên`
}));

export const CASSO_STATUS: Option[] = [
  { value: "connected", label: "Đã kết nối", color: "success" },
  { value: "disconnected", label: "Chưa kết nối", color: "slate" }
];


export const DOMAIN_STATUS: Option[] = [
  { value: "pending", label: "Đã kết nối", color: "success" },
  { value: "connected", label: "Đã kết nối", color: "success" },
  { value: "disconnected", label: "Chưa kết nối", color: "slate" }
];
export const REWARD_BY: Option[] = [
  { value: "order", label: "Đơn hàng", color: "success" },
  { value: "product", label: "Sản phẩm", color: "slate" }
];


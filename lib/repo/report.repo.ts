import { TimeUnit } from "../../components/shared/report/providers/report-providers";
import { formatDate, parseQuery } from "../helpers/parser";
import { GraphRepository } from "./graph.repo";

export interface ShopReport {
  summary: {
    freePlan: number;
    payPlan: number;
    totalShop: number;
  };
  categories: {
    id: string;
    name: string;
    image: string;
    totalShop: number;
  }[];
  topRevenue: {
    id: string;
    revenue: number;
    shopLogo: string;
    shopName: string;
  }[];
  topOrder: {
    id: string;
    order: number;
    shopLogo: string;
    shopName: string;
  }[];
  topDiscount: {
    discount: number;
    id: string;
    shopLogo: string;
    shopName: string;
  }[];
}

export interface OrderReport {
  summary: {
    canceled: number;
    completed: number;
    processing: number;
  };
  chart: {
    datasets: {
      label: string;
      data: number[];
    }[];
    labels: string[];
  };
  topProducts: {
    amount: number;
    id: string;
    name: string;
    price: number;
    qty: number;
  }[];
  topShops: {
    id: string;
    order: number;
    shopLogo: string;
    shopName: string;
  }[];
  topRevenue: {
    id: string;
    revenue: number;
    shopLogo: string;
    shopName: string;
  }[];
}

export interface CustomerReport {
  summary: {
    filter: number;
    total: number;
  };
  topOrder: {
    customerName: string;
    customerPhone: string;
    id: string;
    order: number;
  }[];
  topRevenue: {
    customerName: string;
    customerPhone: string;
    id: string;
    revenue: number;
  }[];
}

export interface PromotionReport {
  summary: {
    filter: number;
    total: number;
  };
  order: {
    total: number;
  };
  topIssue: {
    id: string;
    total: number;
    shopName: string;
    name: string;
    description: string;
  }[];
  category: {
    name: string;
    value: number;
  }[];
}

export interface RewardPointReport {
  summary: {
    issued: number;
    used: number;
  };
  topCustomer: {
    issued: number;
    used: number;
    remaining: number;
    shopName: string;
    customerName: string;
    customerPhone: string;
  }[];
}

export class ReportRepository extends GraphRepository {
  async reportShop(): Promise<ShopReport> {
    return this.query({
      query: `
        reportShop {
          ${this.parseFragment(`
            summary: Mixed
            categories: Mixed
            topRevenue: Mixed
            topOrder: Mixed
            topDiscount: Mixed
          `)}
        }
      `
    }).then((res) => res.data.g0);
  }

  async reportOrder({
    fromDate,
    toDate,
    memberId,
    timeUnit
  }: {
    fromDate: Date;
    toDate: Date;
    memberId: string;
    timeUnit: TimeUnit;
  }): Promise<OrderReport> {
    return this.query({
      query: `
        reportOrder(${parseQuery({ fromDate, toDate, memberId, timeUnit })}) {
          ${this.parseFragment(`
            summary: Mixed
            topProducts: Mixed
            topShops: Mixed
            topRevenue: Mixed
            chart: Mixed
          `)}
        }
      `
    }).then((res) => res.data.g0);
  }

  async reportCustomer({
    fromDate,
    toDate
  }: {
    fromDate: Date;
    toDate: Date;
  }): Promise<CustomerReport> {
    return this.query({
      query: `
        reportCustomer(${parseQuery({ fromDate, toDate })}) {
          ${this.parseFragment(`
            summary: Mixed
            topOrder: Mixed
            topRevenue: Mixed
          `)}
        }
      `
    }).then((res) => res.data.g0);
  }


  async reportRewardPoint({
    memberId,
    fromDate,
    toDate
  }: {
    fromDate: string;
    toDate: string;
    memberId: string;
  }): Promise<RewardPointReport> {
    fromDate = formatDate(fromDate, "yyyy-MM-dd");
    toDate = formatDate(toDate, "yyyy-MM-dd");
    return this.query({
      query: `
        reportRewardPoint(${parseQuery({ fromDate, toDate, memberId })}) {
          ${this.parseFragment(`
            summary: Mixed
            topCustomer: Mixed
          `)}
        }
      `
    }).then((res) => res.data.g0);
  }

  async reportPromotion({
    memberId,
    fromDate,
    toDate
  }: {
    fromDate: string;
    toDate: string;
    memberId: string;
  }): Promise<PromotionReport> {
    fromDate = formatDate(fromDate, "yyyy-MM-dd");
    toDate = formatDate(toDate, "yyyy-MM-dd");
    return this.query({
      query: `
        reportPromotion(${parseQuery({ fromDate, toDate, memberId })}) {
          ${this.parseFragment(`
            summary: Mixed
            order: Mixed
            topIssue: Mixed
            category: Mixed
          `)}
        }
      `
    }).then((res) => res.data.g0);
  }

  async reportShopProduct(fromDate: Date, toDate: Date) {
    return await this.apollo
      .query({
        query: this
          .gql`query {  reportShopProduct(filter:{fromDate:"${fromDate.toISOString()}", toDate: "${toDate.toISOString()}"})
           { 
             top10{ productId qty productName}
            }}`
      })
      .then((res) => res.data["reportShopProduct"]);
  }

  async reportShopVoucher(fromDate: Date, toDate: Date) {
    return await this.apollo
      .query({
        query: this
          .gql`query {  reportShopVoucher(filter:{fromDate: "${fromDate.toISOString()}", toDate: "${toDate.toISOString()}"})
           { 
             top10{ voucherId qty voucher{code description}}
            }}`
      })
      .then((res) => res.data["reportShopVoucher"]);
  }

  async reportShopOrder(fromDate: Date, toDate: Date, shopBrandId?: string) {
    return await this.apollo
      .query({
        query: this
          .gql`query {  reportShopOrder(filter:{fromDate:"${fromDate.toISOString()}", toDate: "${toDate.toISOString()}"})
           { 
             pending confirmed delivering completed canceled failure total pendingRevenue revenue 
             partnerShipfee shipfee discount
            }}`
      })
      .then((res) => res.data["reportShopOrder"]);
  }

  async reportShopOrderKline(fromDate: Date, toDate: Date, shopBrandId?: string) {
    return await this.apollo
      .query({
        query: this
          .gql`query {  reportShopOrderKline(filter:{fromDate:"${fromDate.toISOString()}", toDate: "${toDate.toISOString()}"})
           { 
             labels datasets{label data}
            }}`
      })
      .then((res) => res.data["reportShopOrderKline"]);
  }

  async reportShopCustomer() {
    return await this.apollo
      .query({
        query: this.gql`query {  reportShopCustomer {total}}`
      })
      .then((res) => res.data["reportShopCustomer"]);
  }
}

export const ReportService = new ReportRepository();

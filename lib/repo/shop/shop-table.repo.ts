import { BaseModel, CrudRepository } from "../crud.repo";
import { TableZone } from "../table-zone.repo";

export interface ShopTable extends BaseModel {
  name?: string;
  code?: string;
  memberId?: string;
  branchId?: string;
  pickupUrl?: string;
  zoneName?: string;
  zoneSlug?: string;
}
export class ShopTableRepository extends CrudRepository<ShopTable> {
  apiName = "ShopTable";
  displayName = "Bàn";
  shortFragment: string = this.parseFragment(`
    id createdAt updatedAt
    name
    code
    pickupUrl
    branchId
    zoneId
    zoneName
    zoneSlug
  `);
  fullFragment: string = this.parseFragment(`
    id createdAt updatedAt
    name
    code
    memberId
    branchId
    zoneId
    zoneName
    zoneSlug
  `);

  async getOneByCode(code: string) {
    return await this.query({
      query: `getOneShopTableByCode(code: "${code}") { ${this.fullFragment} }`,
    }).then((res) => res.data.g0);
  }
}

export const ShopTableService = new ShopTableRepository();

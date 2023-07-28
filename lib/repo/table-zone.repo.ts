import { BaseModel, CrudRepository } from "./crud.repo";
import { ShopTable } from "./shop/shop-table.repo";

export interface TableZone extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  slug: string;
  shopTables: ShopTable[];
}
export class TableZoneRepository extends CrudRepository<TableZone> {
  apiName = "TableZone";
  displayName = "Khu vực";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    slug: String
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    slug: String
  `);
}
export const TableZoneService = new TableZoneRepository();

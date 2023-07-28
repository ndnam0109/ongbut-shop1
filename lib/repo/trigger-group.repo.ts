import { BaseModel, CrudRepository } from "./crud.repo";

export interface TriggerGroup extends BaseModel {
  memberId: string;
  name: string;
  description: string;
  triggerIds: string[];
}
export class TriggerGroupRepository extends CrudRepository<TriggerGroup> {
  apiName = "TriggerGroup";
  displayName = "nhóm chiến dịch";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    description: String
    triggerIds: [ID]
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    memberId: ID
    name: String
    description: String
    triggerIds: [ID]
  `);
}

export const TriggerGroupService = new TriggerGroupRepository();

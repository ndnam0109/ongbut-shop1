import axios from "axios";
import { GetUserToken } from "../graphql/auth.link";
import { BaseModel, CrudRepository } from "./crud.repo";

export interface Attachment extends BaseModel {
  name: string;
  mimetype: string;
  size: number;
  etag: string;
  path: string;
  downloadUrl: string;
}

export class AttachmentRepository extends CrudRepository<Attachment> {
  apiName = "Attachment";
  displayName = "dữ liệu";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    mimetype: String
    size: Int
    downloadUrl: String
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    name: String
    mimetype: String
    size: Int
    etag: String
    path: String
    downloadUrl: String
  `);
  async uploadFile(files: File) {
    const formData = new FormData();
    formData.append("file", files);
    return (
      await axios.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": GetUserToken(),
        },
      })
    ).data;
  }
  async getFilesPromise(ids: string[]) {
    return await this.getAll({ query: { limit: 1000, filter: { _id: { __in: ids } } } }).then(
      (res) => {
        return res.data;
      }
    );
  }
}

export const AttachmentService = new AttachmentRepository();

import { axiosInstance } from "../core.api"
import { CommentDataType } from "@/pages/main/components/post-detail-modal/components/comment/comment-form"

const COMMENT_PATH = "/data/comment"

export const CommentApi = {
  /**
   * @function getComment
   * @method GET
   * @params pageParam:number
   */
  async getComment({ pageParam, parentId }: { pageParam: number; parentId: string }) {
    const res = await axiosInstance.get(COMMENT_PATH + `?page=${pageParam}&parentId=${parentId}`)
    console.log("comment res", res)
    return res.data
  },
  /**
   * @function postComment
   * @method POST
   * @data {nickName:string, profileUrl:string, userId:string}
   * @params data
   */
  async postComment(data: CommentDataType) {
    const res = await axiosInstance.post(COMMENT_PATH, data)
    return res
  },
}

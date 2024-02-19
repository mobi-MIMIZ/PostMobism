import { axiosInstance } from "../core.api"

const COMMENT_PATH = "/data/comment"

export const CommentApi = {
  /**
   * @function getComment
   * @method GET
   * @params pageParam:number
   */
  async getComment({ page, postId }: { page: number; postId: string }) {
    const res = await axiosInstance.get(COMMENT_PATH, {
      params: {
        page,
        parentId: postId,
      },
    })
    return res.data
  },
  /**
   * @function postComment
   * @method POST
   * @data {nickName:string, profileUrl:string, userId:string}
   * @params data
   */
  async postComment({ parentId, content }: { parentId: string; content: string }) {
    const res = await axiosInstance.post(COMMENT_PATH, {
      params: {
        auth: "true",
        parentId,
        content,
      },
    })
    return res
  },
}

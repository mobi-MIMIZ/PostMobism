import { axiosInstance } from "./core.api"

const COMMENT_PATH = "/data/comment"

export const CommentApi = {
  async getComment() {
    const res = await axiosInstance.get(COMMENT_PATH)
    return res.data
  },
  async postComment(postId: string) {
    const res = await axiosInstance.post(COMMENT_PATH, {
      params: {
        dataId: postId,
      },
    })
    return res.data
  },
}

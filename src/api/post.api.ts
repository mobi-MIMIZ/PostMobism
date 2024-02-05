import { axiosInstance } from "./core.api"

const POST_PATH = "/data/post"
const COMMENT_PATH = "/data/comment"

export const PostApi = {
  async getPost({ ...postData }) {
    const res = await axiosInstance.get(POST_PATH, {
      ...postData,
    })
    return res.data
  },
  async postPost() {
    const res = await axiosInstance.post(POST_PATH)
    return res.data
  },
  async deletePost({ ...postData }) {
    const res = await axiosInstance.delete(POST_PATH, {
      ...postData,
    })
    return res.data
  },
  async editPost({ ...postData }) {
    const res = await axiosInstance.patch(POST_PATH, {
      ...postData,
    })
    return res.data
  },
}

export const CommentApi = {
  async getComment() {
    const res = await axiosInstance.get(COMMENT_PATH)
    return res
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

import { axiosInstance } from "../core.api"
import { TGetPostRequest, Post } from "@/type/dto/post.dto"

const POST_PATH = "/data/post"

export const PostApi = {
  async getPost({ id, title }: TGetPostRequest) {
    const res = await axiosInstance.get<{ title: string; content: string }[]>(POST_PATH, {
      params: {
        id,
        title,
      },
    })
    return res.data
  },

  async postPost() {
    const res = await axiosInstance.post(POST_PATH)
    return res.data
  },
  async deletePost(id: string) {
    const res = await axiosInstance.delete(POST_PATH + `/${id}`)
    return res.data
  },
  async editPost({ title, content }: Post, id: string) {
    const req = { title, content }
    const res = await axiosInstance.patch(POST_PATH + `/${id}`, req)
    return res.data
  },
  async getDetailPost(postId: string) {
    const res = await axiosInstance.patch(POST_PATH, {
      params: {
        dataId: postId,
      },
    })
    return res.data
  },
}

// example
;(async () => {
  const Posts = await PostApi.getPost({
    id: "",
    title: "",
  })

  Posts.map(post => post.content)
})()

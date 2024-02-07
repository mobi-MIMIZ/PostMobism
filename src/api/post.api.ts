import { axiosInstance } from "./core.api"
import { TGetPostRequest } from "@/type/dto/post.dto"

const POST_PATH = "/data/post"

export const PostApi = {
  /**
   * @param param0
   * @returns
   */
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
;(async () => {
  const Posts = await PostApi.getPost({
    id: "",
    title: "",
  })

  Posts.map(post => post.content)
})()

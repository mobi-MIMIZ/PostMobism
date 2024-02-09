import { axiosInstance } from "../core.api"
import { TGetPostRequest, Post } from "@/type/dto/post.dto"

const POST_PATH = "/data/post"

export const PostApi = {
  /**
   * @function getPost
   * @method GET
   * @params dataName: string
   * @queries parentId: string, page: number, limit: boolean
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
  /**
   * @function postPost
   * @method POST
   * @params dataName: string
   * @queries dataId: string
   */
  async postPost() {
    const res = await axiosInstance.post(POST_PATH)
    return res.data
  },
  /**
   * @function deletePost
   * @method DELETE
   * @params dataName: string
   * @queries dataId: string
   */
  async deletePost(id: string) {
    const res = await axiosInstance.delete(POST_PATH + `/${id}`)
    return res.data
  },
  /**
   * @function editPost
   * @method PATCH
   * @body only update-data-sets
   * @formData images: [File, File, File], update-data-sets
   * @params dataName: string
   * @queries dataId: string
   */
  async editPost({ title, content }: Post, id: string) {
    const req = { title, content }
    const res = await axiosInstance.patch(POST_PATH + `/${id}`, req)
    return res.data
  },
  /**
   * @function getDetailPost
   * @method GET
   * @params dataName: string
   * @queries dataId: string
   */
  async getDetailPost(dataId: string) {
    const res = await axiosInstance.get(POST_PATH + "/detail", {
      params: {
        dataId,
      },
    })
    return res.data
  },
}

// peanut 님이 이건 예시라던데 지워도 되는 걸까요? 아니면 필요해서 남겨두신 걸까요??
;(async () => {
  const Posts = await PostApi.getPost({
    id: "",
    title: "",
  })

  Posts.map(post => post.content)
})()

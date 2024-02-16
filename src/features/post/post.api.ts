import { TPostsResponse } from "@/type/type"
import { axiosInstance } from "../core.api"
import { Post } from "@/type/dto/post.dto"

const POST_PATH = "/data/post"

export const PostApi = {
  /**
   * @function getPost
   * @method GET
   * @params dataName: string
   * @queries parentId: string, page: number, limit: boolean
   */
  async getPosts() {
    const res = await axiosInstance.get<TPostsResponse>(POST_PATH)
    return res.data
  },

  async getOnePost(postId: string) {
    const res = await axiosInstance.get<{
      data: Post
      children: Comment
    }>("/data/detail/post", {
      params: {
        dataId: postId,
      },
    })
    return res.data
  },
  /**
   * @function postPost
   * @method POST
   * @body parentId: string
   * @formData {images: [File, File, File], parentId: string}
   * @params dataName: string
   * @queries dataId: string
   */
  async postPost({ formData }: { formData: FormData }) {
    const res = await axiosInstance.post(POST_PATH, formData, {
      params: { auth: "true" },
    })
    return res.data
  },
  /**
   * @function deletePost
   * @method DELETE
   * @params dataName: string
   * @queries dataId: string
   */
  async deletePost(dataId: string) {
    const res = await axiosInstance.delete(POST_PATH + `/${dataId}`)
    return res
  },
  /**
   * @function editPost
   * @method PATCH
   * @body only update-data-sets
   * @formData images: [File, File, File], update-data-sets
   * @params dataName: string
   * @queries dataId: string
   */
  async editPost({ title, content }: Partial<{ title: string; content: string }>, dataId: string) {
    const req = { title, content }
    const res = await axiosInstance.patch(POST_PATH + `/${dataId}`, req)
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

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
   * @body parentId: string
   * @formData {images: [File, File, File], parentId: string}
   * @params dataName: string
   * @queries dataId: string
   */
  async postPost({ title, content }: Post) {
    const postData = { title, content }
    const res = await axiosInstance.post(POST_PATH, postData)
    return res.data
  },
  /**
   * @function deletePost
   * @method DELETE
   * @params dataName: string
   * @queries dataId: string
   */
  async deletePost(dataId: string) {
    const res = await axiosInstance.delete(POST_PATH, {
      params: {
        dataId,
      },
    })
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
  async editPost({ title, content }: Post, dataId: string) {
    const req = { title, content }
    const res = await axiosInstance.patch(POST_PATH, {
      params: {
        dataId,
      },
      req,
    })
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
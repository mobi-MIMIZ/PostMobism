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
  async getPost(): Promise<{ id: string; title: string }[]> {
    try {
      const response = await axiosInstance.get<{ id: string; title: string }[]>(POST_PATH)
      // response.data가 정의되어 있는지 확인
      if (response.data) {
        console.log("API 응답:", response.data)
        return response.data
      } else {
        console.error("API 응답에서 데이터가 정의되어 있지 않습니다.")
        throw new Error("API 응답에서 데이터가 정의되어 있지 않습니다.")
      }
    } catch (error) {
      console.error("getPost 메서드에서 오류 발생:", error)
      throw error
    }
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
    const res = await axiosInstance.delete(POST_PATH + `${dataId}`)
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

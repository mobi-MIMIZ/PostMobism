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
    const res = await axiosInstance.get(COMMENT_PATH, {
      params: {
        page: pageParam,
        parentId,
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
  async postComment(data: CommentDataType) {
    const res = await axiosInstance.post(COMMENT_PATH, data, {
      params: {
        auth: "true",
      },
    })
    return res
  },
}


/**
 * key 값 캐싱...
 * 왜 두번씩 찍힌는가 -> 막아야함..
 * rtkQuery를 써야한다!
 * -----
 * comment  ->  무한 스크롤링 rtkQuery .... 
 * -----
 * @todo 게시글 페이지네이션 잘되는가? / 댓글무한스크롤링, 중복제출 방지/ 데이터 캐싱문제 
 * @issue 데이터 중복제출, 데이터 캐싱문제!
 * 
 * 
 */
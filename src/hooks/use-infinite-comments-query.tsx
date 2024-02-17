import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query"
import { commentApi } from "@/hooks/use-get-comment-list-query"
import { QUERY_KEY } from "@/consts/query-key"

type CommentListType = {
  createdAt: string
  data: {
    content: string
    nickName: string
    parentId: string
    profileUrl: string | undefined
    userId: string
  }
  dataImage: any[]
  dataUser: any
  id: string
}

type CommentPageType = {
  commentList: CommentListType[]
  nextPage: number | null
}

export const useInfiniteCommentsQuery = (
  postId: string | undefined,
  options?: UseInfiniteQueryOptions<CommentPageType, Error>,
) => {
  return useInfiniteQuery<CommentPageType, Error>(
    [QUERY_KEY.COMMENT_LIST, postId],
    async ({ pageParam = 1 }) => {
      //오ㅐ.왜...
      const data = await commentApi.endpoints.getCommentList({ postId, pageParam })
      return {
        commentList: data.commentList,
        nextPage: data.nextPage,
      }
    },
    {
      getNextPageParam: lastPage => lastPage.nextPage ?? undefined,
      ...options,
    },
  )
}

// export function useGetCommentQuery(postId: string) {
//   const {
//     data: commentList,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isSuccess,
//   } = useInfiniteQuery({
//     queryKey: [QUERY_KEY.COMMENT_LIST],
//     queryFn: async ({ pageParam = 1 }) => {
//       return await CommentApi.getComment({ pageParam, parentId: postId })
//     },
//     getNextPageParam: lastPage => {
//       // 마지막으로 가져온 페이지 데이터
//       const { pageNation } = lastPage
//       const { current, total } = pageNation
//       if (current === total) return null // 다음 페이지가 없는 경우 null 반환
//       return current + 1 // 다음 페이지 번호 반환
//     },
//   })
//   return { commentList, fetchNextPage, hasNextPage, isFetching, isSuccess }
// }

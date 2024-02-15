import { QUERY_KEY } from "@/consts/query-key"
import { CommentApi } from "@/features/comment/comment.api"
import { useInfiniteQuery } from "react-query"

export function useGetCommentQuery(postId: string) {
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.COMMENT_LIST],
    queryFn: async ({ pageParam = 1 }) => {
      return await CommentApi.getComment({ pageParam, parentId: postId })
    },
    getNextPageParam: lastPage => {
      // 마지막으로 가져온 페이지 데이터
      const { pageNation } = lastPage
      const { current, total } = pageNation
      if (current === total) return null // 다음 페이지가 없는 경우 null 반환
      return current + 1 // 다음 페이지 번호 반환
    },
  })
  return { commentList, fetchNextPage, hasNextPage, isFetching, isSuccess }
}

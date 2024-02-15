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
    queryKey: [QUERY_KEY.COMMENT_LIST, postId],
    queryFn: async ({ pageParam }) => {
      return await CommentApi.getComment({ pageParam, parentId: postId })
    },
    getNextPageParam: lastPage => {
      const page = lastPage.pageNation.current
      if (lastPage.pageNation.total === page) return
      return page + 1
    },
  })
  return { commentList, fetchNextPage, hasNextPage, isFetching, isSuccess }
}

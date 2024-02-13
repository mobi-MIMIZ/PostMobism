import { QUERY_KEY } from "@/consts/query-key"
import { useInfiniteQuery } from "react-query"

export function useGetCommentQuery() {
  const {
    data: commentList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.COMMENT_LIST],
    queryFn: ({ pageParam = { startIdx: 1, endIdx: 12 } }) => RecipeApi.getRecipe(pageParam),
    getNextPageParam: (lastPage, totalPages) => {
      const startIdx = totalPages.length * 12 + 1
      let endIdx = (totalPages.length + 1) * 12

      if (lastPage.COOKRCP01.total_count < endIdx) {
        endIdx = lastPage.COOKRCP01.total_count
      }
      if (startIdx > lastPage.COOKRCP01.total_count) {
        return null
      }
      return { startIdx, endIdx }
    },
  })
  return { recipeData, fetchNextPage, hasNextPage, isFetching, isSuccess }
}

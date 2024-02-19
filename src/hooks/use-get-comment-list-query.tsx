import { TokenRepository } from "@/repository/token-repository"
import { TCommentsResponse } from "@/type/type"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const token = TokenRepository.getToken()

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    headers: {
      authorization: `Bearer ${token}`,
    },
    credentials: "include",
  }),
  tagTypes: ["Comment"],
  endpoints: builder => ({
    getCommentList: builder.query<TCommentsResponse, { postId: string; pageParam: number }>({
      query: ({ postId, pageParam }) => ({
        url: `/data/comment?parentId=${postId}&page=${pageParam}&apiKey=${import.meta.env.VITE_API_KEY}&pair=${import.meta.env.VITE_PAIR}`,
        method: "GET",
      }),
      providesTags: ["Comment"],
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs }
        if (newQueryArgs.pageParam) {
          newQueryArgs.pageParam = 0
        }
        return newQueryArgs
      },
      // @issue: 캐싱데이터가 지워지지않는 현상
      merge: (currentCacheData, responseData) => {
        console.log(currentCacheData.pagination?.current)
        if (currentCacheData.data) {
          return {
            ...currentCacheData,
            ...responseData,
            data: [...currentCacheData.data, ...responseData.data],
          }
        }
      },
    }),
  }),
})

export const { useGetCommentListQuery } = commentApi

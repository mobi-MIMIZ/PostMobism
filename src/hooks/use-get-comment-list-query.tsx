import { axiosInstance } from "@/features/core.api"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${axiosInstance}` }),
  endpoints: builder => ({
    getCommentList: builder.query({
      query: ({ postId, pageParam }) => ({
        url: `/data/comment?postId=${postId}&page=${pageParam}`,
        method: "GET",
      }),
    }),
  }),
})

export const { useGetCommentListQuery } = commentApi

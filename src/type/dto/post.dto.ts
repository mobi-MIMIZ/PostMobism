//type alias
export type TGetPostRequest = {
  id: string
  title: string
}

export type Post = {
  title: string,
  content: string
}
export type TGetPostResponse = Post[]

// zod로 추론하는 방법.
// const GetPostRequset = z.object({
//     title: z.string()
// })
// export const GetPostRequsetType = z.infer<typeof GetPostRequset>

//zod infer

/**
 * dto
 * -> backend에서오는 request & res 타입 정의 (예시만)
 */

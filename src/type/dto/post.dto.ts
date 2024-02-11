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

/**
 * "i"는 "interface"를 의미하는 약어입니다. 
 * TypeScript에서는 인터페이스를 정의할 때 일반적으로 "I" 접두사를 사용하여 구분합니다. 
 * 이것은 코드를 읽는 사람에게 해당 심볼이 인터페이스임을 명확하게 알려주는 관례입니다. 
 * 
 * 예를 들어, "IFormInput"은 "FormInput"의 인터페이스를 나타냅니다.
 * 이렇게 하면 코드의 가독성이 향상되고 인터페이스와 클래스를 쉽게 구분할 수 있습니다.
 */

/**
Type alias를 정의할 때 이름을 지을 때 T를 사용하는 것은 일반적으로 많이 사용되는 관습 중 하나입니다. 
하지만 T는 필수적이거나 고정된 것은 아닙니다. 
보통 Type alias의 목적이 어떤 타입을 대표하는 일반적인 이름을 제공하는 것이므로, 
해당 타입을 대표하는 이름을 선택하는 것이 중요합니다.
 */
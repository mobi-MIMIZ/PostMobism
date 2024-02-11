import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



/*
Redux의 useDispatch와 useSelector를 사용할 때 타입 지정을 편리하게 하기 위한 hook

[ useAppDispatch ]
Redux의 useDispatch 훅을 사용하여 액션을 디스패치할 때 타입을 명확하게 지정 
TypeScript가 올바른 액션을 디스패치하는지 확인하고,
잘못된 타입의 액션을 디스패치하는 오류를 방지

[ useAppSelector ]
Redux의 useSelector 훅을 사용하여 상태를 선택할 때 RootState의 타입을 명시적으로 지정
상태를 선택할 때 상태의 타입을 명확하게 지정
이렇게 함으로써 Redux를 사용할 때 타입 관련 오류를 줄이고 
코드의 가독성과 유지 보수성을 향상시킴
 */
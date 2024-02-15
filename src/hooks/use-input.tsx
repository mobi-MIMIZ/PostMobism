import { ChangeEvent, useState } from "react"

type InputValues = {
  [key: string]: string
}

type UseInputsReturnType = [
  InputValues,
  (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<InputValues>>,
]

/**
 * @onChange inputValue 변경될 때마다 호출되는 이벤트 함수
 * @param initialValue useState를 사용한 초기 상태 값 설정
 * @returns input value 값, onChange 이벤트 함수, input value 상태를 업데이트 하는 set함수를 포함하는 배열 반환
 */
const useInput = (initialValue: InputValues): UseInputsReturnType => {
  const [value, setValue] = useState<InputValues>(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return [value, onChange, setValue]
}

export default useInput

// max length
const MAX_TITLE_LENGTH = 100

/**
 * @function skipTitleView title을 전달받아 길이제한 초과하는 글자를 줄여주는 함수
 * @param title 글자 수 제한이 필요한 title
 * @returns MAX_TITLE_LENGTH의 길이를 초과하게 될 경우 ...을 반환
 */
export const skipTitleView = (title: string) => {
  if (title.length > MAX_TITLE_LENGTH) {
    return title.substring(0, MAX_TITLE_LENGTH) + "..."
  }
  return title
}

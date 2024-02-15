// 쿠키를 보관하는 cookieStorage : accessToken 및 refreshToken을 보관

const cookieStorage = {
  /**
   * @function setCookie
   * @param key 쿠키의 이름이 되는 키
   * @param value 쿠키에 넣을 값
   * @param maxRunningTime 쿠키의 지속 기간
   *
   * @description
   * 현재 시간에 maxRunningTime만큼의 시간을 더한 날짜를 생성
   * 생성된 날짜를 이용하여 쿠키의 만료 시간을 설정
   * document.cookie를 사용하여 쿠키를 설정
   * */
  setCookie: (key: string, value: string, maxRunningTime: number) => {
    const todayDate = new Date()
    todayDate.setTime(todayDate.getTime() + maxRunningTime * 1000 * 60)
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${todayDate.toUTCString()};`
  },
  /**
   * @function getCookie
   * @param key 쿠키의 이름이 되는 키
   * @returns 디코딩된 쿠키를 반환 | null
   *
   * @description
   * 정규 표현식을 사용하여 주어진 이름에 해당하는 쿠키 값을 추출
   * 추출된 값이 있다면 디코딩하여 반환하고, 없다면 null을 반환
   */
  getCookie: (key: string) => {
    const regex = new RegExp(`${key}=([^;]*)`)
    const match = regex.exec(document.cookie)
    return match ? decodeURIComponent(match[1]) : null
  },

  /**
   * @function hasCookie
   * @param key 쿠키의 이름이 되는 키
   * @returns 쿠키의 존재 여부를 boolean 값으로 반환
   *
   * @description
   * getCookie 메서드를 사용하여 주어진 이름에 해당하는 쿠키 값 가져오기
   * 값이 존재하면 true, 없다면 false를 반환
   */
  hasCookie: (key: string) => {
    return !!cookieStorage.getCookie(key)
  },
  /**
   * @function deleteCookie
   * @param name 쿠키의 이름
   *
   * @description
   * 쿠키의 만료 시간을 과거로 설정하여 쿠키를 삭제
   */
  deleteCookie: (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  },
}

export default cookieStorage

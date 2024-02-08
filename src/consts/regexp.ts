export const REGEXP = {
  userId: /^[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_|.]?[0-9a-zA-Z])*|.[a-zA-Z]{2,3}$/,
  nickName: /^(?=.*[a-z0-9])[a-z0-9]{2,10}$/,
  password: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/,
}

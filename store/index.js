export const state = ()=> ({
    userInfo:{},
    curChat:0,
    token:"",
})
export const mutations = {
  setCurChat(state, curChat) {
      state.curChat = curChat
  },
  setUserInfo(state, info) {
      state.userInfo = info
  },
  setToken(state, token) {
      state.token = token
  }
}

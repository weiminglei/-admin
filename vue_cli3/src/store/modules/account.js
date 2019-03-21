import axios from 'axios'
import { getToken } from '@/utils/auth'
const account = {
  state: {
    permissions: []
  },
  mutations: {
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 获取用户权限列表
    GetPermission({
      commit
    }) {
      return new Promise((resolve, reject) => {
        axios({
          method: "POST",
          baseURL: process.env.BASE_API,
          url: '/users/permission',
          headers: {
            'jwtToken': getToken()
          },
          timeout: 5000
        }).then(response => {
          console.log(`11111${response}`)
          console.log(`22222${response.data}`)
          const result = response.data
          if (result.resultCode === '000000') {
            if (result.data && result.data.length > 0) {
              commit("SET_PERMISSIONS", result.data)
            }
          } else {
            this.$message({
              type: 'error',
              message: result.resultMesg
            })
          }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default account

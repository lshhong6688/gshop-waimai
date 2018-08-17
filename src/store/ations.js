
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUser,
  reqLogout,
  reqGoods,
  reqRatings,
  reqInfo
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-types'


export default {
  //异步获取当前地址信息
  async getAddress({commit, state}){
    const {latitude,longitude} =state
    const geohash = `${latitude},${longitude}`
    const result = await reqAddress(geohash)
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  //异步获取商品种类
  async getCategorys({commit}){
    const result = await reqCategorys()
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  //获取商家经纬度
  async getShops({commit, state}){
    const {latitude,longitude} =state
    const result = await reqShops({latitude,longitude})
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //同步保存用户
  saveUser({commit},user){
    commit(RECEIVE_USER,{user})
  },
  //异步获取用户信息,用来保证用户登录后免登陆
  async getUser({commit}){
    const result = await reqUser()
    if(result.code===0){
      const user = result.data
      commit(RECEIVE_USER, {user})
    }
  },
  //异步退出登录
  async getLogout({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(RESET_USER)
    }
  },
  async getGoods({commit},cd){
    const result = await reqGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      cd && cd()
    }
  },

  async getRatings({commit},cb){
    const result = await reqRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      cb && cb()
    }
  },
  async getInfo({commit},cb){
    const result = await reqInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
      cb && cb()
    }
  },
  updateFoodCount({commit,state},{food,isAdd}){
    if(isAdd){
      commit(INCREMENT_FOOD_COUNT,{food})
    }else{
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }


}

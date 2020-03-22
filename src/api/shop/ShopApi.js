import {Request} from '../axios'

export const getShopList = (params) => {
  return Request('/api/getShopList', params)
}

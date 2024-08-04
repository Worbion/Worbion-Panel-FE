import axiosInstance from "@/network-instances/axiosInstance"
import type { DataProvider } from "@refinedev/core"

const API_URL = "https://api.fake-rest.refine.dev"

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id, meta }) => {
    const response = await axiosInstance.get(`${API_URL}/${resource}/${id}`)

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.data

    return { data }
  },
  update: () => {
    throw new Error("Not implemented")
  },
  getList: () => {
    throw new Error("Not implemented")
  },
  create: () => {
    throw new Error("Not implemented")
  },
  deleteOne: () => {
    throw new Error("Not implemented")
  },
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },
}

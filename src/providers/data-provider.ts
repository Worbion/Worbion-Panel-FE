import axiosInstance from "@/network-instances/axiosInstance"
import type { DataProvider } from "@refinedev/core"

const API_URL = "https://api.worbion.com/"

export const dataProvider: DataProvider = {
  getOne: async ({ resource }) => {
    const response = await axiosInstance.get(`/${resource}`)

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
  create: async ({ resource, variables }) => {
    console.log("s")
    const response = await axiosInstance(`/${resource}`, {
      method: "POST",
      data: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.status < 200 || response.status > 299) throw response

    const data = await response.data

    return { data }
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

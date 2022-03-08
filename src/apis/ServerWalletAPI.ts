/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SERVER_URL } from '../constants'
import axios, { AxiosInstance } from 'axios'

export class ServerWalletAPI {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({ baseURL: SERVER_URL })
  }
}

const serverWalletAPI = new ServerWalletAPI()

export default serverWalletAPI

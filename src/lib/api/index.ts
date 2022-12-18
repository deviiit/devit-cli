import axios, { AxiosInstance } from 'axios'

export class ApiClient {
  private client: AxiosInstance

  constructor(public readonly url: string) {
    this.client = axios.create({
      baseURL: this.url,
    })
  }

  public async sendBlockCode({ token, ...rest }: ApiClient.SendBlockCodeProps) {
    return this.client.post(`/api/cms-template/${token}`, rest)
  }
}

export namespace ApiClient {
  export interface SendBlockCodeProps {
    token: string
    blockName: string
    scss?: string
    js?: string
  }
}

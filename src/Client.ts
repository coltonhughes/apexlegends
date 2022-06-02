import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

export class Client {
  public key;
  public APIVersion;
  public baseURL;
  public platform;

  constructor(APIKey: string, APIVersion: string) {
    this.key = APIKey || 'NO_KEY_PROVIDED';
    this.APIVersion = APIVersion || 5;
    this.platform = 'PC';
    this.baseURL = 'https://api.mozambiquehe.re/bridge';
  }

  async fetchStats(queryParam: string): Promise<AxiosResponse | ResponseError> {
    const options = {
      method: 'GET',
      url: `${this.baseURL}?version=${this.APIVersion}&platform=${this.platform}&auth=${this.key}&${queryParam}`,
      headers: {
        'user-agent': 'cheem-APEXAPI',
      },
    };

    const res: AxiosResponse = await axios(options);
    if (res.status !== 200) {
      return {
        error: true,
        errorText: res.statusText,
        errorCode: res.status,
        response: res,
      };
    } else {
      return {
        error: false,
        data: res.data,
        response: res,
      };
    }
  }

  async getUser(username: string, platform: string): Promise<AxiosResponse | ResponseError> {
    const response = await this.fetchStats(username);
    return response;
  }
}

export type ResponseError = {
  error: boolean;
  errorText?: string;
  errorCode?: number;
  data?: string;
  response: AxiosResponse;
};

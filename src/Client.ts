import {
  ApexCraftingRotation,
  ApexMapRotation,
  ApexStat,
  ApexStore,
  Arenas,
  Modes,
  Platform
} from '../types/types';

import axios from 'axios';

const baseURL = 'https://api.mozambiquehe.re/';

/**
 * @class
 */
export class Client {
  private headers;
  /**
   *
   * @param APIKey
   */
  constructor(APIKey: string) {
    this.headers = { headers: { Authorization: APIKey } };
  }

  /**
   *
   * @param username
   * @param platform @default Platform.pc
   * @returns Promise<ApexStat | AxiosError>
   */

  async getUserStats(
    username: string,
    platform: Platform = Platform.pc
  ): Promise<ApexStat | Error> {
    const { data, status }: { data: ApexStat; status: number } =
      await axios.get(
        `${baseURL}/bridge?platform=${platform}&player=${encodeURIComponent(
          username
        )}`,
        this.headers
      );

    if (status !== 200) {
      return new Error(`There was an error fetching the stats for ${username}`);
    } else {
      return data;
    }
  }

  /**
   *
   * @returns Promise<ApexCraftingRotation | Error>
   */
  async getCrafting(): Promise<ApexCraftingRotation | Error | any> {
    const { data, status }: { data: ApexCraftingRotation[]; status: number } =
      await axios.get(`${baseURL}/crafting`, this.headers);

    if (status !== 200) {
      return new Error(`There was an error fetching crafting rotations`);
    } else {
      return data;
    }
  }

  /**
   *
   * @param mode @default Modes.br_ranked
   * @param version @default 1
   * @returns Promise<ApexMapRotation | Arenas | AxiosError>
   */
  async getMap(
    mode: Modes = Modes.br_ranked,
    version: number = 1
  ): Promise<ApexMapRotation | Arenas | Error> {
    const { data, status }: { data: ApexMapRotation; status: number } =
      await axios.get(
        `${baseURL}/maprotation?version=${version}`,
        this.headers
      );
    if (status !== 200) {
      return new Error(`There was an issue fetching the map for: ${mode}`);
    } else {
      if (mode === Modes.all) {
        return data;
      } else {
        return data[`${mode}`] as Arenas;
      }
    }
  }

  /**
   *
   * @returns Promise<ApexStore | Error>
   */
  async getStore(): Promise<ApexStore | Error> {
    const { data, status }: { data: ApexStore; status: number } =
      await axios.get(`${baseURL}/store`, this.headers);
    if (status !== 200) {
      return new Error('There was an error fetching the current store items');
    } else {
      return data;
    }
  }
}

export default Client;

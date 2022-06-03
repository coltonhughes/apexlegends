import axios, { AxiosError } from 'axios';

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
   * @param platform
   * @returns Promise<ApexStat | AxiosError | any>
   */
  async getUserStats(username: string, platform: Platform = Platform.pc): Promise<AxiosError | ApexStat | any> {
    try {
      const { data }: { data: ApexStat; status: number } = await axios.get(
        `${baseURL}/bridge?platform=${platform}&player=${encodeURIComponent(username)}`,
        this.headers,
      );
      return data;
    } catch (error: unknown) {
      return error;
    }
  }

  /**
   *
   * @returns Promise<ApexCraftingRotation | AxiosError>
   */
  async getCrafting(): Promise<ApexCraftingRotation | AxiosError | any> {
    try {
      const { data }: { data: ApexCraftingRotation[] } = await axios.get(`${baseURL}/crafting`, this.headers);
      return data;
    } catch (error: unknown) {
      return error;
    }
  }

  /**
   *
   * @param mode
   * @param version
   * @returns Promise<ApexMapRotation | AxiosError>
   */
  async getMap(mode: Modes = Modes.br_ranked, version: number = 1): Promise<ApexMapRotation | AxiosError | any> {
    try {
      const { data }: { data: ApexMapRotation } = await axios.get(
        `${baseURL}/maprotation?version=${version}`,
        this.headers,
      );
      if (mode === Modes.all) {
        return data;
      } else {
        return data[`${mode}`];
      }
    } catch (error: unknown) {
      return error;
    }
  }

  /// TO BE FINISHED AWAITING API APPROVAL
  async getStore(): Promise<any> {
    try {
      const { data }: { data: any } = await axios.get(`${baseURL}/store`, this.headers);
      return data;
    } catch (error: unknown) {
      return error;
    }
  }
}
/// TYPES

export enum Modes {
  'br' = 'battle_royale',
  'arena' = 'arenas',
  'br_ranked' = 'ranked',
  'arenas_ranked' = 'arenasRanked',
  'control' = 'control',
  'all' = 'all',
}

export enum Platform {
  'pc' = 'PC',
  'xbox' = 'X1',
  'psn' = 'PS4',
}

// APEX STATS
export interface ApexStat {
  global?: Global;
  realtime?: Realtime;
  legends?: Legends;
  mozambiquehereInternal?: MozambiquehereInternal;
  als?: Als;
  total?: Total;
}

export interface Als {
  isALSDataEnabled?: boolean;
}

export interface Global {
  name?: string;
  uid?: number;
  avatar?: string;
  platform?: string;
  level?: number;
  toNextLevelPercent?: number;
  internalUpdateCount?: number;
  bans?: Bans;
  rank?: Arena;
  arena?: Arena;
  battlepass?: Battlepass;
  badges?: null;
}

export interface Arena {
  rankScore?: number;
  rankName?: string;
  rankDiv?: number;
  ladderPosPlatform?: number;
  rankImg?: string;
  rankedSeason?: string;
}

export interface Bans {
  isActive?: boolean;
  remainingSeconds?: number;
  lastBanReason?: string;
}

export interface Battlepass {
  level?: string;
  history?: { [key: string]: number };
}

export interface Legends {
  selected?: Selected;
  all?: All;
}

export interface All {
  global?: Ash;
  revenant?: Ash;
  crypto?: Ash;
  horizon?: Horizon;
  gibraltar?: Ash;
  wattson?: Ash;
  fuse?: Ash;
  bangalore?: Ash;
  wraith?: Ash;
  octane?: Ash;
  bloodhound?: Ash;
  caustic?: Ash;
  lifeline?: Ash;
  pathfinder?: Ash;
  loba?: Ash;
  mirage?: Ash;
  rampart?: Ash;
  valkyrie?: Ash;
  seer?: Ash;
  ash?: Ash;
  madMaggie?: Ash;
  newcastle?: Ash;
}

export interface Ash {
  imgAssets?: ImgAssets;
}

export interface ImgAssets {
  icon?: string;
  banner?: string;
}

export interface Horizon {
  data?: HorizonDatum[];
  imgAssets?: ImgAssets;
}

export interface HorizonDatum {
  name?: string;
  value?: number;
  key?: string;
  rank?: Rank;
  rankPlatformSpecific?: Rank;
}

export interface Rank {
  rankPos?: number;
  topPercent?: number;
}

export interface Selected {
  legendName?: string;
  data?: SelectedDatum[];
  gameInfo?: GameInfo;
  imgAssets?: ImgAssets;
}

export interface SelectedDatum {
  name?: string;
  value?: number;
  key?: string;
  global?: boolean;
}

export interface GameInfo {
  skin?: string;
  skinRarity?: string;
  frame?: string;
  frameRarity?: string;
  pose?: string;
  poseRarity?: string;
  intro?: string;
  introRarity?: string;
  badges?: Badge[];
}

export interface Badge {
  name?: null | string;
  value?: number;
  category?: string;
}

export interface MozambiquehereInternal {
  isNewToDB?: boolean;
  claimedBy?: string;
  apiAccessType?: string;
  clusterID?: string;
  rateLimit?: RateLimit;
  clusterSrv?: string;
}

export interface RateLimit {
  maxPerSecond?: null;
  currentReq?: null;
}

export interface Realtime {
  lobbyState?: string;
  isOnline?: number;
  isInGame?: number;
  canJoin?: number;
  partyFull?: number;
  selectedLegend?: string;
  currentState?: string;
  currentStateSinceTimestamp?: number;
  currentStateAsText?: string;
}

export interface Total {
  kills?: Kills;
  kd?: Kd;
}

export interface Kd {
  value?: string;
  name?: string;
}

export interface Kills {
  name?: string;
  value?: number;
}
// END APEX STATS

// APEX Crafting
export interface ApexCraftingRotation {
  bundle?: ApexCraftingBundle[];
  start?: number | undefined;
  end?: number | undefined;
  startDate?: Date;
  endDate?: Date;
  bundleType?: string;
  bundleContent?: BundleContent[];
}

export interface BundleContent {
  item?: string;
  cost?: number;
  itemType?: ItemType;
}

export interface ItemType {
  name?: string;
  rarity?: Rarity;
  asset?: string;
  rarityHex?: RarityHex;
}

export enum Rarity {
  Common = 'Common',
  Epic = 'Epic',
  Rare = 'Rare',
}

export enum RarityHex {
  'B200FF' = '#B200FF',
  '#0094FF' = '#0094FF',
  '#808080' = '#808080',
}

export interface ApexCraftingBundle {
  bundle?: string;
  start?: number;
  end?: number;
  startDate?: Date;
  endDate?: Date;
  bundleType?: string;
  bundleContent?: BundleContent;
}

export interface BundleContent {
  item?: string;
  cost?: number;
  itemType?: ItemType;
}

export interface ItemType {
  name?: string;
  rarity?: Rarity;
  asset?: string;
  rarityHex?: RarityHex;
}

// END APEX CRAFTING

// START APEX MAPS

export interface ApexMapRotation {
  battle_royale?: Arenas;
  arenas?: Arenas;
  ranked?: Arenas;
  arenasRanked?: Arenas;
  control?: Arenas;
}

export interface Arenas {
  current?: Current;
  next?: Next;
}

export interface Current {
  start?: number;
  end?: number;
  readableDateStart?: Date;
  readableDateEnd?: Date;
  map?: string;
  code?: string;
  durationInSecs?: number;
  durationInMinutes?: number;
  asset?: string;
  remainingSecs?: number;
  remainingMins?: number;
  remainingTimer?: string;
}

export interface Next {
  start?: number;
  end?: number;
  readableDateStart?: Date;
  readableDateEnd?: Date;
  map?: string;
  code?: string;
  durationInSecs?: number;
  durationInMinutes?: number;
  asset?: string;
}

// END APEX MAPS

export default Client;

import axios, { AxiosResponse } from 'axios';

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
  ): Promise<ApexStatObj | Error | PlayerNotFound | any> {
    try {
      const { data, status }: { data: ApexStat | any; status: number } =
        await axios.get(
          `${baseURL}/bridge?platform=${platform}&player=${encodeURIComponent(
            username
          )}`,
          this.headers
        );
      if (status !== 200) {
        return new Error(
          `There was an error fetching the stats for ${username}`
        );
      } else {
        try {
          const statObj: ApexStatObj = {
            name: username,
            platform,
            level: data.global.level,
            toNextLevelPercent: data.global.toNextLevelPercent,
            kills: data.total.kills.value,
            selectedLegend: data.legends.selected.LegendName,
            legendIcon: data.legends.selected.ImgAssets.icon,
            brRankName: data.global.rank.rankName,
            brRankDiv: data.global.rank.rankDiv,
            brRankImg: data.global.rank.rankImg,
            status: StatusEnum.FOUND
          };

          return statObj;
        } catch (e) {
          if (e instanceof TypeError) {
            const notFound: PlayerNotFound = {
              error: `Player ${username} on ${platform} was not found!`,
              status: StatusEnum.NOT_FOUND
            };
            return notFound;
          } else {
            console.log(e);
            throw new Error('Unexpected error occured!');
          }
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const noApexData: PlayerNotFound = {
          error: `Player ${username} on ${platform} exists, but has no Apex data!`,
          status: StatusEnum.NO_DATA
        };
        return noApexData;
      }
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

/// TYPES

export enum StatusEnum {
  'FOUND' = 'FOUND',
  'NOT_FOUND' = 'NOT_FOUND',
  'NO_DATA' = 'NO_DATA'
}

export interface PlayerNotFound {
  error: string;
  status: StatusEnum;
}

export interface ApexStatObj {
  name: string;
  platform: Platform;
  level: number;
  toNextLevelPercent: number;
  kills: number;
  selectedLegend: string;
  legendIcon: LegendOrGlobal;
  status: StatusEnum;
  brRankName: string;
  brRankDiv: string;
  brRankImg: string;
}

export enum StatType {
  'kills' = 'kills',
  'kd' = 'kd'
}

export enum Modes {
  'br' = 'battle_royale',
  'arena' = 'arenas',
  'br_ranked' = 'ranked',
  'arenas_ranked' = 'arenasRanked',
  'control' = 'control',
  'all' = 'all'
}

export enum Platform {
  'pc' = 'PC',
  'xbox' = 'X1',
  'psn' = 'PS4'
}

// APEX STATS

export interface ApexStat {
  global: Global;
  realtime?: Realtime;
  legends?: Legends;
  mozambiquehereInternal?: MozambiquehereInternal;
  als?: Als;
  total: TotalStat;
}

export interface Als {
  isALSDataEnabled?: boolean;
}

export interface Global {
  name: string;
  uid: number;
  avatar: string;
  platform: string;
  level: number;
  toNextLevelPercent: number;
  internalUpdateCount: number;
  bans: Bans;
  rank: Arena;
  arena: Arena;
  battlepass: Battlepass;
  badges: null;
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

export interface LegendOrGlobal {
  selected?: Selected;
  all?: Legends;
}

export interface Legends {
  global?: LegendAssets;
  revenant?: LegendAssets;
  crypto?: LegendAssets;
  horizon?: LegendAssets;
  gibraltar?: LegendAssets;
  wattson?: LegendAssets;
  fuse?: LegendAssets;
  bangalore?: LegendAssets;
  wraith?: LegendAssets;
  octane?: LegendAssets;
  bloodhound?: LegendAssets;
  caustic?: LegendAssets;
  lifeline?: LegendAssets;
  pathfinder?: LegendAssets;
  loba?: LegendAssets;
  mirage?: LegendAssets;
  rampart?: LegendAssets;
  valkyrie?: LegendAssets;
  seer?: LegendAssets;
  ash?: LegendAssets;
  madMaggie?: LegendAssets;
  newcastle?: LegendAssets;
}

export interface LegendAssets {
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

export interface TotalStat {
  kills: Kills;
  kd?: Kd;
}

export interface Kd {
  value?: string;
  name?: string;
}

export interface Kills {
  name: string;
  value: number;
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
  Rare = 'Rare'
}

export enum RarityHex {
  'B200FF' = '#B200FF',
  '#0094FF' = '#0094FF',
  '#808080' = '#808080'
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

// START APEX STORE

export interface ApexStore {
  title?: string;
  desc?: Desc;
  tag?: string;
  purchaseLimit?: number;
  isAvailable?: boolean;
  expireTimestamp?: number;
  shopType?: ShopType;
  originalPrice?: number;
  pricing?: Pricing[];
  content?: Content[];
  offerID?: string;
  asset?: string;
}

export interface Content {
  ref?: string;
  name?: string;
  quantity?: number;
}

export enum Desc {
  Empty = '',
  Skin = 'Skin'
}

export interface Pricing {
  ref?: Currency;
  quantity?: number;
}

export enum Currency {
  ApexCoins = 'Apex Coins',
  LegendTokens = 'Legend Tokens'
}

export enum ShopType {
  Shop = 'shop',
  Specials = 'specials'
}

// END APEX STORE

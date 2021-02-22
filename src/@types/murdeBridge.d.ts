declare namespace murderBridge {
  export interface Hero {
    heroId: string;
    name: string;
    alias: string;
    title: string;
    roles: string[];
    isWeekFree: string;
    attack: string;
    defense: string;
    magic: string;
    difficulty: string;
    selectAudio: string;
    banAudio: string;
    isARAMweekfree: string;
    ispermanentweekfree: string;
    changeLabel: string;
    goldPrice: string;
    couponPrice: string;
    camp: string;
    campId: string;
    keywords: string;
  }

  export interface heroList {
    hero: Hero[];
    version: string;
    fileName: string;
    fileTime: string;
  }
}

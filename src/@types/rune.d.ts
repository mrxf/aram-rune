declare namespace rune {

  export interface Item {
      id: string;
      count: number;
  }

  export interface Block {
      type: string;
      items: Item[];
  }

  export interface ItemBuild {
      title: string;
      associatedMaps: number[];
      associatedChampions: number[];
      blocks: Block[];
      map: string;
      mode: string;
      preferredItemSlots: any[];
      sortrank: number;
      startedFrom: string;
      type: string;
  }

  export interface Rune {
      alias: string;
      name: string;
      position: string;
      pickCount: number;
      winRate: string;
      primaryStyleId: number;
      subStyleId: number;
      selectedPerkIds: number[];
      score: number;
  }

  export interface RecommendData {
      index: number;
      id: string;
      version: string;
      officialVersion: string;
      timestamp: number;
      alias: string;
      name: string;
      position: string;
      skills?: any;
      spells?: any;
      itemBuilds: ItemBuild[];
      runes: Rune[];
  }

}


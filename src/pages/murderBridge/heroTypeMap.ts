export type IHeroType =
  | "mage"
  | "fighter"
  | "tank"
  | "assassin"
  | "support"
  | "marksman";

export const heroTypeMap: { [key in IHeroType]: string } = {
  mage: "法师",
  fighter: "战士",
  tank: "坦克",
  assassin: "刺客",
  support: "辅助",
  marksman: "射手",
};

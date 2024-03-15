import { API } from "../../types";

export type Data = {
  color: "mempool" | "monochrome" | "transparent";
  numberOfBlocks: 1 | 2 | 3 | 4 | 5;
};

export type BlockData = {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}[];

type Cache = BlockData;

export type Props = API<Data, Cache>;

export const defaultData: Data = {
  color: "mempool",
  numberOfBlocks: 3,
};

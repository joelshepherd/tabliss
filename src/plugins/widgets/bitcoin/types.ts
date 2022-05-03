import { API } from "../../types";

export type Data = {
  numberOfBlocks: 1 | 2 | 3 | 4 | 5;
  color: "mempool" | "monochrome";
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
  numberOfBlocks: 3,
  color: "mempool",
};

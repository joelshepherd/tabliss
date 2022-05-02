import { API } from "../../types";

export type Data = {};

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

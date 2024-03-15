import { API } from "../../types";
import { BlockData } from "./types";

export async function getBlocks(loader: API["loader"]): Promise<BlockData> {
  loader.push();

  const data: BlockData = await fetch("https://mempool.space/api/blocks")
    .then((res) => res.json())
    .finally(() => loader.pop());

  return data;
}

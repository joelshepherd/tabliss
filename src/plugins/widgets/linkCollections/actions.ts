import { LinkCollection, SubLink } from "./types";

// Collection actions
export function addCollection() {
  return {
    type: "ADD_COLLECTION",
  } as const;
}

export function updateCollection(index: number, collection: LinkCollection) {
  return {
    type: "UPDATE_COLLECTION",
    data: { index, collection },
  } as const;
}

export function removeCollection(index: number) {
  return {
    type: "REMOVE_COLLECTION",
    data: { index },
  } as const;
}

export function reorderCollection(index: number, to: number) {
  return {
    type: "REORDER_COLLECTION",
    data: { index, to },
  } as const;
}

// Sublink actions
export function addSublink(collectionIndex: number) {
  return {
    type: "ADD_SUBLINK",
    data: { collectionIndex },
  } as const;
}

export function updateSublink(
  collectionIndex: number,
  sublinkIndex: number,
  sublink: SubLink,
) {
  return {
    type: "UPDATE_SUBLINK",
    data: { collectionIndex, sublinkIndex, sublink },
  } as const;
}

export function removeSublink(collectionIndex: number, sublinkIndex: number) {
  return {
    type: "REMOVE_SUBLINK",
    data: { collectionIndex, sublinkIndex },
  } as const;
}

export function reorderSublink(
  collectionIndex: number,
  sublinkIndex: number,
  to: number,
) {
  return {
    type: "REORDER_SUBLINK",
    data: { collectionIndex, sublinkIndex, to },
  } as const;
}

export type Action =
  | ReturnType<typeof addCollection>
  | ReturnType<typeof updateCollection>
  | ReturnType<typeof removeCollection>
  | ReturnType<typeof reorderCollection>
  | ReturnType<typeof addSublink>
  | ReturnType<typeof updateSublink>
  | ReturnType<typeof removeSublink>
  | ReturnType<typeof reorderSublink>;

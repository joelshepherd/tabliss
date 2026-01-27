import { nanoid } from "nanoid";

import { LinkCollection } from "./types";
import { Action } from "./actions";

type State = LinkCollection[];

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_COLLECTION":
      return state.concat({
        id: nanoid(),
        name: "New Collection",
        icon: "folder",
        sublinks: [],
      });

    case "REMOVE_COLLECTION":
      return state.filter((_, index) => index !== action.data.index);

    case "UPDATE_COLLECTION":
      return state.map((collection, index) =>
        index === action.data.index ? action.data.collection : collection,
      );

    case "REORDER_COLLECTION":
      const collections = [...state];
      collections.splice(
        action.data.to,
        0,
        collections.splice(action.data.index, 1)[0],
      );
      return collections;

    case "ADD_SUBLINK":
      return state.map((collection, index) =>
        index === action.data.collectionIndex
          ? {
              ...collection,
              sublinks: collection.sublinks.concat({
                id: nanoid(),
                name: "",
                url: "https://",
              }),
            }
          : collection,
      );

    case "REMOVE_SUBLINK":
      return state.map((collection, index) =>
        index === action.data.collectionIndex
          ? {
              ...collection,
              sublinks: collection.sublinks.filter(
                (_, sublinkIndex) =>
                  sublinkIndex !== action.data.sublinkIndex,
              ),
            }
          : collection,
      );

    case "UPDATE_SUBLINK":
      return state.map((collection, index) =>
        index === action.data.collectionIndex
          ? {
              ...collection,
              sublinks: collection.sublinks.map((sublink, sublinkIndex) =>
                sublinkIndex === action.data.sublinkIndex
                  ? action.data.sublink
                  : sublink,
              ),
            }
          : collection,
      );

    case "REORDER_SUBLINK":
      return state.map((collection, index) => {
        if (index !== action.data.collectionIndex) return collection;

        const sublinks = [...collection.sublinks];
        sublinks.splice(
          action.data.to,
          0,
          sublinks.splice(action.data.sublinkIndex, 1)[0],
        );

        return {
          ...collection,
          sublinks,
        };
      });

    default:
      throw new Error("Unknown action");
  }
}

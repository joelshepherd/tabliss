import { API } from "../../types";


export type TrelloData = { // Will be created and cached through the API call
    failure: boolean;
    lists: TrelloList[];
};

export type TrelloList = {
    name: string;
    listID: string;   
    items: string[]; // Represents all items on a Trello list
};

export type IdNamePair = {
    listID: string;
    name: string;
}

export type Data = {
    settingsData: IdNamePair[]; // Array of objects that map list IDs to names
};

export type Cache = TrelloData;
export type Props = API<Data, Cache>;

export const defaultData: Data = {
    settingsData: []
};
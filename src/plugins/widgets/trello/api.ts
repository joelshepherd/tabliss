import { IdNamePair, TrelloData, TrelloList} from "./types";

// Returns Trello list data from all boards in settings
export const getTrelloData = async (settingsData: IdNamePair[]): Promise<TrelloData> => {
    let trelloData: TrelloData = {failure: false, lists: []};
    for (let i = 0; i < settingsData.length; i++) {
        let trelloList: TrelloList = await getListData(settingsData[i]);
        trelloData.lists.push(trelloList);    
    }
    
    return trelloData;
}

// Returns an object containing the items on a single Trello board
const getListData = async (pair: IdNamePair): Promise<TrelloList> => { 
    const API_URL: string = "https://asia-southeast1-trello-tabliss-integrati-dd041.cloudfunctions.net/pull_data"
    let name: string = pair.name;
    let listID: string = pair.listID;

    let list: TrelloList = {name: name, listID: listID, items: []};

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"id": listID})
    })
        .then(response => response.json())
        .then(data => {
            for (const key in data) {
                list.items.push(data[key].name);
            }
        })
        .catch(error => console.log(error))
    return list;
};
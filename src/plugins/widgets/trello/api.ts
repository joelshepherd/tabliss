import { IdNamePair, TrelloData, TrelloList} from "./types";

export const pull_trello_data = async (settingsData: IdNamePair[]): Promise<TrelloData> => {
    let trelloData: TrelloData = {failure: false, lists: []};
    for (let i = 0; i < settingsData.length; i++) {
        let trelloList: TrelloList = await pull_list_data(settingsData[i]);
        trelloData.lists.push(trelloList);    
    }
    
    console.log(trelloData);
    return trelloData;
}

// Returns an object containing the items on a single Trello board
const pull_list_data = async (pair: IdNamePair): Promise<TrelloList> => { 
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
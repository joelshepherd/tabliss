import { IdNamePair, TrelloData, TrelloList} from "./types";

const API_URL: string = "https://asia-southeast1-trello-tabliss-integrati-dd041.cloudfunctions.net/pull_data"

// Calls Firebase function and returns array of Trello data
export const get_trello_data = async (settingsData: IdNamePair[]): Promise<TrelloData> => { 
    let trelloData: TrelloData = {failure: false, lists: []}
    settingsData.forEach(async pair => {
        let list: TrelloList = {name: pair.name, listID: pair.listID, items: []};
        const data = await fetch(API_URL, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"id": pair.listID})
        });

        if (data.status === 400) {
            console.log("Falure");
            return {
                failure: true,
                lists: []
            };
        }
        let jsonData = await data.json();
        for (const key in jsonData) {
            let item = jsonData[key];
            list.items.push(item.name);
        }
        trelloData.lists.push(list);
    })
    console.log(`Data Pulled from API`);
    console.log(trelloData);
    return trelloData;
}
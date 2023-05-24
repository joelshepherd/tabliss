import { TrelloData, TrelloList} from "./types";

const API_URL: string = "https://asia-southeast1-trello-tabliss-integrati-dd041.cloudfunctions.net/pull_data"

// Calls Firebase function and returns array of Trello data
export const get_trello_data = async (settingsData: any): Promise<TrelloData> => { 
    let trelloData: TrelloData = {failure: false, lists: []}
    let jsonData: any[];
    for (const listID in settingsData) {
        let list: TrelloList = { name:  "List", listID: listID, items: []};
        const data = await fetch(API_URL, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({"id": listID})})
        if (data.status === 400) {
            console.log("Failure");
            return {
                failure: true,
                lists: []
            };
        }
        jsonData = await data.json();

        for (const key in jsonData) {
            let item: string = jsonData[key];
            list.items.push(item);
        }
        trelloData.lists.push(list);
    }
    return trelloData;
}
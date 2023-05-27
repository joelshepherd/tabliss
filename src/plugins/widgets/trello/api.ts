import { IdNamePair, TrelloData, TrelloList} from "./types";
import { nanoid } from "nanoid";

// Calls Firebase function and returns an array containing all trello lists
export const get_trello_data = async (settingsData: IdNamePair[]): Promise<TrelloData> => { 
    const API_URL: string = "https://asia-southeast1-trello-tabliss-integrati-dd041.cloudfunctions.net/pull_data"
    let trelloData: TrelloData = {failure: false, lists: []}

    // Populate trelloData lists to allow random access
    for (let i = 0; i < settingsData.length; i++) {
        trelloData.lists.push({name: "none", listID: "none", items: []});
    }
    
    settingsData.forEach(async (pair, index) => {
        console.log(pair.name, pair.listID);
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
        trelloData.lists[index] = list; // Add data in correct order via indexing
    })
    console.log(`Data Pulled from API`);
    console.log(trelloData);
    return trelloData;
};
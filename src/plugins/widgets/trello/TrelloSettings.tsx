import React from "react";
import { defaultData, Props } from "./types"
import { SettingsInput } from "./SettingsInput";
import SettingsDisplay from "./SettingsDisplay";

import "./Trello.sass";

const TrelloSettings: React.FC<Props> = ({ data = defaultData, setData}) => {
    const addIdNamePair = (listID: string, name: string) => {
        let duplicate: boolean = false;
        data.settingsData.map(pair => {
            if (pair.listID === listID) {
                duplicate = true;
            }
        });

        if (duplicate) {
            return;
        }

        setData({settingsData: [...data.settingsData, {listID: listID, name: name}]});
        return;
    };

    const deletePair = (listID: string) => {
        setData({settingsData: data.settingsData.filter(pair => pair.listID !== listID)});
        return;
    };

    const editPair = (newName: string, listID: string) => {
        const edited = data.settingsData.map(pair => {
            if (pair.listID === listID) {
                pair.name = newName;
            }
            return pair;
        });
        setData({settingsData: edited});
    };

    return (
        <div className="settings">
            <div>
                <SettingsInput addIdNamePair={addIdNamePair}/>
                <button onClick={() => setData({settingsData: []})} className="delete-button">Delete All</button>
            </div>
            <SettingsDisplay settingsData={data.settingsData} deletePair={deletePair} editPair={editPair}/>
        </div>
    );
};

export default TrelloSettings;
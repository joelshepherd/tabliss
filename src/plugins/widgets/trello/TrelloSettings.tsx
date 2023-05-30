import React from "react";
import { defaultData, Props } from "./types"
import { SettingsInput } from "./SettingsInput";
import SettingsDisplay from "./SettingsDisplay";

import "./Trello.sass";

const TrelloSettings: React.FC<Props> = ({ data = defaultData, setData}) => {
    const add_id_name_pair = (listID: string, name: string) => {
        console.log(listID, name);
        setData({settingsData: [...data.settingsData, {listID: listID, name: name}]});
        console.log(data.settingsData)
        return;
    };

    const delete_pair = (listID: string) => {
        setData({settingsData: data.settingsData.filter(pair => pair.listID !== listID)});
        return;
    };

    const edit_pair = (newName: string, listID: string) => {
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
                <SettingsInput add_id_name_pair={add_id_name_pair}/>
                <button onClick={() => setData({settingsData: []})} className="delete-button">Delete All</button>
            </div>
            <SettingsDisplay settingsData={data.settingsData} delete_pair={delete_pair} edit_pair={edit_pair}/>
        </div>
    );
};

export default TrelloSettings;
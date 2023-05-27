import React from "react";
import { Props, defaultData, TrelloList, TrelloData, IdNamePair } from "./types";
import { get_trello_data } from "./api";
import "./Trello.sass";
import { nanoid } from "nanoid";

const Trello: React.FC<Props> = ({cache, data = defaultData, setCache}) => {
    React.useEffect(() => {
        console.log("Running");
        get_trello_data(data.settingsData).then(setCache).catch(error => console.log(error));

        return () => {
            console.log("Cleanup function");
        }
    }, [data.settingsData]);

    if (!cache) {
        console.log("Not Cached");
        return null;
    }

    return (
        <div className="main-trello">
            {cache?.lists.map((data: TrelloList) => <TrelloListComponent key={ nanoid() } data={data}/>)}
        </div>
    );
};


const TrelloListComponent: React.FC<{data: TrelloList}> = ({data}) => {
    return (
        <div className="trello-list">
            <h3><small>{data.name}</small></h3>
            {data.items.map((content, index) => <p key={index}><small>{content}</small></p>)}
        </div>
    );
};

export default Trello;
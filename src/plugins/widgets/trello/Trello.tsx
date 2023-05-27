import React from "react";
import { Props, defaultData, TrelloList, TrelloData } from "./types";
import { get_trello_data } from "./api";
import "./Trello.sass";

const Trello: React.FC<Props> = ({cache, data = defaultData, setCache}) => {
    
    React.useEffect(() => {
        get_trello_data(data.settingsData).then(setCache);
    }, [data.settingsData]);

    if (!cache) {
        return null;
    } 
    return (
        <>
            <div className="main-trello">
                {cache.lists.map((data: TrelloList) => <TrelloListComponent data={data}/>)}
            </div>
        </>
    );
};


const TrelloListComponent: React.FC<{data: TrelloList}> = ({data}) => {
    return (
        <>
            <div className="trello-list">
                <h3>{data.name}</h3>
                {data.items.map(content => <p><small>{content}</small></p>)}
            </div>
        </>
    );
};

export default Trello;
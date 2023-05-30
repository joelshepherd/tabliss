import React from "react";
import { Props, defaultData, TrelloList, TrelloData } from "./types";
import { pull_trello_data } from "./api";
import "./Trello.sass";

const Trello: React.FC<Props> = ({cache, data = defaultData, setCache}) => {
    React.useEffect(() => {
        pull_trello_data(data.settingsData).then(setCache);
    }, [data.settingsData]);

    if (!cache) {
        return null;
    }

    return (
        <div className="main-trello">
            {cache.lists.map((data: TrelloList, index) => <TrelloListComponent key={ index } data={ data}/>)}
        </div>
    );
};

const TrelloListComponent: React.FC<{data: TrelloList}> = ({data}) => {
    return (
        <div className="trello-list">
            <h3><small>{data.name}</small></h3>
            {data.items.map((content, index) => <p key={ index }>{content}</p>)}
        </div>
    );
};

export default Trello;
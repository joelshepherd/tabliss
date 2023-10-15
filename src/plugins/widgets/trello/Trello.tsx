import React from "react";
import { Props, defaultData, TrelloList } from "./types";
import { getTrelloData } from "./api";
import "./Trello.sass";

const Trello: React.FC<Props> = ({cache, data = defaultData, setCache}) => {
    React.useEffect(() => {
        getTrelloData(data.settingsData).then(setCache);
    }, [data.settingsData]);

    if (!cache) {
        return null;
    }

    return (
        <div className="main-trello">
            {cache.lists.map((data: TrelloList) => <TrelloListComponent key={ data.listID } data={ data}/>)}
        </div>
    );
};

const TrelloListComponent: React.FC<{data: TrelloList}> = ({data}) => {
    return (
        <div className="trello-list">
            <h3><small>{data.name}</small></h3>
            <div className="trello-list-component">
                {data.items.map((content, index) => <p key={ index }>{content}</p>)}
            </div>
        </div>
    );
};

export default Trello;
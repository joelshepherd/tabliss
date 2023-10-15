import React from "react";
import "./Trello.sass";

interface SettingsProps {
    addIdNamePair: (id: string, name: string) => void;
};

export const SettingsInput: React.FC<SettingsProps> = ({ addIdNamePair }) => {
    const [listID, setListID] = React.useState("");
    const [name, setName] = React.useState("");
    
    const handleSubmit = (e: React.FormEvent)  => {
        e.preventDefault();
        if (listID === "" || name === "") {
            return;
        }
        
        // Add list ID name pair
        addIdNamePair(listID, name);
        setListID("");
        setName("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter List ID and Name
                <input
                type="text"
                value={listID}
                onChange={e => setListID(e.target.value)}
                placeholder="List ID"
                />
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Name"
                />
            </label>
            <button type="submit" className="submit-button">Add</button>
        </form>
    );
};
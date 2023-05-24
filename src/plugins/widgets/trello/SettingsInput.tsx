import React from "react";

interface SettingsProps {
    add_id_name_pair: (id: string, name: string) => void;
};

export const SettingsInput: React.FC<SettingsProps> = ({ add_id_name_pair }) => {
    const [listID, setListID] = React.useState("");
    const [name, setName] = React.useState("");
    
    const handle_submit = (e: any)  => {
        e.preventDefault();
        if (listID === "" || name === "") {
            return;
        }
        
        // Add list ID name pair
        add_id_name_pair(listID, name);
        setListID("");
        setName("");
    };

    return (
        <>
            <form onSubmit={handle_submit} className="submission-form">
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
                <button type="submit" className="submit-button">Add</button>
            </form>
        </>
    );
};
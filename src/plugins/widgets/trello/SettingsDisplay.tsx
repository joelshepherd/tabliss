import React from "react";
import { IdNamePair } from "./types";
import "./Trello.sass";

interface DisplayProps {
    settingsData: IdNamePair[];
    delete_pair: (listID: string) => void;
    edit_pair: (newName: string, listID: string) => void;
};

const SettingsDisplay: React.FC<DisplayProps> = ({ settingsData, delete_pair, edit_pair }) => {

    let pairs = settingsData.map(pair => <PairComponent listID={pair.listID} name={pair.name} delete_pair={delete_pair} edit_pair={edit_pair}/> )
    return (
        <div className="pair-display">
            {pairs}
        </div>
    )
}

interface PairComponentProps {
    listID: string;
    name: string;
    delete_pair: (listID: string) => void;
    edit_pair: (newName: string, listID: string) => void;
};

// Displays the name attribute of an IdNamePair type along with buttons to delete and edit
const PairComponent: React.FC<PairComponentProps> = ({listID, name, delete_pair, edit_pair}) => {
    const [editMode, setEditMode] = React.useState(false);

    const toggle_edit_state = () => {
        setEditMode(!editMode);
        return;
    }

    return (
        <>
            <div className="id-name-pair">
                { !editMode ? <h3><small>{name}</small></h3> : <EditBox edit_pair={edit_pair} listID={listID} toggle_edit_state={toggle_edit_state}/> }
            </div>
            <div className="button-pair">
                <button className="edit-button" onClick={toggle_edit_state}>Edit</button>
                <button className="delete-button" onClick={() => delete_pair(listID)}>Delete</button>
            </div>
        </>
    )
}

interface EditBoxProps {
    listID: string;
    edit_pair: (newName: string, listID: string) => void;
    toggle_edit_state: () => void;
};

const EditBox: React.FC<EditBoxProps> = ({ listID, edit_pair, toggle_edit_state }) => {
    const [formData, setFormData] = React.useState("");

    const handle_submit = (e: any) => {
        e.preventDefault();
        edit_pair(formData, listID);
        toggle_edit_state();
        setFormData("");
    };

    return (
        <form onSubmit={handle_submit} className="submission-form">
            <input 
                type="text"
                value={formData}
                placeholder="New Name"
                onChange={e => setFormData(e.target.value)}
            />
            <input type="submit" className="submit-button" value="Change"/>
        </form>
    );
};

export default SettingsDisplay;
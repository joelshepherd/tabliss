import React from "react";
import { IdNamePair } from "./types";
import "./Trello.sass";

interface DisplayProps {
    settingsData: IdNamePair[];
    deletePair: (listID: string) => void;
    editPair: (newName: string, listID: string) => void;
};

const SettingsDisplay: React.FC<DisplayProps> = ({ settingsData, deletePair, editPair }) => {

    let pairs = settingsData.map(pair => <PairComponent listID={pair.listID} name={pair.name} deletePair={deletePair} editPair={editPair}/> )
    return (
        <div className="pair-display">
            {pairs}
        </div>
    )
}

interface PairComponentProps {
    listID: string;
    name: string;
    deletePair: (listID: string) => void;
    editPair: (newName: string, listID: string) => void;
};

// Displays the name attribute of an IdNamePair type along with buttons to delete and edit
const PairComponent: React.FC<PairComponentProps> = ({listID, name, deletePair, editPair}) => {
    const [editMode, setEditMode] = React.useState(false);

    const toggleEditState = () => {
        setEditMode(!editMode);
        return;
    }

    return (
        <>
            <div className="id-name-pair">
                { !editMode ? <h3><small>{name}</small></h3> : <EditBox editPair={editPair} listID={listID} toggleEditState={toggleEditState}/> }
            </div>
            <div className="button-pair">
                <button className="edit-button" onClick={toggleEditState}>Edit</button>
                <button className="delete-button" onClick={() => deletePair(listID)}>Delete</button>
            </div>
        </>
    )
}

interface EditBoxProps {
    listID: string;
    editPair: (newName: string, listID: string) => void;
    toggleEditState: () => void;
};

const EditBox: React.FC<EditBoxProps> = ({ listID, editPair, toggleEditState }) => {
    const [formData, setFormData] = React.useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        editPair(formData, listID);
        toggleEditState();
        setFormData("");
    };

    return (
        <form onSubmit={handleSubmit} className="submission-form">
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
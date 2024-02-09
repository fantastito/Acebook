import { useState } from "react";

// EDIT POST WORKS WITH THIS BUT THE BUTTON DOESN'T WORK PROPERLY

const EditButton = (props) => {
    const [buttonText, setButtonText] = useState("Edit");
    // Callback function to update buttonText state
    const setButtonTextCallback = (text) => {
        setButtonText(text);
    };
    const handleClick = async () => {
        try {
            if (props.onEdit) {
                if (buttonText === "Edit") {
                    // If currently in "Edit" mode, switch to "Cancel edit"
                    setButtonText("Cancel edit");
                    props.handleEdit(setButtonTextCallback);
                } else {
                    // If currently in "Cancel edit" mode, switch back to "Edit"
                    setButtonText("Edit");
                    props.handleCancelEdit(setButtonTextCallback);
                }
            }
        } catch (error) {
            console.error("Error handling edit:", error);
        }
    };
    return props.showButton ? (
        <button onClick={handleClick}>{buttonText}</button>
    ) : null;
};
export default EditButton;

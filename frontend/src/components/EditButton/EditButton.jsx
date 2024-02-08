import { useState } from "react";

const EditButton = (props) => {
    const [buttonText, setButtonText] = useState("Edit");

    const handleClick = async () => {
        try {
            if (props.onEdit) {
                if (buttonText === "Edit") {
                    props.toggleStateChange();
                    setButtonText("Cancel edit");
                } else {
                    // If currently in "Cancel edit" mode, switch back to "Edit"
                    setButtonText("Edit");
                    props.toggleStateChange();
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

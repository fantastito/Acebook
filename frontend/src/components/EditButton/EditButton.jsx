import { useState } from "react";

const EditButton = (props) => {
	const [buttonText, setButtonText] = useState("Edit");
	const handleClick = async () => {
		try {
			if (props.onEdit) {
				setButtonText(buttonText === "Edit" ? "Cancel edit" : "Edit");
				props.onEdit();
			}
		} catch (error) {
			console.error("Error editing post:", error);
		}
	};

	return props.showButton ? (
		<button onClick={handleClick}>{buttonText}</button>
	) : null;
};

export default EditButton;

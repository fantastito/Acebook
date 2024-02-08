import { useState } from "react";
import { editPost } from "../../services/posts";

const EditPost = ({ token, userId, toggleStateChange, onEdit, props }) => {
	const [postMessage, setPostMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	console.log(props, "PROPS");

	const handleSubmit = (event) => {
		event.preventDefault();

		const postData = {
			userId: userId,
			postMessage: postMessage,
		};

		if (!postData.postMessage) {
			return setErrorMessage("Cannot edit post without message");
		}
		console.log(props, "props");
		console.log(postData, "PostDAta");
		editPost(token, postData)
			.then((res) => {
				console.log(res);
				setPostMessage("");
				setErrorMessage("");
				toggleStateChange();
				onEdit();
			})
			.catch((error) => {
				console.log("Error submitting post:", error);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				name="text"
				value={postMessage}
				onChange={(e) => setPostMessage(e.target.value)}
			></textarea>
			<br />
			<button type="submit">Edit post</button>
			<br />
			{errorMessage && errorMessage}
		</form>
	);
};

export default EditPost;

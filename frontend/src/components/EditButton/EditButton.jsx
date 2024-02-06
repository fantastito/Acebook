const EditButton = (props) => {
	// const [like, setLike] = useState(props.liked);
	const editThePost = async (props) => {
		// try {
		// 	console.log(props);
		// 	const response = await fetch("http://localhost:3000/posts/:postId", {
		// 		method: "PATCH",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			Authorization: "Bearer " + window.localStorage.getItem("token"),
		// 		},
		// 		body: JSON.stringify({ postID: props.postID }),
		// 	});
		// 	if (!response.ok) {
		// 		throw new Error(`HTTP error! Status: ${response.status}`);
		// 	}
		// } catch (error) {
		// 	console.error("Error fetching data:", error);
		// }
	};

	const handleClick = async () => {
		try {
			await editThePost(props);
			console.log("Post edited");

			// Call the provided onEdit callback to trigger a re-render
			if (props.onEdit) {
				props.onEdit();
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	return props.showButton ? <button onClick={handleClick}>Edit</button> : null;
};

export default EditButton;

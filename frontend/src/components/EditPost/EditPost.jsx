import { useState, useEffect } from "react";
import { editPost } from "../../services/posts";

const EditPost = (props) => {
    const [postMessage, setPostMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    console.log(props, "LOOK HERE");
    useEffect(() => {
        setPostMessage(props.initialPostMessage);
    }, [props.initialPostMessage]);
    const handleSubmit = (event) => {
        event.preventDefault();
        const postData = {
            userId: props.userId,
            postId: props.postId,
            postMessage: postMessage,
        };

        if (!postData.postMessage) {
            return setErrorMessage("Cannot edit post without a message");
        }

        editPost(props.token, postData)
            .then((res) => {
                console.log(res);
                setPostMessage("");
                setErrorMessage("");
                props.toggleStateChange();
                props.handleEdit(); // Call the onEdit callback
            })
            .catch((error) => {
                console.log("Error submitting post:", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="text"
                type="text"
                value={postMessage}
                onChange={(e) => setPostMessage(e.target.value)}></textarea>
            <br />
            <button type="submit">Edit post</button>
            <br />
            {errorMessage && errorMessage}
        </form>
    );
};

export default EditPost;

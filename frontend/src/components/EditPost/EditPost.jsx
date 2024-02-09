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

// EDIT POST DOES NOT WORK BUTTHE BUTTON SWITCHES BETWEEN EDIT AND CANCEL EDIT

// import { useState } from "react";

// const EditButton = (props) => {
//     const [buttonText, setButtonText] = useState("Edit");

//     const handleClick = async () => {
//         try {
//             if (props.onEdit) {
//                 if (buttonText === "Edit") {
//                     props.toggleStateChange();
//                     setButtonText("Cancel edit");
//                 } else {
//                     // If currently in "Cancel edit" mode, switch back to "Edit"
//                     setButtonText("Edit");
//                     props.toggleStateChange();
//                 }
//             }
//         } catch (error) {
//             console.error("Error handling edit:", error);
//         }
//     };

//     return props.showButton ? (
//         <button onClick={handleClick}>{buttonText}</button>
//     ) : null;
// };

// export default EditButton;

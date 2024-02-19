import "./Post.css";
import "../../pages/User/UserPage.css";
import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import DeleteButton from "../DeleteButton/DeleteButton";

import timeFromNow from "../../utils/TimeFromNow";
import { Link } from "react-router-dom";
import EditPost from "../EditPost/EditPost";
import EditButton from "../EditButton/EditButton";

const Post = (props) => {

    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(props.post.likes.length);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [hideComments, setHideComments] = useState(false);
    const [deletes, setDeletes] = useState(false);


    const handleDelete = () => {
        setDeletes(!deletes);
    };

    const handleEdit = () => {
		props.setEdits(!props.edits);
	};

    const user = JSON.parse(window.localStorage.getItem("user"));

    const isPostOwner = user._id && props.post.postedBy._id === user._id;

    const handleLikeUnlike = () => {
        setLike(!like);
        setLikes(props.post.likes.length);
    };

    const checkLikes = (props) => {
        setLikes(props.post.likes.length);
    };

    const addCommentClick = () => {
        setShowCommentBox(!showCommentBox);
    };

    const showMoreCommentsClick = () => {
        setShowMoreComments(true);
        setHideComments(true);
    };

    const hideCommentsClick = () => {
        setShowMoreComments(false);
    };

    const sortedComments = props.post.comments.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return (
        <div key={props.post._id} className="post-container">
            <article>
                {props.postedBy && (
                    <div className="post-header">
                        <div className="post-user-image-container">
                            <Link to={`/users/${props.postedBy.username}`} className="post-user-image">
                                <img src={props.postedBy.image} alt="user image"></img>
                            </Link>
                        </div>
                        <div className="username-time-container">
                            <div className="post-username">
                            <Link to={`/users/${props.postedBy.username}`} className="post-username">
                                {props.postedBy.username}
                            </Link>
                            </div>
                            <div className="date-time">
                                {timeFromNow(props.post.createdAt)}
                            </div>
                        </div>
                    </div>
                )}
                    <div className="post-body">
                        <div className="post-image-container">
                            {props.post.media !== "../public/images/null" && (
                                <>
                                    <img src={props.post.media}></img>
                                </>
                            )}
                        </div>
                        <div className="post-text">
                            {props.edits ? (
					<EditPost
						token={props.token}
						userId={user._id}
						postId={props.post._id}
						toggleStateChange={props.toggleStateChange}
						handleEdit={handleEdit}
						onEdit={props.onEdit}
						initialPostMessage={props.post.message}
						edits={props.edits}
					/>
				) : (
					<div>{props.post.message}</div>
				)}
                        </div>
                    </div>

                    <div className="post-footer"> 
                        <div className="like-container">
                            <div className="like-button-container">
                            <LikeButton
                                postID={props.post._id}
                                like={like}
                                handleLikeUnlike={handleLikeUnlike}
                                clicked={props.clicked}
                                toggleStateChange={props.toggleStateChange}
                                liked={props.liked}
                                post_userId={props.postedBy._id}
                                loggedInUsername={props.loggedInUsername}
                                token={props.token}
                                userId={props.userId}
                            />
                            </div>
                            <div className="like-number">
                                {props.post.likes.length}
                            </div>
                        </div>
                            <div className="delete-post-button-container">
                                <DeleteButton
                                    postID={props.post._id}
                                    token={props.token}
                                    handleDelete={handleDelete}
                                    onDelete={props.onDelete}
                                    showButton={isPostOwner}
                                />
                                <EditButton
                                    postID={props.post._id}
                                    handleEdit={handleEdit}
                                    showButton={isPostOwner}
                                    onEdit={props.onEdit}
                                    edits={props.edits}
                                />
                            </div>
                    </div>

                    <div className="add-comment-container">
                        <AddComment
                            postId={props.post._id}
                            toggleStateChange={props.toggleStateChange}
                            post_userId={props.postedBy._id}
                            triggerStateChange={props.triggerStateChange}
                        />
                    </div>

                    <div className="comments-container">
                        
                        {sortedComments.length > 0 && (
                            <Comment
                                _id={sortedComments[0]._id}
                                message={sortedComments[0].message}
                                likes={sortedComments[0].likes}
                                // postedBy={comment.user.username}
                                postedAt={sortedComments[0].createdAt}
                                user={sortedComments[0].user}
                            />
                        )}

                        <div className="more-comments-button-container">
                            {sortedComments.length > 1 && !showMoreComments && (
                                <button onClick={showMoreCommentsClick}>...</button>
                            )}
                        </div>

                        {showMoreComments &&
                            sortedComments
                                .slice(1)
                                .map((comment) => (
                                    <Comment
                                        key={comment._id}
                                        _id={comment._id}
                                        message={comment.message}
                                        likes={comment.likes}
                                        postedAt={comment.createdAt}
                                        user={comment.user}
                                    />
                                ))}

                        <div className="hide-comments-button-container">
                        {showMoreComments && (
                            <button onClick={hideCommentsClick}>hide</button>
                        )}
                        </div>
                </div>
            </article>
        </div>
    );
};

export default Post;

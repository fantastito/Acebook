import "./Post.css";
import LikeButton from "../LikeButton/LikeButton";
import React, { useState } from "react";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import DeleteButton from "../DeleteButton/DeleteButton";
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

	const handleEdit = () => {
		props.setEdits(!props.edits);
	};

	const sortedComments = props.post.comments.sort(
		(a, b) => new Date(a.createdAt) - new Date(b.createdAt)
	);

	const revSortedComments = sortedComments.reverse();

	return (
		<div key={props.post._id} className="post-article">
			<article>
				{props.postedBy && (
					<div className="user-info">
						<img src={props.postedBy.image} alt="user image"></img>
						<h4>{props.postedBy.username}</h4>
					</div>
				)}
				<div className="date-time">
					{new Date(props.post.createdAt).toLocaleString("en-UK")}
				</div>
				{props.post.media !== "../public/images/null" && (
					<>
						<img src={props.post.media}></img>
					</>
				)}
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
				<br></br>
				<h5>likes: {props.post.likes.length}</h5>
				<LikeButton
					postID={props.post._id}
					like={like}
					handleLikeUnlike={handleLikeUnlike}
					clicked={props.clicked}
					toggleStateChange={props.toggleStateChange}
					liked={props.liked}
				/>
				<DeleteButton
					postID={props.post._id}
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
				<div className="comments">
					<p> comments </p>
					<button onClick={addCommentClick}>add comment</button>

					{showCommentBox && (
						<div className="comment-box">
							<AddComment
								postId={props.post._id}
								toggleStateChange={props.toggleStateChange}
							/>
						</div>
					)}
					<ul>
						{revSortedComments.length > 0 && (
							<Comment
								_id={revSortedComments[0]._id}
								message={revSortedComments[0].message}
								likes={revSortedComments[0].likes}
								postedAt={revSortedComments[0].createdAt}
								user={revSortedComments[0].user}
							/>
						)}

						{revSortedComments.length > 1 && !showMoreComments && (
							<button onClick={showMoreCommentsClick}>...</button>
						)}

						{showMoreComments &&
							revSortedComments
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

						{showMoreComments && (
							<button onClick={hideCommentsClick}>hide</button>
						)}
					</ul>
				</div>
			</article>
		</div>
	);
};

export default Post;

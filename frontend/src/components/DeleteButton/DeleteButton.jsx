
import ConfirmDeleteModal from './ConfirmDeleteModal';
// import './DeleteButton.css'
import { useState } from 'react';
import './ConfirmDeleteModal.css'
import { deleteThePost } from '../../services/posts';

const DeleteButton = (props) => {
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    
    const handleDeletePostTrue = async () => {
        try {
            const result = await deleteThePost(props.postID, props.token);
            console.log(result)
            setConfirmDeleteModal(false);


			// Call the provided onDelete callback to trigger a re-render
			if (props.onDelete) {
				props.onDelete();
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};


    const handleDeletePost = () => {
        setConfirmDeleteModal(true)
    }

    const handleDeletePostFalse = () => {
        setConfirmDeleteModal(false)
    }

    return props.showButton ? (
        <>
        <button onClick={handleDeletePost}>
            <i className="fa fa-trash" aria-hidden="true"></i>
        </button>

        { confirmDeleteModal && 

            <div className="confirm-delete-modal">

                <div 
                    onClick={()=> {setConfirmDeleteModal(false)}}
                    className="overlay">
                </div>

                <div className="modal-content">
    
                    <ConfirmDeleteModal 
                        handleDeletePostTrue={handleDeletePostTrue}
                        handleDeletePostFalse={handleDeletePostFalse}
                    />
                </div>

            </div>

        
        }
        </>
    ) : null;

};

export default DeleteButton;

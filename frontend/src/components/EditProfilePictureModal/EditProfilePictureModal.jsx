import { useState } from "react";
import "./EditProfilePictureModal.css"
import { uploadImage } from "../../services/user";


export default function EditProfilePictureModal({image, username, toggleEditPictureModal, triggerStateChange}) {
    const [modal, setModal] = useState(false)
    const [file, setFile] = useState()

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file)
        uploadImage(formData, username)
            .then(res => res.json())
            .then(data => {
                console.log(data.image)
                const user = JSON.parse(window.localStorage.getItem("user"))
                user.image = data.image
                window.localStorage.setItem("user", JSON.stringify(user));
                toggleEditPictureModal()
                triggerStateChange()
            });
        }
    
    const toggleModal = () => {
        setModal(!modal)
    }


    return (
        <>
            <div className="upload-profile-piture-containter">
                <div 
                    onClick={toggleModal}
                    className="">
                </div>

            <div className="image-input">
                <input 
                    type="file" 
                    name="file" 
                    onChange={e => setFile(e.target.files[0])}
                    accept="image/jpeg, image/png"
                    />
                <div className="upload-button-container">
                    <button className="upload-button" onClick={handleUpload} >Upload</button>
                </div>
            </div>
                
            </div>
        </>
    )

    

}
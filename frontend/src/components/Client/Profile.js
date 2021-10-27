import React, { useState } from 'react'
import axios from 'axios';
import '../../css/Profile.css'

const defaultImageSrc = '/img/default_image.jpg'

function Profile({ connectedUser }) {

    const initialValues = {
        imageName: '',
        imageSrc: (connectedUser.imageSrc === null) ? defaultImageSrc : connectedUser.imageSrc,
        imageFile: null
    }

    const [requestAdmin, setRequestAdmin] = useState(connectedUser.wantsAdmin)
    const [values, setValues] = useState(initialValues)

    const updateUser = (formData) => {
        axios.put('http://localhost:5000/api/User', formData)
            .then(res => console.log(res))
            .catch(error => {
                console.log(error)
            })
    }

    function handleRequestAdminAccess() {
        const formData = new FormData()
        formData.append('id', connectedUser.id)
        formData.append('name', connectedUser.name)
        formData.append('email', connectedUser.email)
        formData.append('password', connectedUser.password)
        formData.append('role', connectedUser.role)
        formData.append('wantsAdmin', true)
        formData.append('imageName', (connectedUser.imageName == null) ? '' : connectedUser.imageName)
        formData.append('imageFile', null)
        formData.append('updateImage', false)

        updateUser(formData)
        setRequestAdmin(true)
    }

    const showImage = event => {
        if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageSrc: x.target.result,
                    imageFile: imageFile
                })
            }
            reader.readAsDataURL(imageFile)
        } else {
            setValues({
                imageSrc: defaultImageSrc,
                imageFile: null
            })
        }
    }

    const handlePostImage = () => {
        const formData = new FormData()
        formData.append('id', connectedUser.id)
        formData.append('name', connectedUser.name)
        formData.append('email', connectedUser.email)
        formData.append('password', connectedUser.password)
        formData.append('role', connectedUser.role)
        formData.append('wantsAdmin', connectedUser.wantsAdmin)
        formData.append('imageName', values.imageName)
        formData.append('imageFile', values.imageFile)
        formData.append('updateImage', true)
        updateUser(formData)
    }

    const handleClearImage = event => {
        setValues({
            ...values,
            imageSrc: defaultImageSrc
        })

        const formData = new FormData()
        formData.append('id', connectedUser.id)
        formData.append('name', connectedUser.name)
        formData.append('email', connectedUser.email)
        formData.append('password', connectedUser.password)
        formData.append('role', connectedUser.role)
        formData.append('wantsAdmin', connectedUser.wantsAdmin)
        formData.append('imageName', '')
        formData.append('imageFile', '')
        formData.append('updateImage', true)
        updateUser(formData)
    }

    const imageNotSet = () => {
        return values.imageSrc === defaultImageSrc
    }

    return (
        <div className='profile-container-flex'>
            {/* <div>
                Welcome:
                <p>Name: {connectedUser.name}</p>
                <p>Email: {connectedUser.email}</p>
                <p>Role: {connectedUser.role}</p>
                {(connectedUser.role === 'client') ? 
                    ((requestAdmin == false)?
                    <button onClick={handleRequestAdminAccess}>Request admin role</button> : <h3>Pending request</h3> )
                    : null}
            </div>
            <div className='flex max-width end'>
                <div className='flex vertical'>
                    <img src={values.imageSrc} className='image-container' id='profile-image' />
                    {imageNotSet() ? <input type='file' onChange={showImage} id='input-file' /> : null}
                    <button onClick={handlePostImage}>Submit</button>
                    <button onClick={handleClearImage}>Clear</button>
                </div>
            </div> */}
            <div className='profile-container'>
                <div className='profile-image-container'>
                    <div className='profile-image-content'>
                        <img src={values.imageSrc} id='profile-image' />
                    </div>
                    <div className='profile-add-image'>
                        {imageNotSet() ? <input type='file' onChange={showImage} id='input-file' /> : null}
                    </div>
                    <div className='profile-image-buttons'>
                        <button onClick={handlePostImage}>Submit</button>
                        <button onClick={handleClearImage}>Clear</button>
                    </div>
                </div>
                <div className='profile-data-container'>
                    <div className='profile-data-content'>
                        <p className='profile-data-text'>Name:   {connectedUser.name}</p>
                        <p className='profile-data-text'>Email:  {connectedUser.email}</p>
                        <p className='profile-data-text'>Role:   {connectedUser.role}</p>
                    </div>
                    <div className='profile-request-admin'>
                        {(connectedUser.role === 'client') ?
                            ((requestAdmin == false) ?
                                <button onClick={handleRequestAdminAccess}>Request admin role</button> : <h3>Pending request</h3>)
                            : null}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile

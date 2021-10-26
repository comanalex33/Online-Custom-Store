import React, { useState } from 'react'
import axios from 'axios';
import '../../css/Profile.css'

const defaultImageSrc = '/img/default_image.jpg'

const updateUser = (formData) => {
    axios.put('http://localhost:5000/api/User', formData)
        .then(console.log('Updated'))
        .catch(error => {
            console.log(error)
        })
}

function Profile({ connectedUser }) {

    const initialValues = {
        imageName: '',
        imageSrc: (connectedUser.imageSrc === null) ? defaultImageSrc : connectedUser.imageSrc,
        imageFile: null
    }

    const [values, setValues] = useState(initialValues)

    function handleRequestAdminAccess() {
        let user = {
            UserId: connectedUser.id,
            UserName: connectedUser.name,
            UserEmail: connectedUser.email,
            UserPassword: connectedUser.password,
            UserRole: connectedUser.role,
            UserWantsAdmin: true
        };

        axios.put('http://localhost:51404/api/User', user)
            .then(res => {
                alert('Access requested!');
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            });
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
        updateUser(formData)
    }

    const handleClearImage = event => {
        setValues({
            ...values,
            imageSrc: defaultImageSrc
        })
    }

    const imageNotSet = () => {
        return values.imageSrc === defaultImageSrc
    }

    return (
        <div className='flex'>
            <div>
                Welcome:
                <p>Name: {connectedUser.name}</p>
                <p>Email: {connectedUser.email}</p>
                <p>Role: {connectedUser.role}</p>
                {(connectedUser.role === 'client') ? <button onClick={handleRequestAdminAccess}>Request admin role</button> : null}
            </div>
            <div className='flex max-width end'>
                <div className='flex vertical'>
                    <img src={values.imageSrc} className='image-container' id='profile-image' />
                    {imageNotSet() ? <input type='file' onChange={showImage} id='input-file' /> : null}
                    <button onClick={handlePostImage}>Submit</button>
                    <button onClick={handleClearImage}>Clear</button>
                </div>
            </div>
        </div>

    )
}

export default Profile

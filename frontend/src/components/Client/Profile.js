import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import '../../css/Profile.css'
import Popup from '../Popups/Popup';

const defaultImageSrc = '/img/default_image.jpg'

function Profile({ connectedUser }) {

    const history = useHistory()

    const [popup, setPopup] = useState(false)
    const [messageColor, setMessageColor] = useState('color-red')
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState(connectedUser)
    const [values, setValues] = useState(false)
    

    useEffect(() => {
        axios.get(`http://localhost:5000/api/User/${connectedUser.id}`)
            .then(res => {
                setUser(res.data)

                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [values])

    const updateUser = (formData) => {
        axios.put('http://localhost:5000/api/User', formData)
            .then(res => console.log(res))
            .catch(error => {
                console.log(error)
            })
    }

    function handleRequestAdminAccess() {
        const formData = new FormData()
        formData.append('id', user.id)
        formData.append('name', user.name)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('role', user.role)
        formData.append('wantsAdmin', true)
        formData.append('imageName', (user.imageName == null) ? '' : user.imageName)
        formData.append('imageFile', null)
        formData.append('updateImage', false)

        updateUser(formData)
        setTimeout(() => {
            if (values == true)
                setValues(false);
            else
                setValues(true);
        }, 300)
    }

    const showImage = event => {
        if (event.target.files && event.target.files[0]) {
            let imageFile = event.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                const saveUser = user
                setUser({
                    id: saveUser.id,
                    name: saveUser.name,
                    email: saveUser.email,
                    role: saveUser.role,
                    password: saveUser.password,
                    wantsAdmin: saveUser.wantsAdmin,
                    updateImage: saveUser.updateImage,
                    imageSrc: x.target.result,
                    imageFile: imageFile
                })
            }
            reader.readAsDataURL(imageFile)
            setErrorMessage('')
        } else {
            const saveUser = user
            setUser({
                id: saveUser.id,
                name: saveUser.name,
                email: saveUser.email,
                role: saveUser.role,
                password: saveUser.password,
                wantsAdmin: saveUser.wantsAdmin,
                updateImage: saveUser.updateImage,
                imageSrc: defaultImageSrc,
                imageFile: null
            })
            setMessageColor('color-red')
            setErrorMessage('Something went wrong, image not set')
        }
    }

    console.log(user)

    const handlePostImage = () => {
        if (!imageNotSet()) {
            const formData = new FormData()
            formData.append('id', user.id)
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('password', user.password)
            formData.append('role', user.role)
            formData.append('wantsAdmin', user.wantsAdmin)
            formData.append('imageName', user.imageName)
            formData.append('imageFile', user.imageFile)
            formData.append('updateImage', true)
            updateUser(formData)
            setTimeout(() => {
                if (values == true)
                    setValues(false);
                else
                    setValues(true);
            }, 300)
            setMessageColor('color-green')
            setErrorMessage('Image saved')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else {
            setMessageColor('color-red')
            setErrorMessage('Image not set')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }

    }

    const handleClearImage = event => {
        if (!imageNotSet()) {
            const formData = new FormData()
            formData.append('id', user.id)
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('password', user.password)
            formData.append('role', user.role)
            formData.append('wantsAdmin', user.wantsAdmin)
            formData.append('imageName', '')
            formData.append('imageFile', '')
            formData.append('updateImage', true)
            updateUser(formData)

            setTimeout(() => {
                if (values == true)
                    setValues(false);
                else
                    setValues(true);
            }, 300)
            setMessageColor('color-green')
            setErrorMessage('Image deleted')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        } else {
            setMessageColor('color-red')
            setErrorMessage('Nothing to delete')
            setTimeout(() => {
                setErrorMessage('')
            }, 3000)
        }
    }

    const imageNotSet = () => {
        return user.imageName === null
    }

    const handleAcceptDeleteAccount = event => {
        axios.delete(`http://localhost:5000/api/User/${connectedUser.id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        setTimeout(() => {
            history.push('/login');
            window.location.reload();
        }, 200)
    }

    const handleViewAllClients = event =>{
        history.push('/dashboard/view')
    }


    return (
        <div className='profile-container-flex'>
            <div className='profile-container'>
                <div className='profile-image-container'>
                    <div className='profile-image-content'>
                        <img src={user.imageSrc} id='profile-image' />
                    </div>
                    <div className='profile-add-image'>
                        {imageNotSet() ? <input type='file' onChange={showImage} id='input-file' /> : null}
                    </div>
                    <div className='profile-image-buttons'>
                        <button onClick={handlePostImage}>Submit</button>
                        <button onClick={handleClearImage}>Clear</button>
                    </div>
                    <p id='profile-picture-error-message' className={messageColor}>{errorMessage}</p>
                </div>
                <div className='profile-data-container'>
                    <div className='profile-data-content'>
                        <p className='profile-data-text'>Name:   {user.name}</p>
                        <p className='profile-data-text'>Email:  {user.email}</p>
                        <p className='profile-data-text'>Role:   {user.role}</p>
                    </div>
                    <div className='profile-buttons'>
                        <div className='profile-delete-account'>
                            {(user.role === 'client') ?
                                ((user.wantsAdmin == false) ?
                                    <button onClick={handleRequestAdminAccess}>Request admin role</button> : <h3>Pending request</h3>)
                                : 
                                <button  id="view-all-clients" onClick={handleViewAllClients}>View all clients</button>
                            }
                        </div>
                       
                        <div className='profile-request-admin'>
                            <button id='delete-account-button' onClick={() => setPopup(true)}>Delete account</button>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Popup trigger={popup}>
                <h2 id='title-accept-delete'>Are you sure you want to delete this account?</h2>
                <div>
                    <button id='button-accept' onClick={handleAcceptDeleteAccount}>Yes</button>
                    <button id='button-reject' onClick={() => setPopup(false)}>No</button>
                </div>
            </Popup>
        </div>

    )
}

export default Profile

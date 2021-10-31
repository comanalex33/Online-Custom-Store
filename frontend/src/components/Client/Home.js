import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
import '../../css/Home.css'

const images = [
    { url: 'img/decorations_image.jpg'},
    { url: 'img/clothes2_image.jpg'},
    { url: 'img/clothes_image.jpg' },
    { url: 'img/cup_image.jpg'},
    { url: 'img/picture_image.jpg'}
]

const descriptionText='This is an online store where you can personalize your favorite product with an image or text. You can choose from a wide range of products.';

const Home = () => {
    return (
        <div className='home-page-container'>
            <div className='home-slider-container'>
                <SimpleImageSlider
                    width={796}
                    height={464}
                    images={images}
                    showBullets={true}
                    showNavs={true} />
            </div>
            <div className='home-data-container'>
                <h1 className='home-page-title'>About Us</h1>
                <div className='home-description-text'>{descriptionText}</div>
                <h1 className='home-page-title'>Contact</h1>
                <p><span className='bold'>Phone number</span>: +40700000000</p>
                <p><span className='bold'>Email address</span>: online-custom-store@yahoo.com</p>
                <p><span className='bold'>Location</span>: Timisoara, Romania</p>
                <p className='home-page-since'>Here for you since <span id='home-page-year' className='bold'>2021</span></p>
            </div>
            <p className='home-page-creators'>Created by <span className='bold'>Coman Alexandru</span> and <span className='bold'>Avramov Amalia</span></p>
        </div>
    )
}

export default Home

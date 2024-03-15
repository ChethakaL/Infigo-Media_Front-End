import React, {useState, useEffect} from 'react'
import {TextArea} from "semantic-ui-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Content() {
    const [name, setName] = useState("");
    const [slogan, setSlogan] = useState("");
    const [logo, setLogo] = useState(null);
    const [about, setAbout] = useState("");
    const [vision, setVision] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [aboutBanner, setAboutBanner] = useState(null);
    const [visionImage, setVisionImage] = useState(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('slogan', slogan);
        formData.append('aboutUs', about);
        formData.append('vision', vision);
        formData.append('phoneNumber', phone);
        formData.append('address', address);
        formData.append('mail', mail);
        formData.append('aboutUsPic', aboutBanner);
        formData.append('visionPic', visionImage);

        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/content', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success('Successfully Submitted');
        } catch (error) {
            console.error('Error:', error);
            toast.success('Error in Submitting');
        }
    };

    return (
        <div className='ui form'>
            <div className='field form-field-container'>
                <h2 className='ui dividing header' style={{width: '100%'}}>Basic Information</h2>
                <div className='two fields form-row'>
                    <div className='seven wide field'>
                        <label>Name of the Business</label>
                        <input
                            type='text'
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='seven wide field'>
                        <label>Slogan</label>
                        <input
                            type='text'
                            placeholder="Slogan"
                            value={slogan}
                            onChange={(e) => setSlogan(e.target.value)}
                        />
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload Logo</label>
                        <div className="upload-image-container">
                            <input type="file" className="upload-input" placeholder="Upload Logo"
                                   onChange={(e) => setLogo(e.target.files[0])}/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload Logo</label>
                        </div>
                    </div>
                </div>
                <h2 className='ui dividing header' style={{width: '100%'}}>Contact Information</h2>
                <div className='two fields form-row'>
                    <div className='seven wide field'>
                        <label>Phone</label>
                        <input
                            type='text'
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className='seven wide field'>
                        <label>Address</label>
                        <input
                            type='text'
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>
                <div className="three fields form-row">
                    <div className="seven wide field">
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder="Email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                        />
                    </div>
                    <div className="three wide field">
                        <label>Longitude</label>
                        <input
                            type='text'
                            placeholder="Location"
                        />
                    </div>
                    <div className="three wide field">
                        <label>Latitude</label>
                        <input
                            type='text'
                            placeholder="Location"
                        />
                    </div>
                </div>
                <h2 className='ui dividing header' style={{width: '100%'}}>About Information</h2>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>About Us</label>
                        <TextArea
                            placeholder="Describe about your business..."
                            rows={10}
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                        />
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload About Banner</label>
                        <div className="upload-image-container">
                            <input type="file" name='aboutUsPic' className="upload-input" placeholder="Upload About"
                                   onChange={(e) => setAboutBanner(e.target.files[0])}/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload</label>
                        </div>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Vision</label>
                        <TextArea
                            placeholder="Describe about the services in your business..."
                            rows={10}
                            value={vision}
                            onChange={(e) => setVision(e.target.value)}
                        />
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload Vision Image</label>
                        <div className="upload-image-container">
                            <input type="file" name='visionPic' className="upload-input" placeholder="Upload Vision"
                                   onChange={(e) => setVisionImage(e.target.files[0])}/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload</label>
                        </div>
                    </div>
                </div>
                <div style={{width: '85%', marginTop: 20,}}>
                    <button className='ui primary button' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false}/>
        </div>
    )
}

export default Content

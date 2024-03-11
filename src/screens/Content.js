import React from 'react'
import {TextArea} from "semantic-ui-react";

function Content() {
    return (
        <div className='ui form'>
            <div className='field form-field-container'>
                <div className='two fields form-row'>
                    <div className='seven wide field'>
                        <label>Name of the Business</label>
                        <input type='text' placeholder="Name"/>
                    </div>
                    <div className='seven wide field'>
                        <label>Slogan</label>
                        <input type='text' placeholder="Name"/>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload Logo</label>
                        <div className="upload-image-container">
                            <input type="file" className="upload-input" placeholder="Upload Logo"/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload Logo</label>
                        </div>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>About Us</label>
                        <TextArea placeholder="Describe about your business..." rows={10}/>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload About Banner</label>
                        <div className="upload-image-container">
                            <input type="file" className="upload-input" placeholder="Upload Logo"/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload</label>
                        </div>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Services</label>
                        <TextArea placeholder="Describe about the services in your business..." rows={10}/>
                    </div>
                </div>
                <div className="one fields form-row">
                    <div className="fourteen wide field">
                        <label>Upload Service Banner</label>
                        <div className="upload-image-container">
                            <input type="file" className="upload-input" placeholder="Upload Logo"/>
                            <div className="upload-icon">
                                <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                            </div>
                            <label>Upload</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content

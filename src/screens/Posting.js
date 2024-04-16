import React, {useState,useEffect} from 'react'
import axios from "axios";
import {Select} from "semantic-ui-react";
import {toast} from "react-toastify";

function Posting() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [post, setPost] = useState(null);
    const [productType, setProductType] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        axios.get('http://192.168.1.189:4001/backend/api/shop/keyvalue')
            .then(response => {
                setProductType(response.data);
            })
            .catch(error => {
                console.error('Error fetching products: ',error);
            })
    })

    const handleAiGenerate = async (e) => {
        e.preventDefault();

        const generativeData = new FormData();
        generativeData.append('image',post);
        generativeData.append('product_id', selectedProduct);

        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/post/generate-description', generativeData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = await response.data;
            setDescription(data.description);
            console.log('description: ', data.description);
        }catch (error) {
            console.error('Error adding product: ', error);
        }
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('message', description);
        formData.append('image',post);

        try{
            const response = await axios.post('https://infigomedia.xyz/backend/api/post/create', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            toast.success('Successfully Post Created!');
            console.log(response.data);
        }catch (error){
            console.error(error);
        }
    }

    return (
        <div>
            <form className='ui form'>
                <div className='field form-field-container'>
                    <div className='two fields form-row'>
                        <div className='seven wide field'>
                            <label>Title</label>
                            <input
                                type='text'
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/*TODO Put a Search Selection instead of a normal input to select the product that they are going to put and this is optional*/}
                        <div className='seven wide field'>
                            <label>Product (Optional)</label>
                            <Select
                                options={productType.map(product => ({
                                    key: product._id,
                                    text: product.name,
                                    value: product._id,
                                }))}
                                placeholder='Product Type'
                                style={{height:'5px'}}
                                value={selectedProduct}
                                onChange={(e,data)=> {
                                    setSelectedProduct(data.value);
                                    console.log("SelectedProduct: ", selectedProduct);
                                }}
                            />
                        </div>
                    </div>
                    <div className='one fields form-row'>
                        <div className='twelve wide field'>
                            <label>Description</label>
                            <input
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button className='ui purple button' style={{marginTop:20}} onClick={handleAiGenerate}>AI Generate</button>
                    </div>
                    <div className="one fields form-row">
                        <div className="fourteen wide field">
                            <label>Upload Post</label>
                            <div className="upload-image-container">
                                <input type="file" className="upload-input" placeholder="Upload Post"
                                       onChange={(e) => setPost(e.target.files[0])}/>
                                <div className="upload-icon">
                                    <i className="upload big icon" style={{marginTop: 5, padding: 0}}></i>
                                </div>
                                <label>{post===null ? "Upload Logo" : "Logo Uploaded :)"}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='ui primary button' onClick={handleFormSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Posting

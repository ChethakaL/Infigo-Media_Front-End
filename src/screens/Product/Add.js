import React, {useState, useEffect} from 'react'
import {Dropdown, Select} from "semantic-ui-react";
import {FaPlus} from "react-icons/fa";
import axios from "axios";
import {toast} from "react-toastify";

function Add() {
    // Variables
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [description,setDescription] = useState("");
    const [sizeType, setSizeType] = useState("");
    const [qty, setQty] = useState("");
    const [inputValue, setInputValue] = useState('');
    const [productImage, setProductImage] = useState(null);

    // Arrays
    const [stocks, setStocks] = useState([]);
    const [colors, setColors] = useState([]);
    const [productColors, setProductColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    // Select Options
    const productTypeOptions = [
        { key: '1', value: '1', text: 'Men' },
        { key: '2', value: '2', text: 'Women' },
        { key: '3', value: '3', text: 'Kids' },
    ]
    const sizeTypeOptions =[
        {key: '1', value:'s', text:'Small'},
        {key: '2', value:'m', text:'Medium'},
        {key: '3', value:'l', text:'Large'},
        {key: '4', value:'xl', text:'XL'},
        {key: '5', value:'xxl', text:'XXL'},
    ]
    // Example color options for the dropdown
    const colorOptions = [
        { key: 'red', value: 'Red', text: 'Red' },
        { key: 'blue', value: 'Blue', text: 'Blue' },
        { key: 'green', value: 'Green', text: 'Green' },
        { key: 'yellow', value: 'Yellow', text: 'Yellow' },
        { key: 'black', value: 'Black', text: 'Black' },
        { key: 'white', value: 'White', text: 'White' },
        { key: 'gray', value: 'Gray', text: 'Gray' },
        { key: 'brown', value: 'Brown', text: 'Brown' },
        { key: 'orange', value: 'Orange', text: 'Orange' },
        { key: 'pink', value: 'Pink', text: 'Pink' },
        { key: 'purple', value: 'Purple', text: 'Purple' },
        { key: 'beige', value: 'Beige', text: 'Beige' },
        { key: 'navy', value: 'Navy', text: 'Navy' },
        { key: 'teal', value: 'Teal', text: 'Teal' },
        { key: 'maroon', value: 'Maroon', text: 'Maroon' },
        { key: 'khaki', value: 'Khaki', text: 'Khaki' },
        { key: 'olive', value: 'Olive', text: 'Olive' },
        { key: 'silver', value: 'Silver', text: 'Silver' },
        { key: 'gold', value: 'Gold', text: 'Gold' },
        { key: 'turquoise', value: 'Turquoise', text: 'Turquoise' }
        // Add more color options as needed
    ];


    // Stock function
    // const addStock = () => {
    //     if (!sizeType || colors.length === 0 || !qty) {
    //         alert("Please fill all the fields before adding stock");
    //         return;
    //     }
    //
    //     const newStock = {
    //         size: sizeType,
    //         colors: colors,
    //         qty: qty
    //     };
    //
    //     // Add the new stock to the existing stocks
    //     setStocks([...stocks, newStock]);
    //
    //     // Reset the form fields
    //     setSizeType("");
    //     setColors([]);
    //     setQty("");
    // };
    const addStock = () => {
        if (sizes.length === 0 || colors.length === 0 || !qty) {
            alert("Please fill all the fields before adding stock");
            return;
        }

        const newStockEntries = sizes.flatMap(size =>
            colors.map(color => ({
                size: size,
                color: color,
                qty: parseInt(qty, 10)
            }))
        );

        setStocks([...stocks, ...newStockEntries]);

        // Reset the form fields
        setSizes([]);
        setColors([]);
        setQty("");
    };

    const removeStock = (index) => {
        const newStocks = stocks.filter((_, i) => i !== index);
        setStocks(newStocks);
    };

    const handleAiGenerate = async (e) => {
        e.preventDefault();

        // Check if all necessary data is available
        if (!productImage || !productName || !productType || !productPrice || stocks.length === 0) {
            alert("Please fill all the fields before generating description");
            return;
        }

        const generativeData = new FormData();
        generativeData.append('image', productImage);
        generativeData.append('productName', productName);
        generativeData.append('productType', productType);
        generativeData.append('productPrice', productPrice);
        stocks.forEach((stock, index) => {
            generativeData.append(`stocks[${index}][size]`, stock.size);
            generativeData.append(`stocks[${index}][color]`, stock.color);
            generativeData.append(`stocks[${index}][qty]`, stock.qty);
        });

        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/post/generate-description/add', generativeData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const data = await response.data;
            setDescription(data.description);
            console.log('description: ', data.description);
        } catch (error) {
            console.error('Error generating description: ', error);
            // Handle error
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productType', productType);
        formData.append('productPrice', productPrice); // Add price to form data
        formData.append('description', description);
        formData.append('name', productName); // Add name to form data
        formData.append('image', productImage);

        // Add stock data
        stocks.forEach((stock, index) => {
            formData.append(`stocks[${index}][size]`, stock.size);
            formData.append(`stocks[${index}][color]`, stock.color);
            formData.append(`stocks[${index}][qty]`, stock.qty);
        });

        try {
            const response = await axios.post('https://infigomedia.xyz/backend/api/shop/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Product added successfully:', response.data);
            toast.success('Successfully added');
            setProductName('');
            setProductType('');
            setProductPrice('');
            setDescription('');
            setProductImage(null);
            setStocks([]);

        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error
        }
    };



    return (
        <div className='row add-product' style={{justifyContent: 'center'}}>
            <div className='gray-container-lg'>
                <h2>Add Product</h2>
                <form className='ui form'>
                    <div className='field'>
                        <div className='three fields'>
                            <div className='six wide field'>
                                <label>Product Name</label>
                                <input
                                    type='text'
                                    placeholder='Name'
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <div className='six wide field'>
                                <label>Product Type</label>
                                <Select
                                    options={productTypeOptions}
                                    placeholder='Product Type'
                                    value={productType}
                                    onChange={(e, data) => setProductType(data.value)}
                                />
                            </div>
                            <div className='two wide field'>
                                <label>Product Price</label>
                                <input
                                    type='number'
                                    placeholder='$'
                                    value={productPrice}
                                    onChange={(e) => setProductPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        {/*Stock*/}
                        <div className='ui header dividing row'
                             style={{justifyContent: "space-between", alignItems: "center"}}>
                            <h3>Stock</h3>
                            <FaPlus onClick={addStock}/>
                        </div>

                        <div className='three fields'>
                            <div className='six wide field'>
                                <label>Sizes</label>
                                <Dropdown
                                    placeholder='Select Size'
                                    multiple
                                    search
                                    selection
                                    options={sizeTypeOptions}
                                    onChange={(e, {value}) => setSizes(value)} // Adjusted to set `sizes`
                                    value={sizes}
                                />
                            </div>
                            <div className='six wide field'>
                                <label>Colors</label>
                                <Dropdown
                                    placeholder='Select Colors'
                                    multiple
                                    search
                                    selection
                                    options={colorOptions}
                                    onChange={(e, {value}) => setColors(value)} // Adjusted to set `productColors`
                                    value={colors}
                                />
                            </div>
                            <div className='two wide field'>
                                <label>Qty</label>
                                <input
                                    type='text'
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                />
                            </div>
                        </div>
                        <table className='ui table'>
                            <thead>
                            <tr>
                                <th>Size</th>
                                <th>Colors</th>
                                <th>Qty</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stocks.map((stock, index) => (
                                <tr key={index}>
                                    <td>{stock.size || 'No size is selected'}</td>
                                    {/*<td>{stock.colors ? stock.colors.join(', ') : 'No colors'}</td>*/}
                                    <td>{stock.color || "No color is selected"}</td>
                                    <td>{stock.qty}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/*    Image    */}
                        <div className='one fields'>
                            <div className='fourteen wide field'>
                                <label>Image</label>
                                <input type='file' onChange={(e) => setProductImage(e.target.files[0])}/>
                            </div>
                        </div>
                        <div className='one fields'>
                            <div className='fourteen wide field'>
                                <label>Description</label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <button className='ui purple button' style={{marginTop: 20}} onClick={handleAiGenerate}>AI
                                Generate
                            </button>
                        </div>
                    </div>
                    <div className='row'>
                        <button className='ui primary button' onClick={handleSubmit}>Submit</button>
                        <button className='ui secondary button'>Reset</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Add

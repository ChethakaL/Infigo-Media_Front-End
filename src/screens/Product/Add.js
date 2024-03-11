import React, {useState, useEffect} from 'react'
import {Dropdown, Select} from "semantic-ui-react";
import {FaPlus} from "react-icons/fa";

function Add() {
    // Variables
    const [productType, setProductType] = useState("");
    const [sizeType, setSizeType] = useState("");
    const [qty, setQty] = useState("");
    const [inputValue, setInputValue] = useState('');

    // Arrays
    const [stocks, setStocks] = useState([]);
    const [colors, setColors] = useState([]);

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
        // Add more color options as needed
    ];

    // Stock function
    const addStock = () => {
        if (!sizeType || colors.length === 0 || !qty) {
            alert("Please fill all the fields before adding stock");
            return;
        }

        const newStock = {
            size: sizeType,
            colors: colors,
            qty: qty
        };

        // Add the new stock to the existing stocks
        setStocks([...stocks, newStock]);

        // Reset the form fields
        setSizeType("");
        setColors([]);
        setQty("");
    };

    const removeStock = (index) => {
        const newStocks = stocks.filter((_, i) => i !== index);
        setStocks(newStocks);
    };

    return (
        <div className='row add-product' style={{justifyContent: 'center'}}>
            <div className='gray-container-lg'>
                <h2>Add Product</h2>
                <form className='ui form'>
                    <div className='field'>
                        <div className='two fields'>
                            <div className='seven wide field'>
                                <label>Product Name</label>
                                <input type='text'/>
                            </div>
                            <div className='seven wide field'>
                                <label>Product Type</label>
                                <Select
                                    options={productTypeOptions}
                                    placeholder='Product Type'
                                    value={productType}
                                    onChange={(e, data) => setProductType(data.value)}
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
                                <Select
                                    placeholder='Size'
                                    options={sizeTypeOptions}
                                    value={sizeType || ""}
                                    onChange={(e, data) => setSizeType(data.value)}
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
                                    onChange={(e, {value}) => setColors(value)}
                                    value={colors}
                                />
                            </div>
                            <div className='two wide field'>
                                <label>Qty</label>
                                <input
                                    type='text'
                                    value={qty}
                                    onChange={(e)=> setQty(e.target.value)}
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
                                    <td>{stock.size}</td>
                                    <td>{stock.colors.join(', ')}</td>
                                    <td>{stock.qty}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/*    Image    */}
                        <div className='one fields'>
                            <div className='fourteen wide field'>
                                <label>Image</label>
                                <input type='file'/>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <button className='ui primary button'>Submit</button>
                        <button className='ui secondary button'>Reset</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Add

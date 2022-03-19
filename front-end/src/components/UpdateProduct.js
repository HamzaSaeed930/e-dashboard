import React, { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


function UpdateProduct() {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");

    const param = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async (req, resp) => {
        console.log(param);
        let result = await fetch(`http://localhost:7000/product/${param.id}`,);
        result = await result.json();
        console.log(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:7000/product/${param.id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/');
    }


    return (
        <div className='add_product'>
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" className='inputbox'
                value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="Enter Price" className='inputbox'
                value={price} onChange={(e) => { setPrice(e.target.value) }} />


            <input type="text" placeholder="Enter Category" className='inputbox'
                value={category} onChange={(e) => { setCategory(e.target.value) }} />


            <input type="text" placeholder="Enter Company Name" className='inputbox'
                value={company} onChange={(e) => { setCompany(e.target.value) }} />


            <button className='btn' onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct;
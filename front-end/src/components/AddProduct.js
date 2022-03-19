import React from 'react';

function AddProduct() {
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const [error, setError] = React.useState(false);
    const addProduct = async () => {
        //console.log(!name);//as ma ya false retun kra ga agr ma kuj ni likhta tu true return kra ga.
        //return false;// as sa phle jo bi code hw ga wha tak chale gi uska bad wala code ni chale ga.

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        console.log(name, price, category, company);
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:7000/add-product', {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'//agr kuj alg sa header bejna hw tu backend developer bta deta h otherwise ak hi header hota jo a content type hota
            }
        });
        result = await result.json();
        console.log(result);
    }
    return (
        <div className='add_product'>
            <h1>Product adding Category</h1>
            <input type="text" placeholder="Enter Product Name" className='inputbox'
                value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span className="invalid">Enter Valid name</span>}

            <input type="text" placeholder="Enter Price" className='inputbox'
                value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !name && <span className="invalid">Enter Valid Price</span>}


            <input type="text" placeholder="Enter Category" className='inputbox'
                value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !name && <span className="invalid">Enter Valid Category</span>}


            <input type="text" placeholder="Enter Company Name" className='inputbox'
                value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !name && <span className="invalid">Enter Valid Company</span>}


            <button className='btn' onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct;
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


function ProductList() {
    const [products, setProducts] = useState("");
    useEffect(() => {
        return () => {
            getProducts();
        };
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:7000/products');
        result = await result.json();
        setProducts(result);   // as produst sa list ko render krain ga.
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:7000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            console.log(getProducts);
            getProducts();
        }
    };
    const searchHandle=async (event)=>{
        let key=event.target.value;
        if(key){
            let result=await fetch(`http://localhost:7000/search/${key}`);
            result=await result.json();
            if(result)
            {
                setProducts(result)
            }
        }else{
            getProducts()
        }
       
    }

    return (

        <div className='product-list'>
            <h2>Product List</h2>
            <input type="text" className='search' placeholder='Seach Here' onChange={searchHandle}/>
            <ul>
                <li>S . no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item.id}>Update</Link></li>
                    </ul>
                )
                :<h1>Result not Found</h1>
            }
        </div>
    )

}

export default ProductList
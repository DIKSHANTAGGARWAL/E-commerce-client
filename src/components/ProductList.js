import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SyncIcon from '@mui/icons-material/Sync';
import FeedIcon from '@mui/icons-material/Feed';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isCart, setisCart] = React.useState('');
    const params = useParams()

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products', {
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        })
        result = await result.json()
        if (result) {
            alert("Product is deleted")
            document.location.reload()
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`)
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts()
        }

    }

    // const addToCart = (isCart) => {
    //     console.log(isCart)
    //     isCart = true
    //     console.log(isCart)
    //     alert("")
    // }

    // const updateProduct = async () => {
    //     let result = await fetch(`http://localhost:5000/product/${params.id}`, {
    //         method: 'Put',
    //         body: JSON.stringify({ isCart }),
    //         headers: {
    //             'content-Type': "application/json"
    //         }
    //     })
    // }
    // const addToCart = async () => {
    //     let result = await fetch(`http://localhost:5000/product/${params.id}`, {
    //         method: 'Put',
    //         body: JSON.stringify({isCart}),
    //         headers: {
    //             'content-Type': "application/json"
    //         }
    //     })
    //     result = await result.json()  
    //     console.log(result)
    //     if (result) {
    //         alert("Product is added to cart")
    //         // document.location.reload()
    //     }
    // }

    function e(item, index) {
        return (
            <div className="each-product ">
                <IconButton className="product-delete"
                    onClick={() => deleteProduct(item._id)}
                >
                    <DeleteIcon />
                </IconButton>
                <h2 className="product-name">{item.name}</h2>
                <p>Category-{item.category}</p>
                {/* <button onClick={() => deleteProduct(item._id)}>Delete</button> */}
                <div className="product-operations">
                    <Link className="operation" to={"/update/" + item._id}>Update <SyncIcon/></Link>
                    <Link className="operation" to={"/addToCart/" + item._id}>Product Details <FeedIcon/></Link>
                </div>
            </div>
        )
    }

    return (
        <div className="product-list">
            <h3>Product List</h3>

            <input type="text" className="search-product-box" placeholder="Search Product"
                onChange={searchHandle}
            />

            <div className="products-container">
                {
                    products.map(e)
                }
            </div>

            {/* <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                <li>Add</li>
            </ul> */}
            {
                // products.length > 0 ? products.map((item, index) =>
                //     <ul key={item._id}>
                //         <li>{index + 1}</li>
                //         <li>{item.name}</li>
                //         <li>${item.price}</li>
                //         <li>{item.category}</li>
                //         <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                //             <Link to={"/update/" + item._id}>Update</Link>
                //         </li>
                //         {/* <li><button onClick={()=>addToCart(item.isCart)}>Add to Cart</button></li> */}
                //         <li><Link to={"/addToCart/" + item._id}>Product Details</Link></li>
                //     </ul>
                // )
                //     : <h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;
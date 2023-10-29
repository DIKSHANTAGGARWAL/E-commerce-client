import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'

const Cart = () => {
    const [products, setProducts] = useState([]);

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


    function e(item, index) {
        if (products.length > 0) {
            if (item.isCart == true) {
                return (
                    <div >
                        <div className="cart-each-product ">
                            <h3>{item.name}</h3>
                            <p>Category-{item.category}</p>
                            <ul key={item._id}>
                                <li>{item.name}</li>
                                <li>${item.price}</li>
                                <li>{item.category}</li>
                                <li><Link to={"/removeFromCart/" + item._id}>Product Details</Link></li>
                            </ul>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <div className='product-list cart-product-list'>
            <div className=' products-container'>
                {
                    products.map(e)
                }
            </div>
        </div>
    )
}

export default Cart

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = location.state && location.state.product;

    useEffect(() => {
        if (isEditMode) {
            setProduct(location.state.product);
        }
    }, [isEditMode, location.state]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditMode) {
            axios.put(`http://localhost:8080/updateproduct/${product.id}`, product)
                .then(() => {
                    alert("Product updated successfully!");
                    navigate('/');
                })
                .catch((err) => console.error("Error updating product:", err));
        } else {
            axios.post("http://localhost:8080/addproduct", product)
                .then(() => {
                    alert("Product added successfully!");
                    navigate('/');
                })
                .catch((err) => console.error("Error adding product:", err));
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>
                {isEditMode ? "Edit Product" : "Add Product"}
            </h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
                
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
    
                {/* Category Select Dropdown */}
                <select name="category" value={product.category} onChange={handleChange} required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px", background: "white" }}>
                    <option value="">Select Category</option>
                    <option value="men's clothing">Men's clothing</option>
                    <option value="electronics">electronics</option>
                    <option value="women's clothing">women's clothing</option>
                    <option value="jewelery">jewelery</option>
                </select>
    
                <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
                
                <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required
                    style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px" }} />
                
                <button type="submit"
                    style={{ background: isEditMode ? "orange" : "green", color: "white", padding: "12px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer" }}>
                    {isEditMode ? "Update Product" : "Add Product"}
                </button>
            </form>
        </div>
    );
    
};

export default AddProduct;

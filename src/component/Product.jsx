import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Product = () => {
    const [datas, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        axios.get("http://localhost:8080/product")
        .then((res) => {
            console.log("Full Response:", res); 
            console.log("Response Data:", res.data.products); 
            setData(res.data.products || []); 
        })
        .catch((err) => {
            console.error("Error fetching data:", err);
            setData([]); 
        });
    };

    function handleDelete(id) {
        axios.delete(`http://localhost:8080/deleteproduct/${id}`)
            .then((res) => {
                console.log(res);   
                alert("Deleted successfully");
                fetchData(); 
            })
            .catch((err) => {
                console.error("Error deleting product:", err);
            });
    }

    const handleEdit = (product) => {
        navigate('/edit', { state: { product } });
    };
    const handleView = (product) => {
        navigate('/description', { state: { product } });
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h1>Product</h1>
            <button 
                onClick={() => navigate('/add-product')} 
                style={{ background: "green", color: "white", padding: "10px", marginBottom: "20px" }}
            >
                Add Product
            </button>
            {datas.length === 0 && <p>Loading or no products available...</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }} >
                {datas.map((el) => (
                    <div key={el.id} style={{ border: "1px solid green", padding: "10px", cursor: "pointer" }} onClick={() => handleView(el)}>
                    <h1>{el.id}</h1>
                    <img src={el.image} width="150px" height="150px" alt={el.title} />
                    <h2>{el.title}</h2>
                    <h3>${el.price}</h3>
                    <h4>{el.category}</h4>
                    <p>{el.description}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(el); }} style={{ background: "blue", color: "white", padding: "5px" }}>Edit</button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(el.id); }} style={{ background: "red", color: "white", padding: "5px" }}>Delete</button>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

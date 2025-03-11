import { useLocation, useNavigate } from 'react-router';

const Description = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) {
        return <h2>No product details available.</h2>;
    }

    return (
        <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{ width: "100%", height: "auto", borderRadius: "5px" }} />
            <h2 style={{ color: "green" }}>${product.price}</h2>
            <h3 style={{ color: "gray" }}>{product.category}</h3>
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>{product.description}</p>

            <button onClick={() => navigate('/')} 
                style={{ background: "blue", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}>
                Back to Products
            </button>
        </div>
    );
};

export default Description;

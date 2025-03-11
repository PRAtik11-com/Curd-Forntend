import { Route,Routes } from 'react-router'
import Product from '../component/Product'
import AddProduct from '../component/AddProduct'
import Description from '../component/Description'

const Allroute = () => {
  return (
    <div>
    <Routes>
    
        <Route path="/" element={<Product />} />
        <Route path="/edit" element={<AddProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path='/description' element={<Description />} />

        
    </Routes>
    </div>
  )
}

export default Allroute

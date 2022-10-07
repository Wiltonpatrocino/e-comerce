import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, Form } from 'react-bootstrap';
import "../styles/home.css"


const Home = () => {

    const navigate = useNavigate()

    const products = useSelector(state => state.products)

    const [categories, setCategories] = useState([])

    const [productsFiltered, setProductsFiltered] = useState([products])

    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(products)
    }, [products])

    const filterCategory = (categoryId) => {
        const filtered = products.filter(product => product.category.id === categoryId)
        setProductsFiltered(filtered)
    }

    const search = () => {
        searchValue.toLowerCase()
        const name = searchValue[0].toUpperCase() + searchValue.slice(1)
        const filtered = products.filter(product => product.title.includes(name))
        setProductsFiltered(filtered)
    }

    return (
        <div>
            <div className='nav'>

               {
                    categories.map(category => (
                        
                        <Button key={category.id} onClick={() => filterCategory(category.id)}>{category.name}</Button>
                    ))
                }

            </div>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search products"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={search}>
                    Search
                </Button>
            </InputGroup>
            <h1>Welcome to E-Commerce</h1>

            <ul>
                {
                    productsFiltered.map(product => (
                        <li key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                            <h4>{product.title}</h4>
                            <img src={product.productImgs} width="25%" alt="" />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Home;
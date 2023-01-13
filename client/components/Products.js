import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../features/productsSlice'

// hardcoded data to test categories
// dropdown categories 
const types = ["all", "food", "treats", "supplies"]
// modified seed data
const data = [
    {id: 1, name: "Milk - 1%", category: "food", description: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", price: 26.22, imageUrl: "https://i.imgur.com/fVPMvho.jpg"},
    {id: 2, name: "Pup-eroni", category: "treats", description: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.", price: 90.04, imageUrl: "https://i.imgur.com/s43kjIJ.jpg"},
    {id: 3, name: "Collar", category: "supplies", description: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.", price: 62.96, imageUrl: "https://i.imgur.com/ZxyrGfO.jpg"},
]

// Write a component to display a list of all products (at least their name, category, price, short description, and a add to cart button)
const Products = () => {
    // store currently selected category
    const [type, setType] = useState("");

    // Memoized results. Will re-evaluate any time selected  
    // category changes  
    const filteredData = useMemo(()=>{
        if(!type || type  === "all") return data;

        return data.filter(element => element.category === type)
    }, [type]);

    const Products = useSelector(selectProducts)

    return (
    <div>
        <form>
            <label>Category</label>
            <select>
                {
                types.map((type) => (
                    <option value={type}>{type}</option>
                ))
                }
            </select>
        </form>


        {Products && Products.length ? Products.map((product) =>(
            <div key={product.id} className="product" >

                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>

                <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl}/>
                </Link>

                <p>${product.price}</p>
                <p>{product.description}</p>
                <button>Add to Cart</button>
            </div>
        ))
        : null
        }
        
    </div>
    )
}

export default Products

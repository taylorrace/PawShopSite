import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// * These are our thunks, which make asynchronous calls to our server to fetch our data
export const fetchProductsAsync = createAsyncThunk("products", async ()=> {
    try{
        const {data} = await axios.get(`/api/products`);
        return data
    } catch(error){
        console.log(error)
    }
});

export const addProductAsync = createAsyncThunk("products/add", async({ name, price, category, description, imageUrl }) => {
    try{
        const {data} = await axios.post(`/api/products`, {
            name, price, category, description, imageUrl
        });
        return data;
    } catch (error){
        console.log(error);
    }
})

export const deleteProductAsync = createAsyncThunk("products/delete", async (id) => {
    try{
        await axios.delete(`/api/products/${id}`);
        return id;
    } catch (error) {
        console.log(error)
    }
});


// * Here we invoke the createSlice function, and pass it an object with all of our state details
export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
    // * All our data is async so our logic does not go here, but in the extraReducers
    },
    extraReducers: (builder) => {
    // * We invoke the addCase method here to handle our thunk
    // * When our thunk is fulfilled, we can return the value as our new state  
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
            return state.filter((product) => product.id !== action.payload)
        });
    }
})

// * This is a function we will pass to useSelector in our component,
// * to read values from our specific slice of redux state
export const selectProducts = (state) => state.products;

// * We need to export the reducer from our slice, and add it to our configureStore function in app/store.js
export default productsSlice.reducer
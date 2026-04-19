import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async ({ storeId }, thunkAPI) => {
        try {
            const { data } = await axios.get(
                '/api/products' + (storeId ? `?storeId=${storeId}` : '')
            )
            return data.products
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        list: [],
    },

    reducers: {
        setProduct: (state, action) => {
            state.list = action.payload
        },

        clearProduct: (state) => {
            state.list = []
        },

        // ✅ UPDATE PRODUCT (MAIN FEATURE)
        updateProduct: (state, action) => {
            const index = state.list.findIndex(
                (p) => p.id === action.payload.id
            )

            if (index !== -1) {
                state.list[index] = {
                    ...state.list[index],
                    ...action.payload
                }
            }
        },

        // ✅ OPTIONAL: LOCAL STOCK TOGGLE (for instant UI)
        toggleStockLocal: (state, action) => {
            const product = state.list.find(
                (p) => p.id === action.payload
            )

            if (product) {
                product.inStock = !product.inStock
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload
        })
    }
})

export const {
    setProduct,
    clearProduct,
    updateProduct,
    toggleStockLocal
} = productSlice.actions

export default productSlice.reducer
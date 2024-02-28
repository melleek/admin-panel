import { createSlice } from "@reduxjs/toolkit";
import { getBrandById, getBrands, getCategory, getColorId, getProduct, getProductById, getProfile, getProfileById, getsubCategory } from "../api/Api";

const Reducer = createSlice({
    name: "Reducer",
    initialState: {
        loading: false,
        product: [],
        brand: [],
        subCategory: [],
        color: [],
        productById: [],
        category: [],
        user: [],
        users: [],
        brandById:[],
        // reducer
        productName: '',
        quantity: 0,
        code: '',
        price: 0,
        hasDiscount: false,
        discountPrice: 0,
        brandId: 0,
        colorId: 0,
        description: '',
        subCategoryId: 0,
    },
    reducers: {

        // add
        setProductName: (state, action) => {
            state.productName = action.payload
        },
        setQuantity: (state, action) => {
            state.quantity = action.payload
        },
        setCode: (state, action) => {
            state.code = action.payload
        },
        setPrice: (state, action) => {
            state.price = action.payload
        },
        setHasDiscount: (state, action) => {
            state.hasDiscount = action.payload
        },
        setDiscountPrice: (state, action) => {
            state.discountPrice = action.payload
        },
        setBrandId: (state, action) => {
            state.brandId = action.payload
        },
        setColorId: (state, action) => {
            state.colorId = action.payload
        },
        setDescription: (state, action) => {
            state.description = action.payload
        },
        setSubCategoryId: (state, action) => {
            state.subCategoryId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.loading = false;
        });

        //brand
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.loading = false;
            state.brand = action.payload
        });

        //subCategory
        builder.addCase(getsubCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.subCategory = action.payload
        });

        //color 
        builder.addCase(getColorId.fulfilled, (state, action) => {
            state.loading = false;
            state.color = action.payload
        });

        //productById 
        builder.addCase(getProductById.fulfilled, (state, action) => {
            console.log(action.payload);
            state.loading = false;
            state.productById = action.payload
        });

        //getCategory
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.category = action.payload
        });

        //profile
        builder.addCase(getProfileById.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload
        });

        //alluser
        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload
        });

        //getBrandById
        builder.addCase(getBrandById.fulfilled, (state, action) => {
            state.loading = false;
            state.brandById = action.payload
        })
    },
})

export default Reducer.reducer
export const {
    setQuantity,
    setPrice,
    setCode,
    setDiscountPrice,
    setHasDiscount,
    setProductName,
    setBrandId,
    setColorId,
    setDescription,
    setSubCategoryId } = Reducer.actions

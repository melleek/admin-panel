import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { axiosRequest } from "../utils/axiosRequest";



//getCategory 
export const getCategory = createAsyncThunk('api/getCategory',
    async () => {
        try {
            const { data } = await axiosRequest.get('Category/get-categories')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//addCategory
export const addCategory = createAsyncThunk('api/getCategory',
    async (newCateg, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post('Category/add-category', newCateg, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getCategory())
        } catch (error) {

        }
    }
)

//deleteCategory 
export const deleteCategory = createAsyncThunk('api/deleteCategory',
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`Category/delete-category?id=${id}`)
            dispatch(getCategory())
        } catch (error) {

        }
    }
)


//categoryEdit
export const categoryEdit = createAsyncThunk('api/categoryEdit',
    async (newCateg, { dispatch }) => {
        try {
            const { data } = await axiosRequest.put('Category/update-category', newCateg, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getCategory())
        } catch (error) {

        }
    }
)



//getProduct
export const getProduct = createAsyncThunk('api/getProduct',
    async () => {
        try {
            const { data } = await axiosRequest.get('Product/get-products')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//product by id 
export const productById = createAsyncThunk('api/productById',
    async (id) => {
        try {
            const { data } = await axiosRequest.get(`Product/get-product-by-id?id=${id}`)
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//addProdut
export const addProduct = createAsyncThunk('api/addProduct',
    async (formData, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post('Product/add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getProduct())
        } catch (error) {
            console.log(error);
        }
    }
)

//edit product
export const editProduct = createAsyncThunk('api/editProduct',
    async (editForm, { dispatch }) => {
        try {
            const { data } = await axiosRequest.put('Product/update-product', editForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getProduct())
        } catch (error) {
            console.log(error);
        }
    }
)

//getProductById 
export const getProductById = createAsyncThunk('api/getProductById',
    async (id) => {
        try {
            const { data } = await axiosRequest.get(`Product/get-product-by-id?id=${id}`)
            // console.log(data?.data);
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)



//deleteProduct
export const deleteProduct = createAsyncThunk('api/deleteProduct',
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`Product/delete-product?id=${id}`)
            dispatch(getProduct())
        } catch (error) {
            console.log(error);
        }
    }
)


//getcolor
export const getColorId = createAsyncThunk('api/getColorId',
    async () => {
        try {
            const { data } = await axiosRequest.get('Color/get-colors')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)


//getsubCategory 
export const getsubCategory = createAsyncThunk('api/getSubCategory',
    async () => {
        try {
            const { data } = await axiosRequest.get('SubCategory/get-sub-category')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//getBrands
export const getBrands = createAsyncThunk('api/getBrands',
    async () => {
        try {
            const { data } = await axiosRequest.get('Brand/get-brands')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//getBrands 
export const getBrandById = createAsyncThunk('api/getBrandById',
    async (id) => {
        try {
            const { data } = await axiosRequest.get(`Brand/get-brand-by-id?id=${id}`)
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//update brand
export const updateBrand = createAsyncThunk('api/updateBrand',
    async (form, { dispatch }) => {
        try {
            const { data } = await axiosRequest.put('Brand/update-brand', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getBrands())
        } catch (error) {
            console.log(error);
        }
    }
)

//addBrand
export const brandAdd = createAsyncThunk('api/brandAdd',
    async (newbrand, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(`Brand/add-brand`, newbrand, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getBrands())
        } catch (error) {
            console.log(error);
        }
    }
)

// delete brands 
export const deleteBrands = createAsyncThunk('api/deleteBrands',
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`Brand/delete-brand?id=${id}`)
            dispatch(getBrands())
        } catch (error) {
            console.log(error);
        }
    }
)


//getProfile 
export const getProfile = createAsyncThunk('api/getProfile',
    async () => {
        try {
            const { data } = await axiosRequest.get('UserProfile/get-user-profiles')
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//getProfileById
export const getProfileById = createAsyncThunk('api/getProfileById',
    async (userId) => {
        try {
            const { data } = await axiosRequest.get(`UserProfile/get-user-profile-by-id?id=${userId}`)
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//delete Profile 
export const deleteProfile = createAsyncThunk('api/deleteProfile',
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.delete(`UserProfile/delete-user?id=${id}`)
            dispatch(getProfile())
        } catch (error) {

        }
    }
)

//edit USER 
export const editProfile = createAsyncThunk('api/editProfile',
    async (editForm, { dispatch }) => {
        try {
            const { data } = await axiosRequest.put('UserProfile/update-user-profile', editForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            dispatch(getProfile())
        } catch (error) {
            console.log(error);
        }
    }
)

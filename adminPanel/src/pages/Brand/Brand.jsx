import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { brandAdd, deleteBrands, getBrandById, getBrands, updateBrand } from '../../api/Api'
import { Button, Dialog, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Close, Delete, Edit } from '@mui/icons-material';

function Brand() {

    const dispatch = useDispatch()
    const brand = useSelector((store) => store.Reducer.brand)
    const brandById = useSelector((store) => store.Reducer.brandById)
    console.log(brandById)

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const [brandName, setBrandName] = useState('')

    const addNewBrand = (e) => {
        e.preventDefault()
        const newBrand = new FormData()
        newBrand.append('BrandName', brandName)
        dispatch(brandAdd(newBrand))
    }

    //mui add
    const [addBrand, setAddBrand] = useState(false)

    const openAddBrand = () => {
        setAddBrand(true)
    }

    const closeAddBrand = () => {
        setAddBrand(false)
    }

    //mui edit
    const [editModal, setEditModal] = useState(false)

    const openAddModal = (e) => {
        setEditModal(true)
        setBrandNameEdit(e.brandName)
    }

    const closeModal = () => {
        setEditModal(false)
    }

    const [brandNameEdit, setBrandNameEdit] = useState('')

    const editBrand = (e) => {
        e.preventDefault()
        const brand = new FormData()
        brand.append('BrandName', brandNameEdit)
        dispatch(updateBrand(brand))
    }

    // deleteProduct 
    const [modalDelete, setModalDelete] = useState(false)
    const [idxD, setIdxD] = useState(false)

    const deleteproduct = (id) => {
        setIdxD(id)
        setModalDelete(true)
    }

    const deleteProductModal = () => {
        dispatch(deleteBrands(idxD))
        setModalDelete(false)
    }

    const canselDeleteProduct = () => {
        setModalDelete(false)
    }

    return (
        <>
            <button className='bg-[#262626d2] text-white mb-[20px] px-[10px] py-[5px] rounded-[5px]' onClick={openAddBrand}>new brand +</button>
            <div className='flex flex-wrap gap-[40px]'>
                {brand?.map((e) => {
                    return (
                        <div key={e.id} className='shadow-md rounded-[8px] bg-[#dbdbdb2f] p-[20px] flex w-[250px] flex-col items-center gap-[10px]'>
                            <h1>Brand: {e.brandName}</h1>
                            <h1>ID: {e.id}</h1>
                            <div className='flex gap-[5px]'>
                                <Delete className='text-[red] cursor-pointer' onClick={() => deleteproduct(e.id)} />
                                <Edit className='text-[#4c9cf7] cursor-pointer' onClick={() => {
                                    dispatch(getBrandById(e.id))
                                    openAddModal(e)
                                }} />

                            </div>
                        </div>
                    )
                })}
            </div >


            {/* add */}
            < Dialog
                open={addBrand}
            >

                <>
                    <div className='p-[30px]'>
                        <div className='flex justify-between mb-[20px]'>
                            <h1>New Brand</h1>
                            <CloseIcon onClick={closeAddBrand} />
                        </div>
                        <form action="" onSubmit={addNewBrand} className='flex flex-col gap-[10px]'>
                            <TextField onChange={(e) => setBrandName(e.target.value)} />
                            <Button type='submit' onClick={closeAddBrand} sx={{ border: '1px solid' }}>Save</Button>
                        </form>
                    </div>
                </>

            </Dialog >

            {/* edit */}
            < Dialog
                open={editModal}
                onClose={closeModal}
            >
                <form action="" className='p-[20px] flex flex-col gap-[20px]' onSubmit={editBrand}>
                    <div className='flex items-center justify-between'>
                        <h1>Edit_Brand</h1>
                        <Close onClick={closeModal} className='cursor-pointer' />
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <TextField value={brandNameEdit} onChange={(e) => setBrandNameEdit(e.target.value)} />
                        <Button type='submit' sx={{ border: '1px solid' }} onClick={closeModal}>submit</Button>
                    </div>
                </form>
            </ Dialog>

            {/* delete modal */}
            <Dialog
                open={modalDelete}
                onClose={canselDeleteProduct}
            >
                <div className='p-[20px] flex flex-col gap-[20px]'>
                    <h1 className='text-[22px]'>Вы точно хотите это удалить?</h1>
                    <div className='flex items-center justify-center gap-[20px]'>
                        <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={deleteProductModal}>Yes</Button>
                        <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={canselDeleteProduct}>Cansel</Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default Brand
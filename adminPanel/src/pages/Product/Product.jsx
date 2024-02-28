import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, editProduct, getBrands, getColorId, getProduct, getProductById, getsubCategory } from '../../api/Api'
import { Button, Dialog, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { setBrandId, setCode, setColorId, setDescription, setDiscountPrice, setHasDiscount, setPrice, setProductName, setQuantity, setSubCategoryId } from '../../reducers/Reducer';


// mui ison 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//mui table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Add } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const Product = () => {

  //add modal 
  const [openAdd, setOpenAdd] = useState(false)

  const openAddModal = () => {
    setOpenAdd(true)
  }

  const closeAddModal = () => {
    setOpenAdd(false)
  }


  //modalInfo 
  const [info, setInfo] = useState(false)

  const openInfo = () => {
    setInfo(true)
  }

  const closeInfo = () => {
    setInfo(false)
  }


  const dispatch = useDispatch()
  const product = useSelector((store) => store.Reducer.product)
  console.log(product);
  const brand = useSelector((store) => store.Reducer.brand)
  const subCategory = useSelector((store) => store.Reducer.subCategory)
  const color = useSelector((store) => store.Reducer.color)
  const productById = useSelector((store) => store.Reducer.productById)
  console.log(productById);

  useEffect(() => {
    dispatch(getProduct())
    dispatch(getBrands())
    dispatch(getsubCategory())
    dispatch(getColorId())
  }, [dispatch])

  // add 
  const productName = useSelector((store) => store.Reducer.productName)
  const quantity = useSelector((store) => store.Reducer.quantity)
  const code = useSelector((store) => store.Reducer.code)
  const price = useSelector((store) => store.Reducer.price)
  const hasDiscount = useSelector((store) => store.Reducer.hasDiscount)
  const discountPrice = useSelector((store) => store.Reducer.discountPrice)
  const brandId = useSelector((store) => store.Reducer.brandId)
  const colorId = useSelector((store) => store.Reducer.colorId)
  const description = useSelector((store) => store.Reducer.description)
  const subCategoryId = useSelector((store) => store.Reducer.subCategoryId)

  const [img, setImg] = useState(null)


  //edit modal 

  const [productNameEdit, setProductNameEdit] = useState('')
  const [quantityEdit, setQuantityEdit] = useState(0)
  const [priceEdit, setPriceEdit] = useState(0)
  const [codeEdit, setCodeEdit] = useState(0)
  const [brandEdit, setBrandEdit] = useState(0)
  const [colorEdit, setColorEdit] = useState(0)
  const [hasDiscountEdit, setHasDiscountEdit] = useState(false)
  const [discountPriceEdit, setDiscountPriceEdit] = useState(0)
  const [descriptionEdit, setDescriptionEdit] = useState('')
  const [subCategoryIdEdit, setSubCategoryIdEdit] = useState(0)
  // const [idxE, setIdxE] = useState(null)
  const [edit, setEdit] = useState(false)

  const editOpen = (e) => {
    setEdit(true)
    dispatch(getProductById(e.id))
    setProductNameEdit(e.productName)
    setQuantityEdit(e.quantity)
    setHasDiscountEdit(e.hasDiscount)
    setDiscountPriceEdit(e.discountPrice)
    setPriceEdit(e.price)
  }

  const editClose = () => {
    setEdit(false)
  }
  //edit
  const formDataEdit = (e) => {
    e.preventDefault()
    const editFormData = new FormData()
    editFormData.append('ProductName', productNameEdit)
    editFormData.append('Quantity', quantityEdit)
    editFormData.append('Code', codeEdit)
    editFormData.append('Price', priceEdit)
    editFormData.append('HasDiscount', hasDiscountEdit)
    editFormData.append('DiscountPrice', discountPriceEdit)
    editFormData.append('BrandId', brandEdit)
    editFormData.append('ColorId', colorEdit)
    editFormData.append('Description', descriptionEdit)
    editFormData.append('SubCategoryId', subCategoryIdEdit)
    dispatch(editProduct(editFormData))
  }

  // add
  const formDataImg = (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('Images', img)
    formData.append('ProductName', productName)
    formData.append('Quantity', quantity)
    formData.append('Code', code)
    formData.append('Price', price)
    formData.append('HasDiscount', hasDiscount)
    formData.append('DiscountPrice', discountPrice)
    formData.append('BrandId', brandId)
    formData.append('ColorId', colorId)
    formData.append('Description', description)
    formData.append('SubCategoryId', subCategoryId)
    dispatch(addProduct(formData))
  }


  // deleteProduct 
  const [modalDelete, setModalDelete] = useState(false)
  const [idxD, setIdxD] = useState(false)

  const deleteproduct = (id) => {
    setIdxD(id)
    setModalDelete(true)
  }

  const deleteProductModal = () => {
    dispatch(deleteProduct(idxD))
    setModalDelete(false)
  }

  const canselDeleteProduct = () => {
    setModalDelete(false)
  }

  return (
    <>
      <section className='flex flex-col items-start gap-[10px]'>
        <Button onClick={openAddModal} sx={{
          background: 'black', color: 'white', display: 'flex', gap: '10px',
          '&:hover': {
            background: 'black'
          }
        }}>Add <Add className='text-[white]' /></Button>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Images</StyledTableCell>
              <StyledTableCell align='center'>Product_Name</StyledTableCell>
              <StyledTableCell align='center'>Price</StyledTableCell>
              <StyledTableCell align='center'>Discount_Price</StyledTableCell>
              <StyledTableCell align='center'>Color_Name</StyledTableCell>
              <StyledTableCell align='center'>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product?.products?.map((e) => {
              // console.log(e);
              return (
                <StyledTableRow key={e.id} >
                  <StyledTableCell align='center'>
                    <div className='flex justify-center'>
                      <img src={`${import.meta.env.VITE_APP_FILES_URL}/${e.image}`} onClick={() => {
                        dispatch(getProductById(e.id))
                        openInfo()
                      }} className='w-[80px] h-[80px] rounded-[50%] cursor-pointer' />
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align='center'>{e.productName.slice(0, 33)}</StyledTableCell>
                  <StyledTableCell align='center'>{e.price}</StyledTableCell>
                  <StyledTableCell align='center' style={{ textDecoration: "line-through" }}>{e.discountPrice}</StyledTableCell>
                  <StyledTableCell align='center'>{e.color}</StyledTableCell>
                  <StyledTableCell align='center'>
                    <div className='gap-[20px] flex justify-center'>
                      <DeleteIcon onClick={() => deleteproduct(e.id)} className='text-[red] cursor-pointer' />
                      <EditIcon className='text-[#4c9cf7] cursor-pointer' onClick={() => {
                        editOpen(e)
                      }} />
                    </div>
                  </StyledTableCell>

                </StyledTableRow>
              )
            })}
          </TableBody>
        </Table>

      </section >

      {/* modals */}

      {/* add */}
      <Dialog
        open={openAdd}
      >
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <div className='flex justify-between items-center'>
            <h1 className='font-[700] text-[24px]'>Add New Product</h1>
            <CloseIcon onClick={closeAddModal} className='cursor-pointer' />
          </div>
          <form action="" className='flex justify-center  flex-wrap gap-[10px]' onSubmit={formDataImg}>
            <TextField className="w-[250px]" type="text" onChange={(e) => dispatch(setProductName(e.target.value))} label='ProductName*' />
            <TextField className="w-[250px]" type="number" onChange={(e) => dispatch(setQuantity(e.target.value))} label='Quantity*' />
            <TextField className="w-[250px]" type="text" onChange={(e) => dispatch(setCode(e.target.value))} label='Code*' />
            <TextField className="w-[250px]" type="text" onChange={(e) => dispatch(setPrice(e.target.value))} label='Price*' />

            {/* hasDiscountPrice */}
            <select className="w-[250px] border-[2px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => dispatch(setHasDiscount(e.target.value === 'true'))} defaultValue="false" >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <TextField className="w-[250px]" type="text" onChange={(e) => dispatch(setDescription(e.target.value))} label='Description*' />

            {/*BrandId*/}
            <select className="w-[250px] border-[2px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => dispatch(setBrandId(e.target.value))}>
              <option value="">BrandId</option>
              {brand?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>
            <TextField className="w-[250px]" type="text" onChange={(e) => dispatch(setDiscountPrice(e.target.value))} label='DiscountPrice*' />

            {/* ColorId */}
            <select className="w-[250px] border-[2px] py-[18px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => dispatch(setColorId(e.target.value))}>
              <option value="">ColorId</option>
              {color?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>

            {/* SubCategoryId */}
            <select className="w-[250px] border-[2px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => dispatch(setSubCategoryId(e.target.value))}>
              <option value="">SubCategoryId</option>
              {subCategory?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>
            <TextField type="file" onChange={(e) => setImg(e.target.files[0])} />
            <Button type='submit' sx={{ border: '1px solid', width: '160px' }} onClick={closeAddModal}>submit</Button>
          </form>

        </div>

      </Dialog>

      {/* edit */}
      <Dialog open={edit}>
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <div className='flex justify-between items-center'>
            <h1 className='font-[700] text-[22px]'>Edit Product</h1>
            <CloseIcon onClick={editClose} className='cursor-pointer' />
          </div>
          <form className='flex justify-center flex-wrap gap-[20px]' onSubmit={formDataEdit}>
            <TextField className="w-[250px]" value={productNameEdit} onChange={(e) => setProductNameEdit(e.target.value)} label='ProductName*' />
            <TextField className="w-[250px]" type="number" value={quantityEdit} onChange={(e) => setQuantityEdit(e.target.value)} label='Quantity*' />
            <TextField className="w-[250px]" value={codeEdit} onChange={(e) => setCodeEdit(e.target.value)} label='Code*' />
            <TextField className="w-[250px]" type="number" value={priceEdit} onChange={(e) => setPriceEdit(e.target.value)} label='Price*' />
            <select
              className="w-[250px] border-[2px] py-[18px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]"
              onChange={(e) => setHasDiscountEdit(e.target.value === 'true')}
              value={hasDiscountEdit ? 'true' : 'false'}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
            <TextField className="w-[250px]" type="number" value={discountPriceEdit} onChange={(e) => setDiscountPriceEdit(e.target.value)} label='DiscountPrice*' />
            {/* brand */}
            <select className="w-[250px] border-[1px] py-[18px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => setBrandEdit(e.target.value)}>
              <option value="">Select Brand</option>
              {brand?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>
            {/* color */}
            <select className="w-[250px] border-[1px] py-[18px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => setColorEdit(e.target.value)}>
              <option value=''>Select Color</option>
              {color?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>
            <TextField className="w-[250px]" onChange={(e) => setDescriptionEdit(e.target.value)} label='Description*' />
            {/* subCategory */}
            <select className="w-[250px] border-[1px] py-[18px] px-[10px] hover:border-[#4286a5] border-[#d5d4d4] rounded-[5px]" onChange={(e) => setSubCategoryIdEdit(e.target.value)}>
              <option>Subcategory</option>
              {subCategory?.map((e) => {
                return (
                  <option value={e.id}>{e.id}</option>
                )
              })}
            </select>
            <Button type='submit' sx={{ border: '1px solid' }}>Submit</Button>
          </form>
        </div>
      </Dialog>


      {/* info */}
      <Dialog
        open={info}
        onClose={closeInfo}
      >
        <aside className='flex items-start flex-wrap  gap-[40px]'>
          <div key={productById?.id} className='w-[350px] rounded-[10px]  flex flex-col gap-[10px]'>
            <div className='w-full h-[200px] flex justify-center rounded-[8px]'>
              {/* <img src={`${import.meta.env.VITE_APP_FILES_URL}/${productById.images?.images}`} /> */}
            </div>
            <div className='flex flex-col gap-[15px]  p-[20px]'>
              <h1>Name: {productById?.productName}</h1>
              <h1 className='flex items-start'>Price: {price}<span style={{ textDecoration: "line-through" }} className='bg-[red] mt-[-5px] rounded-[5px] px-[8px] text-[10px] text-white'>{discountPrice}</span></h1>
              <h1>Brand: {productById?.brand}</h1>
              <h1>Color: {productById?.color}</h1>
              <h1>Description: {productById?.description}</h1>
              <h1>Brand: {productById?.brand}</h1>
            </div>
          </div >
        </aside>
      </Dialog>

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

export default Product
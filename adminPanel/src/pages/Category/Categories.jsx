import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, categoryEdit, deleteCategory, getCategory } from '../../api/Api'
import { Button, Dialog, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Add, Delete, Edit } from '@mui/icons-material';

function Categories() {

  const dispatch = useDispatch()
  const category = useSelector((store) => store.Reducer.category)
  // console.log(category);

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])


  // add
  const [addModal, setAddModal] = useState(false)

  const openAddModal = () => {
    setAddModal(true)
  }

  const closeAddModal = () => {
    setAddModal(false)
  }

  const [img, setImg] = useState(null)
  const [name, setName] = useState('')

  const newCategorySubmit = (e) => {
    e.preventDefault()
    const newCategory = new FormData()
    newCategory.append('CategoryImage', img)
    newCategory.append('CategoryName', name)
    dispatch(addCategory(newCategory))
  }

  // delete
  const [showModal, setShowModal] = useState(false);
  const [idx, setIdx] = useState(null);

  const handleDelete = (id) => {
    setIdx(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(idx));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  // edit 
  const [editModal, setEditModal] = useState(false)
  const [idxE, setIdxE] = useState(null)

  const [imgE, setImgE] = useState(null)
  const [nameE, setNameE] = useState('')

  const openModalForBtn = (e) => {
    setIdxE(e.id)
    setEditModal(true)
    setNameE(e.categoryName)
    setImgE(e.categoryImage)
  }

  const closeEditModal = () => {
    setEditModal(false)
  }

  const edit = (e) => {
    e.preventDefault()
    const neweditCategory = new FormData()
    neweditCategory.append('Id', idxE)
    neweditCategory.append('CategoryImage', imgE)
    neweditCategory.append('CategoryName', nameE)
    dispatch(categoryEdit(neweditCategory))
  }


  return (
    <>
      <main className='flex flex-col gap-[10px] items-start'>
        <Button onClick={openAddModal} sx={{
          background: 'black', color: 'white', display: 'flex', gap: '10px',
          '&:hover': {
            background: 'black'
          }
        }}>Add <Add className='text-[white]' /></Button>
        <section className='flex flex-wrap items-start gap-[40px]'>
          {category?.map((e) => {
            if (e.categoryImage != '') {
              return (
                <div key={e.id} className='shadow-md w-[300px] h-[280px]'>
                  <img src={`${import.meta.env.VITE_APP_FILES_URL}/${e.categoryImage}`} className="w-[300px] h-[150px]" />
                  <div className='p-[20px] flex flex-col gap-[20px]'>
                    <h1>Name: {e.categoryName}</h1>
                    <div className='flex items-center gap-[15px]'>
                      <Button onClick={() => handleDelete(e.id)} sx={{ border: '1px solid red', color: 'red', display: 'flex', gap: '10px' }}><Delete className='text-[red]' />Delete</Button>
                      <Button onClick={() => openModalForBtn(e)} sx={{ border: '1px solid #4c9cf7', color: '#4c9cf7', display: 'flex', gap: '10px' }}><Edit className='text-[#4c9cf7]' />Edit</Button>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </section>
      </main >

      {/* dialogs */}

      {/* add */}
      <Dialog
        open={addModal}
        onClose={closeAddModal}
      >
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[22px] font-[600]'>Add_Category</h1>
            <CloseIcon onClick={closeAddModal} />
          </div>
          <form action="" className='flex flex-col gap-[20px]' onSubmit={newCategorySubmit}>
            <TextField type='file' onChange={(e) => setImg(e.target.files[0])} />
            <TextField type='text' onChange={(e) => setName(e.target.value)} label='CategoryName*' />
            <Button type='submit' sx={{ border: '1px solid' }} onClick={closeAddModal}>Submit</Button>
          </form>

        </div>

      </Dialog>


      {/* edit */}
      <Dialog
        open={editModal}
        onClose={closeEditModal}
      >
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <div className='flex justify-between items-center'>
            <h1 className='text-[22px] font-[600]'>Edit_Category</h1>
            <CloseIcon onClick={closeEditModal} />
          </div>
          <form action="" onSubmit={edit} className='flex flex-col gap-[20px] items-center'>
            <img src={`${import.meta.env.VITE_APP_FILES_URL}/${imgE}`} className="w-[300px]" />
            <TextField type='file' className='w-[300px]' onChange={(e) => setImgE(e.target.files[0])} />
            <TextField value={nameE} className='w-[300px]' onChange={(e) => setNameE(e.target.value)} />
            <Button type='submit' sx={{ border: '1px solid', width: '300px' }} onClick={closeEditModal}>submit</Button>
          </form>
        </div>
      </Dialog>

      {/* delete modal */}
      <Dialog
        open={showModal}
        onClose={handleCancelDelete}
      >
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <h1 className='text-[22px]'>Вы точно хотите это удалить?</h1>
          <div className='flex items-center justify-center gap-[20px]'>
            <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={handleConfirmDelete}>Yes</Button>
            <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={handleCancelDelete}>Cansel</Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default Categories
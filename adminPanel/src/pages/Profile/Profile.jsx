import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, editProfile, getProfile, getProfileById } from '../../api/Api'
import { getToken } from '../../utils/token'


//mui table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Button, Dialog, TextField } from '@mui/material';


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


const Profile = () => {

  const dispatch = useDispatch()

  let idUser = getToken().sid
  console.log(idUser);

  const user = useSelector((store) => store.Reducer.user)
  const users = useSelector((store) => store.Reducer.users)
  console.log(user);


  useEffect(() => {
    dispatch(getProfile())
    dispatch(getProfileById(idUser))
  }, [dispatch, idUser])


  //mui 
  const [deleteUser, setDeleteUser] = useState(false)
  const [idxD, setIdxD] = useState(null)

  const showModalD = (id) => {
    setIdxD(id)
    setDeleteUser(true)
  }

  const deleteUsers = () => {
    dispatch(deleteProfile(idxD))
    setDeleteUser(false)
  }

  const closeModalD = () => {
    setDeleteUser(false)
  }

  //mui 
  const [info, setInfo] = useState(false)

  const modalshow = () => {
    setInfo(true)
  }
  const closeModal = () => {
    setInfo(false)
  }

  //mui
  const [edit, setEdit] = useState(false)

  const [img, setImg] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [date, setDate] = useState('')

  const userEdit = () => {
    setEdit(true)
    setImg(user?.image)
    setFirstName(user?.firstName)
    setLastName(user?.lastName)
    setEmail(user?.email)
    setPhoneNumber(user?.phoneNumber)
    setDate(user?.dob)
  }

  const editUserToken = (e) => {
    e.preventDefault()
    const edit = new FormData()
    edit.append('Image', img)
    edit.append('FirstName', firstName)
    edit.append('LastName', lastName)
    edit.append('Email', email)
    edit.append('PhoneNumber', phoneNumber)
    edit.append('Dob', date)
    dispatch(editProfile(edit))
  }

  const close = () => {
    setEdit(false)
  }

  return (
    <>

      <section className='flex flex-col gap-[40px]'>
        <div key={user?.id} className='flex items-center gap-[50px] w-[500px] p-[20px] shadow-md'>
          <img src={`${import.meta.env.VITE_APP_FILES_URL}/${user?.image}`} onClick={modalshow} className='w-[150px] h-[150px] rounded-[50%]' />
          <div className='flex flex-col gap-[20px]'>
            <div>
              <h1>name: {user?.userName}</h1>
              <p>email: {user?.email}</p>
            </div>
            <div className='gap-[10px] flex justify-center'>
              <Button onClick={() => showModalD(idUser)} sx={{ border: '1px solid red', color: 'red', display: 'flex', gap: '5px', textTransform: 'none' }}><Delete className='text-[red]' />Delete</Button>
              <Button onClick={userEdit} sx={{ border: '1px solid #4c9cf7', color: '#4c9cf7', display: 'flex', gap: '5px', textTransform: 'none' }}><Edit className='text-[#4c9cf7]' />Edit</Button>
            </div>
          </div>

        </div>

        <div className='flex flex-col items-start gap-[10px]'>
          {/* <Button sx={{
            background: 'black', color: 'white', display: 'flex', gap: '10px',
            '&:hover': {
              background: 'black'
            }
          }}>Add <Add className='text-[white]' /></Button> */}
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>UserName</StyledTableCell>
                <StyledTableCell align='center'>FirstName</StyledTableCell>
                <StyledTableCell align='center'>LastName</StyledTableCell>
                <StyledTableCell align='center'>Email</StyledTableCell>
                <StyledTableCell align='center'>PhoneNumber</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((e) => {
                // console.log(e);
                return (
                  <StyledTableRow key={e.id} >
                    <StyledTableCell align='center'>{e.userName}</StyledTableCell>
                    <StyledTableCell align='center'>{e.firstName}</StyledTableCell>
                    <StyledTableCell align='center'>{e.lastName}</StyledTableCell>
                    <StyledTableCell align='center'>{e.email}</StyledTableCell>
                    <StyledTableCell align='center'>{e.phoneNumber}</StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>

        </div >
      </section>

      {/* delete modal */}
      <Dialog
        open={deleteUser}
        onClose={closeModalD}
      >
        <div className='p-[20px] flex flex-col gap-[20px]'>
          <h1 className='text-[22px]'>Вы точно хотите это удалить?</h1>
          <div className='flex items-center justify-center gap-[20px]'>
            <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={deleteUsers}>Yes</Button>
            <Button sx={{ border: '1px solid', paddingX: '30px' }} onClick={closeModalD}>Cansel</Button>
          </div>
        </div>
      </Dialog>

      {/* info */}
      <Dialog
        open={info}
        onClose={closeModal}
      >
        <div className=''>
          <img src={`${import.meta.env.VITE_APP_FILES_URL}/${user?.image}`} className='w-[300px]' />
          <div className='p-[20px]'>
            <h1><span className='font-[600] text-[#545353]'>Name: </span> {user?.userName}</h1>
            <h1><span className='font-[600] text-[#545353]'>FirstName: </span>{user?.firstName}</h1>
            <h1><span className='font-[600] text-[#545353]'>LastName:</span> {user?.lastName}</h1>
            <h1><span className='font-[600] text-[#545353]'>Email: </span>{user?.email}</h1>
          </div>
        </div>

      </Dialog>

      {/* edit */}
      <Dialog
        open={edit}
        onClose={close}
      >
        <div>
          <form action="" className='flex flex-col p-[20px] gap-[10px]' onSubmit={editUserToken}>
            <div className='flex items-center gap-[10px]'>
              <img src={`${import.meta.env.VITE_APP_FILES_URL}/${img}`} className="w-[150px] h-[150px] rounded-[50%]" />
              <TextField type='file' onChange={(e) => setImg(e.target.files[0])} />
            </div>
            <TextField value={firstName} type='text' onChange={(e) => setFirstName(e.target.value)} label='first' />
            <TextField value={lastName} type='text' onChange={(e) => setLastName(e.target.value)} label='last' />
            <TextField value={email} type='text' onChange={(e) => setEmail(e.target.value)} label='email' />
            <TextField value={phoneNumber} type='text' onChange={(e) => setPhoneNumber(e.target.value)} label='phoneNumber' />
            <TextField value={date} type='text' onChange={(e) => setDate(e.target.value)} label='date' />
            <Button type='submit' sx={{border: '1px solid'}} onClick={close}>submit</Button>
          </form>
        </div>
      </Dialog>

    </>
  )
}

export default Profile
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  AccountCircle,
  AccountCircleOutlined,
  LogoutOutlined,
  MenuOpen,
  Notifications,
  PeopleAltOutlined,
  Search,
  SettingsOutlined,
  ShoppingCartCheckoutOutlined,
  SignalCellularAlt,
} from "@mui/icons-material";

import CategoryIcon from '@mui/icons-material/Category';
import { Link, Outlet } from "react-router-dom";
import Switcher from "../components/Switcher/Switcher";
import { Tooltip } from "@mui/material";
import logo from "../assets/images/logo.png";
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import { useDispatch, useSelector } from "react-redux";
import { getProductById, getProfileById } from "../api/Api";
import { destroyToken, getToken } from "../utils/token";


const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const product = useSelector((store) => store.Reducer.product)

  //serach 
  const disatch = useDispatch()
  const [serachValue, setSearchValue] = useState('')

  const search = async (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);

    const filtered = product.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }

  const userId = getToken().sid
  const user = useSelector((store) => store.Reducer.user)



  useEffect(() => {
    disatch(getProfileById(userId))
    disatch(getProductById(userId))
  }, [disatch, userId])


  return (
    <>
      <Box sx={{ display: "flex" }} className='dark:bg-[#2d2c2c] dark:text-white'>
        <CssBaseline />
        {/* navbar */}
        <AppBar position="fixed" open={open}>
          <Toolbar className="bg-white dark:bg-[#2d2c2c] text-black">
            <div className="flex items-center justify-between w-[100%]">
              <div className="flex items-center">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                  className='dark:text-white dark:hover:bg-[#8e8d8d]'
                >
                  <MenuIcon />
                </IconButton>
                <div className="flex items-center gap-[10px]">
                  <Search sx={{ marginRight: "10px" }} className="dark:text-white" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="border-hidden outline-none dark:bg-[#2d2c2c] dark:text-white"
                    value={serachValue}
                    onChange={search}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <IconButton>
                  <Switcher />
                </IconButton>
                <Tooltip title="Natification">
                  <IconButton>
                    <Notifications sx={{ fontSize: "30px", color: "black" }} className="dark:text-white" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <Link to={'profile'}>
                    <IconButton>
                      {user?.image === '' || user?.image === null ? (
                        <h1 className="text-[16px]">{user?.userName}</h1>
                      ) : (
                        <img src={`${import.meta.env.VITE_APP_FILES_URL}/${user?.image}`} className="w-[30px] h-[30px] rounded-[50%]" />
                      )}
                    </IconButton>
                  </Link>
                </Tooltip>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        {/* app bar */}
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          {/* drawer header */}
          <DrawerHeader
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "30px",
            }}
            className="dark:bg-[#2d2c2c]"
          >
            <div className="flex items-center">
              <img
                src={logo}
                className="w-[60px]"
                alt=""
              />
              <h1 className="text-[20px] dark:text-white"><span className="font-[700]">alif</span> shop</h1>
            </div>
            <IconButton onClick={handleDrawerClose} className='dark:bg-[#6b6b6bb4] dark:text-white dark:hover:bg-[#8e8d8d]'>
              {theme.direction === "ltr" ? <MenuOpen /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>

          <Divider className="dark:bg-[#2d2c2c]" />
          <Divider className="dark:bg-[#2d2c2c]" />

          <ul className="flex flex-col gap-[10px] p-[20px] dark:bg-[#2d2c2c] h-full">
            <Link to={"/dashboard"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px]  font-custom dark:text-white dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <SignalCellularAlt />
                Dishboard
              </li>
            </Link>
            <Link to={"product"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom dark:text-white dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <ShoppingCartCheckoutOutlined />
                Products
              </li>
            </Link>
            <Link to={"brand"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] font-custom dark:text-white dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <BrandingWatermarkIcon />
                Brands
              </li>
            </Link>
            <Link to={"category"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] rounded-[10px] dark:text-white font-custom dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <CategoryIcon />
                Category
              </li>
            </Link>
            <Link to={"profile"}>
              <li className="flex items-center gap-[15px] cursor-pointer p-[10px] dark:text-white rounded-[10px] font-custom dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <AccountCircleOutlined />
                Profile
              </li>
            </Link>
            <Link to={'/'}>
              <li onClick={()=>destroyToken()}  className="flex items-center gap-[15px] cursor-pointer p-[10px] dark:text-white rounded-[10px] font-custom dark:hover:bg-[#8e8d8d] text-[20px] hover:bg-[#e7e7e9]">
                <LogoutOutlined />
                Logout
              </li>
            </Link>
          </ul>
        </Drawer>

        {/* outlet */}
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default Layout;

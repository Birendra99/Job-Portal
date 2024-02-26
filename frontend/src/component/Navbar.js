import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../redux/actions/userAction";
import { IoIosHome } from "react-icons/io";
import { BiTask } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { Logout } from "@mui/icons-material";
import { FaUserCircle } from "react-icons/fa";
import { Dialog } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
const pages = ["Home", "Log In"];

const Navbar = () => {
  //show / hide button
  const { userInfo } = useSelector((state) => state.signIn);
  const [singleUser, setSingleUser] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // log out user
  const logOutUser = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  const getSingleUser = async () => {
    const res = await axios.get(`/api/user/${userInfo?.user?._id}`);
    setSingleUser(res.data.user);
  };

  React.useEffect(() => {
    if (userInfo) {
      getSingleUser();
    }
  }, [userInfo]);
  return (
    <AppBar position="static" sx={{ bgcolor: palette.primary.main }}>
      {/* <Container>
         <Toolbar disableGutters>
          <WorkIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB PORTAL
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <WorkIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            JOB PORTAL
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
 
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                to="/register"
                style={{ color: "white", textDecoration: "none" }}
              >
                Register
              </Link>
            </Button>
          </Box>
          <IconButton
            sx={{ mr: 4 }}
            onClick={() => dispatch(toggleActionTheme())}
          >
            {palette.mode === "dark" ? (
              <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: "#ffffff", fontSize: "25px" }} />
            )}
          </IconButton>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ color: palette.primary.white }}
                  alt="Remy Sharp"
                  src=""
                />
              </IconButton>
            </Tooltip>
            <Menu
              PaperProps={{
                sx: {
                  "& 	.MuiMenu-list": {
                    bgcolor: "primary.white",
                    color: "white",
                  },
                },
              }}
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    to="/admin/dashboard"
                  >
                    Admin Dashboard
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    to="/user/dashboard"
                  >
                    User Dashboard
                  </Link>
                </Typography>
              </MenuItem>

              {!userInfo ? (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: palette.secondary.main,
                      }}
                      to="/login"
                    >
                      Log In
                    </Link>
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={logOutUser}>
                  <Typography
                    style={{
                      textDecoration: "none",
                      color: palette.secondary.main,
                    }}
                    textAlign="center"
                  >
                    Log Out
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
        <Button variant="primary">Primary</Button>{" "}
      </Container> */}
      <nav className="navbar flex justify-between items-center">
        <div className="flex items-center">
          <a className="navbar-brand m-3 text-white" href="index.js">
            Jobs Portal
          </a>

          <div className="navbar-content flex justify-center gap-4 ">
            <p className="nav-link text-white" href="index.jsp">
              <Link className="text-inherit no-underline" to="/">
                <p className="gap-2 flex items-center">
                  <IoIosHome />
                  Home
                </p>
              </Link>
            </p>

            <p
              className="nav-link flex items-center text-white"
              href="index.js"
            >
              <Link className=" no-underline text-inherit" to="/viewjobs">
                <p className=" flex items-center gap-2 ">
                  <BiTask /> Jobs
                </p>
              </Link>
            </p>
          </div>
        </div>
        <div className="navbar-btn">
          {!userInfo && (
            <Link to="/login" className=" no-underline text-inherit">
              <button className=" flex items-center gap-2 text-center ">
                <CiLogin />
                login
              </button>
            </Link>
          )}
          {!userInfo && (
            <Link to="/register" className=" no-underline text-inherit">
              <button className=" flex items-center gap-2 text-center">
                <IoPerson />
                Signup
              </button>
            </Link>
          )}

          {userInfo && (
            <button
              className=" flex items-center gap-2 text-center"
              onClick={logOutUser}
            >
              <Logout />
              Log Out
            </button>
          )}

          {userInfo && (
            <div
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="userProfile">
                <div className="text-white">
                  <FaUserCircle className="text-4xl mr-4" />
                </div>
              </div>
              <div className="text-white">
                <p>{singleUser?.firstName}</p>
                <p>{singleUser?.email}</p>
              </div>
            </div>
          )}
        </div>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <div className="w-[500px] relative flex flex-col p-4 rounded-md text-black bg-white">
            <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
              <span className="text-[#0d6efd]">Profile</span>
            </div>
            <Formik
              initialValues={{
                firstName: singleUser?.firstName,
                lastName: singleUser?.lastName,
                email: singleUser?.email,
              }}
              validationSchema={Yup.object({
                firstName: Yup.string()
                  .max(15, "Must be 15 characters or less")
                  .required("Required"),
                lastName: Yup.string()
                  .max(20, "Must be 20 characters or less")
                  .required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await axios.put(
                  `/api/user/edit/${userInfo?.user?._id}`,
                  values
                );
                getSingleUser();
                setOpen(false);
                toast.success("User updated successfully");
              }}
            >
              <Form className="flex flex-col gap-3">
                <div className="block relative">
                  <label
                    htmlFor="firstName"
                    className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="block relative">
                  <label
                    htmlFor="lastName"
                    className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="block relative">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#0d6efd] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal"
                >
                  Update Profile
                </button>
              </Form>
            </Formik>
          </div>
        </Dialog>
      </nav>
    </AppBar>
  );
};
export default Navbar;

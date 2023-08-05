import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Register from "../Register/Register";
import GoogleIcon from "@mui/icons-material/Google";
import {
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import app, { db } from "../../firebase.init";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Links from "@mui/material/Link";
import { useSnackbar } from "notistack";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./Login.css";
import { doc, setDoc } from "firebase/firestore";
import google from '../../image/gogle.png'

const Login = ({ setAdminInfo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("User");
  const auth = getAuth(app);
  const { enqueueSnackbar } = useSnackbar();
  const [signInWithGoogle, user, signInWithGoogleLoading] =
    useSignInWithGoogle(auth);

  const [
    signInWithEmailAndPassword,
    signInWithEmailAndPasswordUser,
    signInLoading,
    signInWithEmailAndPasswordUserError,
  ] = useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, PasswordResetError] =
    useSendPasswordResetEmail(auth);


  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";


  const handleFireStore = async (u) => {
    try {
      await setDoc(doc(db, "users", u?.user?.uid), {
        uid: u?.user?.uid,
        displayName: u?.user?.displayName,
        email: u?.user?.email,
        photoURL: u?.user?.photoURL
      });

      await setDoc(doc(db, "userChats", u?.user?.uid), {});
    } catch (err) {
      console.log(err);
    }
  };

  const mongodbStore = async (u) => {
    fetch("http://localhost:5000/userRegister", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: u?.user?.uid,
        displayName: u?.user?.displayName,
        email: u?.user?.email,
        photoURL: u?.user?.photoURL
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data?.insertedId) {
        //   enqueueSnackbar("success", { variant: "success" });
        // } else {
        //   enqueueSnackbar(`${data?.result}`, { variant: "warning" });
        // }
        console.log(data, "user register");
      });

  }

  const handleSignInWithGoogle = () => {
    signInWithGoogle().then((user) => {
      handleFireStore(user)
      mongodbStore(user)
      if (user) {
        navigate('/');
      }
      console.log("signInUser", user)

    });
  };

  if (signInWithEmailAndPasswordUserError) {
    enqueueSnackbar(`${signInWithEmailAndPasswordUserError?.message}`, {
      variant: "error",
    });
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginRole === "Admin") {
      fetch("http://localhost:5000/login", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          loginRole,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // if (data?.insertedId) {
          //   enqueueSnackbar("success", { variant: "success" });
          //   navigate("/login");
          // } else {
          //   enqueueSnackbar(`${data?.result}`, { variant: "warning" });
          // }
          console.log(data, "admin register");
          if (data?.user) {
            navigate("/");
            setAdminInfo(data?.user);
            // window.location.reload(false)
            localStorage.setItem("admin", JSON.stringify(data?.user))

          } else {
            enqueueSnackbar(`${data.status}`, { variant: "error" });
          }
        });
    } else {
      signInWithEmailAndPassword(email, password);
    }

  };

  const handleResetPassword = async () => {
    if (email) {
      const success = await sendPasswordResetEmail(email);
      if (success) {
        enqueueSnackbar("Password reset email sent!", { variant: "success" });
      } else {
        enqueueSnackbar("Enter your email", { variant: "warning" });
      }
    }
  };
  const handleEmailVerified = async () => {
    await enqueueSnackbar("Need to verify your email", { variant: "warning" });
  };
  useEffect(() => {
    if (signInWithEmailAndPasswordUser) {
      console.log(
        "signInWithEmailAndPasswordUserError",
        signInWithEmailAndPasswordUserError
      );
      if (signInWithEmailAndPasswordUser?.user?.emailVerified === true) {
        navigate(from, { replace: true });
        console.log(signInWithEmailAndPasswordUser);
      } else {
        handleEmailVerified();
      }
    }
  }, [signInWithEmailAndPasswordUser]);

  return (
    // <Box>
    //   <Box
    //     sx={{
    //       width: "100vw",
    //       height: "100vh",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Box
    //       sx={{
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Card sx={{
    //         width: { lg: "42vw", xl: "42vw", sm: "40vw", md: "41vw", },
    //         height: "50vh"
    //       }}>

    //         {
    //           (signInLoading || signInWithGoogleLoading) ? <LinearProgress color="success" /> : null
    //         }
    //         <CardContent>
    //           <Typography
    //             sx={{ fontSize: 22, fontWeight: 'bold' }}
    //             color="text.secondary"
    //             gutterBottom
    //           >
    //             Please Login
    //           </Typography>

    //           <form action="" onSubmit={handleLogin}>
    //             <TextField
    //               onChange={(e) => setEmail(e.target.value)}
    //               color="success"
    //               sx={{ width: "25vw" }}
    //               margin="normal"
    //               size="small"
    //               id="outlined-basic"
    //               label="Email"
    //               variant="outlined"
    //               value={email}
    //               required
    //             />
    //             <br></br>
    //             <TextField
    //               onChange={(e) => setPassword(e.target.value)}
    //               color="success"
    //               sx={{ width: "25vw" }}
    //               margin="normal"
    //               size="small"
    //               type="password"
    //               id="outlined-basic"
    //               label="Password"
    //               variant="outlined"
    //               value={password}
    //               required
    //             />
    //             <br></br>
    //             <Links onClick={handleResetPassword} sx={{ display: 'block', textAlign: 'center', fontSize: 12, cursor: 'pointer' }}>Forget Password?</Links>
    //             <Button
    //               sx={{ width: "25vw", mt: 1.5, p: 1, }}
    //               size="small"
    //               variant="contained"
    //               type="submit"
    //             >
    //               Login
    //             </Button>
    //           </form>

    //           <Button
    //             onClick={handleSignInWithGoogle}
    //             color="common"
    //             sx={{ width: "25vw", mt: 1.5, p: 1 }}
    //             size="small"
    //             variant="contained"
    //             startIcon={<GoogleIcon color="warning"></GoogleIcon>}
    //           >
    //             Google
    //           </Button>
    //         </CardContent>
    //       </Card>
    //       <Card

    //         sx={{
    //           bgcolor: "#2e7d32",
    //           width: { lg: "22vw", xl: "20vw", sm: "22vw", md: "22vw" },
    //           height: "50vh",
    //           display: "flex",
    //           justifyContent: "center",
    //           alignItems: "center",
    //         }}
    //       >
    //         <CardContent sx={{}}>
    //           <Typography
    //             sx={{ fontSize: 22, color: "white", fontWeight: 'bold' }}
    //             color="text.secondary"
    //             gutterBottom
    //           >
    //             Please Register
    //           </Typography>
    //           <Typography
    //             sx={{ fontSize: 14, color: "white", mt: 1 }}
    //             color="text.secondary"
    //             gutterBottom
    //           >
    //             Create Account
    //           </Typography>
    //           <Link to={'/register'}><Button
    //             color='success'
    //             sx={{ width: { lg: "20vw", xl: "18vw", sm: "15vw" }, mt: 1.5, p: 1 }}
    //             size="small"
    //             variant="contained"
    //           >
    //             Register
    //           </Button></Link>

    //         </CardContent>
    //       </Card>
    //     </Box>
    //   </Box>

    // </Box>
    <Box height={'100vh'} className="loginBody" overflow={"auto"}>
      <Paper
        sx={{
          width: { lg: "22vw", md: "30vw", xl: "18vw", sm: "50vw", xs: "75vw" },
          height: {
            xs: "66vh",
            md: "65vh",
            lg: "65vh",
            xl: "65vh",
            sm: '65vh'

          },
          overflow: "auto"
        }}
        elevation={12}
      >
        {signInLoading || signInWithGoogleLoading ? (
          <LinearProgress color="success" />
        ) : null}
        <Grid p={3}>
          <Grid align="center" mb={2}>
            <Avatar sx={{ bgcolor: "#00bfa5", m: 1 }}>
              <LockOutlinedIcon></LockOutlinedIcon>
            </Avatar>
            <Typography variant="div" fontSize={20} fontWeight={"bolder"}>
              Sign In
            </Typography>
          </Grid>
          <RadioGroup
            onChange={(e) => setLoginRole(e.target.value)}
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="User"
            name="radio-buttons-group"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 20,
              },
            }}
          >
            <FormControlLabel value="User" control={<Radio />} label="User" />
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
          </RadioGroup>
          <form onSubmit={handleLogin}>
            {/* <TextField type='email' color='secondary' size='small'  label="Email" variant="standard" fullWidth required />
                        <TextField type='password' color='secondary' size='small'  label="Password" variant="standard" fullWidth required /> */}
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              color="secondary"
              size="small"
              margin="normal"
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              color="secondary"
              size="small"
              margin="normal"
              label="Password"
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="small"
              color="secondary"
              sx={{ mt: 1, p: 1 }}
            >
              Sign In as {loginRole}
            </Button>
          </form>
          {loginRole === "User" ? (
            <Button
              onClick={handleSignInWithGoogle}
              startIcon={<GoogleIcon></GoogleIcon>}
              type="submit"
              variant="contained"
              fullWidth
              size="small"
              color="info"
              sx={{ mt: 1, p: 1, }}
            >
            google
            </Button>
          ) : null}
          {
            loginRole === "User" && <Typography sx={{ mt: 1 }} fontSize={14}>
              <Links href="#" onClick={handleResetPassword}>
                Forget Password?
              </Links>
            </Typography>
          }

          <Typography mt={loginRole === "Admin" && 1} fontSize={14}>

            Don't have an account?
            <Link to="/register">Sign up</Link>
          </Typography>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;

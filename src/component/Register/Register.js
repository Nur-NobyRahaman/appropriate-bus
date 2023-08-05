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
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useSnackbar } from "notistack";
import { getAuth } from "firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth, { db } from "../../firebase.init";
import app from "../../firebase.init";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import "./Register.css";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [name, setName] = useState("");
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginRole, setLoginRole] = useState("User");
  const [secretKey, setSecretKey] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [googleUser, setGoogleUser] = useState('')
  const uid = name + new Date().getTime()
  const location = useLocation();
  const navigate = useNavigate();
  const [signInWithGoogle, signInWithGoogleUser, signInWithGoogleLoading] =
    useSignInWithGoogle(auth);
  const { enqueueSnackbar } = useSnackbar();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const from = location?.state?.from?.pathname || "/";



  const handleFireStore = async (u) => {
    try {
      await setDoc(doc(db, "users", u?.user?.uid), {
        uid: u?.user?.uid,
        displayName: u?.user?.displayName || name,
        email: u?.user?.email,
        photoURL: u?.user?.photoURL
      });

      await setDoc(doc(db, "userChats", u?.user?.uid), {});
    } catch (err) {
      console.log(err);
    }
  };
  const handleAdminFireStore = async () => {

    try {
      await setDoc(doc(db, "admin", uid), {
        uid: uid,
        displayName: name,
        email: email,
        photoURL: ''
      });

      await setDoc(doc(db, "userChats", uid), {});
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = async () => {
    await navigate("/login");
  }

  const mongodbStore = async (u) => {
    fetch("http://localhost:5000/userRegister", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: u?.user?.uid,
        displayName: u?.user?.displayName || name,
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

  const handleGoogle = () => {
    signInWithGoogle().then((user) => {
      setGoogleUser(user)
      handleFireStore(user);
      mongodbStore(user)

      navigate(from, { replace: true });
    });
  };



  if (user) {
    mongodbStore(user)
    handleFireStore(user);
    navigate("/login");
  }
  const handleError = async () => {
    console.log(error)
    await enqueueSnackbar(`This email already exits`, { variant: "error" });
  }

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      enqueueSnackbar("Password are not match", { variant: "warning" });
    }
    else if (error) {
      enqueueSnackbar(`${error?.message}`, { variant: "error" });
    }
    else {
      if (loginRole === "Admin") {
        if (secretKey === "adminRole") {
          fetch("http://localhost:5000/register", {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              loginRole,
              uid
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data?.insertedId) {
                enqueueSnackbar("success", { variant: "success" });
                handleAdminFireStore()
                handleNavigate()

              } else {
                enqueueSnackbar(`${data?.result}`, { variant: "warning" });
              }
              console.log(data, "admin register");
            });
        }
        else {
          enqueueSnackbar("Invalid Secret Key", { variant: "warning" });
        }
      }
      else {
        const success = await createUserWithEmailAndPassword(email, password);

        await updateProfile({ displayName: name, photoURL });
        if (success) {
          enqueueSnackbar("verification mail sent", { variant: "success" });
        }
        else {
          await handleError()
        }
      }
    }
  };



  return (


    <Box height={'100vh'} className="registerBody">
      <Paper
        sx={{
          width: { lg: "22vw", md: "30vw", xl: "18vw", sm: "50vw", xs: "75vw" },
          height: {
            xs: "70vh",
            md: "65vh",
            lg: "65vh",
            xl: "67vh",
            sm:'50vh'

          },
          overflow: "auto"
        }}
        elevation={12}
      >
        {loading || signInWithGoogleLoading ? (
          <LinearProgress color="success" />
        ) : null}

        <Grid pt={1.5} pl={3} pr={3}>
          <Grid align="center" mb={2}>
            <Avatar sx={{ bgcolor: "#00bfa5", m: 1 }}>
              <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
            </Avatar>
            <Typography variant="div" fontSize={20} fontWeight={"bolder"}>
              Sign Up
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
          <form onSubmit={handleRegister}>
            {/* <TextField type='email' color='secondary' size='small'  label="Email" variant="standard" fullWidth required />
                        <TextField type='password' color='secondary' size='small'  label="Password" variant="standard" fullWidth required /> */}
            {loginRole === "Admin" ? (
              <TextField
                onChange={(e) => setSecretKey(e.target.value)}
                type="text"
                color="secondary"
                size="small"
                sx={{ mt: 1 }}
                label="Secret key"
                variant="outlined"
                value={secretKey}
                fullWidth
                required
              />
            ) : null}

            <TextField
              onChange={handleName}
              type="text"
              color="secondary"
              size="small"
              sx={{ mt: 1 }}
              label="Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={email}
              onChange={handleEmail}
              type="email"
              color="secondary"
              size="small"
              sx={{ mt: 1 }}
              label="Email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={password}
              onChange={handlePassword}
              type="password"
              color="secondary"
              size="small"
              sx={{ mt: 1 }}
              label="Password"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              value={confirmPassword}
              onChange={handleConfirmPassword}
              type="password"
              color="secondary"
              size="small"
              sx={{ mt: 1 }}
              label="Confirm-Password"
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
              Sign Up as {loginRole}
            </Button>
          </form>
          {loginRole === "User" ? <Button
            onClick={handleGoogle}
            startIcon={<GoogleIcon />}
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            color="info"
            sx={{ mt: 1, p: 1, }}
          >
            Google
          </Button> : null}

          <Typography sx={{ mt: 1 }} fontSize={14}>
            {" "}
            Already have an account?
            <Link to="/Login">Sign In</Link>
          </Typography>

        </Grid>
      </Paper>
    </Box>
  );
};

export default Register;

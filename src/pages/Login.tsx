// import { useEffect, useState } from "react";
// import darkLogo from "../assets/darkLogo.png";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import LightLogo from "../assets/lightLogo.png";
import { login } from "../redux/features/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const userToken = useAppSelector(s=>s.auth.token)

  const handleLogin = async () => {
    const url = `${import.meta.env.VITE_API_URL}/user/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      dispatch(login(result.token))
      navigate('/admin-home')
      return userToken;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  return (
    <div className=" flex w-250! h-130 justify-center mt-15 items-center border  ml-auto mr-auto  rounded-2xl">
      <Box
        className="flex flex-col w-[35%]! justify-center ml-auto  h-full!"
        component="form"
        sx={{ "& > :not(style)": { m: 1.5 } }}
        noValidate
        autoComplete="off"
      >
        <Typography className="align-center font-[Poppins] text-gray-700 font-extralight " variant="h3">
          Welcome Back Admin!!
        </Typography>
        <TextField
          id="email"
          label="Email Address"
          variant="standard"
          name={email}
          className="w-90 bg-transparent! text-black!"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FormControl sx={{ m: 1, width: "400px" }} variant="standard">
          <InputLabel className="text-3" htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            name={password}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          className="mt-7! w-90"
          variant="contained"
          type="button"
          onClick={handleLogin}
        >
          Log In
        </Button>
      </Box>
      <div className="bg-black p-25 w-[50%] mr-0 ml-auto h-full justify-center items-center rounded-br-2xl rounded-tr-2xl flex flex-col gap-5">
        <img className="w-18 h-16" src={LightLogo} alt="Light Logo" />
        <Typography
          variant="h2"
          className="flex  items-center text-white font-black"
        >
          <span className="text-green-500 flex!">Book</span>Warm
        </Typography>
        <Typography
          variant="h4"
          className="flex flex-col justify-center items-center text-white"
        >
          Admin Login Page{" "}
        </Typography>
      </div>
    </div>
  );
}

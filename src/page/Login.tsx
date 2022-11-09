import { useContext, useEffect, useState } from "react";
import "../styles/styles.css";

import logo from "../static/img/logo.ico";
import { SubmitHandler, useForm } from "react-hook-form";
import Logger from "../interfaces/Logger";
import UserServices from "../services/UserServices";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/UserContext";

const service = new UserServices();

const Login = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Logger>();
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user_token");
    if (user) {
      const userFormat = JSON.parse(user);
      if (userFormat) {
        navigate("/listUsers");
      }
    }
  }, []);

  const onSubmit: SubmitHandler<Logger> = async (data) => {
    const userLogger: any = await service.auth(data);

    if (userLogger) {
      setUser(userLogger?.tokenDeAcceso);
      localStorage.setItem(
        "user_token",
        JSON.stringify(userLogger?.tokenDeAcceso)
      );

      navigate("/listUsers");
    }
  };

  return (
    <div className="page-firsth">
      <div className="cover"></div>
      <div className="logger">
        <img src={logo} alt="" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: true })}
            type="text"
            placeholder="Username"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

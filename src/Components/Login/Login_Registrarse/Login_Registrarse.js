import React, { useEffect, useState } from "react";
import "./Login_Registrarse.css";

import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";

import { register_user } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Registrarse = ({ setView }) => {
  const dispatch = useDispatch();
  const Register = useSelector((state) => state.RegisterUserData);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [keyVisible, setKeyVisible] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role_id:"1"
  });
  const [errors, setErrors] = useState({});
  const toggleVisibility = () => {
    setKeyVisible(!keyVisible);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validateField(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Datos del formulario:", userData);
      // lógica para enviar los datos del formulario al servidor
      dispatch(register_user(userData));
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "El nombre de usuario es requerido";
    } else if (
      data.username.trim().length < 4 ||
      data.username.trim().length > 60
    ) {
      errors.username =
        "El nombre de usuario debe tener entre 4 y 20 caracteres";
    }

    if (!data.email.trim()) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "El correo electrónico ingresado no es válido";
    }

    if (!data.password.trim()) {
      errors.password = "La contraseña es requerida";
    } else if (!/^[a-zA-Z0-9]{5,20}$/.test(data.password)) {
      errors.password =
        "La contraseña debe contener solo letras y números, y tener entre 5 y 20 caracteres";
    }

    if (!data.confirmPassword.trim()) {
      errors.confirmPassword = "Por favor confirma tu contraseña";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const validateField = (name, value) => {
    let fieldErrors = {};

    switch (name) {
      case "username":
        if (!value.trim()) {
          fieldErrors.username = "El nombre de usuario es requerido";
        } else if (value.trim().length < 4 || value.trim().length > 600) {
          fieldErrors.username =
            "El nombre de usuario debe tener entre 4 y 20 caracteres";
        }
        break;
      case "email":
        if (!value.trim()) {
          fieldErrors.email = "El correo electrónico es requerido";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.email = "El correo electrónico ingresado no es válido";
        }
        break;
      case "password":
        if (!value.trim()) {
          fieldErrors.password = "La contraseña es requerida";
        } else if (!/^[a-zA-Z0-9]{5,20}$/.test(value)) {
          fieldErrors.password =
            "La contraseña debe contener solo letras y números, y tener entre 5 y 20 caracteres";
        }
        break;
      case "confirmPassword":
        if (!value.trim()) {
          fieldErrors.confirmPassword = "Por favor confirma tu contraseña";
        } else if (userData.password !== value) {
          fieldErrors.confirmPassword = "Las contraseñas no coinciden";
        }
        break;
      default:
        break;
    }

    return fieldErrors;
  };

  const handleLoginLinkClick = () => {
    setView("login");
  };

  useEffect(() => {
    if (Register) {
      alert("Bienvenido " + Register.username + " ahora puedes continuar");
      setView("login");
    }
  }, [Register, setView]);




  useEffect(() => {
    const isValidEmail = (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };

    setIsButtonEnabled(
      userData.username.trim() !== "" &&
      isValidEmail(userData.email.trim()) &&
      userData.password.trim() !== "" &&
      userData.password === userData.confirmPassword 
    );
  }, [userData]);








  return (
    <div className="bodyregister">
      <form className="formRegister" onSubmit={handleSubmit}>
        <h2>Registrarse</h2>
        <div className="formGroup">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            maxLength={45}
            title="Solo se adminten 45 caractres"
            onChange={handleChange}
          />
          {errors.username && (
            <span className="errorMessage">{errors.username}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            maxLength={60}
            title="Solo se adminten 60 caractres"
            onChange={handleChange}
          />
          {errors.email && <span className="errorMessage">{errors.email}</span>}
        </div>
        <div className="formGroup">
          <label htmlFor="password">Contraseña</label>
          <div className="pass_display_flex">

          <input
            type={keyVisible ? "text" : "password" }
            id="password"
            name="password"
            maxLength={15}
            value={userData.password}
            onChange={handleChange}
            title="Solo se adminten 15 caractres"
          />
        <img
            src={keyVisible ? icono_ocultar : icono_ver}
            alt="Mostrar/Ocultar"
            onClick={toggleVisibility}
            className="ver"
          />

</div>

          {errors.password && (
            <span className="errorMessage">{errors.password}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type={keyVisible ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            maxLength={15}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="errorMessage">{errors.confirmPassword}</span>
          )}
        </div>
        <div className="ov-btn-container">
        <div /*type="submit" className="buttonSubmit"*/
        className={isButtonEnabled
          ? 'buttonSubmit' 
          : 'ov-btn-grow-box-RU2'
          
          
        } 
        onClick={isButtonEnabled ? handleSubmit : null}
        
        
        >
          Registrarse
        </div>


          </div>
          




        <div className="loginLink" onClick={handleLoginLinkClick}>
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </div>
      </form>
    </div>
  );
};

export default Registrarse;

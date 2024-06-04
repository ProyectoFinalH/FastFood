import React, { useEffect, useState } from "react";
import "./Login_RegistrarseEm.css";

import icono_ver from "../Login_imagenes/iconos/cerrar-ojo-black.png";
import icono_ocultar from "../Login_imagenes/iconos/ojo-con-pestanas-black.png";

import { register_user } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

const RegistrarseEmpresa = ({ setView }) => {
  const dispatch = useDispatch();
  const [keyVisible, setKeyVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const Register = useSelector((state) => state.RegisterUserData);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role_id:"2"
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    setErrors(validateField(name, value));
  };

  const toggleVisibility = () => {
    setKeyVisible(!keyVisible);
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
        } else if (value.trim().length < 4 || value.trim().length > 20) {
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

  useEffect(() => {
    if (Register) {
      alert("Le damos la Bienvenida a la empresa" + Register.username + " ahroa inicia sesion");
      setView("login");
    }
  }, [Register, setView]);

  return (
    <div className="bodyregister">
      <form className="formRegister" onSubmit={handleSubmit}>
        <h2>Registro de Empresa</h2>
        <div className="formGroup">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={userData.username}
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
            onChange={handleChange}
          />
          {errors.email && <span className="errorMessage">{errors.email}</span>}
        </div>
        <div className="formGroup">
          <label htmlFor="password">Contraseña</label>
          <div className="pass_display_flex">
            <input
              type={keyVisible ? "text" : "password"}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
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
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <div className="pass_display_flex">
            <input
              type={keyVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <span className="errorMessage">{errors.confirmPassword}</span>
          )}
        </div>





        <div className="ov-btn-container">
        <div /*type="submit" className="buttonSubmit"*/
        className={isButtonEnabled
          ? 'buttonSubmit-RE1' 
          : 'ov-btn-grow-box-RE2'
          
          
        } 
        onClick={isButtonEnabled ? handleSubmit : null}
        
        
        >
          Registrar Empresa
        </div>


          </div>



        <div
          className="loginLink"
          onClick={() => {
            setView("login");
          }}
        >
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </div>
      </form>
    </div>
  );
};

export default RegistrarseEmpresa;

import React, { useState } from "react";
import "./Login_Registrarse.css";

const Registrarse = ({ setView }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    // Validar el campo modificado en tiempo real
    setErrors(validateField(name, value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Datos del formulario:", userData);
      // lógica para enviar los datos del formulario al servidor
    }
  };

  const validateForm = (data) => {
    let errors = {};

    if (!data.username.trim()) {
      errors.username = "El nombre de usuario es requerido";
    } else if (
      data.username.trim().length < 4 ||
      data.username.trim().length > 20
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

  const handleLoginLinkClick = () => {
    setView("login");
  };

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
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="errorMessage">{errors.password}</span>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="errorMessage">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit" className="buttonSubmit">
          Registrarse
        </button>
        <div className="loginLink" onClick={handleLoginLinkClick}>
          ¿Ya tienes una cuenta? Inicia sesión aquí
        </div>
      </form>
    </div>
  );
};

export default Registrarse;

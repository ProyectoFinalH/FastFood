/* eslint-disable react/prop-types */
import { useState } from "react";
import "./navbarMenu.css";
import lupa from "../../images/lupas.png"

function NavbarMenu({ handleChange, handleSubmit }) {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [isOpen3, setIsOpen3] = useState(true);

  const Options1 = () => {
    setIsOpen1(!isOpen1);
  };

  const Options2 = () => {
    setIsOpen2(!isOpen2);
  };

  const Options3 = () => {
    setIsOpen3(!isOpen3);
  };

  const handleLiClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="navbarMenuContainer">
      <form onChange={handleChange}>
        <div className="searchContainer">
          <input placeholder="Buscar producto..." type="search" />
          <button type="submit" onClick={handleSubmit}><img src={lupa}/></button>
        </div>
      </form>
      <div className="navbarMenuSelect">
        <div onClick={Options1}>
          <span>Ordenar por: ⮟</span>
          {isOpen1 && (
            <ul>
              <li  onClick={handleLiClick}>Menor precio</li>
              <li  onClick={handleLiClick}>Mayor precio</li>
            </ul>
          )}
        </div>
        <div onClick={Options3}>
          <span>Rango de precio ⮟</span>
          {isOpen3 && (
            <ul>
              <li  onClick={handleLiClick}>$</li>
              <li  onClick={handleLiClick}>$$ </li>
              <li  onClick={handleLiClick}>$$$ </li>
              <li  onClick={handleLiClick}>$$$$ </li>
            </ul>
          )}
        </div>
        <div onClick={Options2}>
          <span>Categorías ⮟</span>
          {isOpen2 && (
            <ul>
              <li  onClick={handleLiClick}>Carne</li>
              <li  onClick={handleLiClick}>Pizza</li>
              <li  onClick={handleLiClick}>Pollo</li>
              <li  onClick={handleLiClick}>Vegana</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarMenu;

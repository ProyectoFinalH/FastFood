import {
  getAllMenuitems,
  getAllMenus,
  getMenuItemsByName,
} from "../../Redux/actions";
// import { getAllRestaurants, getAllCategories, } from "../../redux/actions"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CardsMenuItem from "../../Components/cards/cardsMenuItems/cardsMenuItems";
import NavbarMenu from "../../Components/navbarMenu/navbarMenu";
import "./menu.css";
import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import CardsMenus from "../../Components/cards/cardsMenus/cardsMenus";
import Navbar from "../../Components/navbar/navbar";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const allRestaurant = useSelector((state)=> state.allRestaurant)
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);
  const [selectMenuItem, setSelectMenuItem] = useState(null);
  // const allCategories = useSelector((state)=> state.allCategories)

  const [searchString, setSearchString] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    // dispatch(getAllRestaurants())
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
    // dispatch(getAllCategories())
  }, [dispatch]);

  //FILTRO POR RANGO
  const applyPriceRangeFilter = (menuItems, range) => {
    const [min, max] = range.split("-").map(Number);
    return menuItems.filter((menu) => menu.price >= min && menu.price <= max);
  };

  console.log("este son los menu", allMenus);
  //HANDLERS PARA EL SEARCH
  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getMenuItemsByName(searchString));
  }


  // FUNCION PARA DESHACER FILTROS
  const clearFilters = () => {
    setSearchString("");
    setSortBy(null);
    setPriceRange("");
    setSelectMenuItem(null);
  };

  //Copia del Estado allMenuItems
  let filteredMenuItems = [...allMenuitems]
  // FILTRADO DE ITEMMENU EN BASE AL MENU
  const handleSelectMenu = (menuItem) => {
    setSelectMenuItem((prevId) => (prevId === menuItem ? null : menuItem));
  };

  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems.filter((menu) => menu.menu_id === selectMenuItem);
  }

  // ORDENAMIENTO DE ITEMSMENU
  const handleSort = (sortBy) => {
    setSortBy(sortBy);
  };
  if (sortBy === "menorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mayorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => b.price - a.price);
  }

  // ORDENAMIENTO DE ITEMSMENU EN BASE AL RANGO
  const handlePriceRange = (range) => {
    setPriceRange(range);
  };

  if (priceRange) {
    filteredMenuItems = applyPriceRangeFilter(filteredMenuItems, priceRange);
  }

  console.log("1-30", filteredMenuItems);

  //SEARCH POR NOMBRE
  if (searchString.trim() !== "") {
    filteredMenuItems = filteredMenuItems.filter((menuItem) =>
      menuItem.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  //Boton volver Atras
  const handleGoBack = () => {
    navigate(-1)
  }

  console.log("1-30", filteredMenuItems);

  return (
    <div className="menuContainer">
      <Navbar />
        <div className="buttonBack">
        <button onClick={handleGoBack}>⬅ Volver</button>

        </div>
      <div className="menuSupContainer">
        <div className="cardRestContainer">
          <CardsRestaurant />
        </div>
        <div className="cardMenusContainer">
          <CardsMenus AllMenus={allMenus} handleSelectMenu={handleSelectMenu} />
        </div>
      </div>
      <div className="navCardContainer">
        <NavbarMenu
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSort={handleSort}
          handlePriceRange={handlePriceRange}
          clearFilter={clearFilters}
        />
        <CardsMenuItem
          AllMenuitems={filteredMenuItems}
          selectMenuItem={selectMenuItem}
        />
      </div>
    </div>
  );
}

export default Menu;

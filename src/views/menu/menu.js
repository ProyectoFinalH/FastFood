import {
  getAllMenuitems,
  getAllMenus,
  getMenuItemsByName,
  getAllCategories,
  getAllRestaurants,
} from "../../Redux/actions";
// import { getAllRestaurants, getAllCategories, } from "../../redux/actions"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CardsMenuItem from "../../Components/cards/cardsMenuItems/cardsMenuItems";
import NavbarMenu from "../../Components/navbarMenu/navbarMenu";
import "./menu.css";
// import CardsRestaurant from "../../Components/cards/cardsRestaurant/cardsRestaurant";
import CardsMenus from "../../Components/cards/cardsMenus/cardsMenus";
import Navbar from "../../Components/navbar/navbar";
import Detail from "../detail/detail";

import { useLocalStorage } from "../../Components/localStorage/useLocalStorage";

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allRestaurants = useSelector((state) => state.allRestaurants);
  const allMenus = useSelector((state) => state.allMenus);
  const allMenuitems = useSelector((state) => state.allMenuItems);

  const allCategories = useSelector((state) => state.allCategories);
  const [selectMenuItem, setSelectMenuItem] = useLocalStorage(
    "selectMenuItem",
    null
  );

  // const allCategories = useSelector((state)=> state.allCategories)

  const [searchString, setSearchString] = useLocalStorage("searchString", "");
  const [sortBy, setSortBy] = useLocalStorage("sortBy", null);
  const [priceRange, setPriceRange] = useLocalStorage("priceRange", "");

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryFilter = (category) => {
    setSelectedCategory(Number(category));
  };

  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // dispatch(getAllRestaurants())
    dispatch(getAllMenus());
    dispatch(getAllMenuitems());
    dispatch(getAllCategories());
    dispatch(getAllRestaurants());
  }, [dispatch]);

  const restaurant1 = allRestaurants.find((restaurant) => restaurant.id === 2);

  //FILTRO POR RANGO
  const applyPriceRangeFilter = (menuItems, range) => {
    const [min, max] = range.split("-").map(Number);
    return menuItems.filter((menu) => menu.price >= min && menu.price <= max);
  };

  //HANDLERS PARA EL SEARCH
  // function handleChange(e) {
  //   setSearchString(e.target.value);
  // }

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
    setSelectedCategory("");
  };

  //Copia del Estado allMenuItems
  let filteredMenuItems = [...allMenuitems];
  // FILTRADO DE ITEMMENU EN BASE AL MENU
  const handleSelectMenu = (menuItem) => {
    console.log("menuItem", menuItem);
    try {
      setSelectMenuItem((prevId) => {
        console.log("prevId", prevId);
        const newId = prevId === menuItem ? null : menuItem;
        window.localStorage.setItem("selectMenuItem", JSON.stringify(newId));
        console.log("newId", newId);
        console.log("selectMenuItem", newId);
        return newId;
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (selectMenuItem) {
    filteredMenuItems = filteredMenuItems.filter(
      (menu) => menu.menu_id === selectMenuItem
    );
  }

  if (selectedCategory) {
    filteredMenuItems = filteredMenuItems.filter(
      (menuItem) => menuItem.category_id === selectedCategory
    );
  }
  console.log(selectedCategory);

  // ORDENAMIENTO DE ITEMSMENU

  if (sortBy === "menorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => a.price - b.price);
  } else if (sortBy === "mayorPrecio") {
    filteredMenuItems = filteredMenuItems.sort((a, b) => b.price - a.price);
  }

  if (priceRange && filteredMenuItems.length > 0) {
    filteredMenuItems = applyPriceRangeFilter(filteredMenuItems, priceRange);
  }

  //SEARCH POR NOMBRE
  if (searchString.trim() !== "") {
    filteredMenuItems = filteredMenuItems.filter((menuItem) =>
      menuItem.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  //Boton volver Atras
  const handleGoBack = () => {
    navigate("/home");
  };
  return (
    <div className="menuContainer">
      <Navbar />
      <div className="infoRest">
        <div className="buttonBackMenu">
          <button onClick={handleGoBack}>⬅ Volver</button>
        </div>
        <div className="infoRestimgName">
          <div className="infoRestImg">
            <img src={restaurant1?.image_url} alt="logoRest" />
          </div>
          <div className="infoRestName">
            <h2>{restaurant1?.name}</h2>
          </div>
        </div>
      </div>

      <div className="navCardContainer">
        <div className="navBarContainer">
          <NavbarMenu
            searchString={searchString}
            setSearchString={setSearchString}
            handleSubmit={handleSubmit}
            handleSort={setSortBy}
            handlePriceRange={setPriceRange}
            clearFilter={clearFilters}
            handleCategoryFilter={handleCategoryFilter}
            allCategories={allCategories}
          />
        </div>
        <div className="cardsMenusContainer">
          <div className="cardsViewMenusSelectContainer">
            <CardsMenus
              AllMenus={allMenus}
              handleSelectMenu={handleSelectMenu}
            />
          </div>
          <div className="CardViewMenuContainer">
            {allMenus.map((menu) => (
              <div key={menu?.id} className="CardsListMenuContainer">
                <h2>{menu?.name}</h2>
                <CardsMenuItem
                  AllMenuitems={filteredMenuItems?.filter(
                    (menuItem) => menuItem?.menu_id === menu?.id
                  )}
                  handleSelectMenuItem={(id) => setSelectedMenuItemId(id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedMenuItemId && (
        <Detail
          isOpen
          handleCloseModal={() => setSelectedMenuItemId(null)}
          menuItemId={selectedMenuItemId}
        />
      )}
    </div>
  );
}

export default Menu;

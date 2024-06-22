import {
    getAllCategoriesAdmin
} from "../../../Redux/actions";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreateCategories from "../../../Components/createMenu/createCategories";
import ReactModal from 'react-modal';
import "./categoriesCompany.css"

function CategoriesCompany() {
    const dispatch = useDispatch();
    const allCategories = useSelector((state) => state.allCategoriesAdmin);
    const [, setIsRestored] = useState(false);
    const { id } = useParams();
    const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
    ReactModal.setAppElement('#root');


    useEffect(() => {
        dispatch(getAllCategoriesAdmin());
    }, [dispatch]);

    useEffect(() => {
        const fetchMenuState = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/categories/${id}`);
                setIsRestored(response.data.active);
            } catch (error) {
                console.error('Error al cargar el estado del menú', error);
            }
        };

        fetchMenuState();
    }, [id]);

    const toggleItemState = async (categories) => {
        try {
            const url = categories.active
                ? `http://localhost:5000/categories/delete/${categories.id}`
                : `http://localhost:5000/categories/restore/${categories.id}`;

            await axios.put(url);
            const updatedMenus = allCategories.map((item) => {
                if (item.id === categories.id) {
                    return { ...item, active: !item.active };
                }
                return item;
            });
            dispatch(getAllCategoriesAdmin(updatedMenus));
        } catch (error) {
            console.error('Hubo un error al realizar la solicitud', error);
        }
    };



    return (
        <div className="mainContainerMenues">
            <div className="linktocreate2">
                <ReactModal
                    isOpen={showCreateCategoryModal}
                    onRequestClose={() => setShowCreateCategoryModal(false)}
                    className="custom-modal"
                >
                    <CreateCategories />
                    <button className="custom-modal-button3" onClick={() => setShowCreateCategoryModal(false)}>X</button>
                </ReactModal>
                <button onClick={() => setShowCreateCategoryModal(true)}>Crear Categoría</button>
            </div>
            <div className="menusContainer">
                {allCategories.map((menu) => (
                    <div className="menuCardsCompany" key={menu.id}>
                        {menu.name}
                        <div className={menu.active ? 'button-show' : 'button-hide'} onClick={() => toggleItemState(menu)}>
                            {menu.active ? '👁 Ocultar' : '👁 Mostrar'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriesCompany
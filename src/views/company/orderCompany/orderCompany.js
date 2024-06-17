import React, { useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import './orderCompany.css';
import eliminar from './image/eliminar.png';
import rechasado from './image/rechazado.png'
import modificar from './image/escribir.png';
import cancelar from './image/cancelar.png'
import guardar from './image/actualizar.png';



import {Actualizar_Compra_Usuario, Create_Lista_Order_Company} from '../../../Redux/actions'
import axios from 'axios';


function OrderCompany() {
  //const dispatch = useDispatch()
  const Order_List_Company = useSelector((state) => state.ListaOrderCompany || []);
  const [activeOrder, setActiveOrder] = useState(null);
  const distpach = useDispatch()
  const [formData, setFormData] = useState({
    id: '',
    user_name: '',
    order_date: '',
    active: false,
    total_price: '',
    items: []
  });

  const handleEliminar = async (id) => {
    try {
    //  alert("Eliminar id: " + id);
      console.log(id);
      const endpoint = `http://localhost:5000/orders/delete/${id}`;
      const response = await axios.put(endpoint);
      const data = response.data;

      alert("Esta es la respuesta " + JSON.stringify(data));


     // dispatch(Eliminar_Registro_Compra(id));
    } catch (error) {
      console.error("Error eliminando la orden:", error);
      alert("Ocurrió un error al eliminar la orden.");

  const handleModificar = (id) => {
    setActiveId(id);
    const selectedOrder = Order_List_Company?.find(order => order.id === id);
    if (selectedOrder) {
      setFormData({
        id: selectedOrder?.id,
        user_id: selectedOrder?.user_id,
        restaurant_id: selectedOrder?.restaurant_id,
        order_date: selectedOrder?.order_date,
        active: selectedOrder?.active, // Se mantiene true/false directamente
        total_price: selectedOrder?.total_price ? `$${selectedOrder?.total_price}` : 'N/A'
      });

    }

    distpach(Create_Lista_Order_Company())
  };

  const handleModificar = (order) => {
    setActiveOrder(order);
    setFormData({
      id: order.id,
      user_name: order.user_name,
      order_date: order.order_date,
      statusorder_id: 1,// "order.active",
      total_price: order.total_price,
      items: order.items.map((item, index) => ({ ...item, index }))
    });
  };

  const handleGuardar = () => {
    alert("Guardar id: " + JSON.stringify(formData));
    //setActiveOrder(null);
    distpach(Actualizar_Compra_Usuario(formData))
    // Aquí puedes despachar la acción para actualizar los datos
  };

  const handleCancelar = () => {
    setActiveOrder(null);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = formData.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      items: updatedItems
    }));
  };

  return (
    <div>
      <h1>OrderCompany</h1>
      <div className="container">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Nombre</th>
              <th>Productos</th>
              <th>Fecha</th>
              <th>Estado Compra</th>
              <th>Costo Total</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {Order_List_Company.map((order) => (

              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name || 'Sin nombre'}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.quantity || item.cont} x {item.name_item || item.name} (${item.partial_price || item.price})
                    </div>
                  ))}

              <tr key={order?.id}>
                <td>{order?.id}</td>
                <td>{order?.user_id}</td>
                <td>
                  {activeId === order?.id ? (
                    <input
                      type="text"
                      name="restaurant_id"
                      value={formData?.restaurant_id}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order?.restaurant_id
                  )}
                </td>
                <td>
                  {activeId === order?.id ? (
                    <input
                      type="text"
                      name="order_date"
                      value={formData.order_date}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order?.order_date?.substr(0, 19)
                  )}
                </td>
                <td>
                  {activeId === order?.id ? (
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                      className='checkbox-edit-order'
                    />
                  ) : (
                    <span>{order?.active?.toString()}</span>
                  )}
                </td>
                <td>
                  {activeId === order?.id ? (
                    <input
                      type="text"
                      name="total_price"
                      value={formData?.total_price}
                      onChange={handleChange}
                      className='text-edit-order'
                    />
                  ) : (
                    order?.total_price ? `$${order?.total_price}` : 'N/A'
                  )}

                </td>
                <td>{order.order_date.substr(0, 19)}</td>
                <td>{order.active
                ?'Aprobado'
                 :'Eliminado'}</td>
                <td>{order.total_price ? `$${order.total_price}` : 'N/A'}</td>
                <td>

                  <div className="btn btn-delete" onClick={() => handleEliminar(order.id)}>
                    <img src={ order.active
                                ?eliminar
                                :rechasado
                                } alt='Eliminar order' className='img_List_Order' />
                  </div>
                </td>
                <td>
                  <div className="btn btn-modify" onClick={() => handleModificar(order)}>
                    <img src={modificar} alt='Modificar order' className='img_List_Order' />

                  <div className="btn btn-delete" onClick={() => handleEliminar(order?.id)}>
                    <img src={eliminar} alt='Eliminar order' className='img_List_Order' />
                  </div>
                </td>
                <td>
                  <div className={activeId === order?.id ? "btn btn-edit" : "btn btn-modify"}>
                    {activeId === order?.id ? (
                      <>
                        <div className="btn btn-Guardar">
                          <img src={modificar} alt='Guardar order' className='img_List_Order' onClick={() => handleGuardar(order?.id)} />
                        </div>
                        <div className='btn btn-cancelar'>
                          <img src={cancelar} alt='Cancelar order' className='img_Cancelar-Order' onClick={handleCancelar} />
                        </div>
                      </>
                    ) : (
                      <img src={guardar} alt='Modificar order' className='img_List_Order' onClick={() => handleModificar(order?.id)} />
                    )}

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {
      //! aqui esta el div a mejorar 
      activeOrder && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={handleCancelar}>&times;</span>
            <h2 className='Texto-Name-title'>Modificar Orden</h2>
            <div className="form-group">
              <label className='Texto-Name'>Nombre de Usuario:</label>
              <span>{formData.user_name}</span>
            </div>
            <div className="form-group">
              <label className='Texto-Name' >Fecha:</label>
              <span>{formData.order_date}</span>
             
            </div>
            <div className="form-group">
              <label className='Texto-Name'>Activo:</label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className='Texto-Name'>Costo Total:</label>
              <input
                type="text"
                name="total_price"
                value={formData.total_price}
                onChange={handleChange}
                className='input-textos'
              />
            </div>
            <div className="items-container">
              <h3>Items</h3>
              {formData.items.map((item, index) => (
                <div className="item" key={index}>
                  <div className="form-group">
                    <label>Cantidad:</label>
                    <input
                      type="number"
                      value={item.quantity || item.cont}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className='input-Numero'
                    />
                  </div>
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={item.name_item || item.name}
                      onChange={(e) => handleItemChange(index, 'name_item', e.target.value)}
                    className='input-Numero'
                    
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio:</label>
                    <input
                      type="number"
                      value={item.partial_price || item.price}
                      onChange={(e) => handleItemChange(index, 'partial_price', e.target.value)}
                    className='input-Numero'
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="form-group-btn">
             <img src={guardar} alt="Guardar Cambios" onClick={handleGuardar} className='img_List_Order-Guardar' /> 
             <img src={cancelar} alt="Guardar Cambios" onClick={handleCancelar} className='img_List_Order-Guardar'/> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCompany;

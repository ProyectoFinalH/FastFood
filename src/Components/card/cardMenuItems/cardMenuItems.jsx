/* eslint-disable react/prop-types */
import "./cardMenuItems.css"
import { Link } from "react-router-dom"

function CardMenuItems({id,name, description, price, image }) {

  return (
    <div className="cardMenuContainer">


<Link to={`${id}`} className="cardLink">
        <img src={image} className="cardImage"/>
        <div className="cardContent">
          <h2 className="cardTitle">{name}</h2>
          <p className="cardDescription">{description}</p>
          <h2 className="cardPrice">${price}</h2>
        </div>
    </Link>
        
    </div>
  )
}

export default CardMenuItems
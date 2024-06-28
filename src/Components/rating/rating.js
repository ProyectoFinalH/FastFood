import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetComment } from "../../Redux/actions";

import "./rating.css";
import StarRating from "./starRating/starRating";

function Rating({onClose, restaurantId}) {
  const comments = useSelector((state) => state.allComments) || [];;
  const dispach = useDispatch();

  console.log("id en raiting", restaurantId);

  useEffect(() => {
    dispach(GetComment(restaurantId));
  }, [dispach, restaurantId]);

  console.log("commentsss",comments);

  const handleCloseModal = (e) => {
    
    if (e.target.classList.contains("ratingsContainer")) {
      onClose();
    }
  };

  function truncate(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

const activeComments = comments.filter(comment => comment.active);

  return (
    <div className="ratingsContainer" onClick={handleCloseModal}>
      <div className="ratingModal">
        <div className="modalRating">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Comentarios y Opiniones</h2>
          <div className="CommentsContainer">

          {activeComments.length === 0 ? (
              <div className="noCommentsMessage">
                <p>No hay reseñas activas.</p>
              </div>
            ) : (

          <ul>
            {Array.isArray(comments) &&
            
            activeComments?.map((comment) => (
              
              <li key={comment?.id}>
                <div className="commentUserContainer">

                <div className="commentUser" >
                  <div className="commentUserName">
                <div className="commentImage">
                <img src={comment?.user_image_url} alt="imageUser"/>
                </div>

                <h2>{comment?.user_name}</h2>
                
                <StarRating rating={comment?.rating} />
                  </div>
                  <div className="commentUserDate">
                    <p>{comment.created_at.slice(0,10)}</p>
                  </div>
                </div>
                  <div className="commentUserComment">

                <p title={comment.comment}>{truncate(comment.comment, 60)}</p>
                  </div>

              
              </div>
              </li>
            ))}
          </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rating;

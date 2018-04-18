import React from 'react';
import AddComment from './AddComment';

const RecipeSolo = props => {
  return(
    <div className="wrapperSolo">
      <img width="300" height="200" src={props.recipe.img} alt={props.recipe.name} />
      <div>
        <p>Name: {props.recipe.name}</p>
        <p>PrepTime: {props.recipe.prepTime}</p>
      </div>
      <div>
        <p>Preparation:</p>
        <p>{props.recipe.preparation}</p>
      </div>
      <div>
        <ul>
          {
            props.recipe.comments.map((r, index) => (
              
              <li key={index}>
                <div className="comment">
                  <h3>{r.commenterName}</h3>
                  <p>{r.comment}</p>
                </div>
                
              </li>
              )
            )
          }
        </ul>
        <AddComment handleComment={props.handleComment.bind(this)} />
      </div>
    </div>
  )
}

export default RecipeSolo;
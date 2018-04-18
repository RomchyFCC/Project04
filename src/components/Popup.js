import React from 'react';

class Popup extends React.Component {
  handleSubmit(e) {
    const r = this.refs;
    e.preventDefault();
    const newRecipe = {
      name: r.newName.value,
      img: r.newImg.value,
      preparation: r.newPrep.value,
      prepTime: parseInt(r.newTime.value, 10),
      id: this.props.length + 1,
      comments: []
    }
    this.props.closePopup();
    this.props.onAdd(newRecipe);
  }
  render() {
    return (
      <div className='popup'>
          <h3>Add a recipe</h3>
          <form id="add-recipe" onSubmit={this.handleSubmit.bind(this)}>
            <p>Name: </p>
            <input required ref="newName" type="text" />
            <p>Image <span>(link)</span>: </p>
            <input required ref="newImg" type="text" />
            <p>Preparation time <span>(mins)</span>: </p>
            <input required ref="newTime" type="number" />
            <p>Preparation: </p>
            <textarea  required ref="newPrep" placeholder="Recipe description, instructions and ingredients." />
            <input type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default Popup;

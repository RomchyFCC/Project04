import React from 'react';

// import components
import Recipes from './Recipes.js';
import Header from './Header';
import Footer from './Footer';
import RecipeSolo from './RecipeSolo';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showPopup: false,
      showRecipe: false,
      showId: null,
      recipes: [
        {
          name: 'Recipe',
          img: 'https://cmgajcfoodandmore.files.wordpress.com/2017/04/tacosfrom-del-taco.jpg?w=640',
          preparation: 'text area',
          prepTime: 60,
          id: 1,
          comments: [
            {
              commenterName: 'Erik',
              comment: 'this recipe is awesome'
            },
            {
              commenterName: 'Erika',
              comment: 'this recipe is awesomer'
            }
          ]
        },
        {
          name: 'Recipes',
          img: 'https://upload.wikimedia.org/wikipedia/commons/8/80/Guacamole_Pepper-Jack_Burger.jpg',
          preparation: 'text areas',
          prepTime: 45,
          id: 2,
          comments: [
            {
              commenterName: 'Erika',
              comment: 'this recipe is awesome'
            },
            {
              commenterName: 'Erik',
              comment: 'this recipe is awesomer'
            }
          ]
        }
      ],
      filtered: []
    }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onAdd(r) {
    let recipes = this.state.recipes;
    recipes.push(r);
    this.setState({
      recipes,
      filtered: recipes
    })
  }

  filterList(e){
    let updatedList = this.state.recipes;
    updatedList = updatedList.filter(r => {
      return r.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({filtered: updatedList});
  }

  componentWillMount() {
    let retrievedObject = localStorage.getItem('RomanCookBook');
		if(retrievedObject !== null) {
      let recipes = JSON.parse(retrievedObject);
      this.setState({
        recipes,
        filtered: recipes
      })
    } else {
      this.setState({filtered: this.state.recipes})
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('RomanCookBook', JSON.stringify(this.state.recipes));
  }

  toggleRecipe(e) {
    if (e.target.innerHTML === "Roman's Cookbook") {
      this.setState({
        showRecipe: false,
      })
    } else {
      let id = e.target.id;
      id = id[id.length - 1] - 1;
      this.setState({
        showRecipe: !this.state.showRecipe,
        showId: id
      })
    }
  }

  handleComment(e) {
    e.preventDefault();
    let name = e.target.childNodes[1].value;
    let comment = e.target.childNodes[3].value;
    e.target.childNodes[1].value = '';
    e.target.childNodes[3].value = '';
    let id = this.state.showId;
    const newComment = {
      commenterName: name,
      comment: comment,
    }
    const recipes = this.state.recipes;
    recipes[id].comments.push(newComment);
    this.setState({
      recipes,
    })
  }

  removeRecipe(e) {
    let id = e.target.parentNode.childNodes[0].id;
    id = id[id.length - 1] - 1;
    const recipes = this.state.recipes;
    recipes.splice(id, 1);
    this.setState({
      recipes
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Header toggleRecipe={this.toggleRecipe.bind(this)}/>
        {
          this.state.showRecipe ? 
          <RecipeSolo
            recipe={this.state.recipes[this.state.showId]} 
            handleComment={this.handleComment.bind(this)}
          /> : 
          <Recipes
            onAdd={this.onAdd.bind(this)}
            filtered={this.state.filtered}
            filterList={this.filterList.bind(this)}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup.bind(this)}
            toggleRecipe={this.toggleRecipe.bind(this)}
            length={this.state.recipes.length}
            removeRecipe={this.removeRecipe.bind(this)}
          />
        }
        <Footer />
      </div>
    );
  }
}

export default App;

import React from 'react';

class AddComment extends React.Component {
  
  render() {
    return(
    <form id="add-comment" onSubmit={this.props.handleComment.bind(this)}>
      <p>Name: </p>
      <input required type="text" />
      <p>Comment: </p>
      <input required type="text" placeholder="How did it taste?" />
      <input type="submit" value="Submit" hidden />
    </form>
    )
  }
}

export default AddComment;

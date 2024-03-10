import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs"

class SongCreate extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: ""
      }
   }

   handleSubmit(event) {
      event.preventDefault();
      console.log("props",this.props)
      this.props.mutate({
         variables: {
            title: this.state.title
         },
         refetchQueries: [{ query: query }]
      })
      .then(() => hashHistory.push("/"))
   }

   render() {
      return (
         <div>
            <Link to="/">Back</Link>
            <form onSubmit={this.handleSubmit.bind(this)}>
               <h3>create a new song</h3>
               <label>Song Title:</label>
               <input 
                  type="text" 
                  value={this.state.title}
                  onChange={e => this.setState({title: e.target.value})}
               />
            </form>
         </div>
      )
   }
}

// const mutation = gql`
//    mutation {
//       addSong(title: )
//    }
// `;

const mutation = gql`
   mutation AddSong($title: String) {
      addSong(title: $title){
         title
      }
   }
`;

export default graphql(mutation)(SongCreate);
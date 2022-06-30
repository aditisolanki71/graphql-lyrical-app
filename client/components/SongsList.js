import React, {Component} from "react";
//it is helper to allow us write query
import gql from "graphql-tag";
import { graphql } from "react-apollo";
class SongsList extends Component {
   renderSongs() {
      return this.props.data.songs.map((song) => {
         return (
            <li classNamw="collection-item" key={song.id}>{song.title}</li>
         )
      })
   }
  
   render() {
      console.log(this.props);
      if(this.props.data.loading) {
         return <div>Loading.....</div>
      }
       return (
         <div>
            songs list
            <ul className="collection">
               {this.renderSongs()}
            </ul>
         </div>
      )
   }
}

//gql is only defining query,not executing query
const query = gql`
   query songs {
      songs {
         id,
         title
      }
   }`;
//return fun export default graphql(query) then immediately connect with second parameter SongsList
export default graphql(query)(SongsList);
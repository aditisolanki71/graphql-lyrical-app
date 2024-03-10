import React, {Component} from "react";
//it is helper to allow us write query
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";

class SongsList extends Component {
   onSongDelete(id) {
      console.log('inside on song delete', this.props)
      this.props.mutate({ variables: { id }})
      .then(() => this.props.data.refetch())
   }

   renderSongs() {
      return this.props.data.songs.map((song) => {
         return (
            <li className="collection-item" key={song.id}>
               <Link to={`/song/${song.id}`}>{song.title}</Link>
              
               <i 
                  className="material-icons" 
                  onClick={() => this.onSongDelete(song.id)}
               >delete</i>
            </li>
         )
      })
   }
  
   render() {
      console.log('inside songs list')
      console.log(this.props);
      if(this.props.data.loading) {
         return <div>Loading.....</div>
      }
       return (
         <div>
            
            <ul className="collection">
               {this.renderSongs()}
            </ul>
            <Link to="/song/new" className="btn-floating btn-large red right">
              
               <i className="material-icons">+</i>
            </Link>
         </div>
      )
   }
}

//gql is only defining query,not executing query
// const query = gql`
//    query songs {
//       songs {
//          id,
//          title
//       }
//    }`;

const mutation = gql`
mutation deleteSong($id: ID){
   deleteSong(id: $id) {
     id
   }
 }  
`;
//return fun export default graphql(query) then immediately connect with second parameter SongsList
// export default graphql(query)(SongsList);

export default graphql(mutation)(graphql(query)(SongsList));
import React, {Component} from "react";
import { Link } from "react-router";
//it is helper to allow us write query
import gql from "graphql-tag";
import { graphql } from "react-apollo";


class LyricList extends Component {
    
   onSongLike(id, likes) {
      console.log('inside song like', id)
      this.props.mutate({ 
         variables: { id },
         optimisticResponse: {
            __typename: 'Mutation',
            likeLyric: {
               id: id,
               __typename: 'LyricType',
               likes: likes + 1
            }
         }
      });
      // .then(() => this.props.data.refetch())
   }

   renderLyrics() {
      console.log('inside render lyrics', this.props.lyrics)
      return this.props.lyrics.map((lyric) => {
         return (
            <li className="collection-item" key={lyric.id}>
               <Link to="">{lyric.content}</Link>
               <div className="vote-box">
                  <i 
                     className="material-icons" 
                     onClick={() => this.onSongLike(lyric.id, lyric.likes)}
                  >thumb_up</i>
                  {lyric.likes}
               </div>
            </li>
         )
      })
   }
  
   render() {
       return (
         <div>
            <ul className="collection">
               {this.renderLyrics()}
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
mutation LikeLyric($id:ID) {
   likeLyric(id:$id) {
     id
     likes
   }
 }
`;
//return fun export default graphql(query) then immediately connect with second parameter SongsList
// export default LyricList;

export default graphql(mutation)(LyricList);
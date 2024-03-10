import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import query from "../queries/fetchSong";

class LyricCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           content: ""
        }
     }

     handleSubmit(event) {
        event.preventDefault();
        this.props.mutate({
           variables: {
                songId: this.props.songId,
                content: this.state.content
           },
        })
        .then(() => this.setState({ content: '' }));
        
     }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <label>Add a Lyric</label>
                <input 
                  type="text" 
                  value={this.state.content}
                  onChange={e => this.setState({content: e.target.value})}
                  />  
            </form>
        )
    }
}


const mutation = gql`
mutation AddLyricToSong($content:String, $songId:ID) {
  addLyricToSong(content: $content, songId: $songId) {
    id,
    lyrics {
      id
      content
      likes
    }
  }
}
`;

export default graphql(mutation)(LyricCreate);
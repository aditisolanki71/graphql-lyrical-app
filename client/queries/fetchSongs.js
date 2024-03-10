import gql from "graphql-tag";

export default gql`
   query songs {
      songs {
         id,
         title
      }
   }`;

// export default gql` 
// {
//     songs {
//         id,
//         title
//     }
// }`;
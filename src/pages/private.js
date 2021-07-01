// import withAuth from '../auth/withAuth';
// import { useUser } from '../auth/useUser';

// const Private = () => {
//   const { user, logout } = useUser();

//   return (
//     <div >
//       <div>This is a Private Page this will only be visible for registered users</div>
//       {
//         user?.email &&
//         <div><div><h1>Login Sucessful</h1></div>
//           <div>Email: {user.email}</div>
//           <button onClick={() => logout()}>Logout</button>
//         </div> 
//       }
//     </div>
//   )
// }

// export default withAuth(Private);

import withAuth from '../auth/withAuth';
import { useUser } from '../auth/useUser';
import firebase from '../firebase'
import React from 'react';

function App() {
const [businessTags, setbusinessTags] = React.useState([])

React.useEffect(() => {
const fetchData = async () => {
const db = firebase.firestore()
const data = await db.collection("businessTags").get()
setbusinessTags(data.docs.map(doc => doc.data()))
}
fetchData()
}, [])

  return (
    <>
      <div>Datbase loaded businessTags available</div>
  <ul>
    {businessTags.map(businessTags => (
      <li key ={businessTags.name}>{businessTags.name}</li>
      ))
    }
  </ul>
 </>
      )
}
export default App;

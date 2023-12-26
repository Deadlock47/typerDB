'use client'
import { collection ,getDocs, getFirestore} from 'firebase/firestore'
import { app } from './db';
import { useEffect , useState } from 'react';
import Item from './items';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {

  const [data , setData] = useState()
  var docSnap ;
  useEffect(()=>{
    async function getData()
    {
      // console.log('first')
      const db = getFirestore(app);
      docSnap = await getDocs(collection(db,"stories"));
      const docs = docSnap.docs.map((doc)=>{const data = doc.data(); 
        data.id = doc.id;
        return data;
      });
      // console.log(docs);
      setData(docs);
    }
    getData()
   
  },[])

  return (
    <div>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="dark"
      />
      {
        data?.map((doc)=><Item key={doc.id} data = {doc} ></Item>)
      }
    </div>
  )
}

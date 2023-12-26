'use client'
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBCycUKn45idwrr82KzYz_8Y_2oESIJrsM",
  authDomain: "typer-fca95.firebaseapp.com",
  projectId: "typer-fca95",
  storageBucket: "typer-fca95.appspot.com",
  messagingSenderId: "831410671012",
  appId: "1:831410671012:web:3832d0ed413b7eba4ac531",
  measurementId: "G-R9DNWFJP8H"
};
export const app = initializeApp(firebaseConfig);
import {collection , query ,doc, setDoc , getDocs,getFirestore } from "firebase/firestore";
const db = getFirestore(app)
export function insertStory(){
    let story = document.querySelector('textarea').value;
    console.log(story)
    let title = prompt('Give Your Story a Title!!')
    let date = new Date();
    ///
    if(!title || !story || !date)
    {
        alert("enter a valid title and story!!")
        return;
    }
    const refr = doc(db , 'stories' , title);
    setDoc(refr, {
        title : title,
        text : story,
        date : date.toString()
    })
}

export async function getStories()
{
    const q = query(collection(db,'stories'));
    const dataSnap = await getDocs(q);
    const stories = []
    dataSnap.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const data = doc.data()
        ///
        stories.push(data);
        // console.log(data)
       
    });
    
    return stories
}
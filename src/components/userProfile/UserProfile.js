import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import "./userProfile.scss"
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebase';

export default function UserProfile() {
    const [savedRecipe, setSavedRecipe] = useState([]);
    useEffect(()=>{
    async function test() {
        const docRef = doc(db, "users", localStorage.getItem("email"));
        const docSnap = await getDoc(docRef);
        setSavedRecipe(docSnap.data().recipes);
    }
    //test()
    auth.onAuthStateChanged((user) => {
      if (user) {
       
        test()
      } else {setSavedRecipe([])
        alert("LOGIN FIRST")
        navigate("/login") 
      };
    });
    },[])
    const navigate = useNavigate();
    const navigateToDetailsPage = (id) => {
        navigate(`/meal/${id}`, { state: { id: id } });
      };
  return (
    <>
    <div className='section-wrapper'>
      <div className='container'>
        <div className='sc-title'>Saved meal</div>
        <section className='sc-meal grid'>
          {
           savedRecipe.map((item, index) => {
            console.log(item)
            return(
            <div key={item.id} item xs={3}>
              <div
                className="meal-itm align-center justify-center"
                onClick={() => {
                    navigateToDetailsPage(item.id);
                }}
              >
                <div className="meal-itm-img" >
                <img src = {item.url} alt = {item.title} />
                </div>
                <div>
                  <div className='meal fw-15 fw-7 op-09'>{item.title}</div>
                </div>
              </div>
            </div>
            )
            
            })
          }
        </section>
      </div>
    </div>
    </>
  )
}

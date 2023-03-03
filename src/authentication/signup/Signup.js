import React, { createContext, useEffect, useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Input from '../input/Input'
import "./signup.scss"
import { createUserWithEmailAndPassword , updateProfile, onAuthStateChanged} from 'firebase/auth';
import { auth , db} from '../../firebase';
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


export default function Signup() {
    const navigate= useNavigate();
    const [values, setvalues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [user, setUser]= useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

   
    

 

    const handleSub=()=>{
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
            setErrorMsg("");
          setSubmitButtonDisabled(true);

            createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        setUser(res.user)
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        const docRef = doc(db, "users", values.email);
    await setDoc(docRef, { recipes : [] });
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
    }
  return (
   
    
    <div className='signup-container'>
        <div className='innerbox'>
            <h1 className='signup-heading'>Signup</h1>

            <Input label="Name"
             placeholder="Enter your name"
            onChange={(event)=>
                setvalues((prev)=>({...prev, name: event.target.value}))
            }
             />
            <Input label="Email" 
            placeholder="Enter email adress"
            onChange={(event)=>
                setvalues((prev)=>({...prev, email: event.target.value}))
            }
            />
            <Input label="Password" 
            placeholder="Enter password"
            onChange={(event)=>
                setvalues((prev)=>({...prev, pass: event.target.value}))
            }
            />

            <div className='input-footer'>
            <b className="error">{errorMsg}</b>
              <button
              onClick={handleSub} disabled={submitButtonDisabled}
              >Signup</button>
              <p>
                Already have an account ? {" "}
                <span>
                   <Link to="/login">Log in</Link>
                    </span>
              </p>
            </div>
        </div>
    </div>
   
  )
}

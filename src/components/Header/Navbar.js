import React, {useState, useEffect, useContext} from 'react';
import { Link} from "react-router-dom";
import "../../App.scss"
import { MdFoodBank} from "react-icons/md";
import { IoMdMenu, IoMdContact} from "react-icons/io";
import { useSidebarContext } from '../../context/sidebarContext';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';


const Navbar = (props) => {
  const {openSidebar} = useSidebarContext();
  const [scrolled, setScrolled] = useState(false);
  const [error, setError] = useState("")
  const[user, setUser]=useState(null)
    //authenticating user
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
       
        setUser(user);
      } else setUser(null);
    });
  }, [])
  const handleScroll = () => {
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
 
  const navigate = useNavigate();
  const [state, setState]= useState(false)
  const authentication =() =>{
    onAuthStateChanged(auth, user => {
      if (user) {
        setState(user)
      } 
    });
  }
  const logout= ()=>{
   auth.signOut()
  }
  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
      setState(true)
    } catch {
      setError("Failed to log out")
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })
 
  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled': ""}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div className='brand-and-toggler flex align-center justify-between'>
            <Link to = "/" className='navbar-brand fw-3 fs-22 flex align-center'>
              <MdFoodBank />
              <span className='navbar-brand-text fw-7'>Foddie</span>
            </Link>
            <div className='navbar-btns flex align-center'>
              <> {user? <button onClick={handleLogout} className='navbar-show-btn text-white input'>logout</button>:<button><Link to ="/login" className='navbar-show-btn text-white input'>login</Link></button> 
              }
            </>
              <Link to ="/profile" className='navbar-show-btn text-white'><IoMdContact size={27}/></Link>
              <button type = "button" className='navbar-show-btn text-white' onClick={() => openSidebar()}>
                <IoMdMenu size = {27} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
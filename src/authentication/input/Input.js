import React from 'react'
import "./input.scss"

export default function Input(props) {
  return (
    <div className='input-container'>
       {props.label && <label>{props.label}</label>}
       <input type="text" {...props}/>
    </div>
  )
}

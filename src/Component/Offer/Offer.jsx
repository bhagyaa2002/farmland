import React from 'react'
import './Offerstyle.scss'

export const Offer = ({image,url}) => {
  return (
    <>
    <a href={url} target="_blank" rel="noopener noreferrer">
    <div className='offermain' >
      <img src={image} alt="" />
    </div>
    </a>
    </>
  )
}

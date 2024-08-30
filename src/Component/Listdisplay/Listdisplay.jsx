import React from 'react'
import { Icon } from '@iconify/react';
import './Listdisplaystyle.scss'
// import arrowForward from '@iconify/icons-material/arrow-forward';


function Listdisplay({name}) {
  return (
    <div className='listmain'>
        <Icon icon="fa:arrow-right" className="icon1" />
        <p>{name}</p>
    </div>
  )
}

export default Listdisplay
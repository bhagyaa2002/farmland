import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loder = () => {
  return (

    <Backdrop
      sx={{
        color: '#72f542',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'
      }}
      open
    >
      <CircularProgress size={60} sx={{ color: "#72f542" }} />
      <h2 style={{
  marginTop: '20px',
  color: '#000000',
  fontSize: '18px',
  zIndex: '2',
  position: 'relative'
}}>
  Redirecting to payment page
</h2>
    </Backdrop>
  )
}

export default Loder
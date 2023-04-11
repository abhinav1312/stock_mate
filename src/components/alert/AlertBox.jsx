import React from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const AlertBox = ({title, message}) => {
  return (
    <>{
      message &&
    <Alert severity= {title} sx={{fontSize: "1.5rem", position: "absolute", width: "100%", zIndex: "2"}}>
    <AlertTitle sx={{fontSize: "1.5rem"}} > <strong> {title} </strong> </AlertTitle>
    { message }
    </Alert>
    }
    </>
  )
}

export default AlertBox

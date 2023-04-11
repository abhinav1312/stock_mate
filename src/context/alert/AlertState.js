import React, { useState } from 'react'
import AlertContext from './AlertContext'
const AlertState = (props) => {
    const [alertMsg, setAlertMsg] = useState({
        title: '',
        message: ''
    })
    const showAlert = (title, message) => {
      console.log("showAlert called")
        setAlertMsg({title, message})
        setTimeout(() => {
            setAlertMsg({title: '', message: ''})
        }, 2000);
    }
  return (
    <>
     <AlertContext.Provider value={{showAlert, alertMsg}} >
        {props.children}
     </AlertContext.Provider>
    </>
  )
}

export default AlertState

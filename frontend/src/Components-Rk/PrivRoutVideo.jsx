import React from 'react'
import { Navigate } from 'react-router-dom';
import {useSelector} from "react-redux"

const PrivRoutVideo = ({children}) => {
    const {auth} = useSelector(state => state.auth);
    if (!auth) {
        // console.log("if condition",state)
        return <Navigate to="/login" />
    }
    return children
}

export default PrivRoutVideo
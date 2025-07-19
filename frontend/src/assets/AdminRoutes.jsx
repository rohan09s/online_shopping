import React, { useEffect, useState } from 'react'
import {useAuth} from '../context/auth'
import {Outlet} from 'react-router-dom'

function AdminRoutes() {const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        let authCheck=()=>{
            fetch("https://onlineshoppingbackend-u7pl.onrender.com/auth/userauth",
                {headers:{
                    "authorization":auth?.token
                }
            }).then((res1)=>{
                res1.json().then((res2)=>{
                    (res2);
                    if(res1.ok){
                        setOk(true)
                    }else{
                        setOk(false)
                    }
                })
            })
        }
        if(auth?.token)
            authCheck()
    },[auth?.token])
    return ok?<Outlet/>:null

}

export default AdminRoutes
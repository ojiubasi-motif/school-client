import axios from "axios";
// axios.defaults.withCredentials = true;
import { useMutation, useQuery } from 'react-query';
import jwt from 'jwt-decode'
import Cookies from "js-cookie";


const baseUrl = "https://school-manager-i86s.onrender.com/api/v1/";
const localBaseUrl = "http://localhost:8080/api/v1/";

export const useAllStudentsData = ()=>{
    return useQuery(
        "students",
        ()=>{
            return axios.get(`${baseUrl}students`)
        },
    )
}

const userLogin = (payload)=>{
    return  axios.post(`${localBaseUrl}auth/login`,payload);
}

export const useUserLogin = ()=>{
    return useMutation(userLogin,{
        onSuccess:(data)=>{
            // const token = Cookies.get('token');
            // console.log('the token is', token)
            // const user = jwt(token);
            console.log('response from login=>',data)
            // Cookies.set('access_token',data?.data?.msg?.accessToken,{} )
        },
        onError:(error)=>{
            console.log('error was returned from login', error)
        }
    })
}

export const useAllSchoolsData = ()=>{
    return useQuery(
        "Schools",
        ()=>{
            return axios.get(`${localBaseUrl}schools`)
        },
        {
            // enabled:!!studentId,
            staleTime:120000  //refetch after 2 minutes
          }
    )
}
import axios from "axios";
const baseUrl = "https://api.themoviedb.org/3/"
const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MDQwNDEzMDU2MTU2N2FjZjNlMDcyNWFlYjA5ZWM1ZCIsInN1YiI6IjY0MDM1NDkyMzgzZGYyMDBhOTU0OWY0NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SLyeiEqGJwQ6ywCklFaWYBACuPcmuc2ruTuf0dF07QQ"
let headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json;charset=utf-8'
}
const fetchApi = (data) => {
  return axios.get(
    `${baseUrl}${data.path}`, 
    { 
      headers,
      params : data?.params
    }
  )
}
export const postFetchApi = (data) => {
  return axios.post( 
    `${baseUrl}${data.path}`,
    data?.params,
    {
      headers,
    }
  )
}
export default fetchApi

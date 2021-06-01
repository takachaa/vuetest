import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://firestore.googleapis.com/v1'
})

export default instance;
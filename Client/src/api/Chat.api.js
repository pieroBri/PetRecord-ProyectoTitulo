import axios from 'axios'

export async function createGetUserChat(data){
    try {
        const us = await axios.put(
            'https://api.chatengine.io/users/',
            { username: data.rut, secret: data.password2, first_name : data.nombres},
            { headers: {"private-key" :  "2bfcd934-6deb-4d34-af3e-3c7cda1f8205"} }
        )

        return us
    } catch (error) {
        return error.response
    }
}


export const getUserChat = async (res) =>{
    try {
        const us = await axios.get(
            'https://api.chatengine.io/users/',
            { headers: {"private-key" :  "2bfcd934-6deb-4d34-af3e-3c7cda1f8205"} }
        );
        console.log(us)
        return res.status(us.status).json(us.data)
    } catch (error) {
        console.log(error.response.status)
        console.log(error.response.data)
        return res.status(error.response.status).json(error.response.data)
    }
}
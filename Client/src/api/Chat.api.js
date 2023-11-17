import axios from 'axios'

export async function createGetUserChat(data){
    try {
        const us = await axios.put(
            'https://api.chatengine.io/users/',
            { username: data.nombres + ' ' + data.apellidos, secret: data.password2, first_name : data.nombres},
            { headers: {"private-key" :  "2bfcd934-6deb-4d34-af3e-3c7cda1f8205"} }
        )

        return us
    } catch (error) {
        return error.response
    }
}


export const actualizarUserChat = async (res, id) =>{
    console.log(res.nombres)
    try {
        const us = await axios.patch(
            `https://api.chatengine.io/users/${id}`,
            { username: res.nombres + ' ' + res.apellidos, secret: res.contraseña2, first_name: res.nombres },
            { headers: {"private-key" :  "2bfcd934-6deb-4d34-af3e-3c7cda1f8205"} }
        );
        console.log(us)
        return us
    } catch (error) {
        console.log(error)
        return error.response
    }
}
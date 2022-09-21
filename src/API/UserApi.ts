import {$host} from "./AxiosConfig";
import {checkAuth} from "./HadrcodeBackend/functions";
import UserStore from "../Store/UserStore";
import userStore from "../Store/UserStore";

export const Login = async (userName: string, password: string, error: string) => {
    try {
        await $host.get('/users').then(response => {
            checkAuth(response.data, userName, password, error) // MOCKED BACKEND CHECK HANDLING
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const Registration = async (username: string, phone: string, email: string, password: string) => {
    try {
        await $host.post('/users', {
            username: username,
            phone: phone,
            email: email,
            password: password,
        }).then(response => {
            UserStore.setUser(response.data)
            userStore.setIsAuth(true)
            localStorage.setItem('user', JSON.stringify(response.data))
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const logout = () => {
    UserStore.cleanUser()
    localStorage.removeItem('user')
}
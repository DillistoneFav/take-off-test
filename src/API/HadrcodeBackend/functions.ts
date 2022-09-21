import {IUser} from "../../Interfaces/IUser";
import userStore from "../../Store/UserStore";

export const checkAuth = (users: IUser[], userName: string, passWord: string, error: string) => {
    let finded: boolean = false
    users.forEach(item => {
        if (item.username === userName && item.password === passWord) {
            finded = true
            localStorage.setItem("user", JSON.stringify(item))
            userStore.setIsAuth(true)
            return userStore.setUser(item)
        }
    })
    finded ? userStore.setError("") : userStore.setError(error)
}
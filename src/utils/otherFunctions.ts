import UserStore from "../Store/UserStore";

export const checkAuth = () => {
    if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user")!)
        UserStore.setUser(user)
        UserStore.setIsAuth(true)
    }
}
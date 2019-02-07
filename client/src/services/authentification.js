import { ModalProgrammatic } from 'buefy/dist/components/modal'
import ModalLogin from './../components/ModalLogin.vue'
import Requester from './requester'

export default class Authentification {
    static loggedIn(){
        //Send request to server
        return true;
    }

    static promptLogin(){
        ModalProgrammatic.open({
                component: ModalLogin
        })
    }

    static register(email, username, password, callBack){
        Requester.postRegister(email, username, password, (success, data) => {
            if(success){
                this.logged = true;
            }
            callBack(success, data);
        })
    }

    static login(email, password, callBack){
        Requester.postLogin(email, password, callBack)
    }
}
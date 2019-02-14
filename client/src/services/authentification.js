import { ModalProgrammatic } from 'buefy/dist/components/modal'
import ModalLogin from './../components/ModalLogin.vue'
import Requester from './requester'

class Authentification {

    constructor(){
        if(! Authentification.instance){
            this.logged = false;
            this.token = null;
            Authentification.instance = this;
        }

        return Authentification.instance;
    }

    loggedIn(){
        return this.logged && (this.token != null);
    }

    promptLogin(){
        ModalProgrammatic.open({
                component: ModalLogin
        })
    }

    register(email, username, password, callBack){
        Requester.postRegister(email, username, password, (success, data) => {
            if(success){
                this.logged = true;
                this.token = data.token;
            }
            callBack(success, data);
        })
    }

    login(email, password, callBack){
        Requester.postLogin(email, password, (success, data) => {
            if(success && data.user){
                this.logged = true;
                this.token = data.user.token;
            }
            callBack(success, data);
        })
    }
}

var instance = new Authentification();

export default instance;
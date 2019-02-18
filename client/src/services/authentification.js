import { ModalProgrammatic } from 'buefy/dist/components/modal'
import ModalLogin from './../components/ModalLogin.vue'
import Requester from './requester'
import VueCookies from 'vue-cookies'

class Authentification {

    constructor(){
        if(! Authentification.instance){
            this.logged = false;
            this.token = null;
            this.username = null;
            this.email = null;
            this.loginCallback = null;
            Authentification.instance = this;
        }

        this.checkIfLoggedIn(); 

        return Authentification.instance;
    }

    checkIfLoggedIn(){
        const token = VueCookies.get('token');
        if(token != null){
            this.token = token;
            this.logged = true;
            this.username = VueCookies.get('username');
        }
    }

    loggedIn(){
        return this.logged && (this.token != null);
    }

    promptLogin(){
        ModalProgrammatic.open({
                component: ModalLogin
        })
    }

    promptLoginWithCallback(loginCallback){
        this.loginCallback = loginCallback;
        ModalProgrammatic.open({
                component: ModalLogin
        })
    }

    register(email, username, password, callBack){
        Requester.postRegister(email, username, password, (success, data) => {
            if(success){
                this.logged = true;
                this.token = data.token;
                this.username = username;
                this.email = email;
                VueCookies.set('token', this.token);
                VueCookies.set('username', this.username);
            }
            callBack(success, data);
            if(this.loginCallback != null) this.loginCallback(success, data);
        })
    }

    login(email, password, callBack){
        Requester.postLogin(email, password, (success, data) => {
            if(success && data.user){
                this.logged = true;
                this.token = data.user.token;
                this.username = data.user.username;
                this.email = data.user.email;
                VueCookies.set('token', this.token);
                VueCookies.set('username', this.username);
            }
            callBack(success, data);
            if(this.loginCallback != null) this.loginCallback(success, data);
        })
    }

    disconnect(callBack){
        VueCookies.remove('token');
        VueCookies.remove('username');
        this.checkIfLoggedIn();
        callBack();
    }
}

var instance = new Authentification();

export default instance;
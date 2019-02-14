<template>
<div style="overflow: hidden;">
    <div v-if="!registerDisplay">
        <p class="title has-text-white has-text-centered">Cette partie est réservée aux membres !</p>
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Se connecter</p>
            </header>
            <section v-if="!registerDisplay" class="modal-card-body">
                <b-field label="Email" :key="'email'">
                    <b-input
                        type="email"
                        :value="email"
                        v-model="email"
                        placeholder="Ton email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Mot de passe" :key="'password'">
                    <b-input
                        type="password"
                        :value="password"
                        v-model="password"
                        password-reveal
                        placeholder="Ton mot de passe"
                        required>
                    </b-input>
                </b-field>
                <p v-if="error!=''" class="is-3 has-text-danger"> {{error}} </p>
                <!-- <b-checkbox>Remember me</b-checkbox> -->
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Fermer</button>
                <button class="button is-primary" @click="loginBtnClicked()">Se connecter</button>
            </footer>
        </div>
        <Divider :marginHeight="1"/>
        <div class="level">
            <div class="level-item">
                <p class="title is-size-5 has-text-white has-text-centered" style="margin-right: 1rem;">Pas encore membre ?</p>
                <button class="button is-small is-primary is-outlined is-inverted"
                @click="goToRegisterMode()">Inscris toi !</button>
            </div>
        </div>
    </div>
    <div v-else>
        <p class="title has-text-white has-text-centered">Cette partie est réservée aux membres !</p>
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">S'inscrire</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Email" :key="'email'">
                        <b-input
                            type="email"
                            :value="email"
                            v-model="email"
                            placeholder="Ton email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Nom d'utilisateur" :key="'username'">
                        <b-input
                            v-model="username"
                            placeholder="Ton nom d'utilisateur"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Mot de passe" :key="'password'">
                        <b-input
                            type="password"
                            :value="password"
                            v-model="password"
                            password-reveal
                            placeholder="Ton mot de passe"
                            required>
                        </b-input>
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Fermer</button>
                    <button class="button is-info" @click="registerBtnClicked()">S'inscrire</button>
                </footer>
            </div>
        <Divider :marginHeight="1"/>
        <div class="level">
            <div class="level-item">
                <p class="title is-size-5 has-text-white has-text-centered" style="margin-right: 1rem;">Déjà inscris ?</p>
                <button class="button is-small is-primary  is-outlined is-inverted"
                @click="goToLoginMode()">Connectes toi !</button>
            </div>
        </div>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
</div>
</template>

<script>
import Divider from './Divider.vue'
import router from '../services/router.js'

export default {
    components : {
        Divider
    },
    data(){
        return {
            isLoading : false,
            registerDisplay : false,
            error : "",
            email: "",
            username: "",
            password: ""
        }
    },
    methods: {
        goToRegisterMode(){
            this.registerDisplay = true;
            this.error = "";
        },
        goToLoginMode(){
            this.registerDisplay = false;
            this.error = "";
        },
        registerBtnClicked(){

            if(this.canRegister){
                this.isLoading = true;
                this.error = "";
                // eslint-disable-next-line
                this.$authentification.register(this.email, this.username, this.password, (success, data) => {
                    if(success &&  this.$authentification.loggedIn()){
                        router.push(router.currentRoute.query.redirect)
                        this.$parent.close()
                    }else{
                        this.error = "L'inscription a échoué.";
                    }
                    this.isLoading = false;
                });
            }
        },
        loginBtnClicked(){
            if(this.canLogin){
                this.isLoading = true;
                this.error = "";
                // eslint-disable-next-line
                this.$authentification.login(this.email, this.password, (success, data) => {
                    if(success &&  this.$authentification.loggedIn()){
                        router.push(router.currentRoute.query.redirect)
                        this.$parent.close()
                    }else{
                        this.error = "La connexion a échoué. Vérifiez que votre mot de passe et email soient correct.";
                    }
                    this.isLoading = false;
                });
            }
        }
    },
    computed : {
        canLogin(){
            return this.email.includes("@") && this.email != "" && this.password != "";
        },
        canRegister(){
            return this.canLogin && this.username != "";
        }
    }
}
</script>

<style>

</style>

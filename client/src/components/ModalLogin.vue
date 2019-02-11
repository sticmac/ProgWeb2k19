<template>
<div style="overflow: hidden;">
    <div v-if="!registerDisplay">
        <p class="title has-text-white has-text-centered">Cette partie est réservée aux membres !</p>
        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Se connecter</p>
                </header>
                <section class="modal-card-body">

                     <b-field label="Username">
                        <b-input
                            type="username"
                            :value="username"
                            placeholder="Ton nom d'utilisateur"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input
                            type="password"
                            :value="password"
                            password-reveal
                            placeholder="Your password"
                            required>
                        </b-input>
                    </b-field>

                    <!-- <b-checkbox>Remember me</b-checkbox> -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Fermer</button>
                    <button class="button is-primary" @click="loginBtnClicked()">Se connecter</button>
                </footer>
            </div>
        </form>
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
        <form action="">
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">S'inscrire</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Email">
                        <b-input
                            type="email"
                            :value="email"
                            placeholder="Ton email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Username">
                        <b-input
                            type="username"
                            :value="username"
                            placeholder="Ton nom d'utilisateur"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input
                            type="password"
                            :value="password"
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
        </form>
        <Divider :marginHeight="1"/>
        <div class="level">
            <div class="level-item">
                <p class="title is-size-5 has-text-white has-text-centered" style="margin-right: 1rem;">Déjà inscris ?</p>
                <button class="button is-small is-primary  is-outlined is-inverted"
                @click="goToLoginMode()">Connectes toi !</button>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>
import Divider from './Divider.vue'
import Authentification from '../services/authentification.js'

export default {
    components : {
        Divider
    },
    data(){
        return {
            registerDisplay : false,
            email: "email@random.com",
            username: "toto",
            password: "123456"
        }
    },
    methods: {
        goToRegisterMode(){
            this.registerDisplay = true;
        },
        goToLoginMode(){
            this.registerDisplay = false;
        },
        registerBtnClicked(){
            Authentification.register(this.email, this.username, this.password, (success, data) => {
                if(success){
                    this.$router.push(this.$route.query.redirect)
                }
            });
        },
        loginBtnClicked(){
            this.$authentification.login(this.email, this.password, (success, data) => {

            });
        }
    }
}
</script>

<style>

</style>

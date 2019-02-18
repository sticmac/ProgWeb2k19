<template>
<div>
    <Comment v-for="(comment, index) in comments" :key="index" :comment="comment"/>
    <p v-if="comments.length <= 0">Cette recette n'a reçu aucun commentaires</p>

    <!-- Add comment section -->
    <div class="outer-box">
        <article class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png">
                </p>
            </figure>
            <div class="media-content">
                <div class="field">
                <p class="control">
                    <textarea class="textarea" placeholder="Ajouter un commentaire..." v-model="newCommentContent"></textarea>
                </p>
                </div>
                <div class="field">
                <p class="control">
                    <button class="button" @click="sendBtnClicked()">Envoyer</button>
                </p>
                </div>
            </div>
        </article>
        <div class="inner-box notification" v-if="!loggedIn">
            <div class="content level" style="height: 100%">
                <div class="level-item column content">
                    <p class="title is-size-5" style="margin: 1rem 0;">Tu dois être connecté pour pouvoir commenter</p>
                    <button class="is-primary button" @click="connectBtnClicked()">Se connecter</button>
                </div>  
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import Comment from './Comment.vue'
import Requester from '../services/requester'
import Authentification from '../services/authentification.js'

export default {
    components : {
        Comment
    },
    props: {
        recipeId : null
    },
    data(){
        return {
            loggedIn : false,
            newCommentContent : "",
            comments : [
                // {
                //     author : "Antoine Dezarnaud",
                //     content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.",
                //     date : "04/02/2019"
                // }
            ]
        }
    },
    watch: {
        recipeId(){
            this.refreshCommentsList();
        }
    },
    methods : {
        connectBtnClicked(){
            Authentification.promptLoginWithCallback((success, data) => {
                this.loggedIn = this.$authentification.loggedIn();
            });
        },
        refreshCommentsList(){
            if(this.recipeId != null){
                Requester.getRecipeCommentsById(this.recipeId, (success, comments) => {
                    if(success){
                        this.comments = comments;
                    }
                });
            }
        },
        sendBtnClicked(){
            if(this.recipeId != null){
                Requester.postRecipeCommentById(this.recipeId, Authentification.username, this.newCommentContent, (success, data) => {
                    if(success){
                        console.log("comment sent")
                        console.log(this.newCommentContent);
                        this.newCommentContent = "";
                        this.refreshCommentsList();
                    }
                });
            }
        }
    },
    created(){
        this.loggedIn = this.$authentification.loggedIn();
        this.refreshCommentsList();
    }
}
</script>

<style>

</style>

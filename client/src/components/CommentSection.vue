<template>
<div>
    <Comment v-for="(comment, index) in comments" :key="index" :comment="comment"/>
    <!-- Add comment section -->
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
</div>
    
</template>

<script>
import Comment from './Comment.vue'
import Requester from '../services/requester'

export default {
    components : {
        Comment
    },
    props: {
        recipeId : null
    },
    data(){
        return {
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
            refreshCommentsList();
        }
    },
    methods : {
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
                Requester.postRecipeCommentById(this.recipeId, "testAuthor", this.newCommentContent, (success, data) => {
                    if(success){
                        console.log("comment sent")
                        console.log(this.newCommentContent);
                        this.newCommentContent = "";
                        this.refreshCommentsList();
                    }
                });
            }
        }
    }
}
</script>

<style>

</style>

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
                <textarea class="textarea" placeholder="Ajouter un commentaire..."></textarea>
            </p>
            </div>
            <div class="field">
            <p class="control">
                <button class="button">Envoyer</button>
            </p>
            </div>
        </div>
    </article>
</div>
    
</template>

<script>
import Comment from './Comment.vue'
export default {
    components : {
        Comment
    },
    data(){
        return {
            comments : [
                {
                    author : "Antoine Dezarnaud",
                    content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta eros lacus, nec ultricies elit blandit non. Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.",
                    date : "04/02/2019"
                }
            ]
        }
    }
}
</script>

<style>

</style>

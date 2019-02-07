<template>
        <article class="media">
        <figure class="media-left">
            <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <strong>{{comment.author}}</strong>
                    <br>
                    {{comment.content}}
                    <br>
                    <small>
                        <a>Aimer</a> · <a>Répondre</a> · 
                    </small>
                     <small>
                        {{comment.date}}
                    </small>
                </p>
            </div>

            <!-- Responses -->
            <!-- <div v-if="responses">
                <Comment v-for="(response, index) in responses" :key="index" :comment="response" :isResponse="true"/>
            </div> -->
        </div>
    </article>
</template>

<script>
// import Comment from './Comment.vue'

export default {
    name: "Comment",
    // components : {
    //     Comment
    // },
    props : {
        comment : null,
        // isResponse : false,
        // responses : Array
    }
}
</script>

<style>

</style>

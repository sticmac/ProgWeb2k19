<template>
    <section class="hero is-primary is-fullheight-with-navbar">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">Ohoh !</h1>
          <h2 class="subtitle">{{this.description}}</h2>
          <button class="button is-primary is-outline is-inverted" @click="backBtnClicked()">{{this.btnText}}</button>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    props : {
        description : {
            type : String,
            default : "Nous n'avons pas trouvé la page que tu cherches :("
        },
        btnText : {
            type: String,
            default : "Retourner à l'accueil"
        },
        btnLink : {
            type: String,
            default : "/"
        }
    },
    methods : {
        backBtnClicked(){
            this.$router.push(this.btnLink);
        }
    }
}
</script>

<template>
    <div class="product-card">
        <div class="card" v-on:click="goToItem(meal.id)">
          <div class="card-image">
            <figure class="image is-4by3">
              <img v-if="image_url" :src="image_url" class="thumbnail" @error="imageLoadError">
              <img v-else src="https://bulma.io/images/placeholders/64x64.png" class="thumbnail">
            </figure>
          </div>
          <div class="card-content level">
            <div class="level-left">
              <div class="content level-item is-large">{{meal.name.length < 15 ? meal.name : meal.name.substring(0,15) + "…"}}</div>
            </div>
            <div class="level-right" v-on:click.stop="">
              <b-checkbox v-on:input="checkCompare" class="inline-checkbox level-right"/>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import BCheckbox from "buefy/src/components/checkbox/Checkbox";
export default {
    components: {BCheckbox},
    props: ['meal'],
  data(){
    return {
      image_url : this.meal.image_url
    }
  },
  methods : {
    imageLoadError(){
      this.image_url = "https://bulma.io/images/placeholders/64x64.png"
    },
    goToItem(id) {
      this.$router.push('/item/' + id);
    },
    checkCompare(checked){
        this.meal.compare = checked;
    },
    doStop() {
      console.log("Stopped");
    }
  }
}
</script>


<style>

.inline-checkbox {
    display: inline-block;
}

.thumbnail {
  object-fit: cover;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 3.6em;
  text-align: justify;
}

.product-card {
  cursor: pointer;
}
</style>


<template>
    <div class="product-card box card is-secondary">
        <header class="card-header is-shadowless">
            <b-checkbox v-on:input="checkCompare" class="inline-checkbox"/>
            <p class="card-header-title">
            {{meal.name}}
          </p>
        </header>
        <div class="card-content" v-on:click="goToItem(meal.id)">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64 is-square">
                <img v-if="image_url" :src="image_url" class="thumbnail" @error="imageLoadError">
                <img v-else src="https://bulma.io/images/placeholders/64x64.png" class="thumbnail">
              </figure>
            </div>

            <div class="media-content">
              <div class="description">{{meal.description}}</div>
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


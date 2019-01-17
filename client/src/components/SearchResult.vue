<template>
    <div class="card is-secondary">
        <header class="card-header">
          <p class="card-header-title">
            {{meal.name}}
          </p>
        </header>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-64x64 is-square">
                <img v-bind:src="meal.thumbUrl" v-bind:alt="meal.name" class="thumbnail">
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
export default {
  props: ['meal']
}
</script>


<style>
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

</style>


<template>
    <div class="row">
        <img v-bind:src="meal.thumbUrl" v-bind:alt="meal.name" class="thumbnail">
        <div class="info">
          <p class="meal-title">{{meal.name}}</p>
          <p class="description">{{meal.description}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['meal']
}
</script>


<style>
.row {
  display: flex;
  align-items: center;
  border: #ccc 1px dashed;
  margin: auto;
  height: 125px;
  transition: background-color 0.2s linear;
}

.row:hover {
  background-color: #eee;
}

.thumbnail {
  object-fit: cover;
  width: 100px;
  height: 100px;
  border: #ccc 1px solid;
  margin-left: 1em;
}

.info {
  flex: 1;
  align-items: flex-start;
  height: 80%;
  margin-left: 1em;
}

.meal-title {
  font-weight: bold;
}

.description {
  margin: 0.3em;
  overflow: hidden;
  text-overflow: ellipsis;
  /* use this value to count block height */
  line-height: 1.2em;
  /* max-height = line-height (1.2) * lines max number (3) */
  max-height: 3.6em; 
  text-align: justify;  
}

</style>


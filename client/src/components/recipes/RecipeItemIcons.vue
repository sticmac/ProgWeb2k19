<template>
<div class="level">
<div class="level-left">
        <div class="level-item">
            <b-icon
            pack="fas"
            icon="dollar-sign"
            size="is-small"
            :type="'is-'+this.priceClass">
            </b-icon>
            <p class="icon-value" :class="'has-text-'+this.priceClass">{{this.recipe.price}}</p>
        </div>
        <div class="level-item">
            <b-icon
            pack="fas"
            icon="clock"
            size="is-small"
            :type="'is-'+timeClass">
            </b-icon>
            <p class="icon-value has-text-info" :class="'has-text-'+timeClass">{{this.recipe.time_required}} min</p>
        </div>
        <div class="level-item">
            <b-icon
            pack="fas"
            icon="heartbeat"
            size="is-small"
            :type="'is-'+healthClass">
            </b-icon>
            <p class="icon-value has-text-success" :class="'has-text-'+healthClass">{{healthName}}</p>
        </div>
    </div>
</div>

</template>

<script>
export default {
    props : {
        recipe : null
    },
    computed : {
        priceClass(){
            var colorClass = "success";
            if(this.recipe.price > 10 && this.recipe.price <= 20){
                colorClass = "warning";
            }else if(this.recipe.price > 20){
                colorClass = "danger";
            }
            return colorClass;
        },
        timeClass(){
            var colorClass = "success";
            if(this.recipe.time_required > 20 && this.recipe.time_required <= 60){
                colorClass = "warning";
            }else if(this.recipe.time_required > 60){
                colorClass = "danger";
            }
            return colorClass;
        },
        healthClass(){
            var colorClass = "success";
            if(this.recipe.health_indicator >= 8 && this.recipe.health_indicator < 15){
                colorClass = "warning";
            }else if(this.recipe.health_indicator < 8){
                colorClass = "danger";
            }
            return colorClass;
        },
        healthName(){
            var name = "Bon";
            if(this.recipe.health_indicator >= 8 && this.recipe.health_indicator < 15){
                name = "Moyen";
            }else if(this.recipe.health_indicator < 8){
                name = "Mauvais";
            }
            return name;
        }
    }
}
</script>

<style scoped>
    .icon-value {
        margin-left: 0.5rem !important;
    }

    .level-item {
        margin-right: 1.5rem !important;
    }
</style>

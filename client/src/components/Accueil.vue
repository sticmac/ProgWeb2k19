<template>
<div class="container">
    <p class="test">This is a red text</p>
    <b-field label="Select a date">
        <b-datepicker
            placeholder="Type or select a date..."
            icon="calendar-today"
            editable>
        </b-datepicker>
    </b-field>
        <div class="block">
            <b-icon
                pack="fas"
                icon="user"
                size="is-small">
            </b-icon>
            <b-icon
                pack="fas"
                icon="home"
                size="is-small">
            </b-icon>
            <b-icon
                pack="fas"
                icon="tachometer-alt"
                size="is-small">
            </b-icon>
        </div>
</div>
  
</template>

<script>
export default {
  name: 'Accueil'
}
</script>

<style lang="scss">
$color: red;
.test{
    color: $color;
}
</style>

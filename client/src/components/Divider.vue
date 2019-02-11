<template>
    <div :style="dividerStyleObject"></div>
</template>

<script>
export default {
    props:{
        marginHeight : {
            type : Number,
            default : 5
        }
    },
    computed: {
        dividerStyleObject() {
            return {
                margin : this.marginHeight+"rem 0 0 0"
            }
        }
    }
}
</script>

<style>

</style>

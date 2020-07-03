<template>
    <div class="panel-content-container">
        <slot ref="slot"></slot>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .panel-content-container{
        height: 100%;
        width: 100%;
    }
</style>
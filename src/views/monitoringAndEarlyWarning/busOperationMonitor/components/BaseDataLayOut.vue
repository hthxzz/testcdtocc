<template>
    <div class="baseDataLayout-wrapper">
        <header class="title">
            <h2>{{ title }}</h2>
        </header>
        <section class="content">
            <div class="search-wrapper">
                <slot name="search" ></slot>
            </div>
            <div class="table-wrap">
                <slot name="table" ></slot>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'BaseDataLayOut',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
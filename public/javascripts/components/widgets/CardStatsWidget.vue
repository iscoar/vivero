<template>
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h1 class="card-text text-center" :class="fontColor">{{ fontColor == 'text-info' ? qty + ' %' : qty }}</h1>
    </div>
    </div>
</template>

<script>
    module.exports = {
        name: "CardStatsWidget",
        props: {
            title: {
                type: String,
                default: 'Title'
            },
            qty: {
                type: Number,
                default: 0
            },
            fontColor: {
                type: String,
            }
        }
    }
</script>

<style scoped>
    .card-text {
        font-family: 'Orbitron', sans-serif !important;
        font-size: 4.5rem !important;
    }
</style>
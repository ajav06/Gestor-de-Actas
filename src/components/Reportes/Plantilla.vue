<template>
    <div class="title is-parent columns is-multiline">

        <div class="card title is-child column is-one-quarter is-narrow meses" v-for="(mes, index) of items" :key="index">

            <div class="card-content">

                <div class="level is-mobile">

                    <div class="level-item">
                        <div class="is-widget-label">
                            <div class="subtitle is-spaced">
                                {{ index.toUpperCase() }}
                            </div>
                            <div class="title">
                                <div>{{ mes }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="level-item has-widget-icon">
                        <div class="is-widget-icon">
                            <b-icon
                                icon="calendar"
                                size="is-large">
                            </b-icon>
                        </div>
                    </div>    

                </div>

            </div>

        </div>

        <div class="column">
        </div>

    </div>
</template>

<script>
export default {
    name:'PlantillaReporte',
    props:['items']
}
</script>
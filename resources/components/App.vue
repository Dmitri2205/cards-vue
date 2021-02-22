<template>
    <div>
        <router-view :key="$route.path"></router-view>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
        	search:null,
        };
    },
    created() {
        this.$store.dispatch('globalAction', {type:"items"}) //Обращение к глобальной функции экшнов с указанием конечного объекта для изменения
    },
}
</script>
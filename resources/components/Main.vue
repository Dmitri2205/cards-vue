<template>
    <div class="px-5 pt-0	">
        <div>
            <b-input-group prepend="Поиск" class="mt-0">
                <b-form-input v-model="search" :value="search"></b-form-input>
                <b-input-group-append>
                    <b-button @click="filtration()" variant="outline-success">Найти</b-button>
                    <b-button @click="searchClear()" variant="info">Очистить</b-button>
                </b-input-group-append>
            </b-input-group>
        </div>
        <div class="d-flex flex-row align-items-center">
            <b-form-select @change="sorting()" v-model="sortType" :options="options" class="w-25 my-3">
                <template #first>
                    <b-form-select-option :value="null" disabled>Выберите тип сортировки</b-form-select-option>
                </template>
            </b-form-select>
            <b-form-checkbox v-if="sortedItems.length > 0" @change="reverse()" id="checkbox" v-model="reversed" name="reversed" value="1" class="ml-3">
                Сортировка с конца
            </b-form-checkbox>
        </div>
        <div class="d-flex flex-column">
            <b-button v-if="!addMode" @click="addMode = true" variant="success" style="width:200px">Добавить</b-button>
            <div v-else style="width:40%">
                <b-card>
                    <p>Имя</p>
                    <b-form-input class="mt-3" prepend="1" v-model="newItem.name"></b-form-input>
                    <p>Сайт</p>
                    <b-form-input class="mt-3" prepend="1" v-model="newItem.website"></b-form-input>
                    <p>Телефон</p>
                    <b-form-input class="mt-3" prepend="1" v-model="newItem.phone"></b-form-input>
                    <p>Имя компании</p>
                    <b-form-input class="mt-3" prepend="1" v-model="newItem.company.name"></b-form-input>
                    <p>лозунг</p>
                    <b-form-input class="mt-3" prepend="1" v-model="newItem.company.catchPhrase"></b-form-input>
                    <b-button @click="add()" variant="success" style="width:200px">Добавить</b-button>
                    <b-button @click="cancel()" variant="danger" style="width:200px">Отмена</b-button>
                </b-card>
            </div>
        </div>
        <b-spinner v-if="loading" variant="success" label="Spinning" style="width:200px;height:200px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto"></b-spinner>
        <div v-else-if="!loading && sortedItems.length === 0 && filtered.length === 0" class="d-flex flex-row flex-wrap">
            <div v-for="(item,index) in items" :key="index">
                <b-card @click="goToItem(item.id)" class="d-flex flex-row justify-content-center align-center p-0 m-3 rounded-25 itemCard" style="borderRadius:2px solid gray;maxWidth:'380px';width:20rem;height:20rem;">
                    <b-avatar></b-avatar>
                    <b-card-text>
                        <div class="d-flex flex-column justify-content-start p-3">
                            <p>{{item.name}}</p>
                            <p>{{item.website}}</p>
                            <div class="d-flex flex-column p-2">
                                <h4>Company</h4>
                                <p>{{item.company.bs}}</p>
                                <p>{{item.company.name}}</p>
                            </div>
                        </div>
                    </b-card-text>
                </b-card>
            </div>
        </div>
        <div v-else-if="filtered.length !== null && filtered.length > 0">
            <b-card class="w-100" header="Найдено">
                <b-list-group v-for="(item,index) in filtered" :key="index">
                    <b-list-group-item style="border:none">
                        <b-card @click="goToItem(item.id)" class="d-flex flex-row justify-content-center align-center p-0 m-3 rounded-25" style="borderRadius:2px solid gray;maxWidth:'380px'">
                            <b-avatar></b-avatar>
                            <b-card-text>
                                <div class="d-flex flex-column justify-content-start p-3">
                                    <p>{{item.name}}</p>
                                    <p>{{item.website}}</p>
                                    <div class="d-flex flex-column p-2">
                                        <h4>Company</h4>
                                        <div>
                                            <p>{{item.company.bs}}</p>
                                            <p>{{item.company.name}}</p>
                                        </div>
                                    </div>
                                </div>
                            </b-card-text>
                        </b-card>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </div>
        <div v-else-if="sortedItems.length !== null" class="d-flex flex-row flex-wrap">
            <b-list-group v-for="(item,index) in sortedItems" :key="index">
                <b-list-group-item style="border:none">
                    <b-card @click="goToItem(item.id)" class="d-flex flex-row justify-content-center align-center p-0 m-3 rounded-25" style="borderRadius:2px solid gray;maxWidth:'380px'">
                        <b-avatar></b-avatar>
                        <b-card-text>
                            <div class="d-flex flex-column justify-content-start p-3">
                                <p>{{item.name}}</p>
                                <p>{{item.website}}</p>
                                <div class="d-flex flex-column p-2">
                                    <h4>Company</h4>
                                    <div>
                                        <p>{{item.company.bs}}</p>
                                        <p>{{item.company.name}}</p>
                                    </div>
                                </div>
                            </div>
                        </b-card-text>
                    </b-card>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
    </div>
    </div>
</template>
<script>
import Item from './Item';
import { mapState } from 'vuex';
export default {
    name: 'Main',
    components: {
        Item,
    },
    data() {
        return {
            search: null,
            addMode: false,
            filtered: [],
            sortType: null,
            reversed: false,
            sort: false,
            sortedItems: [],
            options: [
                { value: "name", text: 'Имя' },
                { value: "site", text: 'Сайт' },
                { value: "none", text: 'Обычный вывод' },
            ],
            newItem: {
                name: null,
                website: null,
                phone: null,
                company: {
                    name: null,
                    catchPhrase: null,
                },
            },
        };
    },
    methods: {
        add() {
            let data = this.newItem;
            this.$store.dispatch('globalAction', { type: 'addItem', data: data });
            this.addMode = false;

        },
        cancel() {
            this.addMode = false;
        },
        goToItem(id) {
            let itemData = this.items.find((item) => item.id === id);
            this.$router.push({ name: 'item', params: { id: id, data: itemData } });
        },
        filtration() {
            let ctx = this;
            const items = this.items;
            const search = this.search;
            items.forEach(function(item) {
                let itemName = item.name.split(' ')[0];
                let itemLastName = item.name.split(' ')[1];
                if (itemName === search || itemLastName === search) {
                    ctx.filtered.push(item);
                } else if (item.website === search) {
                    ctx.filtered.push(item);
                } else {
                    return null;
                };
            });
        },
        sortVariant(event) {
            console.log(event);
        },
        sorting() {
            let ctx = this; //Контекст 
            let items = [...ctx.items];
            if (ctx.sortType !== 'none') {
                this.sortedItems = items.sort(function(a, b) {
                    if (ctx.sortType === 'name') {
                        return a.name < b.name ? 1 : -1;
                    } else if (ctx.sortType === "site") {
                        return a.website < b.website ? 1 : -1;
                    };
                });
                this.sortedItems.reverse();
            } else if (ctx.sortType === 'none') {
                this.sortedItems = [];
            };
        },
        reverse() {
            if (this.sortedItems.length > 0 && !this.reversed) {
                this.sortedItems.reverse();
            } else if (this.sortedItems.length > 0 && this.reversed) {
                this.sortedItems.reverse();
            };

        },
        searchClear() {
            this.search = null,
                this.filtered = [];
        }
    },
    computed: mapState({
        items: state => state.items,
        loading: state => state.isLoading,
    }),
}
</script>
<style lang=scss scoped>
.itemCard {
    animation: apear .6s ease-in-out;
}

@keyframes apear {
    from {
        transform: scale(0);
    }

    to {
        transform: scale(1);
    }
}
</style>
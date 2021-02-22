<template>
    <div>
        <p>{{itemInfo.id}}</p>
        <b-card class="d-flex flex-column justify-content-center align-center p-3 m-3 rounded-15" style="borderRadius:2px solid gray">
            <b-button class="float-right" @click="edit()">Изменить</b-button>
            <b-button class="float-right" variant="danger" @click="deleteItem()">Удалить</b-button>
            <b-card-text>
                <div class="d-flex flex-row justify-content-start align-items-center p-3">
                    <b-avatar class="mx-3" size="12rem"></b-avatar>
                    <div>
                        <p><b>Name: </b>{{itemInfo.name}}</p>
                        <p><b>Website: </b>{{itemInfo.website}}</p>
                    </div>
                </div>
                <b-card header="Company info">
                    <b-list-group title="Company">
                        <b-list-group-item>BS: <b>{{itemInfo.company.bs}}</b></b-list-group-item>
                        <b-list-group-item>Name: <b>{{itemInfo.company.name}}</b></b-list-group-item>
                        <b-list-group-item>Catch phrase: <b>{{itemInfo.company.catchPhrase}}</b></b-list-group-item>
                    </b-list-group>
                </b-card>
            </b-card-text>
        </b-card>
        <b-card header="Редактировать информацию" v-if="editMode" style="w-80 rounded-25">
        	<b-list-group>
			  <b-list-group-item><b-form-input v-model="itemInfo.name" placeholder="Имя"></b-form-input></b-list-group-item>
			  <b-list-group-item><b-form-input v-model="itemInfo.website" placeholder="Сайт"></b-form-input></b-list-group-item>
			  <b-list-group-item><b-form-input v-model="itemInfo.phone" placeholder="Телефон"></b-form-input></b-list-group-item>
			  <b-list-group-item><b-form-input v-model="itemInfo.company.name" placeholder="Имя компании"></b-form-input></b-list-group-item>
			  <b-list-group-item> <b-form-input v-model="itemInfo.company.catchPhrase" placeholder="Лозунг компании"></b-form-input></b-list-group-item>
			</b-list-group>
			<b-button @click="changeItem()" class="my-3">Сохранить</b-button>
		</b-card>

    </div>
</template>
<script>
export default {
    name: 'Item',
    data() {
        return {
            itemInfo: this.$route.params.data,
            editMode: false,
        };
    },
    methods: {
        edit() {
        	if (this.editMode === false) {
            this.editMode = true;
        	}else{
            this.editMode = false;
        	};

        },
        changeItem(){
         	let data = this.itemInfo;
         	console.log(data);
         	this.$store.dispatch('globalAction',{type:'changeItem',data:data});

        },
        deleteItem(){
         	let data = this.itemInfo;
         	this.$store.dispatch('globalAction',{type:'delete',data:data});
         	this.$router.push({path:'/main'});
        },
    }
}
</script>
import VueRouter from 'vue-router';
import Main from '../components/Main';
import Item from '../components/Item';

const routes = [
{
	path:'/',
	redirect:'/main',
},
{
    path: '/main',
    component: Main,
},
	    {
		    path: '/item/:id',
		    name:'item',
		    component: Item,
		},
];
const router = new VueRouter({
    routes,
    mode: "history",
})

export default router;
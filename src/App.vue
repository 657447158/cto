<template>
	<div id="app">
		<router-view></router-view>
		<Footer v-if="showFooter"/>
	</div>
</template>

<script>
import Footer from './components/footer';
const ORDER = 'order';
const INDEX = 'index';
const PERSONAL ='personal';
export default {
    components: {
		Footer
    },
    data () {
		return {
			showFooter:true,
		}
    },
    watch:{
		$route(to){   
			if(to.name === ORDER || to.name ===INDEX || to.name === PERSONAL){
				this.showFooter = true;
			} else {
				this.showFooter = false;
			}
		}
	}
}
</script>

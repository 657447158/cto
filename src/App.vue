<template>
  <div id="app">
    <router-view></router-view>
	  <Footer></Footer>
  </div>
</template>

<script>
  import Footer from './components/footer'
  export default {
    components: {
      Footer
    }
  }
</script>

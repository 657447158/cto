<template>
  <div id="app">
      <router-view></router-view>
      <Footer />
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

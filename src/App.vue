<template>
  <div id="app">
    <router-view/>
    
  </div>
</template>
 
<script>
export default {
  mode:'historyy',
  name: 'App'  
}

  
</script>  

<style> 
#app {
background: #ffffff;
/* overflow: hidden; */
}
*{
 
 margin: 0px;
 padding: 0px;
} 
html,body,#app{ 
 height: 100%;
}
</style>

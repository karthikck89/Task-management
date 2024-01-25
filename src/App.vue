<script setup lang="ts">

</script>

<template>
  <div class="page-content">
    <div class="header">
      <div class="title">
        Task Management
      </div>
    </div>
    <div class="sub-header">
      
      <p>
          <router-link to="/">Tasks</router-link>
      </p>
      <p class="create-task">
          <router-link to="/create" class="button"> Create Task </router-link>
      </p>
    </div>
    <div class="display-section">
      <router-view />
    </div>
  </div>
</template>

<style scoped lang="scss">

.page-content {
  max-width: 1312px;
  margin: 0 auto;
  .header {
  display: flex;
  margin-bottom: 15px;
  .title {
    margin: 0 auto;
  }
}
.sub-header {
  background: #fff;
}
  p {
    display: inline-block;
    text-decoration: none;
    width:60%;
    a {
      color: #000;
      text-decoration: none;
      padding:10px 20px; 
    }
  }
  @media (min-width: 700px) {
    padding: 20px;
  }

  @media (min-width: 1000px) {
    padding-top: 20px;
  }
}
.create-task {
  width:37% !important;
  text-align:right;
  a {
    background:#28a745;
    color:#fff !important;

    &::before {
        content: "\2795";    
      }   
  }
}
</style>

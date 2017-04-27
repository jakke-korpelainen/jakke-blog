<template>
  <div id="app">
    <div class="container">
      <div class="author">
        <div class="author-image">
          <img src="./assets/me.png" />
        </div>
        <div class="author-description">
          <h3>Jakke Korpelainen</h3>
          <p>Certified Episerver developer. Done all sorts of programming related stuff since 2003 but have kept focus on web development.</p>

          <ul class="author-social-links">
            <li><a href="https://www.linkedin.com/in/jakke-korpelainen">LinkedIn</a></li>
            <li><a href="https://www.github.com/jakke-korpelainen">GitHub</a></li>
          </ul>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
.author {
  display: flex;
  display: -webkit-flex;

   -webkit-flex-direction: row; 
   flex-direction: row;
   -webkit-justify-content: flex-start;
   justify-content: flex-start;

   border-bottom: 1px solid #eaeaea;
   padding-bottom: 20px;
   margin-bottom: 20px;
}

.author-image {
  width: 125px;
  height: 125px;
}

.author-image img {
  border-radius: 50%;
}

.author-description {
  margin: 0 20px;
  padding: 20px;
  width: calc(80% - 125px);
}

.author-social {
  width: 125px;
}

.author-social-links {
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.author-social-links li {
  margin-right: 10px;
  display: inline-block;
}

@media (max-width: 375px) {
  .author-description {
    width: calc(100% - 125px);
  }
}

.author-description h3 {
  margin: 0;
}

</style>

<style>
#app {
  font-family: 'Work Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 16px;
}

a {
  color: #262630;
}


@media (max-width: 375px) {
  .container {
    width: 100%;
    margin: 10px
  }

  img {
    height: auto;
  }
}

@media (min-width: 768px) {
  .container {
    width: 768px;
    margin: 10px auto;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1024px;
    margin: 20px auto;
  }
}

img {
  max-width: 100%;
  height: auto;
}

</style>

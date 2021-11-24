<template>
  <div class="header">
    <br/>
    <h1>AWESOME BLOG</h1>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .header {
    background: darkgray;
    text-align: center;
  }

  .header > h1 {
    margin-top: 0;
    margin-bottom: 0;
    padding: 20px;
    color: white;
    font-family: Comforter Brush, cursive;
    font-weight: 900;
    font-size: 8vw;
    line-height: normal;
  }

  @media screen and (max-width: 768px) {
    .header > h1 {
      font-size: 13vw;
    }

  }

</style>

<template>
  <div>
    <Preview :imgSrc="imgSrc" />
  </div>
</template>

<script>
export default {
  components: {

  },
  mounted() {
    console.log(this);
  },
  data() {
    return {
      imgSrc:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0812%252F75c0d331p00qxps5a002pd000cz009ip.png%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632710627&t=2849f681912ca0b418ace5f994e9848c",
    };
  },
};
</script>
<style lang='' scoped>
</style>
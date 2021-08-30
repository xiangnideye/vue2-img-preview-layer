<template>
  <img :src="imgSrc" class="img-com" @click="showPreview"/>
</template>

<script>
import PreviewPopup from "../../prveiew-popup/index";
import { createInstance, appendChildBody } from "./utils";

export default {
  name: "Preview",
  components: {
    PreviewPopup,
  },
  props: {
    imgSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      vm: ""
    };
  },
  methods: {
    showPreview() {
      this.vm = createInstance(
      PreviewPopup,
      // props 参数
      { imgSrc: this.imgSrc },
      // on 接收
      {
        removePrev: () => {
          this.removePreview();
        },
      }
    );
      appendChildBody(this.vm);
    },
    removePreview() {
      document.body.removeChild(this.vm.$el);
      this.vm.$destroy();
    },
  },
};
</script>
<style scoped>
.img-com {
  width: 30px;
  height: 30px;
}
</style>
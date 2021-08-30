<template>
  <div class="img-preview-container">
    <div class="close-con" @click="closePreview">
      <img src="../../../static/img/close.png" class="close-btn" />
    </div>
    <div class="img-preview-parent" @drop="drop" @dragover="dragover">
      <div class="img-wrap" @dragstart="moveDragstart" :style="positionStyle">
        <img
          id="img-preview-img"
          class="img-preview-img"
          ref="imgRef"
          :src="imgSrc"
          :style="transformStyle"
        />
      </div>
    </div>
    <ul class="img-preview-btn-list">
      <li
        class="img-preview-btn-item"
        v-for="(item, index) in btnList"
        :key="index"
        @click="handleBtnOptions(item)"
      >
        <div class="img-con">
          <img :src="item.img_src" class="btn-img" :alt="item.btn" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PreviewPopup",
  props: {
    imgSrc: {
      type: String,
      default: "",
    },
    remove: {
      type: Function,
      default: () => {},
    },
    vm: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      imgDom: "",
      imgClientWidth: 300,
      marginLeftText: 0,
      marginTopText: 0,
      imgClientHeight: 0,
      dragstartX: 0,
      dragstartY: 0,
      offsetX: 0,
      offsetY: 0,
      window_width:
        document.documentElement.clientWidth || document.body.clientWidth,
      window_height:
        document.documentElement.clientHeight || document.body.clientHeight,
      defaultScaleXStyle: "none",
      defaultScaleYStyle: "none",
      defaultRotate: 0,
      defaultScaleY: 1,
      defaultScaleX: 1,
      changeStyle: {
        transform: "none",
      },
      btnList: [
        {
          btn: "left",
          type: "SpinLeft",
          img_src: require("../../../static/img/xiangzuoxuanzhuan.png"),
        },
        {
          btn: "right",
          type: "SpinRight",
          img_src: require("../../../static/img/xiangyouxuanzhuan.png"),
        },
        {
          btn: "reset",
          type: "Reset",
          img_src: require("../../../static/img/zhongzhi.png"),
        },
        {
          btn: "flip horizontal Y",
          type: "FlipHorizontalY",
          img_src: require("../../../static/img/shangxia.png"),
        },
        {
          btn: "flip horizontal X",
          type: "FlipHorizontalX",
          img_src: require("../../../static/img/zuoyou.png"),
        },
        {
          btn: "ImgIncreased",
          type: "ImgIncreased",
          img_src: require("../../../static/img/fangda.png"),
        },
        {
          btn: "Imgreduced",
          type: "Imgreduced",
          img_src: require("../../../static/img/suoxiao.png"),
        },
      ],
    };
  },
  computed: {
    positionStyle() {
      // 算出居中距离
      const target = {
        "margin-left": this.marginLeftText + "px",
        "margin-top": this.marginTopText + "px",
        width: this.imgClientWidth + "px",
      };

      // const imgStyle = Object.assign(targit);
      return target;
    },
    transformStyle() {
      return this.changeStyle
    }
  },
  mounted() {
    console.log(111);
    this.imgDom = document.getElementById("img-preview-img");
    window.onresize = (e) => this.windowResize(e);
    this.windowResize();
  },
  methods: {
    dragover(event) {
      event.preventDefault();
      this.marginLeftText = event.clientX - this.dragstartX;
      this.marginTopText = event.clientY - this.dragstartY;
    },
    moveDragstart(event) {
      this.dragstartX = event.offsetX;
      this.dragstartY = event.offsetY;
    },
    drop(event) {
      this.marginLeftText =
        event.clientX - this.dragstartX >= 0
          ? event.clientX - this.dragstartX
          : 0;
      this.marginTopText =
        event.clientY - this.dragstartY >= 0
          ? event.clientY - this.dragstartY
          : 0;
    },
    // 监听窗口变化
    windowResize() {
      this.window_width =
        document.documentElement.clientWidth || document.body.clientWidth;
      this.window_height =
        document.documentElement.clientHeight || document.body.clientHeight;
      this.windowCenterImg();
    },
    // 获取图片真实高度和宽度
    windowCenterImg() {
      setTimeout(() => {
        this.imgClientHeight = this.$refs.imgRef.clientHeight;
        this.marginLeftText = (this.window_width - this.imgClientWidth) / 2;
        this.marginTopText = (this.window_height - this.imgClientHeight) / 2;
      }, 100);
    },
    // 操作集合
    handleBtnOptions(btn) {
      const btnFn = "handleBtn" + btn.type;
      this[btnFn]();
    },
    // 左旋转
    handleBtnSpinLeft() {
      const rotate = (this.defaultRotate -= 90);
      this.$set(this.changeStyle, "transform", `rotate(${rotate}deg)`);
    },
    // 右旋转
    handleBtnSpinRight() {
      const rotate = (this.defaultRotate += 90);
      this.$set(this.changeStyle, "transform", `rotate(${rotate}deg)`);
    },
    // 重置
    handleBtnReset() {
      this.defaultRotate = 0;
      this.$set(this.changeStyle, "transform", `none`);
      this.imgClientWidth = 300;
    },
    // 左右翻转
    handleBtnFlipHorizontalX() {
      this.defaultScaleXStyle = this.defaultScaleX % 2 ? "scaleX(-1)" : "none";
      this.$set(
        this.changeStyle,
        "transform",
        this.mergeScaleOptions(this.defaultScaleXStyle, this.defaultScaleYStyle)
      );
      this.defaultScaleX++;
    },
    // 上下翻转
    handleBtnFlipHorizontalY() {
      this.defaultScaleYStyle = this.defaultScaleY % 2 ? "scaleY(-1)" : "none";
      this.$set(
        this.changeStyle,
        "transform",
        this.mergeScaleOptions(this.defaultScaleXStyle, this.defaultScaleYStyle)
      );
      console.log(
        this.mergeScaleOptions(this.defaultScaleXStyle, this.defaultScaleYStyle)
      );
      this.defaultScaleY++;
    },
    // 图片放大
    handleBtnImgIncreased() {
      const increasedWidth = this.imgClientWidth * 0.1;
      const increasedHeight = this.imgClientHeight * 0.1;

      this.imgClientWidth += this.imgClientWidth * 0.1;
      this.marginLeftText -= increasedWidth / 2;
      this.marginTopText -= increasedHeight / 2;
    },
    // 图片缩小
    handleBtnImgreduced() {
      const increasedWidth = this.imgClientWidth * 0.1;
      const increasedHeight = this.imgClientHeight * 0.1;

      this.imgClientWidth -= this.imgClientWidth * 0.1;
      this.marginLeftText += increasedWidth / 2;
      this.marginTopText += increasedHeight / 2;
    },
    // 合并 Scale 属性
    mergeScaleOptions(x, y) {
      let result = "";
      if (x == "none" && y == "none") {
        result = "none";
      } else if (x == "none" && y !== "none") {
        result = `${y}`;
      } else if (x !== "none" && y == "none") {
        result = `${x}`;
      } else if (x !== "none" && y !== "none") {
        result = `${x} ${y}`;
      }

      return result;
    },
    // 关闭
    closePreview() {
      this.$emit("removePrev");
    },
  },
};
</script>

<style scoped>
.img-con {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.img-con:hover {
  background: rgba(0, 0, 0, 0.8);
}
.btn-img {
  width: 20px;
}
</style>

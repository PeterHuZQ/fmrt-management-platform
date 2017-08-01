<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    @import "./common/styles/common.less";

    body {
      color: @default-black-color;
    }
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .clearfix::after {
      content: '';
      display: block;
      clear: both;
    }
    // 超出显示...
    .text-ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
    }

    .page-center {
      text-align: center;
      margin-top: 20px;
    }
    // .handle-index-page {
    //   position: fixed;
    //   top: 70px;
    //   bottom: 0;
    //   left: 250px;
    //   right: 0;
    //   padding: 40px;
    //   background-color: #FFF;
    // }

    .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
    }

    .opacity0 {
      opacity: 0;
    }
    @media screen and (max-width:1279px) {
      .top {
        // 输入框样式
        .el-form-item__label {
          width: 100px;
        }
        .el-form-item__content {
          width: 210px;
        }

        .el-input .el-select .el-input {
          width: 95px;
          color: #000000;
        }

        .el-date-editor.el-input,
        .el-select,
        .el-cascader {
          width: 100%;
        }
      }
    }
    @media screen and (min-width:1280px) {
      .top {
        // 输入框样式
        .el-form-item__label {
          width: 8vw;
        }
        .el-form-item__content {
          width: 15vw;
        }

        .el-input .el-select .el-input {
          width: 95px;
          color: #000000;
        }

        .el-date-editor.el-input,
        .el-select,
        .el-cascader {
          width: 100%;
        }
      }
    }
    /*@import "../static/css/theme-green/color-green.css";   !*浅绿色主题*!*/
</style>

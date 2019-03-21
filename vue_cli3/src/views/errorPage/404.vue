<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/404_images/404.png" alt="404">
        <img class="pic-404__child left" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child mid" src="@/assets/404_images/404_cloud.png" alt="404">
        <img class="pic-404__child right" src="@/assets/404_images/404_cloud.png" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有
          <a class="link-type" href="https://wallstreetcn.com" target="_blank">华尔街见闻</a>
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <router-link to="/" class="bullshit__return-home">返回首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '网管说这个页面你不能进......'
    }
  }
}
</script>

<style scoped>
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  }
    @keyframes cloudLeft {
      0% {
        top: 17px;
        left: 220px;
        opacity: 0;
      }
      20% {
        top: 33px;
        left: 188px;
        opacity: 1;
      }
      80% {
        top: 81px;
        left: 92px;
        opacity: 1;
      }
      100% {
        top: 97px;
        left: 60px;
        opacity: 0;
      }
    }
    @keyframes cloudMid {
      0% {
        top: 10px;
        left: 420px;
        opacity: 0;
      }
      20% {
        top: 40px;
        left: 360px;
        opacity: 1;
      }
      70% {
        top: 130px;
        left: 180px;
        opacity: 1;
      }
      100% {
        top: 160px;
        left: 120px;
        opacity: 0;
      }
    }
    @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
  }
  .bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;
  }
  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
}
</style>

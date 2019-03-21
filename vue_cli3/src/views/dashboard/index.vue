<template>
  <div class="dashboard-container">我是控制台
    <div>
      <el-input v-model="inputInfo"/>
      <el-button type="small" @click="btnSearch()">点击搜索</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      inputInfo: ""
    }
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    btnSearch() {
      this.$get("http://localhost:5050/users/searchInfo", {
        input: this.inputInfo,
        type: 2
      }).then(res => {
        if (res.resultCode === "000000") {
          this.$message({
            type: "success",
            message: res.resultMesg
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.dashboard-container {
  margin: 30px;
}
</style>

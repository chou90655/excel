<template>
  <ll-scrollbar class="list">
    <table v-if="sit === 'floors'">
      <tr class="floor">
        <td></td><td><input type="text" v-model="data.title[1]" placeholder="请输入楼层名称"></td>
        <td><i class='xj' v-if="data.title[1]" @click="edit(-1)">新增子区域</i></td>
      </tr>
      <tr v-for="(_, i) in data.rooms" :key="i">
        <td><input type="text" v-model="_.title[0]" placeholder="请输入序号"></td>
        <td><input type="text" v-model="_.title[1]" placeholder="请输入区域名称"></td>
        <td><i class='xj sc' @click="edit(i)">删除</i></td>
      </tr>
    </table>
    <table v-else-if="sit === 'rooms'">
      <tr class="floor">
        <td><input type="text" v-model="data.title[0]" placeholder="请输入序号"></td>
        <td><input type="text" v-model="data.title[1]" placeholder="请输入区域名称"></td>
        <td></td>
      </tr>
    </table>
    <table v-else-if="sit === 'ctt'">
      <tr class="ctt">
        <td><input type="text" v-model="data.title[0]" placeholder="请选择子项目"></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </ll-scrollbar>
  <el-button @click="hdclk" size='default'>确定</el-button>
</template>
<script>
export default {
  emits: ['save'],
  props: ['obj', 'sit'],
  data() {
    return {
      list: JSON.parse(localStorage.terms || null) || [],
      data: '',
      showadd: 0
    }
  },
  created() {
    console.log('2122121')
    this.data = ({ rooms: { title: ['', ''], ctt: [] }, floors: { title: ['', ''], rooms: [] } })[this.sit]
  },
  methods: {
    edit(i) {
      if (i > -1) this.data.rooms.splice(i, 1)
      else this.data.rooms.push({ title: ['', ''], ctt: [] })
    },
    hdclk() {
      const { title, rooms } = this.data
      if (title[1] && (rooms || []).every(_ => _.title[1])) this.$emit('save', this.data)
      else this.$message({ type: 'error', message: '数据填写不完整!' })
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  max-height: 600px;
  color: #000;
  table {
    margin: 0 auto;
    border-collapse:collapse;
    td {
      padding: 1px 2.5px;
      border: 1px solid #000;
      text-align: center;
      box-sizing: border-box;
      height: 25px;
      width: 150px;
      vertical-align: middle;
      outline: none;
      position: relative;
      &:nth-child(2) {
        width: 500px;
        text-align: left;
      }
      &:nth-child(3) {
        width: 120px;
        text-align: justify;
      }
    }
  }
  .xj {
    margin: 0 auto;
    font-size: 12px;
    width: 80px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f4f5;
    color: #909399;
    cursor: pointer;
    user-select: none;
    border: 1px solid #000;
    border-color: #e9e9eb;
    border-radius: 4px;
    &.sc {
      background-color: #fef0f0;
      border-color: #fde2e2;
      color: #f56c6c;
    }
  }
}
input {
  position: absolute;
  border: none;
  width: 100%;
  min-height: 20px;
  height: 20px;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 2.5px;
  box-sizing: border-box;
}
.el-button {
  display: block;
  margin: 12px auto 0;
}
</style>

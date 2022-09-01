<template>
  <ll-scrollbar class="list">
    <table>
      <tr class="thd"><td v-for="(_,i) in obj.head.slice(1,5)" :key="i">{{_}}</td><td>单价</td><td>操作</td></tr>
      <tr v-for="(_,i) in list" :key="i">
        <td v-for="(_i,ii) in _" :key="ii" @blur="hdblur($event,ii,_)" :contenteditable="ii!=1">{{_i}}</td>
        <td class="del" @click="del(i)"><i>删除</i></td>
      </tr>
    </table>
  </ll-scrollbar>
  <table class="add" v-if="showadd">
    <td v-for="(_,i) in 5" :key="i" contenteditable="true"></td><td class="del" @click="showadd=0"><i>删除</i></td>
  </table>
  <el-button @click="hdclk" size='default'>{{showadd?'保存':'新增子项目'}}</el-button>
</template>
<script>
export default {
  emits: ['change'],
  props: ['obj'],
  data() {
    return {
      list: JSON.parse(localStorage.terms || null) || [],
      showadd: 0
    }
  },
  created() {
    console.log(this.list)
  },
  methods: {
    hdclk() {
      if (this.showadd) {
        const term = [...document.querySelectorAll('.add td')].slice(0, 5).map(_ => _.innerText)
        if (!term[1]) return this.$message({ message: '请输入子项目名称！', type: 'warning' })
        if (this.list.some(_ => _[1] === term[1])) return this.$message({ message: '该子项目名称已存在！', type: 'warning' })
        if (!term[3]) return this.$message({ message: '请输入单位！', type: 'warning' })
        if (!term[4]) return this.$message({ message: '请输入单价！', type: 'warning' })
        this.list.push(term)
        localStorage.terms = JSON.stringify(this.list)
        this.$message({ message: '新增成功！', type: 'success' })
        this.showadd = 0
      } else this.showadd = 1
    },
    hdblur(e, l, _) {
      _[l] = e.target.innerText
      this.$emit('change', _)
    },
    del(i) {
      this.list.splice(i, 1)
      localStorage.terms = JSON.stringify(this.list)
    }
  }
}
</script>
<style lang="scss" scoped>
.list {
  max-height: 600px;
  color: #000;
}
table {
  border-collapse:collapse;
  td {
    padding: 1px 2.5px;
    border: 1px solid #000;
    text-align: center;
    box-sizing: border-box;
    height: 23px;
    width: 88px;
    vertical-align: middle;
    outline: none;
    &:nth-child(4) {
      width: 60px;
    }
    &:nth-child(2) {
      width: 200px;
      text-align: left;
    }
    &:nth-child(3) {
      width: 401px;
      text-align: justify;
    }
  }
  .thd {
    background-color: #fafafa;
    td {
      font-size: 15px;
      text-align: center;
    }
  }
  .del {
    padding: 0;
    i {
      background-color: #fef0f0;
      color: #f56c6c;
      margin-left: 3.9px;
      font-size: 12px;
      width: 50px;
      height: 16px;
      display: block;
      margin: auto;
      cursor: pointer;
      user-select: none;
      border: 1px solid #fde2e2;
      border-radius: 4px;
    }
  }
}
.add {
  background-color: #f7f7f7;
  margin-top: -1px;
  position: relative;
  z-index: 1;
}
.el-button {
  display: block;
  margin: 12px auto 0;
}
</style>
<style lang="scss">
._dterms {
  .el-dialog__body {
    padding-top: 2px;
  }
  .el-dialog__header {
    text-align: center;
    font-weight: bold;
  }
}
</style>

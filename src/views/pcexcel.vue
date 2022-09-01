<template>
  <ll-scrollbar class="zx">
    <div class="main">
      <div class="mbtns fxi">
        <el-button @click="btnclick(0)">子项目列表</el-button>
        <el-button @click="hdclc">导出</el-button>
        <el-checkbox v-model="lightEidt">突出显示可修改区域</el-checkbox>
      </div>
      <div class="ecl" v-if="obj.cmp">
        <table v-if="obj.cmp" ref="tbl2" :class="lightEidt&&'ledt'">
          <!-- <tr class="bd ttt"><td colspan="8"><input type="text" v-model="obj.cmp[0]"></td></tr>
          <tr class="bd ttt"><td colspan="8"><input type="text" v-model="obj.bjd[0]"></td></tr>
          <tr class="bd ttt"><td colspan="8"><input type="text" v-model="obj.name[0]"></td></tr> -->
          <tr class="thead">
            <td :rowspan="i<obj.head.length-1?2:1" :colspan="i<obj.head.length-1?1:2" v-for="(_, i) in obj.head" :key="i">{{_}}</td>
          </tr>
          <tr class="thead"><td v-for="(j,k) in obj.sub.filter(_=>_)" :key="k">{{j}}</td></tr>
          <template v-for="(_i, ii) in obj.floors" :key="ii">
            <tr class="title bd"><td></td><td colspan="7"><input type="text" v-model="_i.title[1]">{{_i.title[1]}}</td></tr>
            <template v-for="(_, i) in _i.rooms" :key="i">
              <tr class="title bd">
                <td><input type="text" v-model="_.title[0]">{{_.title[0]}}</td>
                <td colspan="7"><input type="text" v-model="_.title[1]">{{_.title[1]}}</td>
              </tr>
              <tr v-for="(j,k) in _.ctt" :key="k">
                <td v-for="(l,m) in j" :key="m">
                  <input v-if="m==6" @input="hdinput()" type="number" v-model="j[m]">
                  {{m==7&&(!(l>0))?'':l}}
                </td>
              </tr>
              <tr class="xj bd"><td v-for="(j1,k1) in _.total" :key="k1">{{k1==7?j1>0?j1:'':j1}}</td></tr>
            </template>
            <tr class="hj bd"><td v-for="(j1,k1) in _i.total" :key="k1">{{k1==7?j1>0?j1:'':j1}}</td></tr>
          </template>
          <tr class="zj bd"><td v-for="(j1,k1) in obj.total" :key="k1">{{k1==7?j1>0?j1:'':j1}}</td></tr>
        </table>
        <ul class="set">
          <!-- <li></li><li></li><li></li> -->
          <li></li><li></li>
          <template v-for="(_i, ii) in obj.floors" :key="ii">
            <li class="fxi"><i v-for="(l, m) in btns" :key="m" @click="hdset('floors',obj.floors,ii,m)">{{l}}</i></li>
            <template v-for="(_, i) in _i.rooms" :key="i">
              <li class="fxi"><i v-for="(l, m) in btns" :key="m" @click="hdset('rooms',_i.rooms,i,m)">{{l}}</i></li>
              <li class="fxi" v-for="(j,k) in _.ctt" :key="k"><i v-for="(l, m) in btns" :key="m" @click="hdset('ctt',_.ctt,k,m)">{{l}}</i></li>
              <li class="fxi xj"><i v-for="(l, m) in btns" :key="m" @click="hdset('ctt',_.ctt,_.ctt.length,m)">{{l}}</i></li>
            </template>
            <li class="fxi xj"><i v-for="(l, m) in btns" :key="m" @click="hdset('rooms',_i.rooms,_i.rooms.length,m)">{{l}}</i></li>
          </template>
          <li class="fxi xj"><i v-for="(l, m) in btns" :key="m" @click="hdset('floors',obj.floors,obj.floors.length,m)">{{l}}</i></li>
        </ul>
      </div>
    </div>
  </ll-scrollbar>
  <el-dialog width='980px' top="8vh" v-model="vd" :title="title" custom-class='_dterms' @closed='sit=""' :close-on-click-modal='false'>
    <Tterms v-if="sit===0" :obj='obj' @change="hdinput"/>
    <Add v-else-if="sit" @save='hdsave' :obj='obj' :sit='sit'/>
  </el-dialog>
</template>

<script>
import { read, utils, writeFile } from 'xlsx'
import { hdexcel, countdata } from '../utils/tool'
import Tterms from './terms.vue'
import Add from './add'
export default {
  data() {
    return {
      btns: ['新增', '删除'],
      vd: false,
      sit: '',
      title: '',
      lightEidt: false,
      obj: {
        cmp: ['xxxcmp'],
        bjd: ['bjdcmp'],
        name: ['name'],
        head: ['序号', '项目', '子项目名称', '施工工艺要求', '单位', '数量', '人工'],
        sub: ['单价', '合计'],
        floors: [{
          title: ['', '1c'],
          rooms: [{
            title: ['1', '222'],
            ctt: [
              [1, '地面', '地面11111', '永安永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2固2', 'm2', '19', '5'],
              [2, '地面1', '地面22222', '永安固1', 'm2', '22', '6'],
              [3, '地面2', '地面33333', '永安固3', 'm2', '23', '5']
            ]
          }, {
            title: ['2', '333'],
            ctt: [
              [1, '地面', '地面11111', '永安永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2永安固2固2', 'm2', '19', '5'],
              [2, '地面1', '地面22222', '永安固1', 'm2', '22', '6']
            ]
          }]
        }]
      }
    }
  },
  components: { Tterms, Add },
  methods: {
    btnclick(i) {
      this.vd = true
      this.sit = i
      this.title = '子项目列表'
    },
    hdset(key, arr, idx, i) {
      if (i) {
        const wd = '确定删除该' + (({ floors: '楼层', rooms: '区域' })[key] || '项目') + '吗?'
        this.$confirm(wd, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          arr.splice(idx, 1)
          this.hdinput()
          this.$message({ type: 'success', message: '删除成功!' })
        }).catch(() => {})
      } else {
        console.log(key, arr, idx, i)
        this.vd = true
        this.keep = { arr, idx }
        this.sit = key
        this.title = '新增' + ({ floors: '楼层', rooms: '区域', ctt: '子项目' })[key]
      }
    },
    hdsave(data) {
      console.log(this.keep.arr, this.keep.idx, this.sit)
      const { arr, idx } = this.keep
      arr.splice(idx, 0, data)
      this.vd = false
      this.sit = -1
      this.$message({ type: 'success', message: '新增成功!' })
      this.hdinput()
    },
    hdclc() {
      const dd = utils.table_to_book(this.$refs.tbl2, { sheet: 'ddd' })
      console.log(dd.Sheets.ddd)
      writeFile(dd, 'test1.xlsx')
    },
    hdinput(v) {
      v && this.terms.forEach(_ => _[2] === v[1] && v.forEach((j, k) => (_[k + 1] = j)))
      countdata(this.obj, this)
      this.$nextTick(() => {
        const lis = document.querySelectorAll('.set li');
        [...this.$refs.tbl2.querySelectorAll('tr')].forEach((_, i) => {
          lis[i].style.height = _.offsetHeight + 'px'
        })
      })
    }
  },
  mounted () {
    this.hdinput()
    fetch('/11.xls').then((e) => e.arrayBuffer()).then(res => {
      const { SheetNames, Sheets } = read(res, { type: 'buffer' }) // 以二进制流方式读取得到整份excel表格对象
      this.obj1 = hdexcel(Sheets[SheetNames[0]])
      this.hdinput()
    })
  }
}
</script>

<style scoped lang="scss">
.set {
  width: 122px;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  overflow: hidden;
  li {
    border-bottom: 1px solid #000;
    box-sizing: border-box;
    justify-content: center;
    &.xj i+i {
      opacity: 0;
      pointer-events: none;
    }
  }
  i {
    font-size: 12px;
    width: 50px;
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
    &+i {
      background-color: #fef0f0;
      border-color: #fde2e2;
      color: #f56c6c;
      margin-left: 3.9px;
    }
  }
}
table {
  border-collapse:collapse;
  margin-right: 122px;
  .ttt {
    input {
      height: 36px;
      text-align: center;
      font-size: 20px;
    }
    td {
      height: 38px;
    }
    font-size: 20px;
    line-height: 36px;
  }
  .zj {
    background-color: #f0f9eb;
  }
  .xj {
    background-color: #f4f4f5;
  }
  .hj {
    background-color: #ecf5ff;
  }
  .bd {
    font-weight: bold;
    * {
      font-weight: bold;
    }
  }
  tr.thead td{
    background-color: #fafafa;
    text-align: center;
  }
  tr.title td:nth-child(1) input{
    text-align: center;
  }
  td {
    position: relative;
    padding: 1px 2.5px;
    border: 1px solid #000;
    text-align: center;
    box-sizing: border-box;
    height: 22px;
    width: 88px;
    &:nth-child(1), &:nth-child(5) {
      width: 56px;
    }
    &:nth-child(6) {
      width: 70px;
      text-align: right;
    }
    &:nth-child(8) {
      text-align: right;
    }
    &:nth-child(3) {
      width: 200px;
      text-align: left;
    }
    &:nth-child(4) {
      width: 401px;
      text-align: justify;
    }
    &:nth-child(7) {
      input {
        line-height: 19px;
        font-size: 14px;
        text-align: right;
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
  &.ledt input {
    color: #459ffc;
  }
}
.ecl {
  font-size: 14px;
  position: relative;
  justify-content: center;
}
.zx {
  height: 100%;
  width: 100%;
  .main {
    margin: 0 auto;
    width: 1170px;
  }
  .mbtns {
    margin: 5px 0;
    .el-checkbox {
      margin-left: 12px;
      ::v-deep {
        .el-checkbox__label {
          padding-left: 2px;
        }
      }
    }
  }
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
  .el-dialog__headerbtn {
    top: 2px;
  }
}
</style>

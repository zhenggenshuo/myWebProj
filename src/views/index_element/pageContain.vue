<template>
<section class="main_con">
    <div class="list_zone ">
      <div class="tab_con" >
          <div class="tab">
              <button  @click="tabChange(1)" :class="{current:tabId===1}">常用</button>
              <button  @click="tabChange(2)" :class="{current:tabId===2}">娱乐</button>
              <button  @click="tabChange(3)" :class="{current:tabId===3}">学习</button>
          </div>
      </div>
      <div id="grid" class="c6 ">
        <ol class="pageList" :class="{active:tabId===1}">
            <li v-for="(item,index) in dataList" :key='index'>
                <pageCard :paramsObj='item'
                          @editInfo="editInfo"
                          @delInfo="delInfo"
                          @getPicName="getPicName"
                ></pageCard>
            </li>
        </ol>
        <ol class="pageList" :class="{active:tabId===2}">
            <li v-for="(item,index) in dataList" :key='index'>
                <pageCard :paramsObj='item'
                          @editInfo="editInfo"
                          @delInfo="delInfo"
                          @getPicName="getPicName"
                ></pageCard>
            </li>
        </ol>
        <ol class="pageList" :class="{active:tabId===3}">
            <li v-for="(item,index) in dataList" :key='index'>
                <pageCard :paramsObj='item'
                          @editInfo="editInfo"
                          @delInfo="delInfo"
                          @getPicName="getPicName"
                ></pageCard>
            </li>
        </ol>
      </div>
    </div>
    <div class="overlay  " v-if="showPopup">
        <div class="popup" >
            <input type="text" name='title' v-model="currentData.title" autocomplete='off' placeholder="标题" autofocus >
            <input type="text" name='url'   v-model="currentData.url"   autocomplete='off' placeholder="网址" >
            <button @click="cancel">取消</button>
            <button @click="confirm(currentData)">添加</button>
        </div>
      </div>
  </section>
</template>
<script>
import pageCard from './pageCard'
export default {
  name: 'pageContain',
  components: { pageCard },
  props: {
    tab_index: {
      default: 0
    }
  },
  data () {
    return {
      tabId: 1,
      dataList: [],
      setLength: 24,
      currentData: {},
      showPopup: false
    }
  },
  created () {
    this.initialData(`myUrlList_${this.tabId}`)
  },
  mounted () { },
  activated () {},
  methods: {
    initialData (name) {
      // 从localStorage中读取
      const myUrlListStr = window.localStorage.getItem(name)
      // 读取初始值
      const initialDataList = window.myConfig.initialDataList
      const initialDataListLength = initialDataList.length
      let tempList = []
      // 如果本地没有存储过，则使用初始数据
      if (!myUrlListStr) {
        for (let i = 0; i < this.setLength - initialDataListLength; i++) {
          tempList.push({ id: initialDataListLength + i })
        }
        this.dataList = initialDataList.concat(tempList)
      } else {
        const myUrlList = JSON.parse(myUrlListStr)
        this.dataList = myUrlList
      }
    },
    tabChange (value) {
      this.tabId = value
      const name = `myUrlList_${value}`
      this.initialData(name)
    },
    editInfo (data) {
      // 直接=赋值是浅拷贝，数据会联动
      this.currentData = this.dataAssign(data)
      this.showPopup = true
    },
    cancel () {
      this.currentData = {}
      this.showPopup = false
    },
    confirm (data) {
      if (!data.title) {
        console.log('不能为空')
        return
      }
      this.dataList[data.id] = this.dataAssign(data)
      this.showPopup = false
      this.updatePage()
    },
    delInfo (data) {
      // this.dataList[data.id] = { id: data.id }
      // 上一行虽然能改，但是不会刷新数据，$set强制刷新
      this.$set(this.dataList, data.id, { id: data.id })
      this.updatePage()
    },
    getPicName (data, name) {
      // this.dataList[data.id].picName = name
      const item = this.dataAssign(data, name)
      this.$set(this.dataList, data.id, item)
      this.updatePage()
    },
    updatePage () {
      const name = `myUrlList_${this.tabId}`
      const dataListStr = JSON.stringify(this.dataList)
      window.localStorage.setItem(name, dataListStr)
    },
    dataAssign (data, name) {
      let tempObj = {
        id: data.id,
        dataId: data.id + 1,
        url: data.url,
        picName: name || data.picName,
        title: data.title
      }
      return tempObj
    }

  }

}
</script>
<style lang="less" scoped>
section.main_con {
    width: 100%;
    /*height: 100%;*/
    margin: auto;
    /*background-color: #d6e9c6;*/
    .list_zone{
      position: relative;
      width: 100%;
      height: calc(100% - 130px);
      overflow: hidden;
      .tab_con{
        height: 30px;
        .tab{
          margin: 0 auto;
          max-width: 1650px;
          width: calc(100% - 200px);
          button{
            float: left;
            height: 30px;
            width: 60px;
            // border: 1px;
            margin: 0 1px;
            outline: none;
            background:rgb(200, 197, 197);

          }
          .current{
            background-color: #fff;
            border-style: none;
            font: normal 16px/24px "Microsoft Yahei";
          }
        }
      }
      #grid{
        /*绝对定位会脱离文档流
        position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
        height: 100%;
        width: 100%;
        overflow: hidden;
        transition: left 400ms linear 0s;
        ol.pageList.active{
          display: block;
        }
        ol.pageList{
          display: none;
          list-style: outside none none;
          margin: 10px auto 10px;
          overflow: hidden;
          width: calc(100% - 200px);
          max-width: 1700px;
          height: 100%;
          &>li{
            float: left;
            height: 152px;
            min-width: 100px;
            width: calc(16.6% - 20px);

            transition: height 500ms linear;
            margin: 10px;
            position: relative;
            box-sizing: border-box;
            opacity: 1;
          }
          @media (max-width:1500px) {
            &>li{
              height: 120px;
            }
          }

          @media (max-width:1100px) {
            &>li{
              height: 90px;
            }
          }
          @media (max-height:800px) {
            &>li{
              height: 120px;
            }
          }
          @media (max-height:600px) {
            &>li{
              height: 90px;
            }
          }

        }
      }
    }

    .overlay{
          background: rgba(25,25,25,0.3) no-repeat repeat;
          position: fixed;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
          margin: auto;
          z-index: 100;
          .popup{
              position: fixed;
              margin: auto;
              top: 35%;
              left: 50%;
              transform: translate(-50%);
              width: 500px;
              padding: 10px;
              background: white url("../../assets/images/noise.png") repeat;
              border-color:rgb(154,159,164);
              box-shadow: rgba(0,0,0,0.85) 0 0 6px 0;
              z-index: 1000;
              input{
                  display: block;
                  margin: 20px 20px 3px;
                  padding: 1px 5px;
                  width: 90%;
                  height: 30px;
                  border: 0.5px solid grey;
              }
              button{
                width: 80px;
                height: 30px;
                margin: 15px 0 20px 20px;
                padding: 0px;
              }

      }

    }
}

</style>

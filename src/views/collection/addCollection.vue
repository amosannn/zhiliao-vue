<template style="background-color:#EEEEEE;">
    <div>
      <mu-appbar class="add-collection-bar" :title="barTitle">
        <mu-icon-button icon="arrow_back" slot="left" @click="goBack"/>
        <mu-flat-button color="white" label="完成" slot="right" @click="addCollection"/>
      </mu-appbar>

      <section class="add-collection-container">
        <mu-text-field class="add-collection-title" v-model="collectionName" hintText="请输入标题" fullWidth :underlineShow="false"/>
        <mu-text-field class="add-collection-content" v-model="collectionDesc" hintText="请输入收藏夹内容" :underlineShow="false" fullWidth multiLine :rows="5" /><br/>
      </section>

      <section>
      <span class="add-collection-word-count" :class="{'word-count-overflow-color' : isOverflow}" v-text="wordCount + ' / 256'"></span>
      </section>

      <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>
    </div>
</template>

<script>
	export default {
		name: "add-collection",
    data () {
      return {
        barTitle: '新建收藏夹',
        collectionName: '',
        collectionDesc: '',
        wordCount: 0,
        isOverflow: false,
        showAlert: false,
        alertText: ''
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      addCollection() {
        if (this.collectionName.length>0){
          if(this.isOverflow === true) {
            this.openToast('收藏夹描述字数超出上限！');
          } else {
            this.axios.post('http://127.0.0.1:8080/zhiliao/addCollection',{
              collectionName: this.collectionName,
              collectionDesc: this.collectionDesc,
            }).then( (response) => {
              if(response.data.code === '0000') {
                this.openToast('收藏夹创建成功！');
                this.$router.go(-1);
              } else {
                this.openToast('系统异常，问题发布失败！');
              }
            })
          }
        } else {
          this.openToast('还没输入收藏夹名称呢！');
        }
      },
      openToast (alertText) {
        this.alertText = alertText;
        this.showAlert = true;
        if (this.snackTimer) clearTimeout(this.snackTimer);
        this.snackTimer = setTimeout(() => { this.showAlert = false }, 2000);
      },
      hideToast () {
        this.showAlert = false;
        if (this.snackTimer) clearTimeout(this.snackTimer)
      },
    },
    watch: {
      collectionDesc: function (val) {
        this.wordCount = this.collectionDesc.length;
        // 字数超出上限，则字数统计处标红
        if (this.wordCount > 256) {
          this.isOverflow = true
        } else {
          this.isOverflow = false
        }
      }
    }
	}
</script>

<style lang="less" scoped>
  .add-collection-bar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .add-collection-container{
    margin-top: 1.5rem;
    max-height: calc(100vh - 4rem);
    overflow-y: scroll;
    padding: .2rem .5rem;
    .add-collection-content{
      /*max-height: 2rem;*/
    }
  }
  .add-collection-word-count{
    padding: .3rem .5rem;
    float: right;
    color: #9E9E9E;
  }
  .word-count-overflow-color{
    color: red;
  }
</style>

<style lang="less">

</style>

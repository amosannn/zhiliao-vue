<template>
  <div style="background-color:#EEEEEE;">
    <zhiliao></zhiliao>

    <section class="answer-container">
      <mu-card class="question-title">
        <section>
          <span class="question-title-text" @click="jumpToQuestion()">{{item.question.questionTitle}}</span>
          <span class="question-title-desc" v-html="item.question.questionContent"></span>
        </section>
      </mu-card>
      <mu-card class="answer-content">
        <mu-card-header :title="item.user.username" :subTitle="item.user.simpleDesc">
          <mu-avatar :src="item.user.avatarUrl" slot="avatar"/>
        </mu-card-header>

        <mu-card-text class="answer-content-text" v-html="item.answerContent"></mu-card-text>
        <section class="answer-content-others">
          <!--<vue-star animated="animated shake" color="#d32f2f">-->
            <!--&lt;!&ndash;<img slot="icon" src="../../assets/ic_thumb_up_white_24dp_1x.png" />&ndash;&gt;-->
            <!--<mu-icon style="position: relative"  slot="icon" value="thumb_up" />-->
            <!--&lt;!&ndash;<i slot="icon" class="fa fa-heart"></i>&ndash;&gt;-->
          <!--</vue-star>-->
          <span class="answer-content-others-text">
            发布于 {{item.createTime | dateFormat('YYYY-MM-DD HH:mm')}}<br>
            著作权归作者所有
          </span>

        </section>
        <!--<mu-card-media>-->
          <!--<img src="http://www.muse-ui.org/images/sun.jpg" />-->
        <!--</mu-card-media>-->
        <!--<mu-card-text>-->
          <!--散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。-->
          <!--调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。-->
          <!--似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，-->
          <!--找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！-->
        <!--</mu-card-text>-->
        <!--<mu-card-actions style="padding: .3rem .4rem .3rem .4rem">-->
          <!--<mu-radio v-model="value"  uncheckIcon="favorite_border" checkedIcon="favorite"/> <br/>-->
          <!--<mu-flat-button class="content-card-action" icon="thumb_up" :label="item.likedCount"/>-->
          <!--<mu-flat-button label="Action 2"/>-->

        <!--</mu-card-actions>-->
      </mu-card>
    </section>

    <mu-paper class="foot_nav" :zDepth="5">
      <div class="foot-nav-icon-box">
        <vue-star style="margin-left: -.3rem;margin-top: -.45rem;" animated="animated shake" color="#2196F3">
          <!--<img slot="icon" src="../../assets/ic_thumb_up_white_24dp_1x.png" />-->
          <mu-icon slot="icon" value="thumb_up" />
          <!--<i slot="icon" class="fa fa-heart"></i>-->
        </vue-star>
        <mu-icon-button class="foot-nav-icon" icon="chat_bubble_outline"/>
        <mu-icon-button class="foot-nav-icon" icon="star_border" @click="openCollection"></mu-icon-button>
        <mu-icon-button class="foot-nav-icon" icon="favorite_border"/>
      </div>
      <div class="foot-nav-text-box">
        <span class="foot-nav-text">评论</span>
        <span class="foot-nav-text">收藏</span>
        <span class="foot-nav-text">感谢</span>
      </div>
    </mu-paper>

    <!-- 收藏夹弹窗 -->
    <mu-dialog :open="collectionDialog" @close="closeCollection" title="选择收藏夹" scrollable>
      <mu-menu>
        <mu-menu-item :title="collection.collectionName" v-for="collection, index in collectionList" :key="index" @click="collectAnswer(collection.collectionId, item.answerId)"/>
      </mu-menu>
      <mu-flat-button primary label="关闭" @click="closeCollection" slot="actions"/>
    </mu-dialog>

    <!-- 取消收藏弹窗 -->
    <mu-dialog :open="uncollectDialog" title="你想取消收藏吗？" @close="closeUncollectDialog">
      <mu-flat-button slot="actions" @click="closeUncollectDialog" primary label="我不"/>
      <mu-flat-button slot="actions" primary @click="uncollectAnswer" label="当然"/>
    </mu-dialog>

    <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>

    <!--<zhiliao-foot-guide></zhiliao-foot-guide>-->
  </div>
</template>

<script>
  import zhiliao from '@/components/header/header.vue'
  import zhiliaoFootGuide from '@/components/footer/footGuide.vue'
  import { dateFormat } from 'vux'
  import VueStar from 'vue-star'
  import MuIcon from "muse-ui/src/icon/icon";
  export default {
    name: "answer",
    components: {
      MuIcon,
      zhiliao,
      zhiliaoFootGuide,
      VueStar
    },
    data () {
      return {
        item: null,
        collectionDialog: false,
        uncollectDialog: false,
        collectionList: [],
        canCollect: true,
        showAlert: false,
        alertText: ''
      }
    },
    mounted() {
      this.answerId = this.$route.params.answerId;
      // this.questionId = this.$route.params.questionId?this.$route.params.questionId:'';
      let url = "http://127.0.0.1:8080/zhiliao/answer/" + this.answerId;
      this.getData(url);

    },
    methods: {
      getData(val) {
        this.axios.get(val,{})
          .then( (response) => {
          if( response.data.code === '0000'){
            this.item = response.data.data.answer;
            this.questionId = this.item.question.questionId;
            console.log(this.item)
          }
        })
      },
      jumpToQuestion() {
        this.$router.push('/question/' + this.questionId)
      },
      // 打开收藏夹
      openCollection() {
        this.axios.get('http://127.0.0.1:8080/zhiliao/listCreatingCollection',{
          // page: page,
        }).then( (response) => {
          if( response.data.code === '0000'){
            this.collectionList = response.data.data.collectionList?response.data.data.collectionList:[];
          }
        });
        this.collectionDialog = true
      },
      closeCollection () {
        this.collectionDialog = false
      },
      // 判断是否已收藏某回答
      isCollected(collectionId, answerId) {
        this.axios.post('http://127.0.0.1:8080/zhiliao/collectionContainAnswer',{
          collectionId: collectionId,
          answerId: answerId
        }).then( (response) => {
          if(response.data.code === '0000') {
            if (response.data.data.collectStatus){
              console.log('进来 '+this.canCollect);
              this.canCollect = false;
              this.openToast('该收藏夹已包含该问题！');
            } else {
              // this.openToast('不包含，可以收藏哟～');
              this.canCollect = true;
            }
          }
        })
      },
      // 添加收藏夹
      collectAnswer(collectionId, answerId){
        console.log('判断前 --- '+this.canCollect);
        this.isCollected(collectionId, answerId);
        console.log('判断后 --- '+this.canCollect);
        if(this.canCollect) {
          this.axios.post('http://127.0.0.1:8080/zhiliao/collectAnswer',{
            collectionId: collectionId,
            answerId: answerId
          }).then( (response) => {
            if(response.data.code === '0000') {
              if(response.data.data.collectStatus){
                this.openToast('收藏成功！');
                this.collectionDialog = false;
              } else {
                this.openToast('系统异常，收藏失败！');
              }
            }
          })
        } else {
          this.uncollectDialog = true;
        }
      },
      closeUncollectDialog() {
        this.uncollectDialog = false
      },
      uncollectAnswer() {
        // this.isCollected(collectionId, answerId);
        console.log(this.canCollect)
        if(!this.canCollect) {
          this.axios.post('http://127.0.0.1:8080/zhiliao/uncollectAnswer', {
            collectionId: collectionId,
            answerId: answerId
          }).then((response) => {
            if (response.data.code === '0000') {
              if (response.data.data.status) {
                this.openToast('取消收藏成功！');
                this.uncollectDialog = false;
              } else {
                this.openToast('系统异常，取消收藏失败！');
              }
            }
          })
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
    filters: {
      dateFormat
    }
  }
</script>

<style lang="less" scoped>
  @import  '../../../node_modules/animate.css/animate.css';
  @import  '../../../node_modules/font-awesome/css/font-awesome.css';
  .answer-container{
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    height: calc(100vh - 2.5rem);
    overflow-y: scroll;
    .question-title{
      margin-bottom: .3rem;
      padding: .3rem .4rem .3rem .4rem;
      .question-title-text{
        font-size: 20px
      }
      .question-title-desc{
        font-size: 15px
      }
    }
    .answer-content{
      /*margin-bottom: .3rem;*/
      min-height: 10rem;
      .answer-content-text{
        padding: .3rem .4rem .3rem .4rem;
      }
      .answer-content-others{
        padding: .3rem .4rem 2.2rem .4rem;
        .answer-content-others-text{
          float: right;
          margin-right: .1rem;
          color: #9E9E9E;
        }
      }
    }
  }

  .foot_nav{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /*display: flex;*/
    .foot-nav-icon-box{
      height: 48px;
      z-index: 10;
      /*.foot-nav-icon-like{*/
        /*margin-left: -.3rem;*/
        /*margin-top: -.45rem;*/
      /*}*/
      .foot-nav-icon{
        float: right;
        position: relative;
      }
    }
    .foot-nav-text-box{
      height: 8px;
      text-align: right;
      font-size: 10px;
      .foot-nav-text{
        float: right;  width: 48px; text-align: center; margin-top: -13px
      }
    }
  }
</style>

<style lang="less">
  .answer-container{
    .answer-content{
      .mu-card-header-title{
        /*margin-top: 4px;*/
      }
    }
  }
  img {
    width: 100%;
    vertical-align: middle;
  }

</style>

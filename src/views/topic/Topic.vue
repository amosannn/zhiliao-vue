<template>
  <div>
    <div class="content">
      <div class="following-topic">
        <div class="header">
          <h2><i></i>&nbsp;&nbsp;已关注的话题动态</h2>
          <a href="#">共关注{{posts.length}}个话题</a>
        </div>
        <ul class="topic-list">
          <li v-for="post in posts">
            <span>{{post.topicName}}</span>
          </li>
          <li><a href="#">Web开发</a></li>
          <li><a href="#">程序员</a></li>
          <li><a href="#">操作系统</a></li>
          <li><a href="#">数据结构</a></li>
          <li><a href="#">Java</a></li>
          <li><a href="#">Web开发</a></li>
          <li><a href="#">程序员</a></li>
          <li><a href="#">操作系统</a></li>
          <li><a href="#">数据结构</a></li>
          <li><a href="#">Java</a></li>
        </ul>
      </div>

      <div class="recommend">
        <div class="header">
          <h3><span>知了</span></h3>
          <h4><a href="#" class="color259">热门排序</a><span> | </span><a href="#">时间排序</a></h4>
        </div>
        <div class="feed-list">
          <div class="feed-item">
            <div class="feed-body">
              <h2 class="feed-title">
                <a href="#">MacBook Pro适合深度学习吗？</a>
              </h2>
              <div class="feed-user-info">
                <a href="#">sunmonk</a>
                <span class="comma">，</span>
                <span>www.zhengsun.de 摄影工程师</span>
              </div>
              <div class="feed-content">
                先说为啥可以买mbp 13寸，因为真的非常轻！！！ 主要问题是！！！ 神经网络 训练，需要用到Nvidia显卡。但是显卡一直是 MbP 的大短板！！！！！主要不是N卡 太坑了！！！我也不想组装一台台式机了。那么只有外接显卡一个选择。看到 雕牌技嘉 Gigabyte AORUS…
                <a href="#">显示全部</a>
              </div>
              <div class="feed-meta">
                <a href="#"><span class="glyphicon glyphicon-plus"></span>&nbsp;关注问题</a>
                <a href="#"><span class="glyphicon glyphicon-leaf"></span>&nbsp;7条评论</a>
                <div class="hidden-part" style="display: none;">
                  <a href="#"><span class="glyphicon glyphicon-heart"></span>&nbsp;感谢</a>
                  <a href="#"><span class="glyphicon glyphicon-share-alt"></span>&nbsp;分享</a>
                  <a href="#"><span class="glyphicon glyphicon-bookmark"></span>&nbsp;收藏</a>
                  <a href="#"><span>•</span>&nbsp;举报</a>
                </div>
                <a href="#">作者保留权利</a>
              </div>
            </div>
            <div class="votebar">
              <button class="vote-up" clicked="false">26
                <i></i>
              </button>
              <button class="vote-down" clicked="false">
                <i></i>
              </button>
            </div>
          </div>

          <div class="feed-item">
            <div class="feed-body">
              <h2 class="feed-title">
                <a href="#">MacBook Pro适合深度学习吗？</a>
              </h2>
              <div class="feed-user-info">
                <a href="#">sunmonk</a>
                <span class="comma">，</span>
                <span>www.zhengsun.de 摄影工程师</span>
              </div>
              <div class="feed-content">
                先说为啥可以买mbp 13寸，因为真的非常轻！！！ 主要问题是！！！ 神经网络 训练，需要用到Nvidia显卡。但是显卡一直是 MbP 的大短板！！！！！主要不是N卡 太坑了！！！我也不想组装一台台式机了。那么只有外接显卡一个选择。看到 雕牌技嘉 Gigabyte AORUS…
                <a href="#">显示全部</a>
              </div>
              <div class="feed-meta">
                <a href="#"><span class="glyphicon glyphicon-plus"></span>&nbsp;关注问题</a>
                <a href="#"><span class="glyphicon glyphicon-leaf"></span>&nbsp;7条评论</a>
                <div class="hidden-part" style="display: none;">
                  <a href="#"><span class="glyphicon glyphicon-heart"></span>&nbsp;感谢</a>
                  <a href="#"><span class="glyphicon glyphicon-share-alt"></span>&nbsp;分享</a>
                  <a href="#"><span class="glyphicon glyphicon-bookmark"></span>&nbsp;收藏</a>
                  <a href="#"><span>•</span>&nbsp;举报</a>
                </div>
                <a href="#">作者保留权利</a>
              </div>
            </div>
            <div class="votebar">
              <button class="vote-up" clicked="false">26
                <i></i>
              </button>
              <button class="vote-down" clicked="false">
                <i></i>
              </button>
            </div>
          </div>

          <div class="feed-item">
            <div class="feed-body">
              <h2 class="feed-title">
                <a href="#">MacBook Pro适合深度学习吗？</a>
              </h2>
              <div class="feed-user-info">
                <a href="#">sunmonk</a>
                <span class="comma">，</span>
                <span>www.zhengsun.de 摄影工程师</span>
              </div>
              <div class="feed-content">
                先说为啥可以买mbp 13寸，因为真的非常轻！！！ 主要问题是！！！ 神经网络 训练，需要用到Nvidia显卡。但是显卡一直是 MbP 的大短板！！！！！主要不是N卡 太坑了！！！我也不想组装一台台式机了。那么只有外接显卡一个选择。看到 雕牌技嘉 Gigabyte AORUS…
                <a href="#">显示全部</a>
              </div>
              <div class="feed-meta">
                <a href="#"><span class="glyphicon glyphicon-plus"></span>&nbsp;关注问题</a>
                <a href="#"><span class="glyphicon glyphicon-leaf"></span>&nbsp;7条评论</a>
                <div class="hidden-part" style="display: none;">
                  <a href="#"><span class="glyphicon glyphicon-heart"></span>&nbsp;感谢</a>
                  <a href="#"><span class="glyphicon glyphicon-share-alt"></span>&nbsp;分享</a>
                  <a href="#"><span class="glyphicon glyphicon-bookmark"></span>&nbsp;收藏</a>
                  <a href="#"><span>•</span>&nbsp;举报</a>
                </div>
                <a href="#">作者保留权利</a>
              </div>
            </div>
            <div class="votebar">
              <button class="vote-up" clicked="false">26
                <i></i>
              </button>
              <button class="vote-down" clicked="false">
                <i></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="more-answer">
        <a href="#">更多</a>
      </div>
    </div>
    <div class="sidebar">
      <div class="topic-plaza">
        <a href="/topics">进入话题广场</a>
        <a href="/topics">来这里发现更多有趣话题</a>
      </div>
      <div class="other-topic">
        <h3>其他人关注的话题</h3>
        <ul>
          <li>
            <div class="topic-image">
              <!--<img src="@/assets/images/topic1.png">-->
            </div>
            <a href="#" class="topic-name">法律</a>
            <a href="#" class="follow-button"><i></i>关注</a>
          </li>
          <li>
            <div class="topic-image">
              <!--<img src="@/assets/images/topic2.png">-->
            </div>
            <a href="#" class="topic-name">财务</a>
            <a href="#" class="follow-button"><i></i>关注</a>
          </li>
          <li>
            <div class="topic-image">
              <!--<img src="@/assets/images/topic3.png">-->
            </div>
            <a href="#" class="topic-name">经济</a>
            <a href="#" class="follow-button"><i></i>关注</a>
          </li>
          <li>
            <div class="topic-image">
              <!--<img src="@/assets/images/topic4.png">-->
            </div>
            <a href="#" class="topic-name">美食</a>
            <a href="#" class="follow-button"><i></i>关注</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "topic",
    data () {
		  return {
        followTopics:{},
        posts: {},
        loading: false
      }
    },
    methods: {
      getData() {
        var self = this
        this.$http({
          url: 'http://127.0.0.1:8080/zhiliao/topic/listFollowingTopic',
          // type: 'json',
          method: 'get',
          // data: {
          //   page: 1,
          //   limit: 20
          // }
        }).then( (response) => {
          alert("11");
          if( response.data.code === '0000'){
            this.posts = response.data.data.followingTopic;
            this.loading = false;
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    beforeMount () {
      this.getData()
      this.loading = true
    }
	}
</script>

<style scoped>

</style>

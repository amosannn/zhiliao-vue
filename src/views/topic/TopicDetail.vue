<template>
  <div class="main">
    <div class="content">
      <div class="head">
        <img :src="topicInfo.img_url" :title="topicInfo.name">
        <div>
          <h3 id="topicId">{{topicInfo.id}}</h3>
          <ul>
            <div v-if="allQuestion">
              <li><router-link :to="{name: 'topic_detail', params: {id: topic.id}}">精华</router-link></li>
              <li class="active"><a href="${base}/topicDetail/${topic.topicId}?allQuestion=true">全部问题</a></li>
            </div>
            <div v-else>
              <li class="active"><a href="${base}/topicDetail/${topic.topicId}">精华</a></li>
              <li><a href="${base}/topicDetail/${topic.topicId}?allQuestion=true">全部问题</a></li>
            </div>
          </ul>
        </div>
      </div>
      <div class="body">
        <ul>
          <li v-if="allQuestion">
            <div class="item">
              <h4><a href="/question/${question.questionId}">${question.questionTitle}</a></h4>
              <a href="/question/${question.questionId}">查看回答</a>
              <a href="/question/${question.questionId}"><span> • </span>${question.followedCount} 个关注</a>
            </div>
            <div class="pagination">
              <div class="buttons">
                <a class="pre-page" href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=1">首页</a>
                <!-- 上一页处理 -->
                <!--<#if pageBean.curPage!=1>-->
                <!--<a class="pre-page" href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${pageBean.curPage-1}">上一页</a>-->
                <!--<#else>-->
                <!--<span>上一页</span>-->
                <!--</#if>-->

                <!--&lt;!&ndash; 中间页码 &ndash;&gt;-->
                <!--<#if pageBean.allPage<=6>-->
                <!--<#list 1..pageBean.allPage as i>-->
                <!--<a href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${i}">${i}</a>-->
                <!--</#list>-->
                <!--<#elseif pageBean.curPage<=3>-->
                <!--<#list 1..6 as i>-->
                <!--<a href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${i}">${i}</a>-->
                <!--</#list>-->
                <!--<#elseif pageBean.allPage - pageBean.curPage<=5>-->
                <!--<#list pageBean.allPage-5..pageBean.allPage as i>-->
                <!--<a href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${i}">${i}</a>-->
                <!--</#list>-->
                <!--<#else>-->
                <!--<#list pageBean.curPage-2..pageBean.curPage+3 as i>-->
                <!--<a href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${i}">${i}</a>-->
                <!--</#list>-->
                <!--</#if>-->

                <!--&lt;!&ndash; 下一页处理 &ndash;&gt;-->
                <!--<#if pageBean.curPage!=pageBean.allPage>-->
                <!--<a class="next-page" href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${pageBean.curPage+1}">下一页</a>-->
                <!--<#else>-->
                <!--<span>下一页</span>-->
                <!--</#if>-->
                <!--<a class="next-page" href="${base}/topicDetail/${topic.topicId}?allQuestion=true&page=${pageBean.allPage}">尾页</a>-->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar">
      <div class="topic-info">
        <div class="topic-meta">
          <button id="followTopicButton" class="follow" style="display:none;">关注话题</button>
          <button id="unfollowTopicButton" class="unfollow" style="display:none;">取消关注</button>
          <a href="#">${topic.followedCount}</a><span> 人关注了该话题</span>
        </div>
        <div class="topic-desc">
          <h4>描述</h4>
          <div>${topic.topicDesc}</div>
        </div>
      </div>
      <div class="footer">
        <a href="#">建议反馈</a>
        <span> • </span>
        <a href="#">联系我们</a>
        <div></div>
        <span>@ 2018 知了</span>
      </div>
    </div>
  </div>

</template>

<script>
	export default {
		name: "topic-detail",
    data () {
		  return {
		    topicInfo: {},
        loading: false,
        postId: ''
      }
    },
    methods: {
		  getData : function () {
        this.axios({
          url: "http://127.0.0.1:8080/zhiliao/topic/topicDetail",
          type: "post",
          data: {
            topicId: this.postId
          }
        }).then( (response) => {
          alert("11");
          if( response.data.code === '0000'){
            this.topicInfo = response.data.data.topicDetail;
            this.loading = false;
          }
        }).catch(function (error) {
          console.log(error)
        });
      }
    },
    beforeMount() {
      this.loading = true;
      this.getData();
    }
	}
</script>

<style scoped>

</style>

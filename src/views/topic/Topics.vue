<template>
    <div class="main">
		<div class="content">
			<div class="parent-topic">
				<div class="header">
					<h2><i></i>&nbsp;&nbsp;话题广场</h2>
				</div>
				<ul class="topic-list" id="root-topic">
						<li v-for="(baseTopic, index) in baseTopicList">
              <!--<a href="/topicDetail/{{baseTopic.topicId}}" data-id="{{baseTopic.topicId}}">{{baseTopic.topicName}}</a>-->
              {{baseTopic.topicName}}
            </li>
				</ul>
			</div>

			<!--<div class="son-topic" id="sonTopic">-->
				<!--<script id="sonTopicList" type="text/html">-->
					<!--<ul>-->
						<!--{{each topicList}}-->
							<!--<li>-->
								<!--<div class="topic-image">-->
									<!--<img src="{{$value.topicImage}}">-->
								<!--</div>-->
								<!--<div class="topic-info">-->
									<!--<a href="${base}/topicDetail/{{$value.topicId}}" class="topic-name">{{$value.topicName}}</a>-->
									<!--<div class="topic-desc">-->
										<!--{{$value.topicDesc}}-->
									<!--</div>-->
								<!--</div>-->
								<!--<a class="follow-button"><i></i>关注</a>-->
							<!--</li>-->
						<!--{{/each}}-->
					<!--</ul>-->
				<!--</script>-->
			<!--</div>-->

		</div>
		<div class="sidebar">
			<div class="sidebar-top">
				<h3>热门话题</h3>
				<ul>
					<li v-for="(hotTopic, index) in hotTopicList">
						<div class="topic-info">
							<!--<img src="{{hotTopic.topicImage}}">-->
              {{hotTopic.topicImage}}
							<div class="topic-name">
								<!--<a href="/topicDetail/{{hotTopic.topicId}}">{{hotTopic.topicName}}</a>-->
                {{hotTopic.topicName}}
								<div></div>
								<span>{{hotTopic.followedCount}}人关注</span>
							</div>
						</div>
					</li>
				</ul>
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
		name: "topics",
    data () {
      return {
        followTopics: {},
        hotTopicList: {},
        baseTopicList: {},
        loading: false
      };
    },
    methods: {
      getData() {
        var self = this
        this.$http({
          url: 'http://127.0.0.1:8080/zhiliao/topic/topics',
          // type: 'json',
          method: 'get',
          // data: {
          //   page: 1,
          //   limit: 20
          // }
        }).then( (response) => {
          alert("11");
          if( response.data.code === '0000'){
            this.hotTopicList = response.data.data.hotTopicList;
            this.baseTopicList = response.data.data.baseTopicList;
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

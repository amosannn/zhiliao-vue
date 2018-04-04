<template>
  <div>
    <mu-appbar :title="barTitle">
      <mu-icon-button v-show="isWriting" icon="close" slot="left" @click="goBack"/>
      <mu-flat-button v-show="isWriting" color="white" label="下一步" slot="right" @click="next"/>
      <mu-icon-button v-show="!isWriting" icon="arrow_back" slot="left" @click="backToWriting"/>
      <mu-icon-button v-show="!isWriting" icon="send" slot="right" @click="postQuestion"/>
    </mu-appbar>
    <section class="ask-container">
      <div style="padding: 0 15px" v-show="isWriting">
        <mu-text-field underlineFocusClass="ask-title-underline" class="ask-title" hintText="请输入标题" fullWidth v-model="questionTitle"/>
      </div>
      <quill-editor :options="editorOption" v-model="questionContent" v-show="isWriting"
                    ref="QuillEditor"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
      <div style="padding: 0 15px 0 5px" v-show="!isWriting">
        <mu-text-field v-model="questionTopics" hintText="添加相关话题" icon="search" errorText="话题之间请用逗号分隔" errorColor="#616161" fullWidth/>
      </div>
    </section>

    <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>
  </div>
</template>

<script>
  // import QEditor from '@/components/common/QEditor'
	export default {
		name: "ask",
    components:{
      // 'qeditor':QEditor,
    },
    data() {
      return {
        editorOption: {},
        inputErrorText: '',
        barTitle: '提问',
        isWriting: true,
        questionTitle: '',
        questionContent: '',
        questionTopics: '',
        showAlert: false,
        alertText: ''
      }
    },
    created() {
		  this.editorOption =
        {
          placeholder: '添加问题的补充说明...',
          modules: {
            toolbar: [
              ['bold'], ['italic'],
              [{'list': 'ordered'}], [{'list': 'bullet'}],
              ['link'], ['image']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            // imageDrop: true,
            // imageResize: {
            //   displayStyles: {
            //     backgroundColor: 'black',
            //     border: 'none',
            //     color: 'white'
            //   },
            //   modules: ['Resize', 'DisplaySize', 'Toolbar']
            // }
          }

        }
    },
    methods: {
      handleInputOverflow (isOverflow) {
        this.inputErrorText = isOverflow ? '字数超出上限！！' : ''
      },
      goBack(){
        this.$router.go(-1);
      },
      next(){
        if(this.questionTitle.length === 0) {
          this.openToast('标题不可为空');
        } else {
          this.isWriting = false;
          this.barTitle = '添加话题';
        }
      },
      backToWriting(){
        this.isWriting = true;
        this.barTitle = '提问';

      },
      postQuestion(){
        if(this.questionTopics.length === 0) {
          this.openToast('至少需要添加一个话题');
        } else {
          this.axios.post('http://127.0.0.1:8080/zhiliao/ask',{
            question: {
              questionTitle: this.questionTitle,
              questionContent: this.questionContent,
            },
            topicNames: this.questionTopics
          }).then( (response) => {
            if(response.data.code === '0000') {
              let questionId = response.data.data.questionId;
              this.$router.push('/question/' + questionId);
            } else {
              this.openToast('系统异常，问题发布失败！');
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
      onEditorChange({editor, html, text}) {
        this.questionContent=html;
        console.log(html)
      },
      onEditorFocus() {

      },
      onEditorReady() {

      },
      onEditorBlur() {

      },
    },
    computed: {
      editor() {
        return this.$refs.QuillEditor.quill
      }
    }
  }
</script>

<style lang="less" scoped>
  .ask-container{
    padding: .3rem;
    .ask-title{
      /*padding: 0 15px;*/
    }
    .ask-title-underline{
      color: #616161;
    }
  }

  .quill-editor{
    /*float: left;*/
    height: 100%;
    /*border: none;*/
  }
</style>

<style>
  .quill-editor:not(.bubble) .ql-container,
  .quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 500px;
    padding-bottom: 1rem;
    border: none;
  }
  .ql-toolbar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: right;
  }
</style>

<template>
  <div>
    <mu-appbar :title="barTitle">
      <mu-icon-button icon="close" slot="left" @click="goBack"/>
      <mu-icon-button icon="send" slot="right" @click="postAnswer"/>
    </mu-appbar>
    <section class="answer-container">
      <quill-editor :options="editorOption" v-model="answerContent"
                    ref="QuillEditor"
                    @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </section>

    <mu-snackbar v-if="showAlert" :message="alertText" action="确定" @actionClick="hideToast" @close="hideToast"/>
  </div>
</template>

<script>
export default {
  name: "answer-question",
  data() {
    return {
      editorOption: {},
      barTitle: '撰写回答',
      questionId: '',
      answerContent: '',
      showAlert: false,
      alertText: ''
    }
  },
  created() {
    this.editorOption =
      {
        placeholder: '写回答...',
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
  mounted() {
    this.questionId = this.$route.params.questionId;
  },
  methods: {
    goBack(){
      this.$router.go(-1);
    },
    postAnswer(){
      if(this.answerContent.length === 0) {
        this.openToast('你一个字都没打呢～');
      } else {
        this.axios.post('http://127.0.0.1:8080/zhiliao/answer',{
          answer: {
            questionId: this.questionId,
            answerContent: this.answerContent,
          },
        }).then( (response) => {
          if(response.data.code === '0000') {
            let answerId = response.data.data.answerId;
            this.$router.push('/answer/' + answerId);
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
  .answer-container{
    padding: .3rem;
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
    height: calc(100vh - 3rem);
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

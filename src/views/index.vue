<template>
<div>

</div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem, Search } from 'vux'
  const list = () => ['动态', '热门', '发现']

  export default {
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Search
    },
    data () {
      return {
        list2: list(),
        index: 0,
        demo2: '热门'
      }
    },
    methods: {

    }
  }
</script>

<style lang="less">

</style>

<template>
  <van-cell center 
    :title="name" 
    :label="`${author} - ${name}`" 
    >
    <template #right-icon>
        <van-icon name="play-circle-o" class="play-icon" @click="palyFn"/>
    </template>
  </van-cell>
</template>

<script>
export default {
    props:{
        name:String,
        author:String,
        id:Number,
    },
    methods: {
      palyFn(){
        this.$router.push({
          path:'/play',
          query:{
            id:this.id
          }
        })
      }
    }
}
</script>

<style scoped>
.van-cell{
  border-bottom: 1px solid lightgray;
}
.play-icon {
  font-size: 20px;
  margin-top: 12px;
}
</style>
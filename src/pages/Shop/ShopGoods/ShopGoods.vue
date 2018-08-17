<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good,index) in goods" :key="index"
              :class="{current:index === currentIndex}" @click="clickItem(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodUl">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods"
                  :key="index" @click="foodShow(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'


  export default {
    data(){
      return{
        tops:[],//左侧所有分类<li>组成的数组
        scrollY:0, //右侧列表滑动的y坐标
        food:{} //显示当前food的状态
      }
    },
    mounted(){
      this.$store.dispatch('getGoods',()=>{
        //利用$nextTick实现界面更新后再执行
        this.$nextTick(()=>{
          this._initTops()
          this._initScroll()

        })
      })

    },
    computed:{
      ...mapState(['goods']),

      currentIndex(){
       const {tops,scrollY} = this
       const index = tops.findIndex((top,index) =>scrollY>= top && scrollY < tops[index + 1])

        this._innitLeftScroll(index)
        return index
      }

    },
    methods:{
      _initTops(){
        const tops =[]
        let top = 0
        tops.push(top)
        const lis = this.$refs.foodUl.getElementsByClassName('food-list-hook')
        // const lis = this.$refs.foodUl.children
        // console.log(lis);
        Array.prototype.slice.call(lis).forEach(li =>{
          // console.log(li);
          top += li.clientHeight
          tops.push(top)
        })
        this.tops =tops
      },

      _initScroll(){
        this.leftScroll = new BScroll('.menu-wrapper',{
          click: true
        })
        this.rightScroll = new BScroll('.foods-wrapper',{
          probeType:1,  // 只有手指触摸滑动(一定距离)
          click: true
        })

        this.rightScroll.on('scroll',({x,y}) =>{
          // console.log('scroll', ({x, y}));
          this.scrollY = Math.abs(y)
        })

        this.rightScroll.on('scrollEnd',({x,y}) =>{
          // console.log('scrollEnd', ({x, y}));
          this.scrollY = Math.abs(y)
        })
      },

      _innitLeftScroll(index){
        if(this.leftScroll){
          //得到当前分类的<li>
          const li = this.$refs.foodUl.children[index]
          //左侧滚动到当前<li>(尽可能的在界面显示)
          this.leftScroll.scrollToElement(li,300)
        }
      },

      clickItem(index){
        const top = this.tops[index]
        this.scrollY = top
        // console.log(top);
        this.rightScroll.scrollTo(0,-top,300)
      },

      foodShow(food){
        this.food = food
        this.$refs.food.toggleShow()
      }
    },
    components:{
      CartControl,
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 230px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

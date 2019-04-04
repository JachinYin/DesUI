<template>
  <div>
    <div class="abs" style="margin-top: 10px">
      <div class="center_box" style="width: 100%; height: 100%">
        <!--<p><b>注意：</b>该实例无法在 Internet Explorer 9 及更早 IE 版本上工作。</p>-->
        <p>哎哟～404了～休息一下，玩玩这个游戏！ </p>
        <div>
        </div>
        <!--<p>鼠标移动到 div 元素上，查看过渡效果。</p>-->
      </div>
    </div>

    <!--<p>哎哟～404了～休息一下，玩玩这个游戏！ </p>-->
    <!--<embed width="800" height="800" align="L" allowscriptaccess="sameDomain" flashvars="width=600&amp;height=400"-->
             <!--scale="noborder" quality="high" wmode="transparent"-->
             <!--src="http://lusongsong.com/images/lusongsongzhuamao.swf” type=”application/x-shockwave-flash">-->

  </div>
</template>

<script>
  export default {
    name: "NotFound"
  }
</script>

<style scoped>
  .center_box div
  {
    /*width:100px;*/
    /*height:100px;*/
    width: 50%;
    height: 50%;
    position: absolute; /*使用abs，就一定要在其父类元素上使用positioned的元素*/
    margin: auto;
    left: 0;right: 0;bottom: 0;top: 0;
    background:black;
    transition-property: height, width, background, border-radius;
    transition-duration: 2s, 2s, 4s, 2s;
    text-align: center;
  }

  .center_box div:hover
  {
    width:250px;
    height: 250px;
    background:#f2f2f2;
    border-radius:50%;
  }
</style>

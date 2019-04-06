export const UPLOAD_MIXINS = {
  data: function () {
    return {
      photoType: 101,
      frontType: 201,
      reverseType: 202,
      tempType: 301,
      imgType: 0,
      isUpload: false,
    }
  },
  methods: {
    showUploadFileBox: function(type){
      this.imgType = type;
      this.isUpload = true;
    },
    closeUploadFileBox: function () {
      this.isUpload = false;
    }
  }
};

export const Pagination_Mixins = {
  data: function(){
    return{
      page:{
        currentPage: 1,  // 当前页
        pageSize: 6,        // 分页数
        total: 0,        // 总记录
      }
    }
  },
  computed:{
    index: function () {
      return (this.page.currentPage-1) * this.page.pageSize;
    },
    size: function () {
      return this.page.currentPage * this.page.pageSize;
    }
  },
  methods: {
    handleCurrentChange:function (val) {
      this.page.currentPage = val;
    }
  }
};

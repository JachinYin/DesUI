export const UPLOAD_MIXINS = {
  data: function () {
    return {
      isUpload: false,
    }
  },
  methods: {
    showUploadFileBox: function(){
      this.isUpload = true;
    },
    closeUploadFileBox: function () {
      this.isUpload = false;
    }
  }
};

export default {
  methods: {
    back: function () {
      this.$router.go(-1);
    },
    loadingStart: function () {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        mask: true,
        message: '加载中...',
      });
    },
  },
};

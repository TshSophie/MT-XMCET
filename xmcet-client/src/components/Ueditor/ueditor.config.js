import { getToken } from '@/utils/auth'
export default {
  UEDITOR_HOME_URL: `${process.env.BASE_URL}UEditor/`,
  // 编辑器不自动被内容撑高
  autoHeightEnabled: false,
  // 初始容器高度
  initialFrameHeight: 240,
  // 初始容器宽度
  initialFrameWidth: '100%',
  // 关闭自动保存
  enableAutoSave: false,
  // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
  serverUrl: process.env.VUE_APP_BASE_API + '/api/v1/common/upload/editor' + '?Authorization=' + getToken()
}

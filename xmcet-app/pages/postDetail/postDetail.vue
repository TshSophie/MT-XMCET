<template>
	<view class="article">
		<view class='header'>
			<view class='title'>
				{{article.title}}
			</view>
			<view class='header-bottom'>
				<view class='author'>
					{{article.authorName}}
				</view>
				<view class='date'>
					{{article.createTime}}
				</view>         
			</view>  
			<view class='from'>
				来源：{{article.copyfrom?article.copyfrom:'原创'}}
			</view>      
		</view>
		<view class='content'>
			<rich-text :nodes="article.content"></rich-text>
		</view>
		<view class='option'>
			<view>
				阅读 100
			</view>
			<view>
				<span>分享</span>
				<span>收藏</span>
				<span>赞</span>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: {
					id: 28,
					copyfrom: "",
					createTime: "2020-05-07 23:18:44",
					authorName: "小麦CET",
					title: "四级翻译高频词之文化类",
					content: `<p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">1.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">除夕</span> new year&#39;s eve</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">2.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">元旦</span> new year&#39;s day</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">3.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">燃放</span> set off</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">4.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">烟花</span> fireworks</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">5.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">爆竹</span> firecrackers</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">6.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">红包</span> red packet</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">7.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">春联</span> spring festival couplets</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">8.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">拜年</span> pay a new year call/visit</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">9.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">游行</span> parade</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">10.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">装扮</span> dress up</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">11.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">壮观</span> magnificent/glorious/spectacular</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">12.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">宏大</span> grand</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">13.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">坐落于</span> be located in</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">14.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">象征</span> symbolize/signify</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">15.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">京剧</span> Peking opera</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">16.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">木偶戏</span>puppet show</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">17.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">书法</span> calligraphy</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">18.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">瓷器</span> porcelain; china</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">19.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">武术</span> martial arts</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">20.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">阳历</span> Solar calendar</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">21.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">阴历</span> Lunar calendar</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">22.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">闰年</span> leap year</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">23.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">灯谜</span> lantern riddle</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">24.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">元宵节</span> lantern festival</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">25.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">端午节</span> dragon boat festival</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">26.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">清明节</span> tomb sweeping festival</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">27.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">中秋节</span> mid-autumn festival</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">28.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">泼水节</span> water-sprinkling festival</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">29.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">团圆饭</span> family reunion dinner</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">30.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">青铜器</span> bronze ware</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">31.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">节日气氛</span> festive atmosphere</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">32.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">文化交流</span> cultural interchange</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">33.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">法定假日</span> legal holiday</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">34.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">丝绸之路</span> the Silk Road</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">35.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">文化遗迹</span> cultural heritage</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">36.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">濒危物种</span> endangered species</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">37.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">大开眼界</span> broaden one<span style="font-family:宋体">’</span><span style="font-family:Calibri">s horizon</span></span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">38.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">中国美食</span> Chinese cuisine</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">39.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">烹饪方法</span> cooking technique</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">40.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">生态旅游</span> eco-tourism</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">41.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">主题公园</span> theme park</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">42.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">避暑胜地</span> summer resort</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">43.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">人文景观</span> human landscape</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">44.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">自然风光</span> natural scenery</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">45.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">旅游胜地</span> tourist attraction/spot</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">46.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">十二生肖</span> zodiac</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">47.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">自然保护区</span> nature reserve</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">48.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">旅游纪念品</span> tourist souvenir</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">49.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">春节联欢晚会</span> spring festival gala</span></p><p style="margin-left:28px"><span style="font-family:Calibri;font-size:14px">50.&nbsp;</span><span style=";font-family:宋体;font-size:14px"><span style="font-family:宋体">核心文化价值</span> core cultural value</span></p><p><span style=";font-family:宋体;font-size:14px"><br clear="all" style="page-break-before:always"/></span></p><p><br/></p>`
				}
			};
		},
		mounted() {
			// #ifndef  APP-PLUS || H5
			uni.showShareMenu({
				withShareTicket: true,
				title: "小麦CET《xx文章》",
				content: "ddddddddddddddddd",
				path: '/pages/postDetail/postDetail?id=' + 12
			})
			// #endif
			
		},
		methods: {
			handleShare() {
				 
			},
			handleBack() {
				uni.navigateBack({
					delta: 1
				});
			}

		},
	}
</script>

<style lang="less">
.article{
  background: white;
  width: 100%;
  border-radius: 10rpx;
	.header{
		padding:30rpx;
		font-size:40rpx;
		display:flex;
		flex-direction:column;  
		.header-bottom{
			margin-top:10rpx;
			font-size:25rpx;
			display:flex;
			display: -webkit-flex; 
			flex-direction:row;
			color:rgb(99,87,87);
			.date{
				margin-left:20rpx;
			}
		}
		.from{
			margin-top:10rpx;
			font-size:25rpx;
			display:flex;
			display: -webkit-flex; 
			flex-direction:row;
			color:rgb(99,87,87);
		}
	}
	
	.content{
		font-size:35rpx;
	}
}
</style>

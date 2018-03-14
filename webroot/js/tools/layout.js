/*
*   layout.js
*	version: 2.1
*	author: nemo
* 	contributors: k、o、m
*	update time: 2019-9-3
*/

( function ( global, fun ) {
	// created layout function.
	// 创建 layout 方法
	// global variable layout.
	// 形成全局下私有方法 layout
	fun( global, function () { } );

} )( typeof window !== "undefined" ? window : this, function ( W, F ) {
	W.onclick = function () {
		if ( window.unreadtip && window.unreadtip.style.display == 'block' ) {
			window.unreadtip.style.display = 'none';
			if ( window.displayLock ) {//站内信锁
				window.displayLock = false;
			}
		}
	}
	// page from component
	// 页面组件
	F.component = {
		header: {
			model: {
				id: 'header',
				className: 'f-hd',
				pc: [
					{ id: 'pcIndex', href: global.host.root, title: '首页', innerHTML: '首页' },
					{
						id: 'pcMyHacker', href: 'javascript: void(0);', title: '我是行长', innerHTML: '我是行长<i class="ml5 fa fa-angle-down"></i>', sub: [
							{ id: 'pcQ', href: global.host.root + 'q/', title: '行长圈', innerHTML: '行长圈', className: 'icon_new' },
							{ id: 'pcTasklist', href: global.host.root + 'task/', title: '提交漏洞', innerHTML: '提交漏洞' },
							{ id: 'pcEvents', href: global.host.root + 'events/', title: '赛事中心', innerHTML: '赛事中心<i></i>', className: 'icon_new' },
							{ id: 'skills', href:(global.host.root === 'https://www.bugbank.cn/'? 'https://skills.bugbank.cn': (global.host.root + 'skills.html')), title: '技能树', innerHTML: '技能树<i></i>', className: 'icon_new', target:'_blank'},
							{ id: 'pcMall', href: global.host.root + 'mall/', title: '商城', innerHTML: '商城' },
							{ id: 'pcRanks', href: global.host.root + 'ranks.html', title: '排行榜', innerHTML: '排行榜' }
						]
					},
					{ id: 'pcMyCompany', href: global.host.root + 'company.html', title: '我是厂商', innerHTML: '我是厂商' },
				],
				phone: [
					{ id: 'phoneIndex', href: global.host.root, title: '首页', innerHTML: '首页' },
					{
						id: 'phoneMyHacker', href: 'javascript: void(0);', title: '我是行长', innerHTML: '我是行长<i class="fa fa-chevron-up"></i>', className: 'sub-drop-down',
						sub: [
							{ id: 'phoneQ', href: global.host.root + 'q/', title: '行长圈', innerHTML: '行长圈' },
							{ id: 'phoneTasklist', href: global.host.root + 'task/', title: '提交漏洞', innerHTML: '提交漏洞' },
							{ id: 'phoneEvents', href: global.host.root + 'events/', title: '赛事中心', innerHTML: '赛事中心<i></i>', className: 'icon_new' },
							{ id: 'skills', href:(global.host.root === 'https://www.bugbank.cn/'? 'https://skills.bugbank.cn': (global.host.root + 'skills.html')), title: '技能树', innerHTML: '技能树<i></i>', className: 'icon_new', target:'_blank'},
							{ id: 'phoneMall', href: global.host.root + 'mall/', title: '商城', innerHTML: '商城' },
							{ id: 'phoneRanks', href: global.host.root + 'ranks.html', title: '排行榜', innerHTML: '排行榜' }
						]
					},
					{ id: 'phoneMyCompany', href: global.host.root + 'company.html', title: '我是厂商', innerHTML: '我是厂商' },
				],
				html: function () {
					// create fragment element, element is join parent node in last.
					// 创建碎片标签，标签加入在父节标签后
					var o = document.createDocumentFragment();

					var a = $.tag( 'nav', 'm-nav' );

					// logo
					a.append( 'a', {
						id: 'logo',
						className: 'logo',
						href: global.host.root,
						title: '漏洞银行(BUGBANK)'
					} );

					// menu
					var cb = a.append( 'ul', 'menu menu-left' );
					for ( var i = 0; i < this.pc.length; i++ ) {
						var li = cb.append( 'li', 'menu-item' );
						var link = li.append( 'a', { id: this.pc[i].id, className: 'menu-item-a ' + ( this.pc[i].className || '' ), href: this.pc[i].href, title: this.pc[i].title, innerHTML: this.pc[i].innerHTML, target: (this.pc[i].target || '_self') } );
						if ( this.pc[i].sub && this.pc[i].sub.length > 0 ) {
							var sub = this.pc[i].sub;
							var ul = li.append( 'div', 'sub-menu card-arrow' ).append( 'ul', 'sub-menu-list' );
							for ( var j = 0; j < sub.length; j++ ) {
								ul.append( 'li', 'sub-menu-item' ).append( 'a', { id: sub[j].id, className: 'sub-menu-item-a ' + ( sub[j].className || '' ), href: sub[j].href, title: sub[j].title, innerHTML: sub[j].innerHTML, target: ( sub[j].target || '_self') } );
							}
						}
					}

					// tool
					var cc = a.append( 'ul', 'menu menu-right' );
					cc.append( 'li', 'menu-item e-search' ).append( 'a', { href: global.host.root + 'search.html', title: '搜索', target: '_blank' } ).append( 'i', 'fa fa-search' );



					o.appendChild( a );
					// phone
					// 手机版菜单
					var bb = $.tag( 'nav', { className: 'm-nav-modile' } );
					var da = bb.append( 'div', 'm-nav-header clear' );
					var menu_l = da.append( 'div', 'e-menuBtn fl' );
					var phoneBtn = menu_l.append( 'div', {
						id: 'phoneBtn',
						className: 'listBtn',
						innerHTML: '<i></i><i></i><i></i>'
					} );

					menu_l.append( 'div', 'search' ).append( 'a', { className: 'arrow-right fa fa-search', title: '搜索', href: global.host.root + 'search.html' } );
					da.append( 'div', 'e-logo' ).append( 'a', {
						className: 'logo',
						href: global.host.root,
						title: '漏洞银行(BUGBANK)'
					} );

					var phoneMenu = bb.append( 'div', {
						id: 'phoneMenu',
						className: 'e-navList-3'
					} );
					phoneMenu.show = false;
					var navList = phoneMenu.append( 'ul', {
						id: 'globalnav',
						className: 'menu-left'
					} );
					for ( var i = 0; i < this.phone.length; i++ ) {
						var li = navList.append( 'li', 'menu-item' );
						li.append( 'a', { id: this.phone[i].id, className: 'menu-item-a ' + ( this.phone[i].className || '' ), href: this.phone[i].href, title: this.phone[i].title, innerHTML: this.phone[i].innerHTML, target: (this.phone[i].target || '_self' ) } );
						if ( this.phone[i].sub && this.phone[i].sub.length > 0 ) {
							var sub = this.phone[i].sub;
							var ul = li.append( 'ul', 'sub-menu-list' );
							//ul.style.display = 'none';
							for ( var j = 0; j < sub.length; j++ ) {
								ul.append( 'li', 'sub-menu-item' ).append( 'a', { id: sub[j].id, className: 'sub-menu-item-a ' + ( sub[j].className || '' ), href: sub[j].href, title: sub[j].title, innerHTML: sub[j].innerHTML, target: (sub[j].target || '_self') } );
							}
						}
					}
					o.appendChild( bb );

					return {
						o: o,
						callback: function () {
							// phone and pad add click event.
							// 手机和平板下添加点击事件
							phoneHeader();

							// judge if user is logged in.
							// 判断用户是否登录
							/* 未登录 */
							F.judge.out.header = {
								pc: function () {
									var l = cc.append( 'li', {
										id: 'topbarFun',
										className: 'menu-item e-in-out'
									} ).append( 'div', 'login' );
									l.append( 'a', {
										className: 'signIn',
										href: global.host.root + 'signin.html',
										title: '登录',
										innerHTML: '登录'
									} );
									l.append( 'a', {
										className: 'signUp btn btn-primary',
										href: global.host.root + 'signup.html',
										title: '注册',
										innerHTML: '注册'
									} );

									// search and head photo
									// 搜索和头像
									// Header('userName');
								},
								phone: function () {
									/*var dc = bb.append('div', 'navBtn');
									dc.append('a', {
										className: 'btn btn-primary',
										href: global.host.root + 'signup.html',
										title: '注册',
										innerHTML: '注册'
									});
									dc.append('a', {
										className: 'btn btn-default',
										href: global.host.root + 'signin.html',
										title: '登录',
										innerHTML: '登录'
									});*/

									da.append( 'div', 'e-link fr' ).append( 'a', {
										className: 'signup',
										href: global.host.root + 'signin.html',
										title: '登录',
										innerHTML: '登录'
									} );
								},
								dataList: function () {
									return false;
									if ( window.location.protocol != "file:" ) {
										$.ajax( {
											url: '/api/jc/counts',
											success: function ( data, type, xhr ) {
												if ( xhr.status == 200 ) {
													var s = data.activity ? '活动(' + 　data.activity + ')' : '活动';
													// 活动数量
													if ( pcActivities && phoneActivities ) {
														pcActivities.innerHTML = phoneActivities.innerHTML = s;
													} else {
														$( '#pcActivities' ).text( s );
														$( '#phoneActivities' ).text( s );
													}
												}
											},
											error: function ( xhr ) {
												console.log( xhr.responseJSON.err_msg );
											}
										} );
									}
								}
							};

							/* 已登录 */
							F.judge.in.header = {
								pc: function () {
									//提示气泡
									var unread = window.profile.unread;
									window.displayLock = false;//显示锁
									var news_item = cc.append( "li", "menu-item news" );
									var unreadItem = news_item.append( "a", {
										href: global.host.root + 'user/message.html',
										title: '消息',
										className: 'fa fa-bell-o ' + ( ( unread.apply > 0 || unread.msg > 0 ) ? 'unread' : '' ),
										onclick: function ( e ) {
											e.stopPropagation();
											e.preventDefault();
											//unreadTip.style.display = "block";
											if ( !window.displayLock ) {
												unreadTip.style.display = "block";
												var unreadNums = window.profile.unread;
												if ( unreadNums.private ) {
													tab_follow.click();
												} else if ( unreadNums.task ) {
													tab_comments.click();
												} else {
													tab_notice.click();
												}
												window.displayLock = true;
											} else {
												unreadTip.style.display = "none";
												window.displayLock = false;
											}
										}
									} );
									var unread_cnt = unreadItem.append( 'span', {
										className: 'unread-nums'
									} )
									if ( window.profile && window.profile.unread ) {
										var unreadNums = window.profile.unread;
										if ( unreadNums.private + unreadNums.relation + unreadNums.task ) {
											unread_cnt.style.display = 'inline-block';
											unread_cnt.innerHTML = unreadNums.private + unreadNums.relation + unreadNums.task;
										}
									}

									//bind wechat 绑定微信
									if ( window.profile && !window.profile.isBindToWechat && !!!$.cookie( 'isClosWechatBanner' ) ) {
										var fixedbar = $( '.fixedbar' )[0];
										if ( document.body.clientWidth > 991 ) {
											fixedbar.style.height = '91px';
										} else {
											fixedbar.style.height = 'auto';
										}
										var wechat_banner = $.tag( 'div', {
											className: 'wechat-banner',
											id: 'wechat_banner'
										} );
										a.appendChild( wechat_banner );
										wechat_banner.append( 'a', {
											className: 'wechat-a',
											target: '_blank',
											href: '/user/inforwechat.html',
											innerHTML: '您尚未绑定微信，请绑定微信以更便捷地接收漏洞银行发出的消息'
										} );

										var wechat_i = wechat_banner.append( 'i', {
											innerHTML: "+",
											onclick: function () {
												wechat_banner.style.display = 'none';
												$.cookie( 'isClosWechatBanner', true, { expire: 1, path: '/' } );
												fixedbar.style.height = '52px';
												var q_container = $( '#container .container' )[0];
												if ( q_container ) {
													q_container.style.marginTop = '50px';
												}
												var q_leftBlock = $( '.main .fixed' )[0];
												if ( q_leftBlock ) {
													q_leftBlock.style.top = '70px';
												}
											}
										} )
										var is_q = location.href.match( /\/q\// );
										if ( is_q && is_q.length ) {
											var q_container = $( '#container .container' )[0];
											var q_leftBlock = $( '.main .fixed' )[0];
											var q_leftBlock2 = $( '.main .fixed2' )[0];
											if ( q_container ) {
												q_container.style.marginTop = '89px';
											}
											if ( q_leftBlock ) {
												console.log( 1 )
												q_leftBlock.style.top = '613px';
											}
											if ( q_leftBlock2 ) {
												console.log( 2 )
												q_leftBlock2.style.top = '109px';
											}
										}
									} else {
										//wechat_banner.style.display = 'block'
									}

									var unreadTip = news_item.append( "div", {
										className: "unread-tip",
										id: "unreadtip",
										onclick: function ( e ) {
											e.stopPropagation();
										}
									} );
									var unread_info = unreadTip.append( "div", {
										className: "unread-info"
									} );
									var unread_tabs = unread_info.append( "div", {
										className: "unread-tabs"
									} )
									var tab_notice = unread_tabs.append( "button", {
										className: "unread-tab notice",
										id: 'notice_tab',
										//title:"公告",
										innerHTML: '<span>社交动态</span>',
										onclick: function () {
											if ( $( this ).hasClass( 'current' ) ) {
												return;
											} else {
												//$(this).find('img').attr("src","/img/global_icon/notice2.png");
												//$("#comments_thanks_tab img").attr("src","/img/global_icon/comment_agree.png");
												//$("#follow_tab img").attr("src","/img/global_icon/follow.png");
												$( this ).siblings().removeClass( 'current' );
												$( this ).addClass( 'current' );
												getUnreadInfo( notice_content, 1 );
											}
										}
									} );
									var tab_comments = unread_tabs.append( "button", {
										className: "unread-tab comments-thanks",
										id: 'comments_thanks_tab',
										//title:"评论/点赞",
										innerHTML: '<span>任务动态</span>',
										onclick: function () {
											if ( $( this ).hasClass( 'current' ) ) {
												return;
											} else {
												//$(this).find('img').attr("src","/img/global_icon/comment_agree2.png");
												//$("#notice_tab img").attr("src","/img/global_icon/notice.png");
												//$("#follow_tab img").attr("src","/img/global_icon/follow.png");
												$( this ).siblings().removeClass( 'current' );
												$( this ).addClass( 'current' );
												getUnreadInfo( comment_thanks_content, 2 );
											}
										}
									} );
									var tab_follow = unread_tabs.append( "button", {
										className: "unread-tab following",
										id: 'follow_tab',
										//title:"关注",
										innerHTML: '<span>私信</span>',
										onclick: function () {
											if ( $( this ).hasClass( 'current' ) ) {
												return;
											} else {
												//$(this).find('img').attr("src","/img/global_icon/follow2.png");
												//$(" #comments_thanks_tab img").attr("src","/img/global_icon/comment_agree.png");
												//$("#notice_tab img").attr("src","/img/global_icon/notice.png");
												$( this ).siblings().removeClass( 'current' );
												$( this ).addClass( 'current' );
												getUnreadInfo( following_content, 0 );
											}
										}
									} );
									var scrollFoo = function ( self, tag ) {//滚动事件
										if ( self.scrollable ) {
											if ( self.clientHeight + self.scrollTop == self.scrollHeight ) {
												var page;
												var current = self.currentPage || 1;
												var total = self.totalPage || 1;
												if ( current < total ) {
													page = current + 1;
													getUnreadInfo( self, tag, page );
												} else {
													return
												}
											}
										} else {
											return
										}
									}

									var notice_info = unread_info.append( "div", {
										className: "unread-content-wrap",
									} );
									var notice_content = notice_info.append( 'div', {
										className: "unread-content notice",
										id: "notice_content",
										onscroll: function () {
											scrollFoo( this, 1 )
										}
									} )
									notice_info.append( 'div', {
										className: "scroll-bar",
										innerHTML: '<div class="scroll-slider" id="notice_scroll_slider"></div>'
									} )

									var comment_thanks_info = unread_info.append( "div", {
										className: "unread-content-wrap",
									} );
									var comment_thanks_content = comment_thanks_info.append( 'div', {
										className: "unread-content comment-thanks",
										id: "comment_thanks_content",
										onscroll: function () {
											scrollFoo( this, 2 )
										}
									} );
									comment_thanks_info.append( 'div', {
										className: "scroll-bar",
										id: 'scroll_bar',
										innerHTML: '<div class="scroll-slider" id="comment_scroll_slider"></div>'
									} )

									var following_info = unread_info.append( "div", {
										className: "unread-content-wrap",
									} );
									var following_content = following_info.append( 'div', {
										className: "unread-content following",
										id: "following_content",
										onscroll: function () {
											scrollFoo( this, 0 )
										}
									} )
									following_info.append( 'div', {
										className: "scroll-bar",
										innerHTML: '<div class="scroll-slider" id="follow_scroll_slider"></div>'
									} )

									unread_info.append( "div", {
										className: "unread-footor",
										innerHTML: '<a href="/user/message.html" target="_blank">查看全部</a>',
									} );
									var getUnreadInfo = function ( ele, tag, page ) {
										page = page || 1;
										ele.parentNode.style.display = 'block';
										$( ele.parentNode ).siblings( '.unread-content-wrap' ).css( 'display', 'none' );
										var itemList = $( '.unread-content', ele )[0];
										if ( !ele.innerHTML || page > 1 ) {
											if ( page === 1 ) {
												if ( !ele.innerHTML ) {
													var unread_nums = $( '.unread-nums' )[0];
													if ( tag === 1 ) {
														unread_nums.innerHTML = Number( unread_nums.innerHTML ) - Number( window.profile.unread.relation );
													} else if ( tag === 2 ) {
														unread_nums.innerHTML = Number( unread_nums.innerHTML ) - Number( window.profile.unread.task );
													}
													if ( Number( unread_nums.innerHTML ) === 0 ) {
														unread_nums.style.display = 'none'
													}
												}
												ele.loading = ele.append( 'div', 'loading' );
												ele.scrollable = true;
											} else {
												ele.loading2 = ele.append( 'div', 'loading2' );
												ele.scrollable = false;
												$( ele ).scrollTop( ele.scrollTop + 26 );//26为loading的高度
											}
											setTimeout( function () {
												$.ajax( {
													url: '/api/i/messages',
													type: 'GET',
													data: {
														page: page,
														status: 0,
														isModal: true,
														type: tag
													},
													beforeSend: function ( request ) {
														addHeader( request );
													},
													success: function ( data, textStatus, xhr ) {
														if ( xhr.status == 200 ) {
															ele.currentPage = data.page.current;
															ele.totalPage = Math.ceil( data.page.total / data.page.node );
															if ( data.data.length > 0 ) {
																$.each( data.data, function ( index, value ) {
																	var content_item = $.tag( 'a', {
																		className: "content-item",
																		target: "_blank",
																		href: value.new_link || ( '/user/messagedetail.html?rid=' + value.mid )
																	} );
																	if ( tag === 0 ) {
																		content_item.onclick = function () {
																			const readedClassName = 'readed-item';
																			if ( this.className.indexOf( readedClassName ) >= 0 ) {
																				return;
																			}

																			//判断未读私信显示逻辑
																			if ( Number( unread_nums.innerHTML ) - 1 >= 0 ) {
																				unread_nums.innerHTML = Number( unread_nums.innerHTML ) - 1;
																			}
																			if ( Number( unread_nums.innerHTML ) <= 0 ) {
																				unread_nums.style.display = 'none';
																			}
																			this.classList.add( readedClassName );
																		}
																	}
																	content_item.innerHTML = value.new_content || value.title;
																	ele.appendChild( content_item );
																} )

																//滚动事件
																var barSelector = $( ele ).siblings( '.scroll-bar' );
																var sliderSelector = barSelector.find( '.scroll-slider' );
																barSelector[0].style.display = 'block';
																new ScrollBar( {
																	contSelector: $( ele ),//滚动条内容选择器
																	barSelector: barSelector,//滚动条选择器
																	sliderSelector: sliderSelector, //滚动滑块选择器
																	callback: function () {
																		scrollFoo( ele, tag )
																	}
																} )
															} else {
																var null_content = $.tag( 'span', 'null-content' );
																if ( tag === 1 ) {
																	null_content.innerHTML = '社交动态会出现在这里';
																} else if ( tag === 2 ) {
																	null_content.innerHTML = '任务相关动态会出现在这里';
																} else if ( tag === 0 ) {
																	null_content.innerHTML = '未读私信会出现在这里';
																}
																ele.appendChild( null_content );
															}
														}
													},
													error: function ( xhr, textStatus, errorThrown ) {
														tips.show( { text: '获取用户信息失败' } );
													},
													complete: function () {
														//minWindowHeight();
														if ( ele.loading ) {
															ele.removeChild( ele.loading );
															delete ele.loading;
														} else if ( ele.loading2 ) {
															ele.scrollable = true;
															ele.removeChild( ele.loading2 );
															delete ele.loading2;
														}
													}
												} );
											}, 500 )
										} else if ( !ele.innerHTML && page === 1 ) {
											var unread_nums = $( '.unread-nums' )[0];
											if ( tag === 1 ) {
												unread_nums.innerHTML = Number( unread_nums.innerHTML ) - Number( window.profile.unread.relation );
											} else if ( tag === 2 ) {
												unread_nums.innerHTML = Number( unread_nums.innerHTML ) - Number( window.profile.unread.task );
											}
										}
									}





									/*	unread_info.append("a",{
											href: global.host.root + 'user/message.html',
											innerHTML:"您有" + (unread.notice||0) + "条未读公告，请注意查看"
										});
										unread_info.append("i",{
											className:"fa fa-close",
											onclick:function(){
												unreadTip.style.display = "none";
											}
										});*/




									var userName = cc.append( 'li', 'menu-item' );
									// head photo to trigger is hover. 
									// 头像触发方式是【hover】
									userName.setAttribute( 'trigger-type', 'hover' );
									userName.append( 'a', {
										id: 'userName',
										className: 'name_new',//unread . add "unread" is tips info logo. 
										href: global.host.root + 'user'
									} );

									// search and head photo
									// 搜索和头像
									Header( 'userName' );
									// card info
									// 卡片信息
									loged( 'userName' );

									var btn = cc.append( 'li', 'menu-item e-but' );
									var buta = btn.append( 'a', {
										// href: global.host.hacker + window.profile.name + '/blog/publish',
										href: 'javascript: void(0);',
										className: 'submit',
										id: 'pcNote'
									} );
									var butt = buta.append( 'span', {
										className: 'btn btn-primary',
										title: '提交',
										innerHTML: '<i class="fa fa-paper-plane mr5"></i>提交'
									} );
									var numList = [
										{ title: '发表Tips', className: 'publish', href: global.host.root + 'q/', innerHTML: '<i></i>发表Tips' },
										// {title: '提问题', className: 'problem', href: global.host.root + 'pwn/qa/?q=1', innerHTML: '<i></i>提问题'},
										{ title: '提交漏洞', className: 'pushBug', href: global.host.root + 'task/', innerHTML: '<i></i>提交漏洞' }
										// {title: '提交PoC', className: 'pushPoC', href: global.host.root + 'poc/submit.html', innerHTML: '<i></i>提交PoC'}
									],
										sub = btn.append( 'div', 'but-sub' ),
										menu = sub.append( 'div', 'sub-menu card-arrow' );
									num = menu.append( 'ul', 'sub-menu-list' );
									for ( var i = 0, l = numList.length; i < l; i++ ) {
										num.append( 'li', 'sub-menu-item' ).append( 'a', {
											className: 'sub-menu-item-a ' + numList[i].className,
											title: numList[i].title,
											href: numList[i].href,
											innerHTML: numList[i].innerHTML,
											target: '_blank'
										} );
									}

									$( [buta, sub] ).mouseover( function ( e ) {
										$.breakEvent( e );
										menu.style.display = 'block';
										clearTimeout( window.timer );
									} ).mouseout( function ( e ) {
										window.timer = setTimeout( function () {
											menu.style.display = 'none';
										}, 200 );
									} );

									// 点击下拉框
									// dropBox(butt, num);
								},
								phone: function () {
									/*var dc = bb.append('div', 'navSubmit');
									dc.append('a', {
										id: 'phoneNote',
										className: 'btn btn-primary',
										href: global.host.hacker + window.profile.name + '/blog/publish',
										title: '写笔记',
										innerHTML: '写笔记'
									});
									dc.append('a', {
										className: 'btn btn-default',
										href: 'javascript:logout();',
										title: '退出',
										innerHTML: '退出'
									});*/
									/*var fixedbar = $('.fixedbar')[0];
									fixedbar.style.height = 'auto';*/
									da.append( 'div', {
										id: 'userNameModile',
										className: 'name_new unread'
									} );

									// search and head photo
									// 搜索和头像
									Header( 'userNameModile' );
									// card info
									// 卡片信息
									loged( 'userNameModile' );
								},
								dataList: function () {
									// 活动数量
									// var a = window.profile.activity_cnt? '活动(' +　window.profile.activity_cnt + ')' : '活动';
									// if (pcActivities && phoneActivities) {
									// 	pcActivities.innerHTML = phoneActivities.innerHTML = a;
									// } else {
									// 	$('#pcActivities').text(a);
									// 	$('#phoneActivities').text(a);
									// }

									// 在提交漏洞按钮添加企业数量
									var b = phoneTasklist.innerHTML = '提交漏洞';
									if ( pcTasklist && phoneTasklist ) {
										pcTasklist.innerHTML = phoneTasklist.innerHTML = b;
									} else {
										$( '#pcTasklist' ).text( b );
										$( '#phoneTasklist' ).text( b );
									}
								}
							};
						}
					};
				}
			},
			// 登录等页面
			simple: {
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'signtop' );
					o.appendChild( a );
					a.append( 'div', 'container' ).append( 'a', { className: 'logo', href: global.host.root, title: '漏洞银行(BUGBANK)' } ).append( 'img', { src: global.host.root + '/img/header_logo.png', alt: '漏洞银行(BUGBANK)' } );
					return o;
				}
			},
			// 行长叠报
			info: {
				id: 'header',
				className: 'header',
				pc: [
					{ id: 'pcIndex', href: global.host.root, title: '首页', innerHTML: '首 页' },
					{ id: 'pcInfo', href: global.host.root + 'info/', title: '行长叠报', innerHTML: '行长叠报<i></i>', className: 'icon_new' },
					{
						id: 'pcMyHacker', href: 'javascript: void(0);', title: '我是白帽', innerHTML: '我是白帽<i class="ml5 fa fa-angle-down"></i>', sub: [
							{ id: 'pcPwn', href: global.host.root + 'pwn/qa/', title: '行长社区', innerHTML: '行长社区<i></i>', className: 'icon_new' },
							{ id: 'pcTasklist', href: global.host.root + 'task/', title: '提交漏洞', innerHTML: '提交漏洞' },
							// {id: 'pcToolwiki', href: global.host.root + 'toolwiki/', title: '工具百科', innerHTML: '工具百科'},
							{ id: 'pcMall', href: global.host.root + 'mall/', title: '商城', innerHTML: '商城' },
							{ id: 'pcFame', href: global.host.root + 'fame/', title: '名人堂', innerHTML: '名人堂' },
							{ id: 'pcActivities', href: global.host.root + 'activities/', title: '活动', innerHTML: '活动' },
							{ id: 'pcRanks', href: global.host.root + 'ranks.html', title: '排行榜', innerHTML: '排行榜' }
						]
					},
					{ id: 'pcMyCompany', href: global.host.root + 'company.html', title: '我是厂商', innerHTML: '我是厂商' },
					// {id: 'pcSearcher', href: global.host.root + 's/', title: '行长搜索', innerHTML: '行长搜索<i></i>', className: 'hot-gif'}
				],
				phone: [
					{ id: 'phoneIndex', href: global.host.root, title: '首页', innerHTML: '首页' },
					{ id: 'phoneInfo', href: global.host.root + 'info/', title: '行长叠报', innerHTML: '行长叠报<i></i>', className: 'icon_new' },
					{
						id: 'phoneMyHacker', href: 'javascript: void(0);', title: '我是白帽', innerHTML: '我是白帽<i class="fa fa-chevron-down"></i>', className: 'sub-drop-down',
						sub: [
							{ id: 'phonePwn', href: global.host.root + 'pwn/qa/', title: '行长社区', innerHTML: '行长社区<i></i>', className: 'icon_new' },
							{ id: 'phoneTasklist', href: global.host.root + 'task/', title: '提交漏洞', innerHTML: '提交漏洞' },
							// {id: 'phoneToolwiki', href: global.host.root + 'toolwiki/', title: '工具百科', innerHTML: '工具百科'},
							{ id: 'phoneMall', href: global.host.root + 'mall/', title: '商城', innerHTML: '商城' },
							{ id: 'phoneFame', href: global.host.root + 'fame/', title: '名人堂', innerHTML: '名人堂' },
							{ id: 'phoneActivities', href: global.host.root + 'activities/', title: '活动', innerHTML: '活动' },
							{ id: 'phoneRanks', href: global.host.root + 'ranks.html', title: '排行榜', innerHTML: '排行榜' }
						]
					},
					{ id: 'phoneMyCompany', href: global.host.root + 'company.html', title: '我是厂商', innerHTML: '我是厂商' },
					// {id: 'phoneSearcher', href: global.host.root + 's/', title: '行长搜索', innerHTML: '行长搜索<i></i>', className: 'hot-gif'}
				],
				html: function () {
					// create fragment element, element is join parent node in last.
					// 创建碎片标签，标签加入在父节标签后
					var o = document.createDocumentFragment();

					var a = $.tag( 'nav', 'bottombar' );
					o.appendChild( a );
					var ba = a.append( 'div', 'container' );

					var pCa = ba.append( 'div', 'phoneCa' );
					pCa.append( 'a', {
						id: 'backOff'
					} );
					pCa.append( 'a', {
						id: 'logo',
						className: 'bottombar-left',
						href: global.host.root + 'info/',
						title: '漏洞银行(BUGBANK) | 行长叠报'
					} ).append( 'img', {
						src: global.host.root + 'img/info_logo.png',
						alt: '漏洞银行(BUGBANK) | 行长叠报'
					} );

					// logo
					var ca = ba.append( 'a', {
						id: 'logo',
						className: 'bottombar-left',
						href: global.host.root,
						title: '漏洞银行(BUGBANK)'
					} ).append( 'img', {
						src: global.host.root + 'img/header_logo.png',
						alt: '漏洞银行(BUGBANK)'
					} );
					ca.setAttribute( 'onerror', 'onerror=null;src=\'' + global.host.root + 'img/error.jpg\'' );

					// menu
					var cb = ba.append( 'ul', {
						id: 'topMenu',
						className: 'bottombar-right'
					} );
					for ( var i = 0; i < this.pc.length; i++ ) {
						var li = cb.append( 'li', 'bottombar-right-item' );
						var link = li.append( 'a', { id: this.pc[i].id, className: 'bottombar-right-item-a ' + ( this.pc[i].className || '' ), href: this.pc[i].href, title: this.pc[i].title, innerHTML: this.pc[i].innerHTML } );
						if ( this.pc[i].sub && this.pc[i].sub.length > 0 ) {
							var sub = this.pc[i].sub;
							var ul = li.append( 'div', 'sub-menu' ).append( 'ul', 'sub-menu-list' );
							for ( var j = 0; j < sub.length; j++ ) {
								ul.append( 'li', 'sub-menu-item' ).append( 'a', { id: sub[j].id, className: 'sub-menu-item-a ' + ( sub[j].className || '' ), href: sub[j].href, title: sub[j].title, innerHTML: sub[j].innerHTML } );
							}

							// 点击下拉框
							// dropBox(link, ul.parentNode);
						}
					}

					// tool
					var cc = ba.append( 'ul', 'topbar-right' );
					cc.append( 'li', { className: 'menuBtn', id: 'phoneBtn' } ).append( 'div', { className: 'listBtn', innerHTML: '<i></i><i></i><i></i>' } );
					cc.append( 'li', 'search' ).append( 'a', { href: global.host.root + 'search.html', title: '搜索', target: '_blank' } ).append( 'i', 'fa fa-search' );

					// phone
					// 手机版菜单
					var bb = a.append( 'div', { id: 'phoneMenu', className: 'navbar-collapse' } );
					var da = bb.append( 'div', { id: 'search-phone', className: 'search' } ).append( 'div', 'fixed' );
					da.append( 'span', 'arrow-right' ).append( 'i', 'fa fa-search' );
					da.append( 'span', { id: 'phoneSearch', className: 'arrow-right' } ).append( 'i', 'fa fa-arrow-right' );
					da.append( 'input', {
						placeholder: '搜索',
						href: global.host.root + 'search.html'
					} );
					var db = bb.append( 'div', 'navList' ).append( 'ul', {
						id: 'globalnav',
						className: 'nav navbar-nav'
					} );
					for ( var i = 0; i < this.phone.length; i++ ) {
						var li = db.append( 'li' );
						li.append( 'a', { id: this.phone[i].id, className: this.phone[i].className || '', href: this.phone[i].href, title: this.phone[i].title, innerHTML: this.phone[i].innerHTML, target: '_self' } );
						if ( this.phone[i].sub && this.phone[i].sub.length > 0 ) {
							var sub = this.phone[i].sub;
							var ul = li.append( 'ul', 'sub-nav' );
							ul.style.display = 'none';
							for ( var j = 0; j < sub.length; j++ ) {
								ul.append( 'li' ).append( 'a', { id: sub[j].id, className: sub[j].className || '', href: sub[j].href, title: sub[j].title, innerHTML: sub[j].innerHTML, target: '_self' } );
							}
						}
					}

					return {
						o: o,
						callback: function () {
							// phone and pad add click event.
							// 手机和平板下添加点击事件
							phoneHeader();

							// judge if user is logged in.
							// 判断用户是否登录
							/* 未登录 */
							F.judge.out.header = {
								pc: function () {
									var l = cc.append( 'li', {
										id: 'topbarFun',
										className: 'login'
									} );
									l.append( 'a', {
										className: 'header-sig',
										href: global.host.root + 'signin.html',
										title: '登录',
										innerHTML: '登录'
									} );
									l.append( 'a', {
										className: 'header-reg',
										href: global.host.root + 'signup.html',
										title: '注册',
										innerHTML: '注册'
									} );

									// search and head photo
									// 搜索和头像
									Header();
								},
								phone: function () {
									var dc = bb.append( 'div', 'navBtn' );
									dc.append( 'a', {
										className: 'btn btn-primary',
										href: global.host.root + 'signup.html',
										title: '注册',
										innerHTML: '注册'
									} );
									dc.append( 'a', {
										className: 'btn btn-default',
										href: global.host.root + 'signin.html',
										title: '登录',
										innerHTML: '登录'
									} );
								},
								dataList: function () {
									if ( window.location.protocol != "file:" ) {
										$.ajax( {
											url: '/api/jc/counts',
											success: function ( data, type, xhr ) {
												if ( xhr.status == 200 ) {
													var s = data.activity ? '活动(' + 　data.activity + ')' : '活动';
													// 活动数量
													if ( pcActivities && phoneActivities ) {
														pcActivities.innerHTML = phoneActivities.innerHTML = s;
													} else {
														$( '#pcActivities' ).text( s );
														$( '#phoneActivities' ).text( s );
													}
												}
											},
											error: function ( xhr ) {
												console.log( xhr.responseJSON.err_msg );
											}
										} );
									}
								}
							};

							/* 已登录 */
							F.judge.in.header = {
								pc: function () {
									var btn = cc.append( 'li', 'but' );
									var buta = btn.append( 'a', {
										// href: global.host.hacker + window.profile.name + '/blog/publish',
										// href: 'javascript: void(0);',
										id: 'pcNote'
										// target: '_blank'
									} );
									var butt = buta.append( 'span', {
										className: 'btn btn-primary',
										title: '提交',
										innerHTML: '<i class="fa fa-paper-plane mr5"></i>提交'
									} );
									var numList = [
										{ title: '写笔记', className: 'publish', href: global.host.hacker + window.profile.name + '/blog/publish', innerHTML: '<i></i>写笔记' },
										{ title: '提问题', className: 'problem', href: global.host.root + 'pwn/qa/?q=1', innerHTML: '<i></i>提问题' },
										{ title: '提交漏洞', className: 'pushBug', href: global.host.root + 'task/', innerHTML: '<i></i>提交漏洞' }
										// {title: '提交PoC', className: 'pushPoC', href: global.host.root + 'poc/submit.html', innerHTML: '<i></i>提交PoC'}
									],
										num = btn.append( 'div', 'but-sub' ).append( 'ul', 'dropdown-menu b1g sub' );
									for ( var i = 0, l = numList.length; i < l; i++ ) {
										num.append( 'li' ).append( 'a', {
											className: numList[i].className,
											title: numList[i].title,
											href: numList[i].href,
											innerHTML: numList[i].innerHTML,
											target: '_blank'
										} );
									}

									// 点击下拉框
									// dropBox(butt, num);

									var userName = cc.append( 'li', 'userName' );
									// head photo to trigger is hover. 
									// 头像触发方式是【hover】
									userName.setAttribute( 'trigger-type', 'hover' );
									userName.append( 'a', {
										id: 'userName',
										className: 'name_new',//unread . add "unread" is tips info logo. 
										href: global.host.root + 'user/'
									} );

									// search and head photo
									// 搜索和头像
									Header();
									// card info
									// 卡片信息
									loged();
								},
								phone: function () {
									var dc = bb.append( 'div', 'navSubmit' );
									dc.append( 'a', {
										id: 'phoneNote',
										className: 'btn btn-primary',
										href: global.host.hacker + window.profile.name + '/blog/publish',
										title: '写笔记',
										innerHTML: '写笔记'
									} );
									dc.append( 'a', {
										className: 'btn btn-default',
										href: 'javascript:logout();',
										title: '退出',
										innerHTML: '退出'
									} );
								},
								dataList: function () {
									// 活动数量
									var a = window.profile.activity_cnt ? '活动(' + 　window.profile.activity_cnt + ')' : '活动';
									if ( pcActivities && phoneActivities ) {
										pcActivities.innerHTML = phoneActivities.innerHTML = a;
									} else {
										$( '#pcActivities' ).text( a );
										$( '#phoneActivities' ).text( a );
									}

									// 在提交漏洞按钮添加企业数量
									var b = phoneTasklist.innerHTML = '提交漏洞' + '<i></i>';
									if ( pcTasklist && phoneTasklist ) {
										pcTasklist.innerHTML = phoneTasklist.innerHTML = b;
									} else {
										$( '#pcTasklist' ).text( b );
										$( '#phoneTasklist' ).text( b );
									}
								}
							};
						}
					};
				}
			},
		},
		banner: {
			// 白帽中心
			user: {
				nodeName: 'section',
				className: 'profile-header',
				html: function () {
					var o = document.createDocumentFragment();
					var bg = $.tag( 'div', { id: 'banner', className: 'profile-header__overlay' } ); o.appendChild( bg );
					var a = $.tag( 'div', { id: 'profile_header', className: 'profile-header__container' } );
					o.appendChild( a );

					var aa = a.append( 'div', { id: 'avatar', className: 'profile-header__picture' } );
					aa.append( 'img', { className: 'avatar xtralarge', alt: window.profile.name, title: window.profile.name, src: window.profile.avatar } );
					aa.append( 'div', 'team-header-photo-edit' );
					aa.append( 'div', 'btn edit-btn fa fa-pencil' );

					var b = a.append( 'div', 'profile-header__information__wrapper' );
					var ba = b.append( 'h1', 'profile-header__title' );
					ba.append( 'span', { className: 'title type-input', title: window.profile.name, innerHTML: window.profile.name } );
					var bb = ba.append( 'span', 'infor' );
					if ( !!window.profile.team && !!window.profile.team.name ) {
						bb.append( 'span', 'btn btn-primary btn-xs' ).append( 'a', { href: global.host.team + window.profile.team.name, title: window.profile.team.name, innerHTML: 'TEAM : ' + window.profile.team.name, target: '_blank' } );
					}
					if ( window.profile.team.creator ) {
						bb.append( 'span', { className: 'btn btn-success btn-xs', title: '队长', innerHTML: '队长' } );
					}
					// 字符串转译
					var tit = ( function ( s ) { var a = document.createElement( 'div' ); a.innerHTML = s; return a.innerText; } )( profile.signature );
					b.append( 'h2', 'profile-header__bio' ).append( 'span', { id: 'sign', className: 'bio type-input', title: tit, innerHTML: window.profile.signature } );
					b.append( 'div', 'profile-header__information' ).append( 'ul', { id: 'medal', className: 'profile-header__information__list edit' } );

					var c = $.tag( 'div', 'profile-header__btn' ); o.appendChild( c );
					c.append( 'a', { className: 'btn fa fa-home', href: global.host.root, title: '首页', innerHTML: '首页' } );
					c.append( 'span', { id: 'bannerEdit', className: 'W_icon icon_setskin', title: '背景设置' } );

					return {
						o: o,
						callback: function () {
							// must call /js/fun-user.js
							// 必须调用 fun-user.js 
							// user head photo
							// 用户头像
							funAvatar( window.profile.avatar );
							// banner background-image
							// 横幅背景
							funTeamSkin( {
								background: window.profile.background || { type: 0, template: 0 }
							} );
							// user medals
							// 用户奖牌
							medals();
						}
					};
				}
			},
			// 企业
			company: {
				nodeName: 'section',
				className: 'profile-header',
				html: function () {
					var o = document.createDocumentFragment();
					var d = window.data.company;
					var a = $.tag( 'div', { className: 'profile-header__overlay', style: { backgroundImage: 'url(\'' + global.host.root + 'adc/images/ep_adc_bk.jpg\'' } } );
					o.appendChild( a );
					var b = $.tag( 'div', { id: 'profile_header', className: 'profile-header__container' } );
					o.appendChild( b );
					b.append( 'div', 'profile-header__picture' ).append( 'img', { id: 'companyLogo', className: 'avatar xtralarge', alt: d.data.name, title: d.data.name, src: d.data.avatar } );
					var ba = b.append( 'div', 'profile-header__information__wrapper' );
					ba.append( 'h1', 'profile-header__title' ).append( 'span', { id: 'companyName', className: 'title type-input', title: d.data.name, innerHTML: d.data.name } );
					var bb = ba.append( 'h2', 'profile-header__bio' ).append( 'span', { id: 'companySign', className: 'bio type-input', title: d.data.website + ' - @' + d.data.name } );
					var bc = bb.append( 'a', { href: 'javascript: void(0);', target: '_blank', innerHTML: d.data.website, style: { color: '#fff' } } );
					bc.addEventListener( 'click', function ( e ) {
						window.open( /^(http:\/\/|https:\/\/)/.test( data.company.data.website ) ? data.company.data.website : 'http://' + data.company.data.website );
					} );
					bb.append( 'span', { innerHTML: ' - @' + d.data.name } );

					var c = $.tag( 'div', 'profile-header__btn' ); o.appendChild( c );
					c.append( 'a', { className: 'btn fa fa-home', href: global.host.root, title: '首页', innerHTML: '首页' } );
					return o;
				}
			}
		},
		menu: {
			// 白帽中心
			// user: {
			// 	nodeName: 'nav',
			// 	pc: [
			// 		{id: 'myUser', href: 'userDash.html', title: '个人中心', innerHTML: '个人中心'},
			// 		{id: 'myTeam', href: 'userTeam.html', title: '我的团队', innerHTML: '我的团队'},
			// 		{id: 'myBug', href: 'userTab.html', title: '我的漏洞', innerHTML: '我的漏洞'},
			// 		// {id: 'myPoC', href: 'userPoc.html', title: '我的PoC', innerHTML: '我的PoC'},
			// 		{id: 'myMoney', href: 'userMoney.html', title: '我的奖励', innerHTML: '我的奖励'},
			// 		{id: 'myFaviorites', href: 'userFavorites.html', title: '我的收藏', innerHTML: '我的收藏'},
			// 		{id: 'myToolEncy', href: 'userEncy.html', title: '我的工具百科', innerHTML: '我的工具百科'},
			// 		{id: 'myMessage', href: 'userMessageList.html', title: '消息中心', innerHTML: '消息中心'},
			// 		{id: 'myUserVerify', href: 'userVerify.html', title: '备案信息', innerHTML: '备案信息'},
			// 		{id: 'myEdit', href: 'userInfor.html', title: '信息设置', innerHTML: '信息设置'},
			// 		{id: 'myInvitations', href: 'userActivationCodeList.html', title: '邀请码', innerHTML: '邀请码'}
			// 	],
			// 	className: 'left-column',
			// 	html: function () {
			// 		var o = document.createDocumentFragment();
			// 		var a = $.tag('div', {id: 'vartical', className: 'vertical-menu'});
			// 		o.appendChild(a);
			// 		for (var i = 0; i < this.pc.length; i++) {
			// 			var li = a.append('li', 'vertical-menu__item');
			// 			li.append('a', {id: this.pc[i].id, className: 'vertical-menu__link' + (this.pc[i].className || ''), href: global.host.root + 'user/' + this.pc[i].href, title: this.pc[i].title, innerHTML: this.pc[i].innerHTML });

			// 			// This not sub.
			// 			// 占时还没有子类
			// 			// if (this.pc[i].sub && this.pc[i].sub.length > 0) {
			// 			// 	var sub = this.pc[i].sub;
			// 			// 	var ul = li.append('div', 'sub-menu').append('ul', 'sub-menu-list');
			// 			// 	for (var j = 0; j < sub.length; j++) {
			// 			// 		ul.append('li', 'sub-menu-item').append('a', {id: sub[j].id, className: sub[j].className, href: sub[j].href, title: sub[j].title, innerHTML: sub[j].innerHTML });
			// 			// 	}
			// 			// }
			// 		}

			// 		return {
			// 			o: o,
			// 			callback: function () {
			// 				// 消息数量显示
			// 				if (window.profile) {
			// 					var msgNumber = window.profile.unread.msg;
			// 					msgNumber = (window.profile.unread.apply)? msgNumber + window.profile.unread.apply: msgNumber;
			// 					$(myMessage || '#myMessage')[0].innerHTML += '（' + msgNumber + '）';
			// 				}
			// 			}
			// 		};
			// 	}
			// },
			// 企业
			company: {
				nodeName: 'nav',
				pc: [
					{ id: 'pcIndex', href: 'javascript: void(0);', title: '首页', innerHTML: '首页' }
				],
				className: 'sub-header',
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'inner-container' );
					o.appendChild( a );
					var b = a.append( 'ul', 'sub-header__menu' );
					for ( var i = 0; i < this.pc.length; i++ ) {
						b.append( 'li', 'sub-header__menu-item' ).append( 'a', { id: this.pc[i].id, className: 'sub-header__menu-link' + ( this.pc[i].className || '' ), title: this.pc[i].title, innerHTML: this.pc[i].innerHTML, href: this.pc[i].href } );
					}
					var c = a.append( 'ul', 'sub-header__other' );
					c.append( 'li' ).append( 'a', { id: 'submitBug', className: 'btn btn-primary', href: global.host.root + 'submit.html?cid=' + window.data.company.id, innerHTML: '提交威胁报告', target: '_blank' } );
					return o;
				}
			}
		},
		footer: {
			// 主站
			model: {
				id: 'footer',
				list: [
					[
						{ title: '关于我们', innerHTML: '关于我们', href: 'model/about.html' },
						{ title: '平台规则', innerHTML: '平台规则', href: 'model/clause-rules.html' },
						{ title: '免责声明', innerHTML: '免责声明', href: 'model/disclaimer.html' }
					],
					[
						{ title: '行长圈', innerHTML: '行长圈', href: 'q/' },
						{ title: '行长搜索', innerHTML: '行长搜索', href: 's/' },
						{ title: '寻求报道', innerHTML: '寻求报道', href: 'model/seekReport.html' }
					],
					[
						//{title: '友情链接', innerHTML: '友情链接', href: 'model/links.html'},
						{ title: '意见反馈', innerHTML: '意见反馈', href: 'model/feedback.html' }
					],
				],
				contactEmail: ['联系电话：400-600-3887', '服务邮箱：support@bugbank.cn', '商务合作：mia@bugbank.cn'],
				contactPhoneAndQQ: ['技术1群：477761459（大咖面对面）', '休闲1群：494452753（已满）', '休闲2群：591535316'],
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'footer' );
					o.appendChild( a );
					var b = a.append( 'div', "container" ).append( 'div', 'row' );

					var ba = b.append( 'div', 'footer-group' );
					ba.append( 'span', { className: 'footer-title', innerHTML: '<i class="fa fa-database"></i>漏洞银行,公平衡量漏洞价值' } );
					var bb = ba.append( 'ul', 'footer-list' );
					for ( var i = 0; i < this.list.length; i++ ) {
						var li = bb.append( 'li' );
						for ( var j = 0; j < this.list[i].length; j++ ) {
							var l = this.list[i][j];
							li.append( 'a', { href: global.host.root + l.href, title: l.title, innerHTML: l.innerHTML } );
							if ( j + 1 < this.list[i].length ) {
								li.innerHTML += '|';
							}
						}
					}

					var bc = b.append( 'div', 'footer-group' );
					bc.append( 'span', { className: 'footer-title', innerHTML: '<i class="fa fa-star"></i>联系我们' } );
					var bd = bc.append( 'ul', 'footer-list' );
					for ( var i = 0; i < this.contactEmail.length; i++ ) {
						bd.append( 'li', { innerHTML: this.contactEmail[i] } );
					}
					var be = b.append( 'div', 'footer-group' );
					be.append( 'span', { className: 'footer-title', innerHTML: '<i class="fa fa-desktop"></i>官方群' } );
					var bf = be.append( 'ul', 'footer-list' );
					for ( var i = 0; i < this.contactPhoneAndQQ.length; i++ ) {
						bf.append( 'li', { innerHTML: this.contactPhoneAndQQ[i] } );
					}
					var bg = b.append( 'div', 'footer-group' ).append( 'ul', 'footer-list' );
					var gi = bg.append( 'li' );
					gi.append( 'img', { className: 'yjxy', alt: '行长叠报', title: '行长叠报', src: '/img/yjxy.jpg' } );
					gi.append( 'p', { innerHTML: '行长叠报' } );

					o.appendChild( F.component.footer.simple.html() );
					return o;
				}
			},
			// 登录等页面
			simple: {
				id: 'footer',
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'cp' );
					o.appendChild( a );
					a.append( 'div', 'container' ).append( 'p', { className: 'row', innerHTML: '&copy; 2013-2017 漏洞银行（www.bugbank.cn）版权所有 / 工信部备案：<a href="http://www.miitbeian.gov.cn" target="_blank" class="gov-web">沪ICP备14012492号-2</a> / 公安备案：<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011702002860" target="_blank" class="gov-web">31011702002860</a>' } );
					return o;
				}
			},
			// 白帽中心
			user: {
				id: 'footer',
				pc: [
					{ href: '', title: '首页', innerHTML: '首页' },
					{ href: 'q', title: '行长圈', innerHTML: '行长圈' },
					{ href: 'task/', title: '提交漏洞', innerHTML: '提交漏洞' },
					{ href: 'mall/', title: '商城', innerHTML: '商城' },
					{ href: 'ranks.html', title: '排行榜', innerHTML: '排行榜' },
					{ href: 'model/clause-rules.html', title: '平台规则', innerHTML: '平台规则' }
				],
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'inner-container' );
					o.appendChild( a );
					var b = a.append( 'div', 'footer' ).append( 'div', 'footer-wrapper clearfix' );
					b.append( 'div', { className: 'footer-copyright', innerHTML: '&copy;  bugbank' } );
					var ba = b.append( 'ul', 'footer-nav' );
					for ( var i = 0; i < this.pc.length; i++ ) {
						ba.append( 'li', 'footer-nav-item' ).append( 'a', { className: 'footer-nav-item-link', href: global.host.root + ( this.pc[i].href || '' ), title: this.pc[i].title || '', innerHTML: this.pc[i].innerHTML || '' } );
					}
					return o;
				}
			},
			// 企业
			company: {
				id: 'footer',
				html: function () {
					return F.component.footer.user.html();
				}
			}
		},
		elevator: {// 浮动装置
			model: {
				nodeName: 'div',
				id: 'elevator',
				className: 'elevator',
				html: function () {
					var o = document.createDocumentFragment();
					var a = $.tag( 'div', 'elevator' );
					o.appendChild( a );
					a.append( 'a', { className: 'elevator-kefu2', href: 'javascript: void(0);', title: '联系客服' } ).append( 'div', { className: 'elevator-kefu-box2', innerHTML: '400-600-3887' } );
					a.append( 'a', { id: 'suggest', className: 'elevator-fankui', href: global.host.root + 'model/feedback.html', title: '意见反馈' } );
					a.append( 'a', { id: 'backToTop', className: 'elevator-top', href: 'javascript: void(0);', title: '返回顶部', style: { display: 'none' } } );

					/*a.append('a', {className: 'elevator-weixin', href: 'javascript: void(0);'}).append('div', 'elevator-weixin-box');
					a.append('a', {className: 'elevator-weibo', href: 'javascript: void(0);'}).append('div', 'elevator-weibo-box');*/

					return {
						o: o,
						callback: function () {
							// add backToTop Event .
							backToTopEvent();
						}
					};
				}
			}
		}
	};

	// judge user of signin.
	// 判断用户是否登录
	// 这里控制页面初始加载内容
	// 还可以控制登录后加载组件内容
	F.judge = {
		init: function ( b ) {
			b = b ? F.judge.in : F.judge.out;
			for ( var i in b ) {
				recursion( b[i] );
			}
		},
		out: {
			/* header */
			header: function () {
				delete F.judge.out.header;
				( function ( s ) {
					var t = getTag( s );
					t && F.install( t, s );
				} )( 'header' );
			},
			/* footer */
			footer: function () {
				delete F.judge.out.footer;
				( function ( s ) {
					var t = getTag( s );
					t && F.install( t, s );
				} )( 'footer' );
			},
			/* elevator */
			elevator: function () {
				delete F.judge.out.elevator;
				( function ( s ) {
					var t = getTag( s );
					t && F.install( t, s );
				} )( 'elevator' );
			}
		},
		in: {
			/* banner */
			banner: function () {
				delete F.judge.in.banner;
				( function ( s ) {
					var t = getTag( s );
					t && F.install( t, s );
				} )( 'banner' );
			},
			/* menu */
			menu: function () {
				delete F.judge.out.menu;
				( function ( s ) {
					var t = getTag( s );
					t && F.install( t, s );
				} )( 'menu' );
			}
		}
	};

	// start move function【must】
	// 开始运行函数【必须，否则页面无法完整】
	F.init = function ( type, callback ) {
		type = typeof type === 'string' ? type : 'user';

		// not logged in page element.
		// 未登录状态下的标签
		F.judge.init();

		// request user info
		// 请求用户信息
		// return value of typeof is bool.
		// 返回类型是 bool 型
		// logged in page element.
		// 登录后的页面标签
		type == 'user' ? requestUserInfo( F.judge.init ) : type == 'company' ? requestCompanyInfo( F.judge.init ) : !1;

		// judge loading if open.
		// 判断 loading 是否开启
		!F.isLoading && F.clearHidden();

		afterCompleteAjax();

		typeof callback === 'function' && callback();

		// 加入百度统计
		joinBd();

		return this;
	};

	// loading component.
	// loading 组件
	F.loading = function ( callback ) {
		var a = $.tag( 'div', {
			id: 'curtain',
			className: 'curtain'
		} );
		var b = a.append( 'div', 'start-loading' );
		b.append( 'div', 'loading-bg' );
		b.append( 'div', 'loading-img' ).append( 'img', { src: '/img/bugbank-logo.png', alt: '漏洞银行(BUGBANK)' } );
		document.body.appendChild( a );

		// clear the element body to class name.
		// 清除 body 标签类名
		// show page content.
		// 显示页面内容
		// set in loading if enabled(already open)
		// 设置 loading 已开启
		F.clearHidden();
		F.isLoading = true;

		return this;
	};

	// verify user judge signin
	// 验证用户是否登录
	F.verify = function ( option, callback ) {
		option = $.updateObject( option, {
			url: global.host.root + 'signin.html'
		} );

		if ( typeof callback === 'function' ) {
			callback();
			return this;
		}

		if ( !$.cookie( 'userInfo' ) || !$.cookie( 'AUTH' ) ) {
			window.location.href = option.url;
		}

		return this;
	};

	// alter the completion of the page to method
	// 页面完成后处理方法
	F.ready = function ( callback ) {
		if ( typeof callback === 'function' ) {
			if ( F.isAjax ) {
				// set logged in after complete the methed.
				// 登录完成后的方法
				this.judge.out.ready = this.judge.in.ready = callback;
			} else {
				// set logged out after complete the methed.
				// 未登录完成后的方法
				callback();
			}
		}
		return this;
	};

	// request user info.
	// 请求用户信息
	function requestUserInfo( f ) {
		if ( window.location.protocol == "file:" || !$.cookie( 'AUTH' ) || !$.cookie( 'userInfo' ) ) return f( !1 );
		$.ajax( {
			url: '/api/i',
			success: function ( data, type, xhr ) {
				if ( xhr.status == 200 ) {
					window.profile = F.preset( data );
				}
				f( !0 );
			},
			error: function ( xhr, textStatus, errorThrown ) {
				if ( xhr.status == 406 || ( xhr.status == 404 && xhr.responseJSON && xhr.responseJSON.err_msg == '用户不存在' ) ) {
					//清除Cookie
					var cookie = $.cookie();
					for ( var idx in cookie ) {
						$.cookie( idx, '', { expires: -1, path: '/', domain: global.domain || '' } );
					}
					// tips.show({text: '登录超时，请重新登录'}, function () {
					// window.location.href = global.host.root + 'signin.html';
					// });
				}
				f( !1 );
			}
		} );

		// judge ajax if implement.
		// 判断 ajax 是否执行
		F.isAjax = true;
	}

	// requery company info.
	// 请求企业信息
	function requestCompanyInfo( f ) {
		$.ajax( {
			url: ' /api/company/' + $.queryString( 'fid' ) + '/viewADC',
			success: function ( data, type, xhr ) {
				if ( xhr.status == 200 ) {
					window.data = window.data || {};
					window.data['company'] = data;
				}
				f( !0 );
			},
			error: function ( xhr ) {
				tips.show( { text: '企业不存在！' }, function () {
					window.location.href = global.host.root;
				} );
				f( !1 );
			}
		} );

		// judge ajax if implement.
		// 判断 ajax 是否执行
		F.isAjax = true;
	};

	// preset the data of user info.
	// 预设用户信息的数据
	F.preset = function ( d ) {
		// 需要获取消息信息
		d['type'] = 0;
		// 假数据

		// 判断值为 null 的
		// d.signature = transInnerHTML((d.signature)? d.signature: '嘘！这位黑客正在低调地挖洞，什么资料都没有留下！');
		d.signature = ( d.signature ) ? d.signature : '嘘！这位黑客正在低调地挖洞，什么资料都没有留下！';
		d.balance = ( d.balance && d.balance > 0 ) ? d.balance.toFixed( 2 ) : 0;
		d.income.total = ( d.income.total ) ? d.income.total : 0;
		d.point.total = ( d.point.total && d.point.total > 0 ) ? d.point.total.toFixed( 2 ) : 0;
		d.mobile = ( d.mobile ) ? d.mobile : '';
		d.bug.wait_cnt = ( d.bug.wait_cnt ) ? d.bug.wait_cnt : 0;
		d.bug.submit_cnt = ( d.bug.submit_cnt ) ? d.bug.submit_cnt : 0;

		return d;
	};

	// 递归
	// recursion
	var recursion = function ( v ) {
		if ( typeof v === 'function' ) {
			v();
		} else if ( typeof v === 'object' ) {
			for ( var i in v ) {
				arguments.callee( v[i] );
			}
		}
	}

	// This all component in install.
	// 这里是所有组件安装方法
	F.install = function ( o, s ) {
		if ( !o || !s ) return false;
		s = F.component[s];
		var t = s[o.getAttribute( 'type' )];
		if ( t ) {
			o = t.nodeName ? wrap( o, t.nodeName ) : o;
			t.id ? o.id = t.id : !1;
			t.className ? o.className = t.className : !1;
			if ( t.html ) {
				t = t.html();
				// judge return in value node name this fragment.
				// 判断返回值是否是碎片标签
				if ( t.nodeName == '#document-fragment' ) {
					o.appendChild( t );
				} else if ( typeof t === 'object' ) {
					t = $.updateObject( t, {
						o: document.createElement( 'div' ),
						callback: function () { }
					} );
					o.appendChild( t.o ), t.callback();
				}
			}
		}
	}
	// edit element to node name.
	// 修改标签名称
	var wrap = function ( a, n ) {
		var b = a.parentNode.insertBefore( document.createElement( n ), a );
		a.parentNode.removeChild( a );
		return b;
	};

	// element tag Name on the basis of, get Element.
	// 判断标签是否存在
	var getTag = function ( a ) {
		a = document.getElementsByTagName( a );
		return a.length ? a[0] : false;
	};

	// clear body to className in "hidden"
	// 清除 body 中 ‘hidden’ 类名
	F.clearHidden = function () {
		document.body.className = document.body.className.replace( ' hidden', '' );
	};

	/* 实用工具 */
	var utils = F.utils = {
		// 扩展对象方法
		/*
		*	将source对象中的属性扩展到target对象上，传参 source 的值可以是 undefined、function、object,
		*	@method extend
		*	@param { Object } target 目标对象， 新的属性将附加到该对象上
		*	@param { Object } source 源对象， 该对象的属性会被附加到target对象上
		*	@param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
		*	@return { Object } 返回target对象
		*	例：
		*	layout.utils.extend(function a() {
		*		console.log(0)
		*	});
		*	例：
		*	layout.utils.extend({
		*		b: function () {
		*			console.log(1)
		*		},
		*		c: function () {
		*			console.log(2)
		*		}
		*	});
		*/
		extend: function ( source, target, bool ) {
			// 异常处理
			try {
				if ( !source && typeof target === 'object' ) {
					return target;
				} else if ( typeof source === 'function' ) {
					return ( target || _ )[source.name] = source;
				} else if ( typeof source === 'object' ) {
					return _.updateObject( source, target || _, bool || false );
				}
			} catch ( e ) {
				console.log( e );
			}
		},
		// 多个对象的合并方法
		/**
		 * 将给定的多个对象的属性复制到目标对象target上
		 * @method extends
		 * @remind 该方法将强制把源对象上的属性复制到target对象上
		 * @remind 该方法支持两个及以上的参数， 从第二个参数开始， 其属性都会被复制到第一个参数上。 如果遇到同名的属性，
		 *          将会覆盖掉之前的值。
		 * @param { Object } target 目标对象， 新的属性将附加到该对象上
		 * @param { Object... } source 源对象， 支持多个对象， 该对象的属性会被附加到target对象上
		 * @return { Object } 返回target对象
		 * @example
		 * ```javascript
		 *
		 * var target = {},
		 *     source1 = { name: 'source', age: 17 },
		 *     source2 = { title: 'dev' };
		 *
		 * UE.utils.extends( target, source1, source2 );
		 *
		 * //output: { name: 'source', age: 17, title: 'dev' }
		 * console.log( target );
		 *
		 * ```
		 */
		extends: function ( t ) {
			var a = arguments;
			for ( var i = 1; i < a.length; i++ ) {
				var x = a[i];
				for ( var k in x ) {
					if ( !t.hasOwnProperty( k ) ) {
						t[k] = x[k];
					}
				}
			}
			return t;
		},
		// 更新对象
		/**
		* 将source对象中的属性扩展到target对象上， 根据指定的isKeepTarget值决定是否保留目标对象中
		* 与源对象属性名相同的属性值。
		* @method updateObject
		* @param { Object } target 目标对象， 新的属性将附加到该对象上
		* @param { Object } source 源对象， 该对象的属性会被附加到target对象上
		* @param { Boolean } isKeepTarget 是否保留目标对象中与源对象中属性名相同的属性
		* @return { Object } 返回target对象
		* @example
		* ```javascript
		*
		* var target = { name: 'target', sex: 1 },
		*      source = { name: 'source', age: 17 };
		*
		* _.updateObject( target, source, true );
		*
		* //output: { name: 'target', sex: 1, age: 17 }
		* console.log( target );
		*
		* ```
		*/
		updateObject: function ( s, t, b ) {
			if ( s ) {
				for ( var k in s ) {
					if ( !b || !t.hasOwnProperty( k ) ) {
						t[k] = s[k];
					}
				}
			}
			return t;
		}
	};

	// select in menu lable.
	// 选择菜单标签
	/*
	*	例：
	*	layout.select(['**', '***']);
	*	例：
	*	layout.select(['**', '***'], 'className');
	*/
	F.select = function ( a, b ) {
		if ( !( a instanceof Array ) ) return this;
		b = b || 'on';
		var select = function () {
			for ( var i = 0; i < a.length; i++ ) {
				var t = document.getElementById( a[i] );
				if ( !new RegExp( b ).test( t.className ) ) t.className = t.className + ' ' + b;
			}
		};
		if ( F.isAjax ) {
			this.judge.out.select = this.judge.in.select = select;
		} else {
			select();
		}
		return this;
	};

	// set global layout
	// 设置全局下的 layout
	W.layout = F;
} );

// 验证登录（记录cookie中是否有值）
// function verifySignIn(option, callback) {
// 	option = $.updateObject(option, {
// 	    url: global.host.root + 'signin.html'
// 	});

// 	if(callback) callback();

// 	if (!$.cookie('userInfo') || !$.cookie('AUTH')) {
// 		window.location.href = option.url;
// 	}
// }

//滚动条
function ScrollBar( options ) {
	this._init( options );
}
$.extend( ScrollBar.prototype, {
	_init: function ( options ) {
		var self = this;
		self.options = {
			scrollDir: 'y',//滚动的方向
			contSelector: "",//滚动条内容选择器
			barSelector: "",//滚动条选择器
			sliderSelector: "",//滚动滑块选择器
			wheelStep: 20, //滚轮步长
			callback: null
		}
		$.extend( true, self.options, options || {} );
		self._initDomEvent();
		return self;
	},

	//初始化DOM结构
	_initDomEvent: function () {
		var self = this;
		var opts = self.options;
		self.$cont = opts.contSelector;
		self.$bar = opts.barSelector;
		self.$slider = opts.sliderSelector;
		self.$doc = $( document );
		self.$slider[0].style.height = self.$bar.height() * self.$cont.height() / self.$cont[0].scrollHeight + 'px';
		if ( self.$slider[0].clientHeight < 15 ) {
			self.$slider[0].style.height = '15px'
		}
		self._initSliderDragEcent()._bindContScroll()._bindMouseWheel();
	},

	//初始化滑块拖动功能
	_initSliderDragEcent: function () {
		var self = this;
		var slider = self.$slider, sliderEl = slider[0];
		if ( sliderEl ) {
			var doc = self.$doc;
			var dragStartPagePosition;//内容初始高度
			var dragStartScrollPosition;//内容滚动高度
			var dragContBarRate;//滚动初始高度
			slider.on( 'mousedown', function ( e ) {
				e.preventDefault();
				//console.log(e.pageY);
				//console.log('mousedown');
				dragStartPagePosition = e.pageY;
				dragStartScrollPosition = self.$cont[0].scrollTop;
				dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
				doc.on( 'mousemove.scroll', function ( e ) {
					e.preventDefault();
					//console.log(e.pageY);
					//console.log('mousemove');
					self.scrollTo( dragStartScrollPosition + ( e.pageY - dragStartPagePosition ) * dragContBarRate );
				} ).on( 'mouseup.scroll', function ( e ) {
					//console.log('mouseup');
					doc.off( ".scroll" );
				} )
			} )
		}
		return self;
	},

	//获取最大可滚动高度
	getMaxScrollPosition: function () {
		var self = this;
		var a = Math.max( self.$cont.height(), self.$cont[0].scrollHeight ) - self.$cont.height();
		return a;
	},

	//获取最大可滑动高度
	getMaxSliderPosition: function () {
		var self = this;
		return self.$bar.height() - self.$slider.height();
	},

	//移动到目的点
	scrollTo: function ( positionVal ) {
		var self = this;
		self.$cont.scrollTop( positionVal );
		if ( self.$cont.height() + self.$cont[0].scrollTop === self.$cont[0].scrollHeight ) {
			typeof self.options.callback === 'function' && self.options.callback()
		}
	},

	//监听内容滚动，同步滑块位置
	_bindContScroll: function () {
		var self = this;
		self.$cont.on( 'scroll', function () {
			var sliderEle = self.$slider && self.$slider[0];
			if ( sliderEle ) {
				sliderEle.style.top = self.getSliderPosition() + 'px';
			}
		} )
		return self;
	},

	//计算滑块当前位置
	getSliderPosition: function () {
		var self = this;
		var maxSliderPosition = self.getMaxSliderPosition();
		return Math.min( maxSliderPosition, maxSliderPosition * self.$cont[0].scrollTop / self.getMaxScrollPosition() );
	},

	//监听滚轮事件
	_bindMouseWheel: function () {
		var self = this;
		self.$cont.on( 'mousewheel DOMMouseScroll', function ( e ) {
			e.preventDefault();
			var oEv = e.originalEvent;
			var wheelRange = oEv.wheelDelta ? -oEv.wheelDelta / 120 : ( oEv.detail || 0 ) / 3;
			self.scrollTo( self.$cont[0].scrollTop + wheelRange * self.options.wheelStep );
		} )
		return self;
	}
} )

// 根据一个ajax全局变量ajaxRequestCount加一，当请求完成后ajaxRequestCount减一，完成后去除loading
function afterCompleteAjax() {
	if ( ajaxRequestCount > 0 ) return;

	/* 加载完成后去除logding */
	$( '#curtain' ).fadeOut( 200, function () {
		$( this ).remove();
		layout.clearHidden();
	} );

	/* footer底部对齐 */
	//minWindowHeight();
}

// 退出，删除cookie
function logout() {
	$.ajax( {
		url: '/api/signout',
		type: 'POST',
		success: function ( data ) {
			var cookie = $.cookie();
			for ( var idx in cookie ) {
				// if(idx == 'AUTH') continue;
				$.cookie( idx, '', { expires: -1, path: '/', domain: global.domain || '' } );
				$.cookie( idx, '', { expires: -1, path: '/', domain: ( 'www.' + global.domain ) || '' } );
				$.cookie( idx, '', { expires: -1, path: '/', domain: global.domain.replace( 'www', '' ) || '' } );
			}
			window.location.href = global.host.root;
		}
	} );
}

// readyHTML
function ready( callback ) {
	layout.ready( callback ? callback : function () { } );
}

// 置顶
function backToTopEvent() {
	var backToTop = $( '#backToTop' ).click( function () {
		$( "html, body" ).animate( { scrollTop: 0 }, "slow" );
		return false;
	} );
	$( window ).scroll( function () {
		if ( $( window ).scrollTop() > 0 ) {
			backToTop.show( 180 );
		} else {
			backToTop.hide( 180 );
		}
	} );
}

// 手机版 header 
function phoneHeader() {
	// 手机版搜索作为跳转
	// $('#search-phone').click(function (e) {
	// 	$.breakEvent(e);
	// 	window.location.href = global.host.root + 'search.html';
	// });

	var globalnav = globalnav || $( '#globalnav' )[0];
	try {
		var menu = phoneMenu || $( "#phoneMenu" )[0];
		menu.style.cssText = 'display: none;';

		menu.show = !1;
		$( phoneBtn || "#phoneBtn" ).click( function ( e ) {
			$.breakEvent( e );
			var info = function () {
	    	    /*if (menu.style.height == "0px") {
	    	        menu.style.display = "block";
	    	    }
	    	    var height = 0;
	    	    if (!menu.show) {
	    	        menu.style.height = "auto";
	    	        height = menu.offsetHeight;
	    	        menu.style.height = "0px";
	            }
	            $(menu).animate({ height: height }, 200, 0, 0, function () {
	                if (menu.style.height == "0px") {
	                    menu.style.display = "none";
	                }
	            });*/
				menu.show ? $( menu ).slideUp( 200, function () {
					sub.each( function ( i, o ) {
						o.s = !!1, reset( o, !!1 );
					} );
				} ) : $( menu ).slideDown( 200 );

				menu.show = !menu.show;
				phoneBtn.className = ( menu.show ) ? 'listBtn transform' : 'listBtn';

				// menu.style.maxHeight = ((window.innerHeight || document.body.clientHeight) - (menu.parentNode.firstElementChild || menu.parentNode.firstChild).clientHeight) + 'px';
			};
			headerMnueRadio.judge( phoneBtn, info );
			info();
		} );
		// createUserPhoneMenu();

		// if (screenType.type == "pc") {
		//     $(window).resize(function () {
		//         var width = getPageSize().WinW;
		//         if (width <= 767) {
		//             menu.css({ height: 0, "overflow": "scroll" });
		//             menu.show = false;
		//         } else if (width <= 991) {
		//             menu.css({ height: "auto", overflow: "visible" });
		//         } else {
		//             menu.css({ height: 0, overflowY: "hidden" });
		//         }
		//     });
		// }
	} catch ( e ) {
		console.log( e );
	}
	// 子菜单下拉功能
	var subShowElement = null;
	var sub = $( '.sub-drop-down', globalnav ).each( function ( i, o ) {
		o.href = 'javascript: void(0);';
		o.last = o.parentNode.lastElementChild || o.parentNode.lastChild;
		o.icon = o.lastElementChild || o.lastChild;

		o.s = !!0;
		$( o ).click( function ( e ) {
			if ( subShowElement && !subShowElement.s && subShowElement != this ) {
				reset( subShowElement, !1, 200 );
			}
			reset( this, this.s, 200 );
			subShowElement = this;
		} );
	} );
	// 下拉或重置
	function reset( e, b, t ) {
		e.s ? $( e.last ).slideDown( t || 0 ) : $( e.last ).slideUp( t || 0 );
		e.icon.className = e.s ? e.icon.className.replace( 'fa-chevron-down', 'fa-chevron-up' ) : e.icon.className.replace( 'fa-chevron-up', 'fa-chevron-down' ), e.s = !b;
	}
}

// 加入百度统计和推送
function joinBd() {
	var script = $.tag( 'script', {
		type: 'text/javascript',
		innerHTML: 'var _hmt = _hmt || [];(function() {var hm = document.createElement("script");hm.src = "//hm.baidu.com/hm.js?95283fb4ba2ead16cea973bca5e23dc2";var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm, s);})();'
	} );
	document.body.appendChild( script );

	var baidu_ts = '<script>\
			(function(){\
				var bp = document.createElement("script");\
				var curProtocol = window.location.protocol.split(":")[0];\
				if (curProtocol === "https") {\
					bp.src = "https://zz.bdstatic.com/linksubmit/push.js";\
				}\
				else {\
					bp.src = "http://push.zhanzhang.baidu.com/push.js";\
				}\
				var s = document.getElementsByTagName("script")[0];\
				s.parentNode.insertBefore(bp, s);\
			})();\
		</script>';

	$( 'body' ).append( baidu_ts );

	//cnzz统计 - 临时
	var cnzz = '<div style="display: none"><script src="https://s95.cnzz.com/z_stat.php?id=1259553499&web_id=1259553499" language="JavaScript"></script></div>';
	$( 'body' ).append( cnzz );

	//alexa验证 - 临时
    /*var alexa='<!-- Start Alexa Certify Javascript --><script type="text/javascript">_atrk_opts = { atrk_acct:"/Kbpn1aMp4106C", domain:"bugbank.cn",dynamic: true};(function() { var as = document.createElement("script"); as.type = "text/javascript"; as.async = true; as.src = "https://d31qbv1cthcecs.cloudfront.net/atrk.js"; var s = document.getElementsByTagName("script")[0];s.parentNode.insertBefore(as, s); })(); </script> <noscript><img src="https://d5nxst8fruw4z.cloudfront.net/atrk.gif?account=/Kbpn1aMp4106C" style="display:none" height="1" width="1" alt="" /></noscript><!-- End Alexa Certify Javascript -->';
    $('head').append(alexa);*/

}

//用户中心勋章
function medals( d ) {
	$.ajax( {
		url: '/api/i/medals',
		success: function ( data ) {
			if ( typeof data.data == 'object' ) {
				isObject = false;
				for ( var idx in data.data ) {
					isObject = true;
					break;
				}
				if ( !isObject ) {
					medal.style.display = 'none';
					return false;
				}
				delete isObject;
			} else if ( typeof data.data == 'array' && data.data.length <= 0 ) {
				medal.style.display = 'none';
				return false;
			}
			var maxMedal = 10;
			medal.appendChild( $.tag( "i", {
				title: "修改",
				className: "btn edit-btn fa fa-pencil"
			} ) );
			var medalsWin = new baseWin( {
				title: '勋章管理',
				content: ( function () {
					// 获取勋章是否显示
					var visible = window.profile.switches.medal_visible;

					var cont = $.tag( 'div', 'pop-group' );
					var setHide = cont.append( 'div', 'setHide' );
					var title = setHide.append( 'span', { className: 'fl', innerHTML: '勋章显示设置（已隐藏）' } );
					var btn = setHide.append( 'span', { className: 'fr btn btn-success', innerHTML: visible ? '设置隐藏' : '设置可见' } );

					var bool = !1;
					$( btn ).click( function ( e ) {
						$.breakEvent( e );
						if ( bool ) return false;
						bool = !bool;
						$.ajax( {
							url: '/api/medal/visible',
							type: 'POST',
							data: {
								status: visible ? '0' : '1'
							},
							success: function ( data ) {
								btn.innerHTML = visible ? '设置可见' : '设置隐藏';
								title.innerHTML = visible ? '勋章显示设置（已隐藏）' : '勋章显示设置（已可见）';
								tips.show( { text: '设置成功', type: 'ok' }, function () {
									visible = !visible;
									bool = !bool;
								} );
							},
							error: function ( xhr ) {
								xhr.responseJSON && console.log( xhr.responseJSON.err_msg ), tips.show( { text: '设置失败' } );
							}
						} )
					} );
					cont.append( 'ul', { className: 'medals', id: "medalsList" } );
					return cont;
				} )()
			} );

			$( medal ).click( function ( e ) {
				$.breakEvent( e );
				medalsWin.show();
			} );

			medalsList.parentNode.style.paddingRight = "0px";
			medalsList.style.paddingRight = "15px";

			medal.count = 0;
			var medalShown = {};
			for ( var i = 0; i < Math.min( data.data.length, maxMedal ); i++ ) {
				var d = data.data[i];
				medalShown[d.name] = medal.appendChild( $.tag( "li", "profile-header__information__item" ) );
				medalShown[d.name].append( "img", { src: d.image, title: "勋章：" + d.name + " | " + d.description, alt: "勋章：" + d.name + " | " + d.description } );
				medalShown[d.name].name = d.name;
				medal.count++;
			}
			seeAllApproval( data );
			function seeMove( type, p ) {// 查看更多
				$.ajax( {
					url: '/api/i/medals',
					data: { page: seeMove.page, type: ( !!type ) ? type : 0, p: ( !!p ) ? p : 1 },
					success: function ( data, type, xhr ) {
						if ( xhr.status == 200 ) {
							seeAllApproval( data );
						}
					},
					error: function ( xhr ) {
						console.log( xhr.responseJSON.err_msg );
					}
				} );
			}

			// 查看全部认可
			function seeAllApproval( d ) {
				for ( var j = 0; j < d.data.length; j++ ) {
					medialsShowTOTips( d.data[j] );
				}

				// 查看更多
				seeMove.page = d.page.current;
				var page = Math.ceil( d.page.total / d.page.node );
				if ( page > 1 && page != seeMove.page ) {
					medalsList.removeEventListener( 'scroll', scrollEvent );
					medalsList.addEventListener( 'scroll', scrollEvent );
				}
				function scrollEvent( e ) {
					if ( seeMove.page == page ) {
						medalsList.removeEventListener( 'scroll', scrollEvent );
					}
					if ( this.scrollTop == ( this.scrollHeight - ( this.offsetHefight || this.clientHeight ) ) ) {
						seeMove.page++;
						seeMove();
					}
				}
			}

			// 认可显示在弹出框
			function medialsShowTOTips( d ) {
				var item = $.tag( 'li' );
				item.append( 'div', { className: 'medalsLoge' } ).append( 'img', { src: d.image, alt: "勋章：" + d.name + " | " + d.description, title: "勋章：" + d.name + " | " + d.description } );
				item.info = item.append( 'div', 'info' );
				item.info.append( 'p', { className: 'name', innerHTML: d.name } );
				item.info.append( 'p', { innerHTML: d.description } );
				item.info.append( 'p', { innerHTML: format.date( d.time * 1000 ).full } );
				item.follow = item.info.append( 'span', { className: 'btn btn-primary', innerHTML: '置顶' } );
				$( item.follow ).click( function () {
					if ( medalsList.lock ) return false;
					medalsList.lock = true;
					$.ajax( {
						url: "/api/medal/log/" + d.id,
						type: "PATCH",
						success: function () {
							if ( medal.count > 1 ) {
								medalsList.insertBefore( item, medalsList.firstChild );
								if ( medalShown[d.name] ) {
									medal.insertBefore( medalShown[d.name], medal.firstChild );
								}
								else {
									var newMedal = $.tag( "li", "profile-header__information__item" );
									newMedal.append( "img", { src: d.image, title: "勋章：" + d.name + " | " + d.description, alt: "勋章：" + d.name + " | " + d.description } );
									newMedal.name = d.name;
									medal.insertBefore( newMedal, medal.firstChild );
									medalShown[d.name] = newMedal;
									medal.count++;
								}
								if ( medal.count > maxMedal ) {
									medal.count--
									delete medalShown[medal.lastChild.name];
									$( medal.lastChild ).remove();
								}
							}
						},
						complete: function () {
							medalsList.lock = false;
						}
					} )
				} );
				medalsList.appendChild( item );
			}
		},
		error: function ( xrh ) {
			xhr.responseJSON && console.log( xhr.responseJSON.err_msg );
		}
	} );
}

function loged( id ) {
	if ( window.profile || id ) {
		if ( id === 'userNameModile' ) {
			$( "#userNameModile" ).each( function () {
				var o = this;
				if ( !o.menu ) {
					o.menu = createUserDropMenu( { 'screenisPC': !1 } );
					o.offsetY = 13;
					o.parentNode.parentNode.appendChild( o.menu );
					if ( o.menu )
						Menu( o );
				}
			} );
		} else {
			$( "#userName" ).each( function () {
				var o = this.parentNode;
				if ( !o.menu ) {
					o.menu = createUserDropMenu( { 'screenisPC': !0 } );
					o.appendChild( o.menu );
					o.offsetY = 13;
					if ( o.menu )
						Menu( o );
				}
			} );
		}
	}
}

//个人信息下拉框
function createUserDropMenu( option, callback ) {//生成顶部用户名处下拉global菜单
	option = $.updateObject( option, {
		screenisPC: !0
	} );

	var menu = $.tag( "div", "e-user" );
	if ( window.profile.type !== undefined ) {
		if ( option.screenisPC ) {
			var card = menu.append( 'div', 'card-arrow' ).append( 'div', {
				className: 'e-user-card',
				id: 'userMenu'
			} );
		} else {
			var card = menu.append( 'div', {
				className: 'e-user-card',
				id: 'userMenuModile'
			} );
		}
		var head = card.append( "div", "card-header" );
		head.append( 'a', {
			title: window.profile.name,
			className: 'u',
			href: global.host.root + 'user/',
		} ).append( "img", {
			alt: window.profile.name,
			src: window.profile.avatar
		} );
		var info = head.append( 'div', 'profile-info' );
		info.append( "h3", "name" ).append( 'a', {
			innerHTML: window.profile.name,
			title: window.profile.name,
			href: global.host.root + 'user/',
		} );

		var stats = info.append( 'div', 'profile-stats' );
		stats.append( 'a', {
			href: '/u/' + window.profile.name + '/following',
			className: 'stat followers',
			innerHTML: '<div class="fa fa-heart-o">' + window.profile.followees + '</div><div class="p_label">关 注</div>'
		} );
		stats.append( 'a', {
			href: '/u/' + window.profile.name + '/follower',
			className: 'stat following',
			innerHTML: '<div class="fa fa-user-o">' + window.profile.followers + '</div><div class="p_label">粉 丝</div>'
		} );

		var profile = info.append( 'div', 'profile-button' ).append( 'a', {
			className: 'btn',
			innerHTML: '我的名片',
			href: global.host.hacker + window.profile.name
		} );

		$( profile ).click( function ( e ) {

		} );

		card.append( 'div', 'divider' );

		var footer = card.append( "div", "card-footer" ).append( 'ul', 'bottom-menu menu-list' );
		footer.append( 'li' ).append( "a", {
			innerHTML: "信息设置",
			href: global.host.root + "user/infor.html"
		} );
		footer.append( 'li' ).append( "a", {
			innerHTML: "退出",
			href: "javascript:logout()"
		} );
	}

	return menu;
}

function Header( id ) {
	// 手机版
	if ( !window.topbar ) {
		window.topbar = $( "#topbar" )[0];
	}
	if ( window.profile && window.profile != null && window.profile.type !== undefined ) {
		$( "#topbarFun" ).css( "display", "none" );
		var userName = $( "#" + id );
		userName[0].href = ( window.screenType.level == 0 || window.screenType.level == 1 ) ? 'javascript: void(0);' : ( global.host.root + 'user/' );
		userName.html( "<img src=\"" + window.profile.avatar + "\"/>" );
	}
	else {
		$( "#userName" ).css( "display", "none" );
		$( "#topbarFun" ).css( "display", "" );
	}
}

function Menu( id ) { //menu
	var src = $( id ).applyAttr()
		.css( { "position": "relative" } )
		.each( function () {
			var o = this;
			o.hideMenu = function ( e ) {
				//                o.menu.animate({ opacity: 0, "margin-top": -10 }, 200, 0, 0, function () {
				//                    o.menu.css("display", "none");
				//                });
				/*if (e)
				 $.breakEvent(e);*/
				o.menu.hide();
				$( window ).unbind( "click", src[0].hideMenu );
			}
			if ( typeof ( o.menu ) == "string" ) o.menu = "#" + o.menu;
			o.menu = $( o.menu ).hide();
			//var top = o.offsetHeight;
			//if (o.offsetY) {
			//    top += 1 * o.offsetY;
			//}
			//o.menu.css({ "display": "none", position: "absolute", left: "auto", top: top, "margin-top": -10 }).css("z-index", "100");
			// o.menu.css({ "display": "none", position: "absolute", left: "auto","zIndex": "100" });
		} );
	src[0].triggerType = src[0].triggerType || "click";
	var trigger = {
		click: function () {
			src.click( function ( e ) {
				var o = this;
				headerMnueRadio.judge( o, src[0].hideMenu );
				if ( o.menu[0].style.display == "none" ) {
					// o.appendChild(o.menu[0]);
					//                    o.menu.css({ "display": "block", "top": o.offsetHeight }).animate({ opacity: 1, "margin-top": 0 }, 200, 0, 0, function () {
					//                        $(window).bind("click", o.hideMenu, 1);
					//                    });
					//o.menu.show().css({ "display": "block" });
					o.menu.show();
					e = e || window.event;
					$.breakEvent( e );
					$( window ).bind( "click", src[0].hideMenu );
				}
			} )
		},
		hover: function () {
			src.mouseover( function () {
				var o = this;
				clearTimeout( src.timer );
				src[0].appendChild( src[0].menu[0] );
				o.menu.show();
				//src[0].menu.css({ "display": "block" }).animate({ opacity: 1}, 200);
			} ).mouseout( function () {
				clearTimeout( src.timer );
				src.timer = setTimeout( this.hideMenu, 200 );
			} )
			src[0].menu.mouseover( function ( e ) {
				e = e || window.event;
				$.breakEvent( e );
				clearTimeout( src.timer );
			} ).mouseout( function ( e ) {
				clearTimeout( src.timer );
				src.timer = setTimeout( src[0].hideMenu, 200 );

			} )
		}
	}
	trigger[src[0].triggerType]();

}

// 下拉框
/*global['record'] = null;
function dropBox(btn, menu) {
	// 记录点击按钮
	function showMenu(e) {
		$(menu).slideUp(0);
		document.body.removeEventListener('click', showMenu);
		global.record = null;
	}
	// 点击事件
	$(btn).click(function (e) {
		$.breakEvent(e);
		if (global.record !== menu) document.body.click();
		$(menu).slideToggle(0);
		document.body.addEventListener('click', showMenu);
		global.record = menu;
	});
}*/

/**
 * header 菜单单选操作
 */
var headerMnueRadio = {
	target: null,
	clear: function () { },
	judge: function ( o, callback ) {
		var h = headerMnueRadio;
		if ( o == h.target ) {
			h.target = null,
				h.clear = function () { };
		} else {
			h.clear();
			h.target = o;
			typeof callback === 'function' && ( h.clear = callback );
		}
	}
};
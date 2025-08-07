<template>
	<a-config-provider :theme="themeConfig">
		<a-layout class="toolbox" :class="{ 'dark-mode': isDarkMode }">
			<div class="toolbox-header">
				<a-layout-header class="flex items-center !bg-transparent !px-6 mb-4">
					<div class="flex items-center">
						<img src="@/assets/logo.svg" class="h-10 mr-3" />
						<h4 class="text-xl font-mono font-bold">Toolbox</h4>
					</div>
					<div class="ml-auto">
						<a-space align="center">
							<a-button
								@click="toggleTheme"
								class="bg-transparent"
								size="large"
							>
								<template #icon>
									<i
										v-if="isDarkMode"
										class="ri-moon-fill text-lg leading-none"
									></i>
									<i
										v-else
										class="ri-sun-fill text-lg leading-none"
									></i>
								</template>
							</a-button>
							<a-button
								@click="showModal = true"
								class="bg-transparent"
								size="large"
							>
								<template #icon>
									<i class="ri-question-fill text-lg leading-none"></i>
								</template>
							</a-button>
							<a-button
								@click="openGitHub"
								class="bg-transparent"
								size="large"
							>
								<template #icon>
									<i class="ri-github-fill text-lg leading-none"></i>
								</template>
							</a-button>
							<a-button
								@click="feedback"
								:type="isDarkMode ? '' : 'text'"
								class="bg-transparent"
								:ghost="isDarkMode"
								size="large"
							>
								<template #icon>
									<i class="ri-edit-2-line text-lg leading-none"></i>
								</template>
							</a-button>
						</a-space>
					</div>
				</a-layout-header>

				<a-affix :offset-top="4">
					<div
						class="search-bar relative z-10 w-[800px] mx-auto -mb-8 drop-shadow-xl"
					>
						<a-tabs
							v-model:activeKey="activeKey"
							type="card"
							:tab-bar-gutter="0"
						>
							<a-tab-pane key="baidu">
								<template #tab>
									<i class="ri-baidu-fill mr-1"></i>
									<span>百度</span>
								</template>
								<div class="p-3 bg-white dark:bg-neutral-900">
									<a-input-search
										v-model:value="keywords"
										size="large"
										placeholder="百度一下，你就知道"
										:bordered="false"
										@search="onSubmitBaidu"
									>
										<template #prefix>
											<i
												class="ri-lg ri-baidu-fill text-blue-700 mr-2"
											></i>
										</template>
										<template #enterButton>
											<a-button
												class="!rounded-md"
												type="primary"
												size="large"
											>
												<template #icon>
													<i class="ri-search-2-line"></i>
												</template>
											</a-button>
										</template>
									</a-input-search>
								</div>
							</a-tab-pane>
							<a-tab-pane key="google">
								<template #tab>
									<i class="ri-google-fill mr-1"></i>
									<span>Google</span>
								</template>
								<div class="p-3 bg-white dark:bg-[#141414]">
									<a-input-search
										v-model:value="keywords"
										size="large"
										placeholder="在 Google 中搜索，或输入网址"
										:bordered="false"
										@search="onSubmitGoogle"
									>
										<template #prefix>
											<i
												class="ri-lg ri-google-fill text-blue-700 mr-2"
											></i>
										</template>
										<template #enterButton>
											<a-button
												class="!rounded-md"
												type="primary"
												size="large"
											>
												<template #icon>
													<i class="ri-search-2-line"></i>
												</template>
											</a-button>
										</template>
									</a-input-search>
								</div>
							</a-tab-pane>
						</a-tabs>
					</div>
				</a-affix>
			</div>

			<a-layout class="">
				<div class="pt-24 px-16 flex flex-1">
					<a-layout-content class="pl-64">
						<div
							:id="item.title"
							class="mb-16"
							v-for="(item, index) in processedDataList"
							:key="index"
						>
							<div v-if="item.list && item.list.length > 0">
								<div class="mb-8 flex items-center">
									<i
										class="mr-3 text-blue-700"
										:class="`ri-2x ri-${item.icon}`"
									></i>
									<h4 class="text-xl font-bold">{{ item.title }}</h4>
								</div>
								<data-source :data="item.list" :show-r18="showR18" />
							</div>
						</div>
					</a-layout-content>
					<a-layout-sider class="ml-14 !bg-transparent">
						<a-anchor
							affix
							:offsetTop="150"
							:get-current-anchor="getCurrentAnchor"
							:items="dataList"
							:targetOffset="48"
						/>
					</a-layout-sider>
				</div>
			</a-layout>
			<a-layout-footer class="!bg-transparent flex items-center">
				<img src="@/assets/logo.svg" class="h-5 mr-2" />
				<span class="opacity-55">
					Copyright Toolbox © 2025 Designed by Deajax
				</span>
			</a-layout-footer>
		</a-layout>

		<a-back-top type="primary" :style="{ right: '64px' }">
			<template #icon>
				<i class="ri-arrow-up-s-line"></i>
			</template>
		</a-back-top>

		<a-modal
			v-model:open="showModal"
			title="帮助"
			:footer="null"
			:width="800"
			centered
			closable
		>
			<a-typography-paragraph class="pt-1 leading-loose">
				<blockquote>
					<div>
						所有导航、分类、排序纯凭个人喜好进行制作，无法做到包罗万象，只把常用的几个导航做了进来。
					</div>
					<div>
						所有问题以及导航失效等都可以发
						<a-typography-link
							href="https://github.com/deajax/toolbox/issues/new"
						>
							issues
						</a-typography-link>
					</div>
				</blockquote>
				<ul class="">
					<li>
						我是个UI
						Designer，业余会一点html和css，制作初衷只是打算为给自己设一个浏览器首页。
					</li>
					<li>
						接受任何合理的意见及建议，各类问题以及导航失效等可以提issues。
					</li>
					<li>
						部分导航需要梯子(vpn)才能打开，比较明确的我会用<i
							class="ri-key-fill text-orange-600"
						></i
						>来标识，但尚有不明确的未标识的可以提issues。
					</li>
					<li>
						GlasDOS是个不错的梯子，但不免费，虽然不是广子，但是链接加了我的推广码，这样我能多几天使用权，如果介意请提醒我。
					</li>
					<li>
						有些导航所在的分类可能是错的，此分类仅凭我的认知进行填写，如果有错请提醒我。
					</li>
					<li>
						有些导航可能下载资源需要收费，本着只分享免费资源的原则，如果遇到了请提醒我删除。
					</li>
					<li>
						有些导航可能会失效，如果有失效的链接请提醒我删除。
					</li>
					<li>如果我的导航侵犯了您的权益，请联系我，我会及时删除。</li>
					<li>
						本站使用vue3+vite+less构建、ant-design-vue组件库、remixicon图标库以及tailwindcss。感谢以上。
					</li>
				</ul>
			</a-typography-paragraph>
		</a-modal>
	</a-config-provider>
</template>

<script setup>
	import { ref, computed, watch, onMounted } from "vue";
	import { theme, message } from "ant-design-vue";
	import dataSource from "@/components/dataSource.vue";
	import data from "@/data.json";

	// 对话框
	const showModal = ref(false);

	// 配置默认选项卡为百度搜索
	const activeKey = ref("baidu");

	// 设置默认搜索关键词为空
	const keywords = ref("");

	// R18显示开关
	const showR18 = ref(false);

	// 卡片列表数据
	const dataList = ref(data);

	// 处理后的数据列表（根据R18开关过滤）
	const processedDataList = computed(() => {
		if (showR18.value) {
			// 显示所有内容，包括R18
			return dataList.value;
		} else {
			// 过滤掉包含R18=true的项目
			return dataList.value
				.map((category) => ({
					...category,
					list: category.list?.filter((item) => !item.r18) || [],
				}))
				.filter((category) => category.list?.length > 0);
		}
	});

	// 获取当前锚点
	const getCurrentAnchor = (activeLink) => {
		// 如果已经有激活的链接，直接返回
		if (activeLink) {
			return activeLink;
		}

		// 页面加载时，如果没有激活的链接，返回第一个有内容的锚点
		const firstActiveItem = processedDataList.value.find(
			(item) => item.list && item.list.length > 0
		);
		if (firstActiveItem) {
			return `#${firstActiveItem.title}`;
		}

		// 默认返回第一个项目
		if (processedDataList.value.length > 0) {
			return `#${processedDataList.value[0].title}`;
		}

		return activeLink;
	};

	// 百度搜索
	const onSubmitBaidu = () => {
		// 检查是否输入了特殊代码
		if (keywords.value === "1024") {
			showR18.value = !showR18.value;
			localStorage.setItem("showR18", showR18.value);
			keywords.value = ""; // 清空输入框

			if (showR18.value) {
				message.warning("已开启R18模式");
				return;
			} else {
				message.success("已关闭R18模式");
				return;
			}
		} else {
			// 默认百度搜索
			const encodedKeywords = encodeURIComponent(keywords.value);
			window.open(`https://www.baidu.com/s?wd=${encodedKeywords}`, "_blank");

			keywords.value = ""; // 清空输入框
		}
	};
	// 谷歌搜索
	const onSubmitGoogle = () => {
		const encodedKeywords = encodeURIComponent(keywords.value);
		window.open(`https://www.google.com/search?q=${encodedKeywords}`, "_blank");

		keywords.value = ""; // 清空输入框
	};
	// 打开github
	const openGitHub = () => {
		window.open("https://github.com/deajax/toolbox", "_blank");
	};
	// 去github提issues
	const feedback = () => {
		window.open("https://github.com/deajax/toolbox/issues/new");
	};

	// 主题状态管理
	const isDarkMode = ref(false);
	const followSystem = ref(true);

	// 主题配置
	const themeConfig = computed(() => ({
		algorithm: isDarkMode.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
	}));

	// 切换主题
	const toggleTheme = () => {
		isDarkMode.value = !isDarkMode.value;
		saveThemePreference();
		updateThemeAttribute();
	};

	// 保存主题偏好
	const saveThemePreference = () => {
		localStorage.setItem("themePreference", isDarkMode.value ? "dark" : "light");
	};

	// 检测系统主题变化
	const checkSystemTheme = () => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		return mediaQuery.matches;
	};

	// 更新 html 的 theme-mode 属性
	const updateThemeAttribute = () => {
		const htmlElement = document.documentElement;
		if (isDarkMode.value) {
			htmlElement.setAttribute("theme-mode", "dark");
		} else {
			htmlElement.removeAttribute("theme-mode");
		}
	};

	// 监听系统主题变化
	watch(followSystem, (newVal) => {
		if (newVal) {
			isDarkMode.value = checkSystemTheme();
			saveThemePreference();
			updateThemeAttribute();
		}
	});

	// 初始化主题和R18设置
	onMounted(() => {
		// 初始化R18设置
		const savedShowR18 = localStorage.getItem("showR18");
		if (savedShowR18 !== null) {
			showR18.value = JSON.parse(savedShowR18);
		}

		// 1. 检查本地存储中的用户偏好
		const savedPreference = localStorage.getItem("themePreference");

		// 2. 检查系统主题设置
		const systemPreference = checkSystemTheme();

		// 3. 优先使用用户偏好，其次使用系统设置
		if (savedPreference) {
			isDarkMode.value = savedPreference === "dark";
		} else if (followSystem.value) {
			isDarkMode.value = systemPreference;
		}

		// 4. 更新 HTML 属性
		updateThemeAttribute();

		// 5. 监听系统主题变化
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", (e) => {
			if (followSystem.value) {
				isDarkMode.value = e.matches;
				saveThemePreference();
				updateThemeAttribute();
			}
		});
	});
</script>

<style lang="less">
	.toolbox {
		&.ant-layout,
		.ant-layout,
		.ant-layout-sider,
		.ant-layout-footer {
			background: none;
		}

		&-header {
			background: linear-gradient(260deg, #f3f4f6 0%, #f9fafb 100%);
		}
	}

	.search-bar {
		.ant-tabs {
			.ant-tabs-nav {
				margin-bottom: 0;
				background: #f1f2f3;

				&::before {
					display: none;
				}

				.ant-tabs-tab {
					border: 0;
					border-radius: 0;
					padding: 12px 16px;
					background: none;
					transition: none;

					&-active {
						background: #fff;
					}
				}
			}
		}
	}

	[theme-mode="dark"] {
		body {
			background: #141414;
		}

		.toolbox {
			&-header {
				background: #0a0a0a;
			}

			.ant-card {
				background: inherit;

				&:hover {
					background: #303030 !important;
				}
			}
		}

		.search-bar {
			.ant-tabs {
				.ant-tabs-nav {
					background: #101010;
				}

				.ant-tabs-tab {
					&-active {
						background: #171717;
					}
				}
			}
		}
	}
</style>

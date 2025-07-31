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
										v-model:value="searchForm.keywords"
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
										v-model:value="searchForm.keywords"
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
							v-for="(item, index) in dataList"
							:key="index"
						>
							<template v-if="item.list && item.list.length > 0">
								<div class="mb-8 flex items-center">
									<i
										class="mr-3 text-blue-700"
										:class="`ri-2x ri-${item.icon}`"
									></i>
									<h4 class="text-xl font-bold">{{ item.title }}</h4>
								</div>
								<data-source :data="item.list" />
							</template>
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

		<a-modal v-model:open="showModal" title="帮助" :footer="null" centered closable>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</a-modal>
	</a-config-provider>
</template>

<script setup>
	import { ref, reactive, computed, watch, onMounted } from "vue";
	import { theme } from "ant-design-vue";
	import dataSource from "@/components/dataSource.vue";
	import data from "@/data.json";

	// 对话框
	const showModal = ref(false);

	// 配置默认选项卡为百度搜索
	const activeKey = ref("baidu");

	// 设置默认搜索关键词为空
	const searchForm = reactive({
		keywords: "",
	});

	// 卡片列表数据
	const dataList = ref(data);

	// 获取当前锚点
	const getCurrentAnchor = (activeLink) => {
		// 如果已经有激活的链接，直接返回
		if (activeLink) {
			return activeLink;
		}

		// 页面加载时，如果没有激活的链接，返回第一个有内容的锚点
		const firstActiveItem = dataList.value.find(
			(item) => item.list && item.list.length > 0
		);
		if (firstActiveItem) {
			return `#${firstActiveItem.title}`;
		}

		// 默认返回第一个项目
		if (dataList.value.length > 0) {
			return `#${dataList.value[0].title}`;
		}

		return activeLink;
	};

	// 百度搜索
	const onSubmitBaidu = () => {
		const encodedKeywords = encodeURIComponent(searchForm.keywords);
		window.open(`https://www.baidu.com/s?wd=${encodedKeywords}`, "_blank");
	};
	// 谷歌搜索
	const onSubmitGoogle = () => {
		const encodedKeywords = encodeURIComponent(searchForm.keywords);
		window.open(`https://www.google.com/search?q=${encodedKeywords}`, "_blank");
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
	const selectedValue = ref("option1");

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

	// 初始化主题
	onMounted(() => {
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

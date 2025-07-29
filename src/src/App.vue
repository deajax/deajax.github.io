<template>
	<a-layout class="toolbox">
		<a-layout-header class="flex items-center !bg-transparent !px-6 mb-8">
			<div class="flex items-center">
				<img src="@/assets/logo.svg" class="h-8 mr-2" />
				<h4 class="text-lg font-mono font-bold">Toolbox</h4>
			</div>
			<div class="ml-auto">
				<a-space align="center">
					<a-tooltip title="GitHub" placement="bottom">
						<a-button @click="openGitHub" size="large" type="text">
							<template #icon>
								<i class="ri-github-fill ri-xl"></i>
							</template>
						</a-button>
					</a-tooltip>
					<a-tooltip title="反馈" placement="bottom">
						<a-button @click="feedback" size="large" type="text">
							<template #icon>
								<i class="ri-feedback-fill ri-lg"></i>
							</template>
						</a-button>
					</a-tooltip>
				</a-space>
			</div>
		</a-layout-header>
		<a-affix :offset-top="4">
			<div class="search-bar relative z-10 w-[800px] mx-auto -mb-8 drop-shadow-lg">
				<a-tabs v-model:activeKey="activeKey" type="card" :tab-bar-gutter="0">
					<a-tab-pane key="baidu">
						<template #tab>
							<i class="ri-baidu-fill mr-1"></i>
							<span>百度</span>
						</template>
						<div class="p-3 bg-white">
							<a-input-search
								v-model:value="searchForm.keywords"
								size="large"
								placeholder="百度一下，你就知道"
								:bordered="false"
								@search="onSubmitBaidu"
							>
								<template #prefix>
									<i class="ri-lg ri-baidu-fill text-blue-700 mr-2"></i>
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
						<div class="p-3 bg-white">
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
		<a-layout class="!bg-white dark:!bg-transparent">
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
	</a-layout>

	<a-back-top type="primary">
		<template #icon>
			<i class="ri-arrow-up-s-line"></i>
		</template>
	</a-back-top>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import dataSource from "@/components/dataSource.vue";
	import data from "@/data.json";

	const activeKey = ref("baidu");
	const dataList = ref(data);
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

	const searchForm = reactive({
		keywords: "",
	});

	const onSubmitBaidu = () => {
		const encodedKeywords = encodeURIComponent(searchForm.keywords);
		window.open(`https://www.baidu.com/s?wd=${encodedKeywords}`, "_blank");
	};
	const onSubmitGoogle = () => {
		const encodedKeywords = encodeURIComponent(searchForm.keywords);
		window.open(`https://www.google.com/search?q=${encodedKeywords}`, "_blank");
	};

	const openGitHub = () => {
		window.open("https://github.com/deajax/toolbox", "_blank");
	};

	const feedback = () => {
		window.open("https://github.com/deajax/toolbox/issues/new");
	};
</script>

<style lang="less" scoped>
	.toolbox {
		background: linear-gradient(260deg, #f5f7fc 0%, rgba(245, 247, 252, 0.2) 100%);
	}

	.search-bar {
		:deep(.ant-tabs) {
			.ant-tabs-nav {
				margin-bottom: 0;
				background: #f3f4f6;

				&::before {
					display: none;
				}
			}
			.ant-tabs-tab {
				border: 0;
				border-radius: 0;
				padding: 12px 16px;
			}
			&.ant-tabs-card {
			}
		}
	}
</style>

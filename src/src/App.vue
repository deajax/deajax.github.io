<template>
	<a-layout>
		<a-header class="flex items-center py-2 mb-8">
			<div class="px-6 flex items-center">
				<img src="@/assets/logo.svg" class="h-8 mr-2" />
				<h4 class="text-lg font-mono font-bold">Toolbox</h4>
			</div>
			<div class="ml-auto px-6">
				<a-space align="center">
					<a-button type="text" @click="openGitHub" size="large">
						<template #icon>
							<i class="ri-github-fill ri-xl"></i>
						</template>
					</a-button>
					<!-- <t-radio-group
						v-model="theme"
						variant="default-filled"
						@change="changeTheme"
						style="--td-comp-paddingLR-l: 12px"
					>
						<t-radio-button value="light">
							<i class="ri-sun-fill"></i>
						</t-radio-button>
						<t-radio-button value="dark">
							<i class="ri-moon-fill"></i>
						</t-radio-button>
					</t-radio-group> -->
				</a-space>
			</div>
		</a-header>
		<div class="search-bar relative z-10 w-[800px] mx-auto -mb-8 drop-shadow-lg">
			<a-tabs v-model:activeKey="activeKey" type="card">
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
								<a-button class="!rounded-md" type="primary" size="large">
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
								<i class="ri-lg ri-google-fill text-blue-700 mr-2"></i>
							</template>
							<template #enterButton>
								<a-button class="!rounded-md" type="primary" size="large">
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
		<a-layout class="!bg-white dark:!bg-transparent">
			<div class="pt-24 px-16 flex flex-1">
				<a-content class="pl-72">
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
									:class="`ri-xl ri-${item.icon}`"
								></i>
								<h4 class="text-xl font-bold">{{ item.title }}</h4>
							</div>
							<data-source :data="item.list" />
						</template>
					</div>
				</a-content>
				<a-aside class="ml-14">
					<t-anchor
						:affix-props="{ offsetTop: 150 }"
						:container="container"
						:bounds="106"
					>
						<t-anchor-item
							v-for="(item, index) in dataList"
							:key="index"
							:href="`#${item.title}`"
							:title="item.title"
						/>
					</t-anchor>
				</a-aside>
			</div>
		</a-layout>
	</a-layout>

	<t-back-top
		theme="primary"
		:visible-height="48"
		:offset="['32px', '64px']"
	></t-back-top>
</template>

<script setup>
	import { ref, reactive } from "vue";
	import { useStore } from "vuex";
	import dataSource from "@/components/dataSource.vue";
	import data from "@/data.json";

	const activeKey = ref("baidu");
	const dataList = ref(data);
	const store = useStore();
	const theme = ref(false);

	const changeTheme = (value) => {
		document.documentElement.setAttribute("theme-mode", "dark");
		store.dispatch("setGlobalCacheData", { key: "themeMode", value: "dark" });
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
</script>

<style lang="less" scoped>
	:deep(.t-default-menu) {
		&__inner .t-menu {
			padding: 0;
		}
	}

	.search-bar {
		:deep(.ant-tabs) {
			.ant-tabs-nav {
				margin-bottom: 0;

				&::before {
					display: none;
				}
			}
			.ant-tabs-tab {
				border: 0;
				border-radius: 0;
				padding: 12px 16px;
			}
		}
	}
</style>

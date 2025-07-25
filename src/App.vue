<template>
	<t-layout>
		<t-header class="flex items-center !bg-transparent mb-8">
			<div class="px-6 flex items-center">
				<img src="/logo.svg" class="h-8 mr-2" />
				<h4 class="text-lg font-mono font-bold">Toolbox</h4>
			</div>
			<div class="ml-auto px-6">
				<t-radio-group
					v-model="theme"
					variant="default-filled"
					@change="changeTheme"
				>
					<t-radio-button value="light">
						<i class="ri-sun-fill"></i>
					</t-radio-button>
					<t-radio-button value="dark">
						<i class="ri-moon-fill"></i>
					</t-radio-button>
				</t-radio-group>
			</div>
		</t-header>
		<div class="relative z-10 w-[800px] mx-auto -mb-8">
			<t-tabs theme="card" :default-value="1" class="shadow-lg">
				<t-tab-panel :value="1">
					<template #label>
						<i class="ri-baidu-fill mr-1"></i>
						<span>百度</span>
					</template>
					<div class="p-3">
						<t-form
							@submit="onSubmitBaidu"
							:data="searchForm"
							class="flex items-center"
						>
							<t-input
								v-model="searchForm.keywords"
								size="large"
								placeholder="百度一下，你就知道"
								type="search"
								class="[&_.t-input.t-size-l]:py-2 [&_.t-input.t-size-l]:h-auto"
								borderless
							>
								<template #prefixIcon>
									<i class="ri-lg ri-baidu-fill text-blue-700 mr-1"></i>
								</template>
							</t-input>
							<div class="ml-2">
								<t-button theme="primary" size="large" type="submit">
									<i class="ri-search-2-line text-xl"></i>
								</t-button>
							</div>
						</t-form>
					</div>
				</t-tab-panel>
				<t-tab-panel :value="2">
					<template #label>
						<i class="ri-google-fill mr-1"></i>
						<span>Google</span>
					</template>
					<div class="p-3">
						<t-form
							@submit="onSubmitGoogle"
							:data="searchForm"
							class="flex items-center"
						>
							<t-input
								v-model="searchForm.keywords"
								size="large"
								placeholder="在 Google 中搜索，或输入网址"
								type="search"
								class="[&_.t-input.t-size-l]:py-2 [&_.t-input.t-size-l]:h-auto"
								borderless
							>
								<template #prefixIcon>
									<i
										class="ri-lg ri-google-fill text-blue-700 mr-1"
									></i>
								</template>
							</t-input>
							<div class="ml-2">
								<t-button theme="primary" size="large" type="submit">
									<i class="ri-search-2-line text-xl"></i>
								</t-button>
							</div>
						</t-form>
					</div>
				</t-tab-panel>
			</t-tabs>
		</div>
		<t-layout class="!bg-white">
			<div class="container pt-24 mx-auto flex">
				<!-- <t-aside class="mr-16">
					<t-menu width="240px">
						<t-menu-item value="0">
							<template #icon>
								<t-icon name="app" />
							</template>
							仪表盘
						</t-menu-item>
						<t-submenu value="1" title="资源列表">
							<template #icon>
								<t-icon name="code" />
							</template>
							<t-menu-item value="1-1" disabled>
								<span>菜单二</span>
							</t-menu-item>
						</t-submenu>
						<t-submenu value="2" title="调度平台">
							<template #icon>
								<t-icon name="file" />
							</template>
							<t-submenu value="2-1" title="二级菜单-1">
								<t-menu-item value="3-1">三级菜单-1</t-menu-item>
								<t-menu-item value="3-2">三级菜单-2</t-menu-item>
								<t-menu-item value="3-3">三级菜单-3</t-menu-item>
							</t-submenu>
							<t-menu-item value="2-2">
								<span>二级菜单-2</span>
							</t-menu-item>
						</t-submenu>
					</t-menu>
				</t-aside> -->
				<t-content>
					<router-view />
				</t-content>
			</div>
		</t-layout>
	</t-layout>

	<t-back-top
		theme="primary"
		:visible-height="48"
		:offset="['32px', '64px']"
	></t-back-top>
</template>

<script setup>
	import { ref, reactive } from "vue";

	const theme = ref("light");
	const changeTheme = (value) => {
		document.documentElement.setAttribute("theme-mode", value);
		dispatch("setGlobalCacheData", { key: "themeMode", value });
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
</script>

<style lang="less" scoped>
	:deep(.t-default-menu) {
		&__inner .t-menu {
			padding: 0;
		}
	}
</style>

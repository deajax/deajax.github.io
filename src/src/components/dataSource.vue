<template>
	<t-row :gutter="[24, 24]">
		<t-col v-for="(item, index) in data" :key="index" :span="3">
			<t-card @click.stop="clickHandler(item)" :title="item.title" hover-shadow>
				<template v-if="item.icon" #avatar>
					<img :src="item.icon" class="w-full h-full block object-cover" />
				</template>
				<template #actions>
					<t-dropdown
						:options="options"
						placement="right"
						@click="feedbackHandler"
					>
						<i class="ri-more-fill text-black"></i>
					</t-dropdown>
				</template>
				<t-typography-text class="!m-0" theme="secondary" ellipsis>
					{{ item.description }}
				</t-typography-text>
			</t-card>
		</t-col>
	</t-row>
</template>

<script setup>
	import { h } from "vue";

	const props = defineProps({
		data: {
			type: Array,
			default: () => [],
		},
	});

	const options = [
		{
			content: "反馈",
			value: 1,
			prefixIcon: () => h("i", { class: "ri-draft-line" }),
		},
	];

	const feedbackHandler = (data) => {
		if (data.value === 1) {
			window.open("https://github.com/deajax/toolbox/issues/new");
		}
	};

	const clickHandler = (item) => {
		window.open(item.url, "_blank");
	};
</script>

<style lang="less" scoped>
	:deep(.t-card) {
		cursor: pointer;
		padding: 4px 0;

		&__avatar {
			width: 16px;
			height: 16px;
			margin-right: 8px;
		}

		&__header {
			padding-bottom: 0;
		}

		&__body {
			padding-top: 12px;
		}
	}
</style>

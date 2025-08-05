<template>
	<a-row :gutter="[24, 24]">
		<a-col v-for="(item, index) in filteredData" :key="index" :span="6">
			<a-card @click.stop="clickHandler(item)" hoverable>
				<a-card-meta :title="item.title" :description="item.description">
					<template #avatar>
						<img
							v-if="item.icon && item.icon.length > 0"
							:src="item.icon"
							class="w-full h-full block object-cover"
						/>
						<i
							v-else
							class="ri-earth-line ri-lg opacity-25 relative -top-[2px] -left-[2px] leading-none"
						></i>
					</template>
				</a-card-meta>
				<div class="absolute top-0 right-0 p-2 leading-none">
					<a-space :size="4">
						<div v-if="item.vpn">
							<a-tooltip title="需要vpn" placement="top">
								<i class="ri-key-fill text-orange-600"></i>
							</a-tooltip>
						</div>
						<div v-if="item.r18">
							<div
								class="font-bold scale-[0.6] bg-black text-white p-1 rounded"
							>
								R18
							</div>
						</div>
					</a-space>
				</div>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup>
	import { computed } from "vue";

	const props = defineProps({
		data: {
			type: Array,
			default: () => [],
		},
		showR18: {
			type: Boolean,
			default: false,
		},
	});

	const filteredData = computed(() => {
		if (props.showR18) {
			return props.data;
		} else {
			return props.data.filter((item) => !item.r18);
		}
	});

	const clickHandler = (item) => {
		window.open(item.url, "_blank");
	};
</script>

<style lang="less" scoped>
	:deep(.ant-card) {
		cursor: pointer;
		background: #f9fafb;

		&:hover {
			background: #fff;
		}

		&-meta {
			&-avatar {
				width: 16px;
				height: 16px;
				padding: 0;
				margin: 4px 0 0 0;
			}

			&-detail {
				margin-left: 8px;
			}

			&-title {
				line-height: 24px;
			}

			&-description {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>

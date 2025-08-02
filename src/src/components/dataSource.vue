<template>
	<a-row :gutter="[24, 24]">
		<a-col v-for="(item, index) in data" :key="index" :span="6">
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
				<div class="absolute top-0 right-0 p-2 leading-none" v-if="item.vpn">
					<a-tooltip title="需要vpn" placement="top">
						<i class="ri-key-fill text-orange-600"></i>
					</a-tooltip>
				</div>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Array,
			default: () => [],
		},
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

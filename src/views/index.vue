<template>
	<div class="">
		<t-row :gutter="[24, 24]">
			<t-col v-for="(j, jdx) in 16" :key="jdx" span="3">
				<t-card title="title" hover-shadow>
					<template #actions>
						<t-dropdown :options="[{ content: '反馈', value: 1 }]">
							<a class="text-black" href="javascript:void(0)" @click.stop="clickHandler">
								<i class="ri-more-fill"></i>
							</a>
						</t-dropdown>
					</template>
					<div class="">description</div>
				</t-card>
			</t-col>
		</t-row>
	</div>
</template>

<script setup></script>

<style lang="less" scoped>
	:deep(.t-card) {
		cursor: pointer;

		&__header {
			padding-bottom: 0;
		}
	}
</style>

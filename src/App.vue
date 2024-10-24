<script setup lang="ts"></script>

<template>
	<div class="container g-0 px-4 py-4 px-sm-3 px-md-2 px-lg-0 bg-black text-white rounded-3">
		<div
			data-bs-theme="dark"
			class="row bg-body px-3 py-3 rounded-3 justify-content-end">
			<div
				style="height: 14vh"
				class="mb-3 row justify-content-end align-items-center bg-body-secondary g-0 rounded-4">
				<div class="col-12 px-2 py-4 display-2 text-end letter-spacing-2">123456789</div>
			</div>
			<div
				style="height: 9vh"
				class="col-8 row justify-content-end bg-body-secondary g-0 rounded-3">
				<div class="px-2 py-1 fs-7 text-end letter-spacing-1">123456789</div>
			</div>
		</div>
		<div class="row">Botao 1</div>
		<div class="row">Botao 2</div>
	</div>
</template>

<style scoped lang="scss">
.letter-spacing {
	&-1 {
		letter-spacing: 1.6px;
	}
	&-2 {
		letter-spacing: 2.5px;
	}
	&-3 {
		letter-spacing: 3px;
	}
}
.bdr {
	border: 1.5px solid #f55;
}
</style>

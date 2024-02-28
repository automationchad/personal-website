<template>
	<div
		class="fixed h-full w-full"
		style="background-image: url('/bg.png'); background-repeat: repeat"
	></div>
</template>

<script setup>
	const props = defineProps({
		error: Object,
	});
</script>

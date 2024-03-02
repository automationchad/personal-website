<template>
	<div>
		<div
			class="inset-x-0 flex max-h-[650px] min-w-[600px] max-w-[600px] flex-col justify-between border border-black bg-[#EDFBFC]"
			style="box-shadow: 5px 5px 0 #0003 !important"
		>
			<div
				class="z-0 h-full w-full border-l border-r border-t border-l-white border-r-black/30 border-t-white"
			>
				<div class="flex flex-row items-center justify-between space-x-2 p-1">
					<div class="flex flex-row space-x-1" style="font-size: 7px">
						<button
							@click="emits('close')"
							class="z-50 flex h-4 w-4 items-center justify-center border border-black"
						>
							𝗫
						</button>
					</div>
					<div class="draggable-div w-auto flex-grow space-y-0.5">
						<div
							class="h-px border-b border-t border-b-white border-t-black"
						></div>
						<div
							class="h-px border-b border-t border-b-white border-t-black"
						></div>
						<div
							class="h-px border-b border-t border-b-white border-t-black"
						></div>
					</div>
					<h3 style="font-size: 8px; font-weight: 200" class="font-chicago">
						Marzella TV
					</h3>
				</div>
				<div class="-mx-px">
					<div class="image relative overflow-clip">
						<div
							class="absolute z-50 flex w-full items-center justify-between bg-black/40 px-2 text-white"
							style="font-size: 8px"
						>
							<div>{{ files[selectedFileIndex] }}</div>
							<div><button @click="showNextVideo">Next File</button></div>
						</div>
						<div class="relative h-full w-full overflow-clip">
							<img
								v-if="changing"
								src="/static.gif"
								alt="Static"
								style="image-rendering: pixelated"
								class="absolute h-full w-full object-cover"
							/>
							<video
								v-for="(file, index) in files"
								:key="file"
								autoplay
								loop
								muted
								:class="[
									index !== selectedFileIndex || changing ? 'invisible' : '',
									'absolute h-full w-full object-cover transition-opacity duration-100',
								]"
								:src="`/videos/${file}`"
							></video>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const emits = defineEmits(['close']);
	const files = [
		'jujustu-kaizen.mp4',
		'bruce-lee.mp4',
		'minecraft.mp4',
		'hackerman.mp4',
		'gallerie.mp4',
		'aliens.mp4',
		'soultrain.mp4',
		'rally.mp4',
		'exmachina-dance.mp4',
		'prince-of-egypt.mp4',
		'rocky.mp4',
		'hades.mp4',
		'ghibli.mp4',
		'kuzcos-poison.mp4',
	];

	const changing = ref(false);
	const selectedFileIndex = ref(0);

	onMounted(() => {
		changing.value = true;
		setTimeout(() => {
			changing.value = false;
		}, 500);
	});

	const showNextVideo = () => {
		changing.value = true; // Show the static GIF
		setTimeout(() => {
			selectedFileIndex.value = (selectedFileIndex.value + 1) % files.length;
			changing.value = false; // Hide the static GIF after a short delay
		}, 500); // Adjust the delay as needed
	};
</script>

<style scoped>
	.invisible {
		opacity: 0;
		pointer-events: none;
	}

	.draggable-div {
		cursor: grab;
	}

	.draggable-div:active {
		cursor: grabbing;
	}
	.image {
		position: relative;
		height: 320px;
	}
	.image:after {
		content: '';
		display: block;
		position: absolute;
		z-index: 40;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(127, 127, 127, 0.1);
		background-image: radial-gradient(black 33%, transparent 33%);
		background-size: 2px 2px;
	}
</style>

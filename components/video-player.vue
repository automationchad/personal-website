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
							class="flex h-4 w-4 items-center justify-center border border-black"
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
					<div class="image overflow-clip">
						<div
							class="absolute z-50 flex w-full items-center justify-between bg-black/40 px-2 text-white"
							style="font-size: 8px"
						>
							<div>{{ selectedFile }}</div>
							<div><button @click="showNextVideo">Next File</button></div>
						</div>
						<div class="relative h-full w-full overflow-clip">
							<img
								src="/static.gif"
								alt=""
								style="image-rendering: pixelated"
								:class="[
									changing ? 'opacity-100' : 'opacity-0',
									'absolute z-10 h-full w-full object-cover transition-opacity duration-100',
								]"
							/>
							<video
								:key="'stable-video-key'"
								:class="[
									changing ? 'opacity-0' : 'opacity-100',
									'z-0 h-auto w-full transition-opacity duration-100',
								]"
								:src="`/videos/${
									selectedFile.split('.')[0]
								}.mp4?nocache=${Math.random()}`"
								autoplay
								loop
								muted
								@loadedmetadata="handleVideoLoaded"
							></video>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const files = [
		'anime.mp4',
		'minecraft.mp4',
		'gallerie.mov',
		'aliens.mp4',
		'soultrain.mov',
		'rally.mp4',
	];

	const emits = defineEmits(['close']);

	const staticGif = 'static.gif';
	const changing = ref(false);

	const selectedFile = ref(files[0]);

	const videoLoaded = ref(false); // New ref to track if the video has loaded

	const showNextVideo = () => {
		changing.value = true; // Show static GIF
		videoLoaded.value = false; // Reset video loaded flag

		const index =
			files.indexOf(selectedFile.value) === -1
				? 0
				: files.indexOf(selectedFile.value);
		selectedFile.value = files[(index + 1) % files.length];

		// Wait for 1 second before checking if video has loaded
		setTimeout(() => {
			if (videoLoaded.value) {
				changing.value = false; // If video has loaded within 1 second, hide static GIF
			}
			// If video hasn't loaded within 1 second, wait for the videoLoaded event to hide static GIF
		}, 1000);
	};

	const handleVideoLoaded = () => {
		videoLoaded.value = true; // Set video loaded flag to true
		if (!changing.value) {
			// If the static GIF is already scheduled to be hidden, hide it immediately
			changing.value = false;
		}
		// If the static GIF is not yet scheduled to be hidden, it will be hidden by the setTimeout in showNextVideo
	};
</script>

<style scoped>
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
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(127, 127, 127, 0.1);
		background-image: radial-gradient(black 33%, transparent 33%);
		background-size: 2px 2px;
	}
</style>

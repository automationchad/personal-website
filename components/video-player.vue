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
							class="flex h-4 w-4 items-center justify-center border border-black"
						>
							𝗫
						</button>
					</div>
					<div class="w-auto flex-grow space-y-0.5">
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
				<div class="px-1 pb-1">
					<div class="image overflow-clip border border-black">
						<div
							class="absolute z-50 flex w-full items-center justify-between bg-black/40 px-2 text-white"
							style="font-size: 8px"
						>
							<div>{{ selectedFile }}</div>
							<div><button @click="showNextVideo">Next File</button></div>
						</div>
						<div class="h-full w-full overflow-clip">
							<img
								v-if="changing"
								src="/static.gif"
								alt=""
								class="h-full w-full"
							/>
							<video
								v-else
								class="z-0 h-auto w-full"
								:src="`/${selectedFile}`"
								autoplay
								loop
								muted
							></video>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	const files = ['bg.mp4', 'video-loop.mp4', 'minecraft.mp4'];

	const staticGif = 'static.gif';
	const changing = ref(false);

	const selectedFile = ref(files[0]);

	const showNextVideo = () => {
		changing.value = true; // Set to static GIF first

		setTimeout(() => {
			const index =
				files.indexOf(selectedFile.value) === -1
					? 0
					: files.indexOf(selectedFile.value);
			selectedFile.value = files[(index + 1) % files.length];
			changing.value = false; // Set to the next video
		}, 2000); // Wait for 2 seconds before showing the next video
	};
</script>

<style scoped>
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

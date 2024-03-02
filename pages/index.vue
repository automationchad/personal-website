<script setup>
	const showSection = ref(true);

	import now from '../public/icons/pirate/Icon20.png';
	import about from '../public/icons/pirate/Icon19.png';
	import projects from '../public/icons/undead/Icon7.png';
	import resume from '../public/icons/undead/Icon32.png';
	import certs from '../public/icons/pirate/Icon3.png';
	import contact from '../public/icons/pirate/Icon47.png';

	const tabs = [
		{ name: 'Now', slug: 'now', icon: now },
		{ name: 'About', slug: 'about', icon: about },
		{ name: 'Projects', slug: 'projects', icon: projects },
		{ name: 'Certs', slug: 'certs', icon: certs },
		{ name: 'Contact', slug: 'contact', icon: contact },
	];

	const files = [
		{
			name: 'tray-demo.mp4',
			type: 'video/mp4',
			link: 'https://www.youtube.com/watch?v=OYRTeoIPoTU',
			icon: '/icons/video.png',
		},
		{
			name: 'walkthru.mp4',
			type: 'video/mp4',
			link: 'https://www.youtube.com/watch?v=TRAXsFbry7Q',
			icon: '/icons/video.png',
		},
		{
			name: 'resume.pdf',
			type: 'application/pdf',
			link: 'https://www.youtube.com/watch?v=3v1n3v7k3v',
			icon: '/icons/undead/Icon32.png',
		},
		{
			name: 'Marzella TV',
			type: 'app',
			link: 'https://www.youtube.com/watch?v=3v1n3v7k3v',
			icon: '/icons/undead/Icon23.png',
			action: () => (showTV.value = true),
		},
	];

	const selectedTab = ref(null);

	const showTV = ref(false);

	const makeHighest = (window) => {
		window.zIndex = highestZIndex.value;
	};

	const markdown = ref(null);

	const getMarkdown = async (path) => {
		const { data } = await useAsyncData('page-data', () =>
			queryContent(`/${path.slug}`).findOne()
		);
		markdown.value = data;
		selectedTab.value = path;
	};

	watch(showTV, (newValue, oldValue) => {
		if (newValue === true) {
			makeHighest(videoWindow);
			// Ensure the video element's style is updated based on its reactive state when it's first shown
			nextTick(() => {
				if (videoPlayerRef.value) {
					const videoPlayerEl = videoPlayerRef.value.$el; // Access the DOM element
					videoPlayerEl.style.left = `${videoWindow.posX}px`;
					videoPlayerEl.style.top = `${videoWindow.posY}px`;
				}
			});
		}
	});

	const parent = ref(null);
	const videoPlayerRef = ref(null);
	const mainWindowSize = { width: 600, height: 650 }; // Assuming known size
	const highestZIndex = ref(20); // Initial z-index for top element
	const videoPlayerSize = { width: 600, height: 420 };

	// Wait for the next DOM update cycle to ensure the parent element is mounted and its dimensions are accessible
	onMounted(() => {
		const parentRect = parent.value.getBoundingClientRect();
		mainWindow.posX = (parentRect.width - mainWindowSize.width) / 2;
		mainWindow.posY = (parentRect.height - mainWindowSize.height) / 2;
		videoWindow.posX = (window.innerWidth - videoPlayerSize.width) / 2;
		videoWindow.posY = (window.innerHeight - videoPlayerSize.height) / 2;
	});

	const mainWindow = reactive({ posX: 0, posY: 0 }); // Initial position set to 0, will be updated
	const videoWindow = reactive({ posX: 150, posY: 50 });

	let currentChild = null;

	let startX = 0;
	let startY = 0;

	const startDrag = (event, child) => {
		currentChild = child;
		startX = event.clientX - child.posX;
		startY = event.clientY - child.posY;
		highestZIndex.value++;
		child.zIndex = highestZIndex.value;

		// Directly update the z-index of the video player if it's the current child
		if (currentChild === videoWindow && videoPlayerRef.value) {
			const videoPlayerEl = videoPlayerRef.value.$el; // Access the DOM element
			videoPlayerEl.style.zIndex = highestZIndex.value;
			// Directly update the element's style to reflect its current position
			videoPlayerEl.style.left = `${child.posX}px`;
			videoPlayerEl.style.top = `${child.posY}px`;
		}

		document.addEventListener('mousemove', drag);
		document.addEventListener('mouseup', endDrag);
	};

	const drag = (event) => {
		if (currentChild) {
			let newX = event.clientX - startX;
			let newY = event.clientY - startY;

			// Boundary checks
			const parentRect = parent.value.getBoundingClientRect();
			const childWidth = currentChild.width || videoPlayerSize.width; // Use specific child width or default
			const childHeight = currentChild.height || videoPlayerSize.height; // Use specific child height or default

			// Adjustments for potential borders or paddings
			const parentBorderPaddingAdjustmentX = 0; // Adjust this value based on your parent's horizontal border and padding
			const parentBorderPaddingAdjustmentY = -60; // Adjust this value based on your parent's vertical border and padding
			const childBorderPaddingAdjustmentX = 0; // Adjust this value based on your child's horizontal border and padding
			const childBorderPaddingAdjustmentY = 0; // Adjust this value based on your child's vertical border and padding

			// Ensure the child div stays within the parent's bounds, including adjustments for horizontal boundaries
			newX = Math.max(
				0,
				Math.min(
					newX,
					parentRect.width -
						childWidth -
						parentBorderPaddingAdjustmentX -
						childBorderPaddingAdjustmentX
				)
			);

			// Ensure the child div stays within the parent's bounds, including adjustments for vertical boundaries
			newY = Math.max(
				0,
				Math.min(
					newY,
					parentRect.height -
						childHeight -
						parentBorderPaddingAdjustmentY -
						childBorderPaddingAdjustmentY
				)
			);

			// Update the position directly if dragging the video player
			if (currentChild === videoWindow && videoPlayerRef.value) {
				const videoPlayerEl = videoPlayerRef.value.$el; // Access the DOM element
				videoPlayerEl.style.left = `${newX}px`;
				videoPlayerEl.style.top = `${newY}px`;

				currentChild.posX = newX;
				currentChild.posY = newY;
			} else {
				// For other draggable elements that might use reactive state for positioning,
				// update their reactive state directly.
				currentChild.posX = newX;
				currentChild.posY = newY;
			}
		}
	};
	const endDrag = () => {
		document.removeEventListener('mousemove', drag);
		document.removeEventListener('mouseup', endDrag);
	};
</script>

<template>
	<div class="h-screen w-screen overflow-clip font-primary">
		<div
			class="fixed h-full w-screen"
			style="
				background-image: url('/bg.png');
				background-position: center;
				background-size: cover;
			"
		></div>
		<nav
			id="nav"
			class="absolute inset-x-[20px] top-10 z-10 flex w-32 flex-col gap-8"
		>
			<div v-for="file in files" :key="file" class="flex flex-col items-center">
				<a
					v-if="file.type !== 'app'"
					class="group flex w-min flex-grow cursor-pointer flex-col items-center space-y-1"
					:href="file.link"
					target="_blank"
				>
					<img :src="file.icon" alt="" class="h-10 w-auto" />
					<div
						style="font-size: 9px"
						class="leading-0 flex items-center justify-center whitespace-nowrap px-1 group-visited:border group-visited:border-dotted group-visited:border-white group-target:bg-black group-target:text-white group-focus:border group-focus:border-dotted group-focus:border-white group-focus:bg-black group-focus:text-white group-active:bg-black group-active:text-white"
					>
						{{ file.name }}
					</div>
				</a>
				<button
					v-else
					@click="file.action"
					class="group flex cursor-pointer flex-col items-center space-y-1"
				>
					<img :src="file.icon" alt="" class="h-10 w-auto" />
					<div
						style="font-size: 9px"
						class="leading-0 flex items-center justify-center px-1 group-visited:border group-visited:border-dotted group-visited:border-white group-target:bg-black group-target:text-white group-focus:border group-focus:border-dotted group-focus:border-white group-focus:bg-black group-focus:text-white group-active:bg-black group-active:text-white"
					>
						{{ file.name }}
					</div>
				</button>
			</div>
		</nav>

		<div
			class="absolute flex h-full w-full items-center justify-center overflow-clip"
			ref="parent"
		>
			<div
				class="pointer-events-auto z-10 flex max-h-[650px] min-w-[600px] max-w-[600px] flex-col justify-between border border-black bg-[#EDFBFC]"
				style="box-shadow: 5px 5px 0 #0003 !important"
				:style="{
					position: 'absolute',
					top: mainWindow.posY + 'px',
					left: mainWindow.posX + 'px',
					userSelect: 'none',
					zIndex: mainWindow.zIndex,
				}"
			>
				<div
					@click="makeHighest(mainWindow)"
					class="z-0 h-full w-full border-l border-r border-t border-l-white border-r-black/30 border-t-white"
				>
					<div class="flex flex-row items-center justify-between space-x-2 p-1">
						<div class="flex flex-row space-x-1" style="font-size: 7px">
							<button
								@click="selectedTab = null"
								class="flex h-4 w-4 items-center justify-center border border-black"
							>
								𝗫</button
							><button
								@click="showSection = !showSection"
								class="flex h-4 w-4 items-center justify-center border border-black"
							>
								{{ showSection ? '⬆' : '⬇' }}
							</button>
						</div>
						<div
							class="draggable-div w-auto flex-grow space-y-0.5"
							@mousedown="startDrag($event, mainWindow)"
						>
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
						<h3 style="font-size: 8px; font-weight: 200" class="font-secondary">
							Will Marzella
						</h3>
					</div>
					<div class="px-1 pb-1" v-if="showSection">
						<div
							v-if="selectedTab === null"
							class="max-h-[420px] overflow-clip border border-black"
						>
							<img
								src="/wallpaper.png"
								class="h-full w-full"
								draggable="false"
								style="image-rendering: crisp-edges; background-size: cover"
							/>
						</div>
						<div
							v-else
							class="max-h-[420px] min-h-[420px] overflow-y-auto border border-black p-2"
						>
							<ContentRenderer
								:value="markdown.value || ''"
								class="scroll prose prose-zinc"
								style="
									font-size: 10px;
									color: black;
									line-height: 200%;
									font-weight: lighter;
									white-space: pre-wrap;
								"
							/>
							<!-- <ContentDoc
								:path="`/${selectedTab.slug}`"
								:key="`/${selectedTab.slug}`"
							/> -->
						</div>
					</div>
					<div
						class="flex cursor-pointer flex-row justify-evenly border-t border-black"
						style="margin-left: -1px; margin-right: -2px"
					>
						<div
							:class="[
								'h-24 w-full border-black',
								i === tabs.length - 1
									? ''
									: 'border-r focus:translate-x-px focus:translate-y-[2px] active:translate-x-px active:translate-y-[2px]',
							]"
							v-for="(tab, i) in tabs"
							:key="tab"
							@click="getMarkdown(tab)"
						>
							<div
								class="relative z-50 flex h-full w-auto flex-grow flex-col items-center justify-between border-b border-l border-r border-t border-b-black/30 border-l-white border-r-black/30 border-t-white pb-1 pt-2"
							>
								<img
									:src="tab.icon"
									class="h-10 w-10"
									alt=""
									style="image-rendering: pixelated"
								/>
								<div class="text-center" style="font-size: 9px">
									{{ tab.name }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<VideoPlayer
				v-if="showTV"
				class="absolute right-1/4 top-1/4 z-30"
				ref="videoPlayerRef"
				@mousedown="startDrag($event, videoWindow)"
				@close="showTV = !showTV"
			/>
		</div>
	</div>
</template>

<style scoped>
	.draggable-div {
		cursor: grab;
		touch-action: none; /* Prevents mobile browsers from handling drag as scroll */
	}

	.draggable-div:active {
		cursor: grabbing;
	}
	/* Style for the scrollbar track */

	.scroll::-webkit-scrollbar {
		width: 1em;
	}

	.scroll::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	}

	.scroll::-webkit-scrollbar-thumb {
		background-color: darkgrey;
		outline: 1px solid slategrey;
	}

	hr {
		border-top: 1px solid black;
	}
</style>

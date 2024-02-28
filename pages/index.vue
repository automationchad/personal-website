<script setup>
	const showImage = ref(true);

	import now from '../public/icons/undead/Icon21.png';
	import about from '../public/icons/undead/Icon16.png';
	import projects from '../public/icons/undead/Icon7.png';
	import resume from '../public/icons/undead/Icon4.png';
	import contact from '../public/icons/undead/Icon13.png';
	import sword from '../public/icons/pirate/Icon1.png';

	const tabs = [
		{ name: 'Now', slug: 'now', icon: now },
		{ name: 'About', slug: 'about', icon: about },
		{ name: 'Projects', slug: 'projects', icon: projects },
		{ name: 'Resume', slug: 'resume', icon: resume },
		{ name: 'Contact', slug: 'contact', icon: contact },
		// { name: 'Blog', slug: 'blog', icon: sword },
	];

	const selectedTab = ref(null);
</script>

<template>
	<div class="overflow-clip w-full h-full">
		<div
			class="fixed h-full w-screen"
			style="background-image: url('/bg.png'); background-repeat: repeat"
		></div>

		<div
			class="absolute flex h-full w-full items-center justify-center overflow-clip"
		>
			<div
				class="inset-x-0 flex max-h-[800px] min-w-[500px] max-w-[500px] flex-col justify-between overflow-y-auto border border-black bg-[#F9EEE4] backdrop-blur-sm"
				style="box-shadow: 5px 5px 0 #0003 !important"
			>
				<div
					class="z-0 h-full w-full border-l border-r border-t border-l-white border-r-black/30 border-t-white"
				>
					<div class="flex flex-row items-center justify-between space-x-2 p-1">
						<div class="flex flex-row space-x-1" style="font-size: 7px">
							<button
								@click="selectedTab = null"
								class="flex h-4 w-4 items-center justify-center"
							>
								X</button
							><button
								@click="showImage = !showImage"
								class="flex h-4 w-4 items-center justify-center"
							>
								^
							</button>
						</div>
						<div class="w-auto flex-grow space-y-0.5">
							<div class="h-px border-t border-black"></div>
							<div class="h-px border-t border-black"></div>
							<div class="h-px border-t border-black"></div>
						</div>
						<h3 style="font-size: 9px">Will Marzella</h3>
					</div>
					<div class="px-1 pb-1">
						<div
							v-if="selectedTab === null"
							class="max-h-[420px] border border-black"
						>
							<img
								src="/wallpaper.png"
								class="h-full w-full"
								style="image-rendering: crisp-edges"
							/>
						</div>
						<div
							v-else
							class="max-h-[420px] min-h-[420px] overflow-y-auto border border-black p-2"
						>
							<ContentDoc
								:path="`/${selectedTab.slug}`"
								class="prose prose-stone"
								style="
									font-size: 10px;
									color: black;
									line-height: 200%;
									font-weight: lighter;
									white-space: pre-wrap;
								"
							/>
						</div>
					</div>
					<div
						class="flex cursor-pointer flex-row justify-evenly border-t border-black"
						style="margin-left: -1px; margin-right: -2px"
					>
						<div
							:class="[
								'h-24 w-full border-black',
								i === tabs.length - 1 ? '' : 'border-r active:translate-y-px ',
							]"
							v-for="(tab, i) in tabs"
							:key="tab"
							@click="selectedTab = tab"
						>
							<div
								class="relative z-50 flex h-full w-auto flex-grow flex-col items-center justify-evenly border-b border-l border-r border-t border-b-black/30 border-l-white border-r-black/30 border-t-white p-1"
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
		</div>
	</div>
</template>

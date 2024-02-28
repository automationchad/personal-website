<script setup>
	const showSection = ref(true);

	import now from '../public/icons/pirate/Icon20.png';
	import about from '../public/icons/pirate/Icon19.png';
	import projects from '../public/icons/undead/Icon7.png';
	import resume from '../public/icons/pirate/Icon31.png';
	import certs from '../public/icons/pirate/Icon3.png';
	import cert2 from '../public/icons/pirate/Icon47.png';
	import contact from '../public/icons/pirate/Icon47.png';

	const tabs = [
		{ name: 'Now', slug: 'now', icon: now },
		{ name: 'About', slug: 'about', icon: about },
		{ name: 'Projects', slug: 'projects', icon: projects },
		{ name: 'Resume', slug: 'resume', icon: resume },
		{ name: 'Certs', slug: 'certs', icon: certs },
		{ name: 'Contact', slug: 'contact', icon: contact },
	];

	const selectedTab = ref(null);
</script>

<template>
	<div class="h-full w-full overflow-clip">
		<div
			class="fixed h-full w-screen"
			style="background-image: url('/bg.png'); background-position: center; background-size: cover"
		></div>

		<div
			class="absolute flex h-full w-full items-center justify-center overflow-clip"
		>
			<div
				class="inset-x-0 flex max-h-[600px] min-w-[500px] max-w-[500px] flex-col justify-between border border-black bg-[#F9EEE4]"
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
								🅇</button
							><button
								@click="showSection = !showSection"
								class="flex h-4 w-4 items-center justify-center"
							>
								{{ showSection ? '⬆' : '⬇' }}
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
						<h3 style="font-size: 8px; font-weight: 200" class="font-chicago">Will Marzella</h3>
					</div>
					<div class="px-1 pb-1" v-if="showSection">
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
							style="
								scrollbar-width: thin;
								scrollbar-color: #000 #fffdf8;
								::-webkit-scrollbar {
									width: 12px;
									background-color: #f5f5f5;
								}
								::-webkit-scrollbar-thumb {
									border-radius: 10px;
									-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
								}
							"
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
								i === tabs.length - 1
									? ''
									: 'border-r focus:translate-x-px focus:translate-y-[2px] active:translate-x-px active:translate-y-[2px]',
							]"
							v-for="(tab, i) in tabs"
							:key="tab"
							@click="selectedTab = tab"
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
		</div>
	</div>
</template>

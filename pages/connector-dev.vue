<script setup>
	let form = ref({
		name: '',
		email: '',
		company: '',
		apiDocs: '',
	});

	const submitForm = () => {
		// handle form submission
		console.log(form.value);
	};
</script>

<template>
	<div>
		<div class="space-y-4">
			<div class=""><h1 class="text-xl">Connector development</h1></div>
			<div class="space-y-4">
				<p>
					how many deals are you losing because your product doesn't have a
					conncetor?
				</p>

				<p>It's time to change that.</p>

				<p>
					What we do is take your product's API and break it down into a series
					of endpoints. These are then neatly packaged and hosted on an iPaaS
					platform like <a href="https://tray.io">tray.io</a>.
				</p>

				<p>
					By doing this we create a faster, repeatable process for connecting
					with your API, similar to developing an SDK. Fast connections,
					repeatable results.
				</p>

				<p>
					Your tech team? They can focus on product upgrades, not integration
					nightmares.
				</p>

				<p>We manage your client integrations. You get to close more deals.</p>

				<p>Our co-selling expertise? It opens new markets.</p>
				<p>
					And our Kickstarter Program? It's 10 hours of turbocharged build time
					for your API.
				</p>
				<p>Stop losing business. Start with us.</p>
				<p>more connections, more revenue. Period.</p>
			</div>
			<p>Simple process:</p>
			<ol class="list-inside list-decimal">
				<li>you send API docs</li>
				<li>we send partner agreement</li>
				<li>You sign agreement</li>
				<li>We build connector</li>
				<li>We host and manage your connector</li>
				<li>You close more deals</li>
                <li>we become best friends</li>
			</ol>
		</div>

		<form @submit.prevent="submitForm" class="mt-8 space-y-2">
			<div class="">
				<p for="name">Your Name</p>
				<input type="text" id="name" v-model="form.name" required />
			</div>

			<br />
			<div class="">
				<p for="email">Your Email</p>
				<input type="email" id="email" v-model="form.email" required />
			</div>

			<br />
			<div class="">
				<p for="company">Your Company</p>
				<input type="text" id="company" v-model="form.company" required />
			</div>

			<br />
			<div class="">
				<p for="apiDocs">API Docs URL</p>
				<input type="url" id="apiDocs" v-model="form.apiDocs" required />
			</div>

			<br />
			<button @click="submitForm">Submit</button>
		</form>

		<NuxtLink :to="`/`">Back</NuxtLink>
	</div>
</template>

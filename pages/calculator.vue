<script setup>
	const current_spend = ref(0);
	const est_tasks = ref(0);

	const frequencies = [
		{ value: 'monthly', id: 1, label: 'Monthly', priceSuffix: '/month' },
		{ value: 'annual', id: 12, label: 'Annually', priceSuffix: '/year' },
	];

	const selected_frequency = ref(frequencies[0]);

	const abbreviatedNumber = (number) => {
		const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
		const tier = (Math.log10(Math.abs(number)) / 3) | 0;
		if (tier === 0) {
			return number;
		}
		const suffix = SI_SYMBOL[tier];
		const scale = 10 ** (tier * 3);
		const scaled = number / scale;
		const length = scaled.toFixed(1).toString();
		const precision = length > 3 ? 0 : 0;
		return scaled.toFixed(precision) + suffix;
	};

	const multiplyAndDouble = (startNumber, tier_num) => {
		let results = [];
		let currentNumber = startNumber;
		results.push(startNumber);
		while (currentNumber <= startNumber ** tier_num) {
			currentNumber = currentNumber * 5;
			results.push(currentNumber);
			let nextNumber = currentNumber * 2;
			results.push(nextNumber);
			currentNumber = nextNumber;
		}
		return results;
	};

	const monthly_base = 300;

	const tiers = [
		1000000, 1300000, 1700000, 2200000, 2900000, 3700000, 4800000, 6300000,
		8200000, 10600000, 13800000, 17900000, 23300000, 30300000, 39400000,
		51200000, 66500000, 86500000, 112500000, 146200000, 190000000,
	];
	const prices = [
		0.0028, 0.002559, 0.002368, 0.002147, 0.00193, 0.00175, 0.001605, 0.001472,
		0.001323, 0.001206, 0.001103, 0.000998, 0.000908, 0.000831, 0.000754,
		0.000684, 0.000627, 0.000571, 0.000518, 0.000473, 0.000429,
	];

	const pricing = tiers.map((quantity, index) => ({
		quantity: quantity,
		price: prices[index],
	}));

	const taskPrice = (quantity) => {
		let price = 0;
		let remainingQuantity = quantity;
		for (let i = 0; i < pricing.length; i++) {
			let tier = pricing[i];
			let tierQuantity = tier.quantity;
			let tierPrice = tier.price;
			if (remainingQuantity <= tierQuantity) {
				price += remainingQuantity * tierPrice;
				break;
			} else {
				price += tierQuantity * tierPrice;
				remainingQuantity -= tierQuantity;
			}
		}
		return (price + monthly_base) * selected_frequency.value.id;
	};

	const trayCosts = (quantity) => {
		let price = 0;
		const trayPricing = [
			{ quantity: 1000000, price: 2.04 / 1000 },
			{ quantity: 3000000, price: 1.8 / 1000 },
			{ quantity: 10000000, price: 1.56 / 1000 },
			{ quantity: 20000000, price: 1.2 / 1000 },
			{ quantity: 40000000, price: 0.96 / 1000 },
		];
		let remainingQuantity = quantity;
		for (let i = 0; i < trayPricing.length; i++) {
			let tier = trayPricing[i];
			let tierQuantity = tier.quantity;
			let tierPrice = tier.price;
			if (remainingQuantity <= tierQuantity) {
				price += remainingQuantity * tierPrice;
				break;
			} else {
				price += tierQuantity * tierPrice;
				remainingQuantity -= tierQuantity;
			}
		}
		return price * selected_frequency.value.id;
	};

	const totalSavings = (current, tasks) => {
		let currentSpend;
		if (selected_frequency.value.id === 1) {
			currentSpend = current / 12;
		} else currentSpend = current;
		if (currentSpend > 0) return currentSpend - taskPrice(tasks);
		else return Math.abs(currentSpend - taskPrice(tasks));
	};
</script>

<template>
	<div>
		<div class="space-y-4">
			<div class="">
				<label
					for="current-spend"
					class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
					>Current yearly spend</label
				>
				<input
					v-model="current_spend"
					maxlength="10"
					type="text"
					name="current-spend"
					id="current-spend"
					placeholder="0.00"
					class="tabular-nums"
					aria-describedby="current-spend-current"
				/>
			</div>

			<div class="">
				<label
					for="task-number"
					class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
					>Est. monthly tasks</label
				>

				<input
					v-model="est_tasks"
					maxlength="10"
					type="text"
					name="task-number"
					id="task-number"
					placeholder="10000000"
					class="tabular-nums"
				/>
			</div>
		</div>

		<p class="mt-4">
			Billing frequency:
			<select v-model="selected_frequency">
				<option
					v-for="frequency in frequencies"
					:key="frequency"
					:value="frequency"
				>
					{{ frequency.label }}
				</option>
			</select>
		</p>

		<p class="mt-4 tabular-nums">
			Cost: ${{ taskPrice(est_tasks).toLocaleString() }}
			{{ selected_frequency.priceSuffix }}
		</p>

		<p class="mt-4">
			Savings:
			<span
				:class="[
					totalSavings(current_spend, est_tasks) > 0
						? 'bg-lime-100 text-lime-700'
						: 'bg-rose-100 text-rose-800',
					'tabular-nums',
				]"
				>${{
					Math.round(totalSavings(current_spend, est_tasks)).toLocaleString()
				}}</span
			>
			{{ selected_frequency.priceSuffix }}
		</p>
		<p class="mt-4 text-sm opacity-40">
			Goes without saying: this is a rough estimate of savings, your actual
			usage may vary.
		</p>
	</div>
</template>

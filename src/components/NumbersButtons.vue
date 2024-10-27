<script setup lang="ts">
const numbers: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const zeros: string[] = ["000", "00"];
const zero: number = 0;

const props = defineProps(["handleEnteredValue"]);

function handleClick(e: MouseEvent) {
	if (e.target) {
		const target = e.target as HTMLButtonElement;
		props.handleEnteredValue(target.textContent);
	}
}
</script>

<template>
	<div class="calc__numbers">
		<div class="calc__numbers__ctn">
			<div class="calc__list">
				<button
					@click="event => handleClick(event)"
					v-for="num in numbers"
					:key="num"
					class="calc__list__button"
					type="button">
					{{ num }}
				</button>
			</div>

			<div class="calc__zeros">
				<button
					@click="event => handleClick(event)"
					v-for="zero in zeros"
					:key="zero"
					class="calc__zeros__two-three"
					type="button">
					{{ zero }}
				</button>

				<button
					@click="event => handleClick(event)"
					class="calc__zeros__one"
					type="button">
					{{ zero }}
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="sass" scoped>
@use "./../styles/_variables" as *
@use "./../styles/_mixins" as *
@use "sass:color"

.calc
    &__numbers
        @include dFlex()
        & button
            background-color: $btn-numbers
            color: $main-text-color
            font-size: 0.85em
            transition: background-color 0.2s ease-out
            &:hover
                background-color: color.adjust($btn-numbers, $lightness: 3%)
            &:active
                background-color: color.adjust($btn-numbers, $lightness: 12%)

        &__ctn
            width: 90%
            margin: 1.2rem 1rem
            display: grid
            grid-template-columns: 3fr 0.8425fr
            gap: 1.4rem

    &__list
        display: grid
        grid-template-columns: repeat(3, 1fr)
        grid-template-rows: repeat(3, 1fr)
        gap: 1.4rem

    &__zeros
        display: grid
        grid-template-columns: 1fr
        grid-template-rows: repeat(3, 1fr)
        gap: 1.4rem
</style>

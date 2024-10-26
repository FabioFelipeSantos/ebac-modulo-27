<script setup lang="ts">
const numbers: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3];
const zeros: string[] = ["000", "00"];
const zero: number = 0;

type Operation = {
	operation: string;
	style: "gray gray-green" | "gray gray-red" | "gray gray-white" | "green-white";
};

const operators: Operation[] = [
	{
		operation: "+",
		style: "gray gray-green",
	},
	{
		operation: "×",
		style: "gray gray-green",
	},
	{
		operation: "–",
		style: "gray gray-green",
	},
	{
		operation: "÷",
		style: "gray gray-green",
	},
];
const specialOperators: Operation[] = [
	{
		operation: "%",
		style: "gray gray-green",
	},
	{
		operation: "()",
		style: "gray gray-green",
	},
	{
		operation: "C",
		style: "gray gray-red",
	},
	{
		operation: "CE",
		style: "gray gray-red",
	},
];
const others: Operation[] = [
	{
		operation: ",",
		style: "gray gray-white",
	},
	{
		operation: "=",
		style: "green-white",
	},
	{
		operation: "+/-",
		style: "gray gray-white",
	},
];

function addingSpecificClassToButton(operator: Operation): string {
	switch (operator.operation) {
		case ",": {
			return `${operator.style} ${operator.style}--1`;
		}
		case "=": {
			return `${operator.style} ${operator.style}--2`;
		}
		case "+/-": {
			return `${operator.style} ${operator.style}--3`;
		}
		default: {
			return `${operator.style}`;
		}
	}
}
</script>

<template>
	<div class="calc__bg container">
		<div class="calc__screen">
			<div class="calc__screen__main">
				<div class="calc__screen__result">123456789</div>
			</div>
			<div class="calc__screen__second bdr-b">
				<div class="calc__screen__list">123456789</div>
			</div>
		</div>

		<div class="calc__numbers">
			<div class="calc__numbers__ctn">
				<div class="calc__list">
					<button
						v-for="num in numbers"
						:key="num"
						class="calc__list__button"
						type="button">
						{{ num }}
					</button>
				</div>

				<div class="calc__zeros">
					<button
						v-for="zero in zeros"
						:key="zero"
						class="calc__zeros__two-three"
						type="button">
						{{ zero }}
					</button>

					<button
						class="calc__zeros__one"
						type="button">
						{{ zero }}
					</button>
				</div>
			</div>
		</div>

		<div class="calc__operations">
			<div class="calc__operators">
				<button
					v-for="op in operators"
					:key="op.operation"
					:class="op.style"
					class="calc__button"
					type="button">
					{{ op.operation }}
				</button>
			</div>

			<div class="calc__special-operators">
				<button
					v-for="op in specialOperators"
					:key="op.operation"
					:class="op.style"
					class="calc__button"
					type="button">
					{{ op.operation }}
				</button>
			</div>

			<div class="calc__others">
				<button
					v-for="op in others"
					:key="op.operation"
					:class="addingSpecificClassToButton(op)"
					class="calc__button"
					type="button">
					{{ op.operation }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="sass">
@use "./styles/_variables" as *
@use "./styles/_mixins" as *

.calc
    &__operations
        padding: 0.8rem
        display: grid
        grid-template-columns: repeat(3, 1fr)
        gap: 0.4rem
        & button
            width: 90%
            height: 70%
            margin: 1rem 0
    &__operators, &__special-operators, &__others
        display: grid
        grid-template-columns: repeat(2, 1fr)
        justify-items: center
        align-items: center
        column-gap: 0.4rem
        row-gap: 0


.gray
    background: $btn-operators-gray
    &-green
        color: $operators-color
    &-white
        color: $main-text-color
    &-red
        color: hsl(0, 100%, 65%)

.green-white
    background: $btn-operators-green
    color: $main-text-color
    &--2
        grid-area: 1 / 2 / 3 / 3

.calc
    &__numbers
        @include dFlex()
        & button
            background-color: $btn-numbers
            color: $main-text-color
            font-size: 0.85em

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

.calc__bg
    margin: 1rem auto
    padding: 1.2rem
    background-color: $body-bg-primary
    border-radius: 1.4rem
    @include dFlex($dir: column, $g: 2rem)

.calc__screen, .calc__numbers, .calc__operations
    width: 100%
    background-color: $calc-main-screen-bg-color
    border-radius: 0.8rem

.calc
    &__screen
        @include dFlex($dir: column, $ai: flex-end, $g: 1.6rem)
        &__main
            width: 88%
            min-height: 8.5rem
            max-height: 13vh
            height: 11vh
            margin-top: 1rem
            margin-right: 1rem
            @include dFlex($jc: flex-end, $ai: center, $g: 0)
            border-radius: 0.6rem
            background-color: $calc-result-bg-color
        &__result
            margin: 1rem
            text-align: right
            letter-spacing: 0.3rem
            font-size: 1.5em
        &__second
            width: 58%
            min-height: 6.5rem
            max-height: 8vh
            height: 100%
            overflow-y: auto
            margin-right: 1rem
            margin-bottom: 1rem
            border-radius: 0.6rem
            background-color: $calc-result-bg-color
        &__list
            height: 100%
            margin: 0.8rem 1rem
            font-size: 0.65em
            text-align: right

    @media (min-width: $sm)
        &__screen
            &__main
                width: 90%
                max-height: 16vh
                height: 15vh
                margin-top: 2rem
                margin-right: 2rem
            &__result
                font-size: 2em
            &__second
                width: 62%
                max-height: 12vh
                height: 12vh
                margin-bottom: 2rem
                margin-right: 2rem
            &__list
                margin-right: 1rem
                font-size: 0.8em

    @media (min-width: $md)
        &__screen
            &__main
                width: 92%
                max-height: 18vh
                height: 18vh
            &__result
                margin-right: 2rem
                font-size: 2.2em
            &__second
                width: 69%
                max-height: 14vh
                height: 14vh
            &__list
                margin-right: 2rem
                font-size: 0.8em

    @media (min-width: $lg)
        &__screen
            &__result
                font-size: 2.4em
            &__list
                font-size: 0.85em


.bdr
    &-r
        border: 1px solid #f55
    &-b
        border: 1px solid #55f
    &-g
        border: 1px solid #5f5
</style>

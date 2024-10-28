<script setup lang="ts">
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
		operation: "*",
		style: "gray gray-green",
	},
	{
		operation: "-",
		style: "gray gray-green",
	},
	{
		operation: "/",
		style: "gray gray-green",
	},
];
const specialOperators: Operation[] = [
	{
		operation: "C",
		style: "gray gray-red",
	},
	{
		operation: "CE",
		style: "gray gray-red",
	},
	{
		operation: "%",
		style: "gray gray-green",
	},
];
const openParenthesis = {
	operation: "(",
	style: "gray gray-green",
};
const closeParenthesis = {
	operation: ")",
	style: "gray gray-green",
};
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

interface Props {
	handleEnteringOperation(operation: string): void;
	finalResult: string;
}

const props = defineProps<Props>();

function handleClick(event: MouseEvent) {
	if (event.target) {
		const target = event.target as HTMLButtonElement;
		const operation = target.textContent as string;
		props.handleEnteringOperation(operation);
	}
}
</script>

<template>
	<div class="calc__operations">
		<div class="calc__operators">
			<button
				@click="event => handleClick(event)"
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
				@click="event => handleClick(event)"
				v-for="op in specialOperators"
				:key="op.operation"
				:class="op.style"
				class="calc__button"
				type="button">
				{{ op.operation }}
			</button>
			<div class="calc__special-operators__parenthesis">
				<button
					@click="event => handleClick(event)"
					:class="openParenthesis.style"
					class="calc__button"
					type="button">
					{{ openParenthesis.operation }}
				</button>
				<button
					@click="event => handleClick(event)"
					:class="closeParenthesis.style"
					class="calc__button"
					type="button">
					{{ closeParenthesis.operation }}
				</button>
			</div>
		</div>

		<div class="calc__others">
			<button
				@click="event => handleClick(event)"
				v-for="op in others"
				:key="op.operation"
				:class="addingSpecificClassToButton(op)"
				:disabled="op.operation === '=' && props.finalResult !== ''"
				class="calc__button"
				type="button">
				{{ op.operation }}
			</button>
		</div>
	</div>
</template>

<style lang="sass" scoped>
@use "./../styles/_variables" as *
@use "./../styles/_mixins" as *
@use "sass:color"

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
    &__special-operators__parenthesis
        width: 100%
        height: 100%
        display: grid
        grid-template-columns: repeat(2, 1fr)
        justify-items: center
        align-items: center


.calc__operators > button
    font-size: 0.8em

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

button[disabled]
    opacity: 0.2
    &:hover
        cursor: default
</style>

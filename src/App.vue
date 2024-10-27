<script setup lang="ts">
import { reactive } from "vue";
import MainScreen from "./components/MainScreen.vue";
import NumbersButtons from "./components/NumbersButtons.vue";
import OperatorsButtons from "./components/OperatorsButtons.vue";

type States = {
	enteredCalculation: string[];
	listOfPastCalculations: string[];
};

const states: States = reactive({
	enteredCalculation: [""],
	listOfPastCalculations: [
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
		"1 + 2",
		"2 - 5",
	],
});

function handleClickingOnPastComputation(value: string): void {
	states.enteredCalculation = [];
	states.enteredCalculation.push(value);
	console.log("enteredCalculation: ", states.enteredCalculation);
}

function handleEnteringNumbers(pressedButton: string) {
	const lastEnteredItem = states.enteredCalculation[states.enteredCalculation.length - 1];
	const convertedItem: number = Number(lastEnteredItem);
	if (lastEnteredItem === "") {
		states.enteredCalculation[states.enteredCalculation.length - 1] = pressedButton;
	} else if (!Number.isNaN(convertedItem)) {
		states.enteredCalculation.pop();
		states.enteredCalculation.push(lastEnteredItem + pressedButton);
	} else {
		states.enteredCalculation.push(pressedButton);
	}
	//
	console.log("Number entered: ", states.enteredCalculation);
}

function handleOperation(operation: string): void {
	const [lastEnteredItem] = states.enteredCalculation[states.enteredCalculation.length - 1];
	const mathOperations: string[] = ["+", "-", "*", "/"];
	if (mathOperations.includes(operation)) {
		if (lastEnteredItem === "") {
			states.enteredCalculation[states.enteredCalculation.length - 1] = operation;
			return;
		} else {
			states.enteredCalculation.push(operation);
			states.enteredCalculation.push("");
			return;
		}
	}

	switch (operation) {
		case "%": {
			// [ [-3] "123", [-2] "+ or - or *", [-1] "25" ] and then we pressed %
			try {
				const numberToCalculatePercentage = Number(
					states.enteredCalculation[states.enteredCalculation.length - 3],
				);

				if (Number.isNaN(numberToCalculatePercentage)) {
					throw new Error(
						"Você precisa ter entrado um número válido antes do sinal logo antes do valor a ser calculado a porcentagem.\n\nExemplo: 100 + 25%\n\nAqui queremos somar 25% de 100 ao próprio 100, cujo resultado será 125!",
					);
				} else {
					const beforeOperation = states.enteredCalculation[states.enteredCalculation.length - 2];

					const percentage = states.enteredCalculation[states.enteredCalculation.length - 1];

					let multiplyBy;

					if (beforeOperation === "+" || beforeOperation === "-") {
						multiplyBy = eval(`1 + ${beforeOperation} + (${percentage} / 100)`);
					} else if (beforeOperation === "*") {
						multiplyBy = eval(`${percentage} / 100`);
					} else {
						multiplyBy = eval(`1 / (${percentage} / 100 )`);
					}

					states.enteredCalculation.splice(
						-3,
						3,
						(numberToCalculatePercentage * multiplyBy).toString(),
					);
				}
			} catch (error) {
				alert(error);
			}
		}
	}
}
</script>

<template>
	<div class="calc__bg container">
		<MainScreen
			:result="states.enteredCalculation"
			:list="states.listOfPastCalculations"
			:handleListClick="handleClickingOnPastComputation" />

		<NumbersButtons :handleEnteredValue="handleEnteringNumbers" />

		<OperatorsButtons :handleEnteringOperation="handleOperation" />
	</div>
</template>

<style lang="sass">
@use "./styles/_variables" as *
@use "./styles/_mixins" as *

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

.bdr
    &-r
        border: 1px solid #f55
    &-b
        border: 1px solid #55f
    &-g
        border: 1px solid #5f5
</style>

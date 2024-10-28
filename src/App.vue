<script setup lang="ts">
import { reactive } from "vue";
import MainScreen from "./components/MainScreen.vue";
import NumbersButtons from "./components/NumbersButtons.vue";
import OperatorsButtons from "./components/OperatorsButtons.vue";

type States = {
	enteredCalculation: string[];
	finalResult: string;
	listOfPastCalculations: string[][];
};

const states: States = reactive({
	enteredCalculation: [""],
	finalResult: "",
	listOfPastCalculations: [],
});

function handleClickingOnPastComputation(value: string[]): void {
	if (states.finalResult !== "") states.finalResult = "";

	states.enteredCalculation = [];
	states.enteredCalculation.push(...value);
}

function handleEnteringNumbers(pressedButton: string) {
	if (states.finalResult !== "") states.finalResult = "";

	const lastEnteredItem = states.enteredCalculation[states.enteredCalculation.length - 1];
	const convertedItem: number = Number(lastEnteredItem);

	if (
		lastEnteredItem === "" ||
		lastEnteredItem === "." ||
		lastEnteredItem === "-" ||
		lastEnteredItem === "-."
	) {
		states.enteredCalculation[states.enteredCalculation.length - 1] += pressedButton;
	} else if (!Number.isNaN(convertedItem)) {
		states.enteredCalculation.pop();
		states.enteredCalculation.push(lastEnteredItem + pressedButton);
	} else {
		states.enteredCalculation.push(pressedButton);
	}
}

function handleOperation(operation: string): void {
	if (operation !== "CE" && operation !== "C") {
		if (states.finalResult !== "") states.finalResult = "";
	}
	const lastEnteredItem = states.enteredCalculation[states.enteredCalculation.length - 1];
	const beforeLastItem = states.enteredCalculation[states.enteredCalculation.length - 2];
	const mathOperations: string[] = ["+", "-", "*", "/"];

	if (mathOperations.includes(operation)) {
		try {
			if (lastEnteredItem === "") {
				if (states.enteredCalculation.length <= 1) {
					throw new Error("Você ainda não digitou nenhum valor numérico.");
				} else {
					if (mathOperations.includes(beforeLastItem)) {
						throw new Error(
							"Não entre com duas operações em sequência. Se for necessário, abra um parêntesis antes.",
						);
					}
				}
			} else {
				const tryingToConvertLastItem = Number(lastEnteredItem);
				if (Number.isNaN(tryingToConvertLastItem)) {
					throw new Error(
						"Entre com um valor numérico válido antes de adicionar uma operação matemática.",
					);
				}
			}
			states.enteredCalculation.push(operation);
			states.enteredCalculation.push("");
		} catch (error) {
			alert(error);
		}
	} else if (operation === "(") {
		if (lastEnteredItem !== "") {
			states.enteredCalculation[states.enteredCalculation.length - 1] += " *";
			states.enteredCalculation.push("(");
		} else {
			states.enteredCalculation[states.enteredCalculation.length - 1] += "(";
		}
		states.enteredCalculation.push("");
	} else if (operation === ")") {
		try {
			const beforeLastItem = states.enteredCalculation[states.enteredCalculation.length - 2];
			if (lastEnteredItem === "" && beforeLastItem !== ")") {
				throw new Error(
					"Para fechar parêntesis, certifique-se de que antes do parêntese final estará um número, e não somente uma operação.",
				);
			}

			let numberOpenParenthesis = 0;
			let index = 0;
			while (index < states.enteredCalculation.length) {
				if (states.enteredCalculation[index] === "(") {
					numberOpenParenthesis++;
				} else if (states.enteredCalculation[index] === ")") {
					numberOpenParenthesis--;
				}
				index++;
			}
			if (numberOpenParenthesis === 0) {
				throw new Error(
					"Certifique-se de que para fechar o parêntesis, você esteja com pelo menos um outro parêntesis aberto antes de tentar fecha-lo.",
				);
			}

			states.enteredCalculation.push(")", "");
		} catch (error) {
			alert(error);
		}
	} else if (operation === "%") {
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
				let multiplyBy;
				if (beforeOperation === "+" || beforeOperation === "-") {
					multiplyBy = eval(`1 + ${beforeOperation} + (${lastEnteredItem} / 100)`);
				} else if (beforeOperation === "*") {
					multiplyBy = eval(`${lastEnteredItem} / 100`);
				} else {
					multiplyBy = eval(`1 / (${lastEnteredItem} / 100 )`);
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
	} else if (operation === ",") {
		try {
			if (states.enteredCalculation.length === 0) {
				states.enteredCalculation.push(".");
				return;
			}

			if (lastEnteredItem === "") {
				if (states.enteredCalculation.length > 1) {
					if (beforeLastItem !== "(") {
						if (!mathOperations.includes(beforeLastItem)) {
							throw new Error(
								"Certifique-se de colocar uma operação antes de entrar com um valor decimal.",
							);
						}
					}
				}
				states.enteredCalculation[states.enteredCalculation.length - 1] += ".";
			} else {
				states.enteredCalculation[states.enteredCalculation.length - 1] += ".";
			}
		} catch (error) {
			alert(error);
		}
	} else if (operation === "+/-") {
		try {
			const beforeLastItem = states.enteredCalculation[states.enteredCalculation.length - 2];
			if (lastEnteredItem === "") {
				if (states.enteredCalculation.length > 1) {
					if (!mathOperations.includes(beforeLastItem) && beforeLastItem !== "(") {
						throw new Error(
							"Certifique-se de colocar uma operação antes de alterar o sinal do número já digitado.",
						);
					} else if (beforeLastItem === "(") {
						states.enteredCalculation[states.enteredCalculation.length - 1] += "-";
					} else {
						states.enteredCalculation.push("(", "-");
					}
				} else if (states.enteredCalculation.length === 1) {
					states.enteredCalculation[states.enteredCalculation.length - 1] += "-";
				} else {
					states.enteredCalculation.push("-");
				}
			} else {
				if (states.enteredCalculation.length === 0) {
					states.enteredCalculation.push("-");
				} else {
					const valueAlreadyStored = states.enteredCalculation.pop();
					if (valueAlreadyStored === ".") {
						states.enteredCalculation.push("-" + valueAlreadyStored);
					} else if (valueAlreadyStored === "-") {
						states.enteredCalculation.push("");
					} else if (valueAlreadyStored === "(") {
						states.enteredCalculation.push(valueAlreadyStored, "-");
					} else {
						const convertedValue = Number(valueAlreadyStored);
						if (convertedValue > 0) {
							if (states.enteredCalculation.length === 0) {
								states.enteredCalculation.push("-" + valueAlreadyStored);
							} else {
								if (beforeLastItem !== "(") {
									states.enteredCalculation.push("(", "-" + valueAlreadyStored);
								} else {
									states.enteredCalculation.push("-" + valueAlreadyStored);
								}
							}
						} else {
							states.enteredCalculation.push((convertedValue * -1).toString());
						}
					}
				}
				console.log(states.enteredCalculation);
				// if () {
				// 	if (states.enteredCalculation.length === 1) {
				// 		states.enteredCalculation[states.enteredCalculation.length - 1] += "-";
				// 	} else {
				// 		states.enteredCalculation.push("(", "-" + valueAlreadyStored);
				// 	}
				// } else {
				//
				// }
			}
		} catch (error) {
			alert(error);
		}
	} else if (operation === "CE") {
		if (states.finalResult !== "") {
			states.finalResult = "";
			return;
		}

		try {
			if (lastEnteredItem === "") {
				if (states.enteredCalculation.length <= 1) {
					throw new Error("Ainda não foi digitado nenhuma entrada para ser apagada.");
				} else {
					states.enteredCalculation.pop();
					states.enteredCalculation.pop();
				}
			} else {
				states.enteredCalculation.pop();
			}
		} catch (error) {
			alert(error);
		}
	} else if (operation === "C") {
		if (states.finalResult !== "") {
			states.finalResult = "";
			return;
		}
		states.enteredCalculation = [""];
	} else if (operation === "=") {
		try {
			const result: number = eval?.(`"use strict";(${states.enteredCalculation.join("")})`);
			states.finalResult = Number.isInteger(result) ? result.toString() : result.toFixed(9);
			states.listOfPastCalculations.unshift(states.enteredCalculation);
			states.enteredCalculation = [""];
		} catch (error) {
			alert(
				`Confira seus valores antes de calcular. Talvez o erro de sintaxe abaixo possa te ajudar.\n\n${error}`,
			);
		}
	}
}
</script>

<template>
	<div class="calc__bg container">
		<MainScreen
			:valueToBeCalculated="states.enteredCalculation"
			:finalResult="states.finalResult"
			:list="states.listOfPastCalculations"
			:handleListClick="handleClickingOnPastComputation" />

		<NumbersButtons :handleEnteredValue="handleEnteringNumbers" />

		<OperatorsButtons
			:handleEnteringOperation="handleOperation"
			:finalResult="states.finalResult" />
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

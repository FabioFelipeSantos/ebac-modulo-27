<script setup lang="ts">
interface Props {
	result: string[];
	list: string[];
	handleListClick(value: string): void;
}

const props = defineProps<Props>();

function handleListSelection(event: MouseEvent) {
	if (event.target) {
		const target = event.target as HTMLUListElement;
		const text = target.textContent as string;
		props.handleListClick(text);
	}
}
</script>

<template>
	<div class="calc__screen">
		<div class="calc__screen__main">
			<div
				v-if="!props.result.join(' ')"
				class="bar"></div>
			<div
				v-else
				class="calc__screen__result">
				{{ props.result.join(" ") }}
			</div>
		</div>
		<div class="calc__screen__second bdr-b">
			<ul class="calc__screen__list">
				<li
					@click="handleListSelection"
					class="calc__screen__list__item"
					v-for="item in props.list"
					:key="item">
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="sass" scoped>
@use "./../styles/_variables" as *
@use "./../styles/_mixins" as *
@use "sass:color"

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
            margin: 1rem 2rem
            text-align: right
            letter-spacing: 0.3rem
            font-size: 1.2em
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
            font-size: 0.55em
            @include dFlex($jc: flex-end)

            &__item
                text-align: right
                width: 65%
                padding: 0.6rem
                border-radius: 0.6rem
                transition: background-color 0.2s ease-out, cursor 0.2s ease-out
                &:hover
                    background-color: color.adjust($calc-result-bg-color, $lightness: -8%)
                    border: 0.04rem solid #666
                    cursor: pointer

    @media (min-width: $sm)
        &__screen
            &__main
                width: 90%
                max-height: 16vh
                height: 15vh
                margin-top: 2rem
                margin-right: 2rem
            &__result
                font-size: 1.3em
            &__second
                width: 62%
                max-height: 12vh
                height: 12vh
                margin-bottom: 2rem
                margin-right: 2rem
            &__list
                margin-right: 1rem
                font-size: 0.6em

    @media (min-width: $md)
        &__screen
            &__main
                width: 92%
                max-height: 18vh
                height: 18vh
            &__result
                margin-right: 2rem
                font-size: 1.4em
            &__second
                width: 69%
                max-height: 14vh
                height: 14vh
            &__list
                margin-right: 2rem
                font-size: 0.7em

    @media (min-width: $lg)
        &__screen
            &__result
                font-size: 1.6em
            &__list
                font-size: 0.75em

.bar
    width: 0.4%
    height: 0
    opacity: 0
    background-color: $main-text-color
    border: 1px solid $main-text-color
    font-size: 1.8em
    margin-right: 1.2rem
    animation: blinkBar 0.5s infinite alternate
@keyframes blinkBar
    from
        opacity: 0
        height: 0
    to
        height: 35%
        opacity: 1
</style>

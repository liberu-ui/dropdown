<template>
    <div :class="['dropdown', { 'is-active': !closed }]"
        v-click-outside="close"
        @keydown.escape="close"
        @keydown.tab="close">
        <div class="dropdown-trigger"
            @focus="open"
            tabindex="0"
            @click="open">
            <slot name="dropdown-trigger">
                <button class="button">
                    <slot name="label"/>
                    <dropdown-indicator :open="!closed"/>
                </button>
            </slot>
        </div>
        <div class="dropdown-menu"
            :style="widthStyle">
            <div class="dropdown-content no-scrollbars"
                :style="[widthStyle, heightStyle, overflow]"
                @click="attemptClose">
                <slot name="dropdown-content"/>
            </div>
        </div>
    </div>
</template>

<script>
import { clickOutside } from '@enso-ui/directives';
import DropdownIndicator from '@enso-ui/dropdown-indicator';

export default {
    name: 'Dropdown',

    directives: { clickOutside },

    components: { DropdownIndicator },

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '16em',
        },
        manual: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '4.5em',
        },
    },

    data: () => ({
        closed: true,
    }),

    computed: {
        heightStyle() {
            return {
                maxHeight: this.height,
            };
        },
        widthStyle() {
            return {
                minWidth: this.width,
            };
        },
        overflow() {
            return {
                overflow: 'auto',
            };
        },
    },

    methods: {
        close() {
            this.closed = true;
            this.$emit('close');
        },
        toggle() {
            if (!this.disabled) {
                this.closed = !this.closed;
                this.$emit(this.closed ? 'close' : 'open');
            }
        },
        open() {
            if (!this.disabled) {
                this.closed = false;
                this.$emit('open');
            }
        },
        attemptClose() {
            if (!this.closed && !this.manual) {
                this.close();
            }
        },
    },
};

</script>

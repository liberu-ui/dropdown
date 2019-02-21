<template>
    <div class="dropdown is-active"
        v-click-outside="hide">
        <div class="dropdown-trigger"
            @click="hidden = !hidden"
            v-click-outside="attemptHide">
            <button class="button">
                <slot name="label"/>
                <dropdown-indicator v-model="hidden"/>
            </button>
        </div>
        <fade>
            <div class="dropdown-menu menu-list"
                v-if="!hidden"
                :style="widthStyle">
                <div class="dropdown-content has-text-centered"
                    :style="[widthStyle, heightStyle]">
                    <slot/>
                </div>
            </div>
        </fade>
    </div>
</template>

<script>

import vClickOutside from 'v-click-outside';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import { Fade } from '@enso-ui/transitions';

export default {
    directives: {
        clickOutside: vClickOutside.directive,
    },

    components: { DropdownIndicator, Fade },

    props: {
        height: {
            type: Number,
            default: 16,
        },
        manual: {
            type: Boolean,
            default: false,
        },
        width: {
            type: Number,
            default: 4.5,
        },
    },

    data: () => ({
        hidden: true,
    }),

    computed: {
        heightStyle() {
            return {
                'max-height': `${this.height}em`,
            };
        },
        widthStyle() {
            return {
                'min-width': `${this.width}em`,
            };
        },
    },

    methods: {
        hide() {
            this.hidden = true;
        },
        attemptHide() {
            if (!this.manual) {
                this.hide();
            }
        },
    },
};

</script>

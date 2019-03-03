<template>
    <core-dropdown v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{
                widthStyle, heightStyle, overflowStyle, triggerSelector, dropdownSelector,
                visible, open, close, attemptClose,

            }">
            <div class="dropdown is-active"
                :style="widthStyle"
                v-click-outside="close"
                @keydown.escape="close"
                @keydown.tab="close"
                @keydown.enter.prevent="attemptClose">
                <div class="dropdown-trigger"
                    :class="triggerSelector"
                    :style="widthStyle">
                    <slot name="trigger"
                        :open="open">
                        <button class="button input"
                            type="button"
                            @click="open"
                            @keydown.enter.prevent="open">
                        <slot name="label"/>
                            <dropdown-indicator :open="visible"/>
                        </button>
                    </slot>
                </div>
                <fade>
                    <div class="dropdown-menu"
                        :class="dropdownSelector"
                        :style="widthStyle"
                        v-if="visible">
                        <div class="dropdown-content no-scrollbars"
                            :style="widthStyle"
                            @click="attemptClose">
                            <slot name="controls"/>
                            <div class="options"
                                :style="[heightStyle, overflow]">
                                <slot name="options"/>
                            </div>
                        </div>
                    </div>
                </fade>
            </div>
        </template>
    </core-dropdown>
</template>

<script>

import { clickOutside } from '@enso-ui/directives';
import { Fade } from '@enso-ui/transitions';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import CoreDropdown from '../renderless/Dropdown.vue';

export default {
    name: 'Dropdown',

    directives: { clickOutside },

    components: { CoreDropdown, Fade, DropdownIndicator },

    computed: {
        visible() {
            return !this.hidden;
        },
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
};
</script>

<style lang="scss">
    .dropdown .dropdown-trigger {
        .button.input {
            width: 100%;
            justify-content: flex-start;
            line-height: 1.5;
            padding-bottom: calc(0.375em - 1px);
            padding-left: calc(0.625em - 1px);
            padding-right: calc(0.625em - 1px);
            padding-top: calc(0.375em - 1px);

            .angle {
                position: absolute;
                top: 0.33rem;
                right: 0.5rem;
            }
        }
    }
</style>

<template>
    <core-dropdown v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{
                triggerSelector, dropdownSelector, visible, open, close,
                attemptClose, dropdownEvents,
            }">
            <div class="dropdown is-active"
                v-click-outside="close"
                v-on="dropdownEvents">
                <div class="dropdown-trigger"
                    :class="triggerSelector">
                    <slot name="trigger"
                        :open="open"
                        :visible="visible">
                        <button class="button input"
                            type="button"
                            @click="open">
                            <slot name="label"/>
                            <dropdown-indicator :open="visible"/>
                        </button>
                    </slot>
                </div>
                <fade>
                    <div class="dropdown-menu"
                        :class="dropdownSelector"
                        v-if="visible">
                        <div class="dropdown-content"
                            @click="attemptClose">
                            <slot name="controls"/>
                            <div class="options no-scrollbars">
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
};
</script>

<style lang="scss">
    .dropdown {
        .dropdown-trigger {
            .button.input {
                min-width: 4em;
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

        .dropdown-content {
            width: fit-content;
            .options {
                width: inherit;
            }
        }
    }
</style>

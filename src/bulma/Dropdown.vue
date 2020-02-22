<template>
    <core-dropdown v-bind="$attrs"
        dropdown-selector=".dropdown-menu"
        item-selector=".dropdown-item"
        v-on="$listeners">
        <template v-slot:default="{ dropdownEvents, hide, open, opensBottom, show, triggerEvents }">
            <div class="dropdown is-active vue-dropdown"
                :class="{ 'is-up': !opensBottom }"
                v-click-outside="hide"
                v-on="dropdownEvents">
                <div class="dropdown-trigger">
                    <slot name="trigger"
                        :open="open"
                        :show="show"
                        :trigger-events="triggerEvents">
                        <button class="button input"
                            type="button"
                            v-on="triggerEvents">
                            <slot name="label"/>
                            <dropdown-indicator :open="open"/>
                        </button>
                    </slot>
                </div>
                <fade>
                    <div class="dropdown-menu zoom"
                        v-if="open">
                        <div class="dropdown-content">
                            <slot name="controls"/>
                            <div class="items no-scrollbars">
                                <slot name="items"/>
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
import CoreDropdown from '../renderless/CoreDropdown.vue';

export default {
    name: 'Dropdown',

    directives: { clickOutside },

    components: { CoreDropdown, Fade, DropdownIndicator },
};
</script>

<style lang="scss">

    .dropdown.vue-dropdown {
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
                    [dir='ltr'] & {
                        right: 0.5rem;
                    }
                    [dir='rtl'] & {
                        left: 0.5rem;
                    }
                }
            }
        }

        .dropdown-menu {
            min-width: unset;
        }

        .dropdown-content {
            width: fit-content;
            .items {
                max-height: 12.4em;
                overflow: auto;
                width: inherit;
            }
        }
    }

</style>

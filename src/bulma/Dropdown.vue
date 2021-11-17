<template>
    <core-dropdown v-bind="$attrs"
        ref="dropdown">
        <template #default="{
            dropdownEvents, hide, open, opensBottom, selection, show, triggerEvents
        }">
            <div class="dropdown is-active vue-dropdown"
                :class="{ 'is-up': !opensBottom }"
                v-click-outside="hide"
                v-on="dropdownEvents">
                <div class="dropdown-trigger">
                    <slot name="trigger"
                        :hide="hide"
                        :open="open"
                        :show="show"
                        :selection="selection"
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
                    <div class="dropdown-menu"
                        v-if="open">
                        <div class="dropdown-content">
                            <slot name="controls"
                                :hide="hide"/>
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
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { clickOutside } from '@enso-ui/directives';
import { Fade } from '@enso-ui/transitions';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import CoreDropdown from '../renderless/CoreDropdown.vue';

export default {
    name: 'Dropdown',

    directives: { clickOutside },

    components: {
        Fa, CoreDropdown, Fade, DropdownIndicator,
    },

    methods: {
        hide() {
            this.$refs.dropdown.hide();
        },
        show() {
            this.$refs.dropdown.show();
        },
    },
};
</script>

<style lang="scss">

    .dropdown.vue-dropdown {
        .dropdown-trigger {
            .button.input {
                min-width: 4em;
                justify-content: flex-start;
                line-height: 1.5;

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

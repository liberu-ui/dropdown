<template>
    <div class="dropdown is-active vue-dropdown"
        :class="[{'is-up': isUp}, $attrs.class]">
        <core-dropdown v-bind="$attrs"
            ref="dropdown">
            <template #default="{
                keydown, hide, open, selection, show, triggerEvents,
            }">
                <div class="dropdown-trigger"
                    v-on="keydown">
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
                        v-on="keydown"
                        v-click-outside="hide"
                        v-fits-below="fitsBelow"
                        v-if="open">
                        <div class="dropdown-content">
                            <slot name="controls"
                                :keydown="keydown"
                                :hide="hide"/>
                            <div class="items no-scrollbars">
                                <slot name="items"/>
                            </div>
                        </div>
                    </div>
                </fade>
            </template>
        </core-dropdown>
    </div>
</template>

<script>
import { clickOutside, fitsBelow } from '@enso-ui/directives';
import { Fade } from '@enso-ui/transitions';
import DropdownIndicator from '@enso-ui/dropdown-indicator';
import CoreDropdown from '../renderless/CoreDropdown.vue';

export default {
    name: 'Dropdown',

    directives: { clickOutside, fitsBelow },

    components: {
        CoreDropdown, Fade, DropdownIndicator,
    },

    inheritAttrs: false,

    data: () => ({
        isUp: false,
    }),

    methods: {
        hide() {
            this.$refs.dropdown.hide();
        },
        fitsBelow(state) {
            this.isUp = !state;
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

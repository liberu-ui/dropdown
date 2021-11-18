<template>
    <core-dropdown-item #default="{ current, events, selected }"
        v-bind="$attrs">
        <a class="dropdown-item"
            :class="{ 'is-active': selected, 'has-background-light': current && !selected }"
            v-on="events">
            <slot name="default"
                :current="current"/>
        </a>
    </core-dropdown-item>
</template>

<script>
import CoreDropdownItem from '../renderless/CoreDropdownItem.vue';

export default {
    name: 'DropdownItem',

    components: { CoreDropdownItem },
};
</script>

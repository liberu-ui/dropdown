<script>
export default {
    name: 'CoreDropdownItem',

    inject: ['register'],

    props: {
        current: {
            type: Boolean,
            default: false,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },

    created() {
        this.register(this);
    },

    methods: {
        select() {
            this.$emit('select');
        },
    },

    render() {
        return this.$scopedSlots.default({
            current: this.current,
            events: {
                click: () => this.$emit('click'),
                mouseenter: () => this.$emit('mouseenter'),
            },
            selected: this.selected,
        });
    },
};
</script>

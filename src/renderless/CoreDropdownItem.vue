<script>
export default {
    name: 'CoreDropdownItem',

    inject: ['attemptHide', 'disableControls', 'deregister', 'itemSelector', 'makeCurrent', 'register'],

    props: {
        selected: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        current: false,
    }),

    created() {
        this.register(this);
    },

    beforeDestroy() {
        this.deregister(this);
    },

    mounted() {
        this.$el.__item__ = this;
        this.$el.setAttribute(this.itemSelector, true);
    },

    methods: {
        select() {
            if (!this.disableControls) {
                this.$emit('select');
                this.attemptHide();
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            current: this.current,
            events: {
                click: this.select,
                mouseenter: () => this.makeCurrent(this),
            },
            selected: this.selected,
        });
    },
};
</script>

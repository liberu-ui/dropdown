<script>
export default {
    name: 'CoreDropdown',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        manual: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        hidden: true,
        triggerSelector: 'trigger-selector',
        dropdownSelector: 'dropdown-selector',
    }),

    computed: {
        visible() {
            return !this.hidden;
        },
    },

    watch: {
        disabled(disabled) {
            if (disabled) {
                this.close();
            }
        },
    },

    methods: {
        open() {
            if (this.hidden && !this.disabled) {
                this.hidden = false;
                this.$emit('open');
            }
        },
        close() {
            if (this.visible) {
                this.hidden = true;
                this.$emit('close');
            }
        },
        attemptClose() {
            if (!this.manual) {
                this.close();
            }
        },
    },

    render() {
        return this.$scopedSlots.default({
            triggerSelector: this.triggerSelector,
            dropdownSelector: this.dropdownSelector,
            visible: this.visible,
            open: this.open,
            close: this.close,
            attemptClose: this.attemptClose,
            dropdownEvents: {
                keydown: (e) => {
                    switch (e.key) {
                    case 'Escape': case 'Tab':
                        this.close();
                        break;
                    case 'Enter':
                        e.preventDefault();
                        if (this.hidden) {
                            this.open();
                            break;
                        }
                        this.attemptClose();
                        break;
                    default:
                        break;
                    }
                },
            },
        });
    },
};
</script>

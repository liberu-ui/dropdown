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
        opensDown: true,
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
        visible(visible) {
            if (!visible) {
                return;
            }

            this.opensDown = true;

            this.$nextTick(() => {
                this.updateOpenDirection();
            });
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
        updateOpenDirection() {
            const dropdown = this.$el.querySelector(`.${this.dropdownSelector}`);

            if (dropdown) {
                const rect = dropdown.getBoundingClientRect();

                this.opensDown = rect.top >= 0 && rect.bottom
                    <= (window.innerHeight || document.documentElement.clientHeight);
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
            opensUp: !this.opensDown,
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

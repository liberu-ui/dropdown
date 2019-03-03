<script>
import Popper from 'popper.js';

export default {
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        height: {
            type: String,
            default: '16em',
        },
        manual: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '4.5em',
        },
    },

    data: () => ({
        hidden: true,
        popper: null,
        triggerSelector: 'trigger-selector',
        dropdownSelector: 'dropdown-selector',
    }),

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
        overflowStyle() {
            return {
                overflow: 'auto',
            };
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

                this.$nextTick(() => {
                    this.initPopper();
                });
            }
        },
        close() {
            if (this.visible) {
                this.hidden = true;
                this.$emit('close');
                this.destroyPopper();
            }
        },
        attemptClose() {
            if (!this.manual) {
                this.close();
            }
        },
        initPopper() {
            const reference = this.$el.querySelector(`.${this.triggerSelector}`);
            const popper = this.$el.querySelector(`.${this.dropdownSelector}`);

            this.popper = new Popper(reference, popper, {
                placement: 'bottom',
            });
        },
        destroyPopper() {
            this.popper.destroy();
            this.popper = null;
        },
    },

    render() {
        return this.$scopedSlots.default({
            widthStyle: this.widthStyle,
            heightStyle: this.heightStyle,
            overflowStyle: this.overflowStyle,
            triggerSelector: this.triggerSelector,
            dropdownSelector: this.dropdownSelector,
            visible: this.visible,
            open: this.open,
            close: this.close,
            attemptClose: this.attemptClose,
        });
    },
};
</script>

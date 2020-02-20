<script>
export default {
    name: 'CoreDropdown',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        dropdownSelector: {
            type: String,
            required: true,
        },
        itemSelector: {
            type: String,
            required: true,
        },
        manual: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        currentIndex: 0,
        items: [],
        open: false,
        opensBottom: true,
    }),

    watch: {
        disabled(disabled) {
            if (disabled) {
                this.hide();
            }
        },
        open(open) {
            if (open) {
                this.opensBottom = true;
                this.$nextTick(() => {
                    this.opensBottom = this.shouldOpenBeneath();
                });
            }
        },
    },

    methods: {
        attemptHide() {
            if (!this.manual) {
                this.hide();
            }
        },
        hide() {
            if (this.open) {
                this.open = false;
                this.currentIndex = 0;
                this.items = [];
                this.$emit('hide');
            }
        },
        keydown(e) {
            switch (e.key) {
            case 'Escape': case 'Tab':
                this.hide();
                break;
            case 'ArrowDown':
                this.nextIndex();
                e.preventDefault();
                break;
            case 'ArrowUp':
                this.previousIndex();
                e.preventDefault();
                break;
            case 'Enter':
                e.preventDefault();
                if (!this.open) {
                    this.show();
                    break;
                }
                this.select(this.currentIndex);
                this.attemptHide();
                break;
            default:
                break;
            }
        },
        nextIndex() {
            if (this.disabled || this.items.length === 0) {
                return;
            }

            const index = this.currentIndex + 1 > this.items.length - 1
                ? 0
                : this.currentIndex + 1;

            this.updateCurrent(index);
            this.scrollIntoView();
        },
        previousIndex() {
            if (this.disabled || this.items.length === 0) {
                return;
            }

            const index = this.currentIndex === 0
                ? this.items.length - 1
                : this.currentIndex - 1;

            this.updateCurrent(index);
            this.scrollIntoView();
        },
        register(item) {
            this.items.push(item);
        },
        scrollIntoView() {
            const items = this.$el.querySelectorAll(this.itemSelector);

            items[this.currentIndex]
                .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        },
        select(index) {
            this.items[index].select();
            this.attemptHide();
        },
        show() {
            if (!this.open && !this.disabled) {
                this.open = true;
                this.$emit('show');
            }
        },
        toggle() {
            if (this.open) {
                this.hide();
            } else {
                this.show();
            }
        },
        updateCurrent(index) {
            this.currentIndex = index;
            this.$emit('update-index', index);
        },
        shouldOpenBeneath() {
            const dropdown = this.$el.querySelector(this.dropdownSelector);

            if (dropdown) {
                const bounding = dropdown.getBoundingClientRect();

                return bounding.top >= 0 && bounding.bottom
                    <= (window.innerHeight || document.documentElement.clientHeight);
            }

            return true;
        },
    },

    provide() {
        return {
            register: this.register,
        };
    },

    render() {
        return this.$scopedSlots.default({
            dropdownEvents: { keydown: this.keydown },
            hide: this.hide,
            itemBindings: (selected, index) => ({
                selected,
                current: index === this.currentIndex,
            }),
            itemEvents: index => ({
                click: () => this.select(index),
                mouseenter: () => this.updateCurrent(index),
            }),
            open: this.open,
            opensBottom: this.opensBottom,
            show: this.show,
            triggerEvents: { click: this.toggle },
        });
    },
};
</script>

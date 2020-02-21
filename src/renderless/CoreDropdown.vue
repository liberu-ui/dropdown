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
        manual: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        items: [],
        open: false,
        opensBottom: true,
    }),

    computed: {
        current() {
            return this.items[this.currentIndex];
        },
        currentIndex() {
            return this.items.findIndex(({ current }) => current);
        },
    },

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
        deregister(item) {
            // eslint-disable-next-line no-underscore-dangle
            let index = this.items.findIndex(({ _uid }) => _uid === item._uid);
            this.items.splice(index, 1);
            const count = this.items.length;

            if (item.current && count > 0) {
                index = count >= index
                    ? index
                    : count - 1;

                this.items[index].current = true;
            }
        },
        hide() {
            if (this.open) {
                this.open = false;
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
                this.select();
                this.attemptHide();
                break;
            default:
                break;
            }
        },
        makeCurrent({ _uid }) {
            this.items.forEach(item => (item.current = item._uid === _uid));

            this.scrollIntoView();
        },
        nextIndex() {
            if (this.disabled || this.items.length === 0) {
                return;
            }

            const index = this.currentIndex + 1 > this.items.length - 1
                ? 0
                : this.currentIndex + 1;

            this.makeCurrent(this.items[index]);
        },
        previousIndex() {
            if (this.disabled || this.items.length === 0) {
                return;
            }

            const index = this.currentIndex === 0
                ? this.items.length - 1
                : this.currentIndex - 1;

            this.makeCurrent(this.items[index]);
        },
        register(item) {
            if (this.items.length === 0) {
                item.current = true;
            }

            this.items.push(item);
        },
        scrollIntoView() {
            if (this.current) {
                this.current.$el
                    .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        },
        select() {
            this.current.select();
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
            attemptHide: this.attemptHide,
            deregister: this.deregister,
            makeCurrent: this.makeCurrent,
            register: this.register,
        };
    },

    render() {
        return this.$scopedSlots.default({
            dropdownEvents: { keydown: this.keydown },
            hide: this.hide,
            open: this.open,
            opensBottom: this.opensBottom,
            show: this.show,
            triggerEvents: { click: this.toggle },
        });
    },
};
</script>

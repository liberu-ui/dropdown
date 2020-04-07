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
            default: 'dropdown',
        },
        itemSelector: {
            type: String,
            default: 'dropdown-item',
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
            return this.items.find(({ current }) => current);
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

    mounted() {
        this.$el.setAttribute(this.dropdownSelector, true);
    },

    methods: {
        attemptHide() {
            if (!this.manual) {
                this.hide();
            }
        },
        currentIndex() {
            return this.renderedItems().findIndex(item => item.current);
        },
        deregister(item) {
            // eslint-disable-next-line no-underscore-dangle
            const index = this.items.findIndex(({ _uid }) => _uid === item._uid);

            this.items.splice(index, 1);

            if (item.current && this.items.length) {
                this.items[0].current = true;
            }
        },
        hide() {
            if (this.open) {
                this.open = false;
                this.$emit('hide');
            }
        },
        item(index) {
            const els = this.renderedItems();

            return els[index];
        },
        renderedItems() {
            const nodelist = this.$el.querySelectorAll(`[${this.itemSelector}=true]`);

            return Array.from(nodelist).map(node => node.__item__);
        },
        keydown(e) {
            switch (e.key) {
            case 'Escape':
                this.hide();
                break;
            case 'Tab':
                this.attemptHide();
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

            const currentIndex = this.currentIndex();
            const index = currentIndex + 1 > this.items.length - 1
                ? 0
                : currentIndex + 1;

            this.makeCurrent(this.item(index));
        },
        previousIndex() {
            if (this.disabled || this.items.length === 0) {
                return;
            }

            const currentIndex = this.currentIndex();
            const index = currentIndex === 0
                ? this.items.length - 1
                : currentIndex - 1;

            this.makeCurrent(this.item(index));
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
            const dropdown = this.$el.querySelector(`[${this.dropdownSelector}=true]`);

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
            itemSelector: this.itemSelector,
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
            triggerEvents: {
                click: this.toggle,
            },
        });
    },
};
</script>

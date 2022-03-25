<script>
export default {
    name: 'CoreDropdown',

    provide() {
        return {
            attemptHide: this.attemptHide,
            canSelect: () => !this.disableControls && this.open,
            deregister: this.deregister,
            makeCurrent: this.makeCurrent,
            register: this.register,
        };
    },

    inheritAttrs: false,

    props: {
        disableControls: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        dropdownClass: {
            type: String,
            default: 'dropdown',
        },
        itemClass: {
            type: String,
            default: 'dropdown-item',
        },
        manual: {
            type: Boolean,
            default: false,
        },
    },

    emits: ['hide', 'show'],

    data: () => ({
        items: [],
        open: false,
    }),

    computed: {
        current() {
            return this.items.find(({ current }) => current);
        },
        el() {
            return this.$parent.$el;
        },
    },

    watch: {
        disabled(disabled) {
            if (disabled) {
                this.hide();
            }
        },
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
            const index = this.items.findIndex(({ _ }) => _.uid === item._.uid);

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
            const nodelist = this.el.querySelectorAll(`.${this.itemClass}`);

            return Array.from(nodelist).map(node => node.__item__);
        },
        keydown(e) {
            if (this.disableControls) {
                return;
            }

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
                } else {
                    this.select();
                }

                break;
            default:
                break;
            }
        },
        makeCurrent({ _ }) {
            if (!this.disableControls) {
                this.items.forEach(item => (item.current = item._.uid === _.uid));
                this.scrollIntoView();
            }
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
            if (this.items.length === 0 && !this.disableControls) {
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
            if (this.current) {
                this.current.select();
            }

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
            const dropdown = this.el.querySelector(`.${this.dropdownClass}`);

            if (dropdown) {
                const bounding = dropdown.getBoundingClientRect();

                return bounding.top >= 0 && bounding.bottom
                    <= (window.innerHeight || document.documentElement.clientHeight);
            }

            return true;
        },
    },

    render() {
        return this.$slots.default({
            selection: !!this.current,
            keydown: { keydown: this.keydown },
            hide: this.hide,
            open: this.open,
            show: this.show,
            triggerEvents: {
                click: event => {
                    this.toggle();
                    event.stopPropagation();
                },
            },
        });
    },
};
</script>

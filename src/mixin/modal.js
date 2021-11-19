export default{
    props: {
        isModalButtonTrigger: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            mountedModal: false
        }
    },
    watch: {
        isModalButtonTrigger(newValue) {
            this.beforeAct();
        }
    },
    mounted() {
        this.mountedModal = true;
    },
    methods: {
        show(_parameter = null) {
            var $el = $(this.$el);
            $el.modal({
                keyboard: false, backdrop: 'static'
            });               
            this.beforeAct(_parameter);
        },
        hide() {
            var $el = $(this.$el);
            $el.modal('hide')
        },
        close(param = null) {
            var $el = $(this.$el);
            $el.modal('hide')
            this.$emit('close', param);
        },
        beforeAct(_parameter = null) {
            if(this.mountedModal)  {
                this.mountedModal = false;
                if(Object.prototype.hasOwnProperty.call(this, 'createDynamicComponent'))
                    this.createDynamicComponent();
            }

            if(Object.prototype.hasOwnProperty.call(this, 'asyncDynamicComponentData'))
                this.asyncDynamicComponentData(_parameter);
        },
        async scrollToBottom() {
            await this.$nextTick();
            const container = this.$el.querySelector("#scrollContainer");
            container.scrollTop = container.scrollHeight;
        }
    },
}
<template>
<div class="modal" :id="id" role="dialog" aria-hidden="true" style="display: none;">
    <div class="modal-dialog" :class="modalDialogClasses" :style="modalWidth" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">{{ title }}</h2>
                <button type="button" class="btn btn-m flat btn-close" data-dismiss="modal" aria-label="Close">
                    <i class="icon-lineIcon-close"></i>
                </button>
            </div>
            <div class="modal-body" :class="{ 'ndk-scrollbar' : scroll }" id="scrollContainer" :style="modalBodyMaxHeight">
                <slot name="body" />
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        size: String,
        scroll: {
            type: Boolean,
            default: true
        },
        height: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        }
    },
    computed: {
        modalDialogClasses() {
            const classes = this.scroll ? ['scroll-type'] : [];
            this.size == 'small' ? classes.push('modal-sm') : (this.size == 'medium' ? classes.push('modal-md') : (this.size == 'large' ? classes.push('modal-lg') : classes.push('')));
            return classes.join(' ');
        },
        modalBodyMaxHeight() {
            return this.height == "" || !this.scroll ? "" : `max-height: ${parseInt(this.height)}px`
        },
        modalWidth() {
            return this.width == "" ? "" : `width: ${parseInt(this.width)}px`
        }
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.modal-dialog {
    max-height: none !important;
}
</style>

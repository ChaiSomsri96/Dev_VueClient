<template>
    <div>
        <ui-header :msg="'연말정산 실행'"/>
        <div class="content-body">
            <div class="row splitter-divide">
                <div class="col-5" style="flex: 0 0 35%; max-width: 35%;">
                    <ye-settle-grid @doSettle="doSettle($event)" />
                </div>
                <div class="col-9" style="padding-left: 0px; flex: 0 0 65%; max-width: 65%;">
                    <ye-settle-progress />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import YeSettleGrid from '@/components/yearend/settle/YeSettleGrid';
import YeSettleProgress from '@/components/yearend/settle/YeSettleProgress';
export default {
    components: {
        YeSettleGrid,
        YeSettleProgress
    },
    methods: {
        doSettle($event) {
            console.log("doSettle===============>", $event);
        }
    },
    mounted() {
    }
}
</script>   
<style lang="scss" scoped>
.box.type2 {
    min-width: 10px;
}
</style>
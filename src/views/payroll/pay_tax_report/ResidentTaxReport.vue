<template>   
<div>
    <ui-header :msg="'세무신고'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="원천징수이행상황신고서" :to="{name: 'WithholdingTaxReport'}"/>
            <base-tabs-item label="근로소득간이지급명세서" :to="{name: 'EarnedIncomeReport'}"/>
            <base-tabs-item label="주민세 종업원분" :to="{name: 'ResidentTaxReport'}"/>
        </base-tabs>
        <div>
            <border-box search>
                <border-box-item title="지급연도">
                    <ui-dropdown :items="payYear.items"
                                :value="payYear.value"
                                @change="payYear.value=$event.value; payYear.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
                <border-box-item title="사업장">
                    <ui-dropdown :items="businessPlace.items"
                                :value="businessPlace.value"
                                @change="businessPlace.value=$event.value; businessPlace.return=$event;"
                                :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />    
                </border-box-item>
            </border-box>
            <div class="box border-box type2">
                <div class="box-body row">
                    <button class="btn btn-md line-1 ml-10">계산 미리보기</button>
                    <button class="btn btn-md line-1 ml-10">계산자료 입력</button>
                    <button class="btn btn-md line-1 ml-10">신고자료 미리보기</button>
                    <button class="btn btn-md line-1 ml-10">주민세_종업원분_신고용_엑셀파일_다운로드</button>
                </div>
            </div>
            <div>
                <div id="resident-tax-report" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        BorderBox,
        BorderBoxItem,  
    },
    data() {
        return {
            payYear: {
                value: String(new Date().getFullYear()),
                return: null,
                items: this.getRecentYearList()    
            },
            businessPlace: {
                value: '',
                return: null,
                items: [
                ]
            },
            //grid
            fields: [
                { fieldName: 'PAY_MONTH', dataType: 'text' },
                { fieldName: 'DV_NAME', dataType: 'text' },
                { fieldName: 'RECENT_MON_AVG', dataType: 'text' },
                { fieldName: 'DECLARE_YN', dataType: 'text' },
            ],
            columns: [
                { fieldName: 'PAY_MONTH', header: '지급월' },
                { fieldName: 'DV_NAME', header: '사업장' },
                { fieldName: 'RECENT_MON_AVG', header: '최근 12개월 월평균급여' },
                { fieldName: 'DECLARE_YN', header: '신고대상 여부' },
            ]
        };
    },
    methods: {
        async asyncData() {
            try {
                const { data } = await this.$httpPost({
                    param: {
                        INACTIVE: 'NO',
                        MAAL: 'KOREAN'
                    },
                    url: '/system/setting/division-mgt/list'
                });
                if(Array.isArray(data) && data.length > 0) {
                    this.businessPlace.value = 'all';
                    this.businessPlace.items.push({ message: '전체', code: 'all' });
                    for(let i = 0; i < data.length; i ++)
                        this.businessPlace.items.push({
                            message: data[i]['DV_NAM'],
                            code: data[i]['BP_CODE']
                        });
                }
            }
            catch(e) {
                console.error("WithholdingTaxReport asyncData err: ", e);
            }
        }
    },
    mounted() {
        this.asyncData();
        this.createRealGrid({'domId': 'resident-tax-report'});
    },
}
</script>
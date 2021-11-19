<template>
<div class="ye-employee-list">
    <border-box :width="width" v-slot="slotProps" search>
        <border-box-item title="정산연도" :width="slotProps.width">
            <ui-dropdown :items="attYear.items"
                        :value="attYear.value"
                        @change="attYear.value=$event.value; attYear.return=$event;"
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                                    }" />    
        </border-box-item>
        <border-box-item title="종류" :width="slotProps.width">
            <ui-dropdown :items="qrySettleType.items"
                        :value="qrySettleType.value"
                        @change="qrySettleType.value=$event.value; qrySettleType.return=$event;"
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                                    }" />    
        </border-box-item>
        <border-box-item button>
            <button type="button" id="btnSearch" class="btn btn-md line-1" @click="loadGridData();">
                <span>검색</span>
            </button>
        </border-box-item>
    </border-box>
    <slot />
    <div>
        <div id="ye-employee-list-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
    </div>
</div>
</template>
<script>
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],
    components: {
        BorderBox,
        BorderBoxItem
    },
    props: {
        width: {
            type: String,
            default: '200'
        }
    },
    data() {
        return {
            //grid
            fields: [
                { fieldName: 'EMP_NUMBER', dataType: 'text' },
                { fieldName: 'EMP_NAM', dataType: 'text' },
                { fieldName: 'HRDEPT_NAM', dataType: 'text' },
                { fieldName: 'YE_PROGRESS', dataType: 'text' },
            ],
            columns: [
                { fieldName: 'EMP_NUMBER', header: '사번' },
                { fieldName: 'EMP_NAM', header: '성명' },
                { fieldName: 'HRDEPT_NAM', header: '부서' },
                { fieldName: 'YE_PROGRESS', header: '진행단계' },
            ],
            rowAttrs: ['EID'],

            attYear: {
                value: String(new Date().getFullYear()),
                return: null,
                items: this.getRecentYearList()   
            },

            searchedYear: String(new Date().getFullYear()), 

            qrySettleType: {
                value: 'ALL',
                return: null,
                items: [
                    {message: '전체', code: 'ALL'},
                    {message: '재직자', code: 'YEAREND'},
                    {message: '퇴직자', code: 'SEV'}
                ]
            }                 
        }
    },
    methods: {
        async loadGridData() {
            try {
                this.searchedYear = this.attYear.value;
                let { data } = await this.$httpPost({
                    param: {
                        'ATT_YEAR': this.attYear.value,
                        'QRY_SETTLE_TYPE': this.qrySettleType.value,
                        'FILTER_YE_STATUS': 'NO'
                    },
                    url: '/year-end/employee/list'
                });
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("YeEmpoyeeList loadGridData err: ", e);      
            }
        }
    },
    mounted() {        
        let me = this;
        this.columns[3]['type'] = 'data';
        this.columns[3]['renderer'] = {
            type: "html",
            callback: function(grid, cell, w, h) {
                return me.getYeProgressText(cell.value);
            }
        };
        this.createRealGrid({'domId': 'ye-employee-list-grid', 'checkbar': 'multi'});
        this.loadGridData();
        this.gridView.setFooters({visible: false});
    }
}
</script>
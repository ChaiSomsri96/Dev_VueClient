<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'계산식 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <cfg-calc-tab></cfg-calc-tab>
            <div>
                <div class="row">
                    <grid-tool-bar>
                        <button class="btn btn-md flat" @click="calcInsert()"><i class="icon-lineIcon-plus mr-5"></i>
                            계산식 추가
                        </button>
                        <button class="btn btn-md flat" @click="downloadRealGridExcel('계산식관리-퇴직금계산식')">
                            <i class="icon-lineIcon-download mr-5"></i>다운로드
                        </button>
                    </grid-tool-bar>
                </div>
                <div class="row">
                    <div id="retire-calc-grid" style="width: 100%; height: 500px" class="realgrid-type-style">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CfgCalcTab from "./CfgCalcTab";
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';
export default {
    mixins: [grid],    
    components:{
        CfgCalcTab,
        GridToolBar
    },
    data() {
        return {
            //grid
            columns: [
                { fieldName: 'SEV_CONTROL_TYPE_DESC', header: '종류', width: 150 },
                { fieldName: 'SEV_CONTROL_NO', header: '관리번호' },
                { fieldName: 'SEV_CONTROL_TITLE', header: '제목', width: 200 },
                { fieldName: 'SEV_CONTROL_TARGET_DESC', header: '적용대상' },
                { fieldName: 'SEV_ONE_YR', header: '1년 미만자' },
                { fieldName: 'SEV_AVE_SAL_TYPE', header: '평균급여 종류' },
                { fieldName: 'SEV_IN_PAYCODE', header: '평균급여 포함항목', width: 150 },
                { fieldName: 'SEV_APPLY_CRITERIA', header: '근속기간 적용기준', width: 150 },
                { fieldName: 'SEV_USE_FLAG', header: '사용중지' },
                this.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 70}),
                this.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 70}),
            ],
            fields: [
                { fieldName: 'SEV_CONTROL_TYPE_DESC', dataType: 'text' },
                { fieldName: 'SEV_CONTROL_NO', dataType: 'text' },
                { fieldName: 'SEV_CONTROL_TITLE', dataType: 'text' },
                { fieldName: 'SEV_CONTROL_TARGET_DESC', dataType: 'text' },
                { fieldName: 'SEV_ONE_YR', dataType: 'text' },
                { fieldName: 'SEV_AVE_SAL_TYPE', dataType: 'text' },
                { fieldName: 'SEV_IN_PAYCODE', dataType: 'text' },
                { fieldName: 'SEV_APPLY_CRITERIA', dataType: 'text' },
                { fieldName: 'SEV_USE_FLAG', dataType: 'text' },
                { fieldName: 'ACTION_UPDATE', dataType: 'text' },
                { fieldName: 'ACTION_DEL', dataType: 'text' },
            ],
            rowAttrs: ['EMPTYPE_CD', 'ENTITY_CODE', 'HRDEPT_CODE', 'INACTIVE', 'JOBGROUP_CD', 'ONE_MON_AVE_SAL_M', 'ONE_MON_AVE_SAL_T',
            'RANK_CD', 'SEV_APPL_SCOPE', 'SEV_CONTROL_NO_TITLE', 'SEV_CONTROL_TARGET', 'SEV_CONTROL_TYPE', 'SEV_LOA_CHK_DAYS',
            'SEV_PERIOD_DAYS', 'SEV_PROG_BORDER', 'SEV_PROG_PERIOD', 'SEV_PROG_TYPE', 'SEV_PROG_VARIABLE', 'SEV_RPEN_FIX_RATE',
            'SEV_RPEN_RATE_BR_BOR', 'SEV_RPEN_RATE_BR_VAL', 'SEV_RPEN_RATE_TYPE', 'SEV_TYPE_PERIOD_DAYS', 'SVC_MON_CALC', 'SVC_PER_METHOD',
            'SVC_YR_CALC', 'THR_MON_AVE_SAL_M', 'THR_MON_AVE_SAL_T', 'TWL_MON_AVE_SAL_M', 'TWL_MON_AVE_SAL_T', 
            'VALUE_OR_RATE']
        }
    },
    methods: {
        filterObject(param) {
            param = {
                ...param,
                ...param['ROW_ATTRS']
            };
            delete param['ROW_ATTRS'];
            delete param['ACTION_UPDATE'];
            delete param['ACTION_DEL'];
            return param;
        },
        calcInsert() {
            this.$store.dispatch(
                        'cfgcalc/setCfgRetireCalcForm',
                        {
                            CFG_RETIRE_CALC_FORM: null
                        });
            this.$router.push({name: 'CfgRetireCalcInput'});
        },
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/multiretirecfg/cs-header/list', {
                    SEV_CONTROL_TYPE: 'S'
                }) || [];
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("CfgRetireCalc loadGridData err: ", e);       
            }
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'ACTION_DEL') {
                    // 삭제처리
                }
                else if(clickData.column == 'ACTION_UPDATE') {
                    let _rowData = me.filterObject(me.dataProvider.getJsonRow(clickData.dataRow));
                    me.$store.dispatch(
                        'cfgcalc/setCfgRetireCalcForm',
                        {
                            CFG_RETIRE_CALC_FORM: _rowData
                        });
                    me.$router.push({name: 'CfgRetireCalcInput'});
                }
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'retire-calc-grid'});
        this.loadGridData();
    },
}
</script>

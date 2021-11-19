<template>
    <div>
         <!-- Header 영역 -->
        <ui-header :msg="'마스터 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <cfg-mater-code-tab></cfg-mater-code-tab>
            <div>
                <border-box>    
                    <border-box-item title="연봉 기준일">
                        <ui-input-date :date="searchForm.baseDate"
                        @change="searchForm.baseDate=$event;"      
                        />
                    </border-box-item>
                    <border-box-item title="사원명">
                        <ui-input :value="searchForm.empNam"
                            @change="searchForm.empNam=$event;"      
                        />
                    </border-box-item>
                    <border-box-item button>
                        <button type="button" class="btn btn-md line-1" @click="loadGridData()">
                            <span>검색</span>
                        </button>         
                    </border-box-item>
                </border-box>
                <div class="row">
                    <grid-tool-bar>
                        <button class="btn btn-md flat" @click="payMasterGen()"><i class="icon-lineIcon-plus mr-5"></i>
                            급여마스터 생성
                        </button>
                    </grid-tool-bar>
                </div>
                <div>
                    <div id="cfg-annual-salary-pay-master-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
                </div>          
                <annual-salary-pay-master-gen-modal ref="annualSalaryPayMasterGenModal"
                @close="saveSalaryPayMaster($event)" />
            </div>
        </div>       
    </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import GridToolBar from '@/components/common/GridToolBar';
import AnnualSalaryPayMasterGenModal from '@/components/cfg/cfg_master_code/modals/AnnualSalaryPayMasterGenModal';
import grid from '@/mixin/payroll-grid';

const gridData = {
    data: [
        { 'EMP_NAM': '홍길동', 'HRDEPT_NAM': '인사팀', 'APPLY_DATE': '20210101', 'APPLY_END_DATE': '20211231', 
        'ANNUAL_PAY1': '50000000',  'BAS_SALARY': '47000000', 'MEAL_ALLOWANCE': '100000', 'CAR_ALLOWANCE': '200000',
        'ANNUAL_ALLOWANCE2': '321000', 'START_DATE': '20210101', 'END_DATE': '20211231'}
    ]
}

export default {
    components: {
        CfgMaterCodeTab,
        BorderBox,
        BorderBoxItem,
        GridToolBar,
        AnnualSalaryPayMasterGenModal
    },
    mixins: [grid],
    data() {
        return {
            searchForm: {
                baseDate: this.getCurrentDate(),
                empNam: ''
            },
            columns: [
                { fieldName: 'EMP_NAM', header: '이름', 'editable': false },       
                { fieldName: 'HRDEPT_NAM', header: '부서', 'editable': false },
                { fieldName: 'APPLY_DATE', header: '연봉시작일', 'editable': false },
                { fieldName: 'APPLY_END_DATE', header: '연봉종료일', 'editable': false },
                { fieldName: 'ANNUAL_PAY1', header: '연봉',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0', 'editable': false },
                { fieldName: 'BAS_SALARY', header: '매월기본급',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0', 'editable': false },
                { fieldName: 'MEAL_ALLOWANCE', header: '매월식대',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0', 'editable': false },
                { fieldName: 'CAR_ALLOWANCE', header: '매월 차량유지비',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0', 'editable': false },
                { fieldName: 'ANNUAL_ALLOWANCE2', header: '매월 기타수당',
                    numberFormat: "#,##0", 
                    styleName: "right-column", 
                    footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                    nanText: '0', 'editable': false },
                { fieldName: 'START_DATE', header: '마스터시작일',
                    editor: {
                        datetimeFormat: "yyyy.MM.dd"
                    },
                    datetimeFormat: "yyyy.MM.dd" 
                },
                { fieldName: 'END_DATE', header: '마스터종료일',
                    editor: {
                        datetimeFormat: "yyyy.MM.dd"
                    },
                    datetimeFormat: "yyyy.MM.dd" 
                },
            ],
            fields: [
                { fieldName: 'EMP_NAM', dataType: 'text' },
                { fieldName: 'HRDEPT_NAM', dataType: 'text' },
                { fieldName: 'APPLY_DATE', dataType: 'text' },
                { fieldName: 'APPLY_END_DATE', dataType: 'text' },
                { fieldName: 'ANNUAL_PAY1', dataType: 'number' },
                { fieldName: 'BAS_SALARY', dataType: 'number' },
                { fieldName: 'MEAL_ALLOWANCE', dataType: 'number' },
                { fieldName: 'CAR_ALLOWANCE', dataType: 'number' },
                { fieldName: 'ANNUAL_ALLOWANCE2', dataType: 'number' },
                { fieldName: 'START_DATE', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
                { fieldName: 'END_DATE', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
            ],
            rowAttrs: [
                'PAYTYPE_NAME', 'EMP_NAME', 'TOTAL_BASE_SALARY2', 'EMP_NUMBER', 'RANK_NAM', 
                'ANNUAL_ALLOWANCE', 'BIRTHDAY', 'EID', 'HRDEPT_NAME', 'RANK_NAME', 'PAY_CLASS',
                'PAYTYPE_NAM', 'OWN_CAR_FLAG', 'TOTAL_BASE_SALARY', 'EMPRANK_CD', 'TOTAL_SALARY'
            ]
        }
    },
    methods: {
        payMasterGen() {  // 급여마스터 생성 버튼
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) { 
                this.toastAlertSelect()
                return;
            }
            let me = this;
            this.confirm({
                title: '확인',
                message: '급여마스터에 이름과 급여코드와 마스터 시작일이 동일한 자료가 존재할 경우 기존 자료를 삭제 후 생성합니다. 진행하시겠습니까?',
                yesCallback: function() {
                    me.$refs.annualSalaryPayMasterGenModal.show();
                }
            });
        },
        saveSalaryPayMaster($event) {
            let me = this;
            let checkedRows = this.gridView.getCheckedRows();
            let selectList = [];
            for(let i = 0; i < checkedRows.length; i ++) {
                let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);

                if( !this.payrollUtil.isEmpty(_rowData['START_DATE']) )
                    _rowData['START_DATE'] = this.getDateStringFromDateObject(_rowData['START_DATE']);
                else
                    _rowData['START_DATE'] = '';

                if( !this.payrollUtil.isEmpty(_rowData['END_DATE']) )
                    _rowData['END_DATE'] = this.getDateStringFromDateObject(_rowData['END_DATE']);
                else 
                    _rowData['END_DATE'] = '';
                
                _rowData = {
                    ..._rowData,
                    ..._rowData['ROW_ATTRS']
                };
                delete _rowData['ROW_ATTRS'];
                selectList.push(_rowData);
            }
            this.$httpPost({
                url: '/z-interface/scb/save/salary-master',
                param: {
                    'selectList': JSON.stringify(selectList),
                    'formValues': JSON.stringify($event)
                },
                callback: function() {
                    me.toastSuccessMsg('급여마스터가 성공적으로 생성되었습니다.');
                }
            });
        },
        async loadGridData() {
            let {data} = gridData;
            this.setRealgridData(data || []);

            /* api 그리드 데이터 연동 부분
            try {
                let {data} = await this.$tempHttpGet('/z-interface/scb/select/salary_emp_list',
                {
                    PAY_TYPE: 'P1',
                    START_DATE: '20230101',
                    END_DATE: '20231231'
                }) || [];
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.error("CfgAnnualSalaryPayMaster error: ", e);
            } */
        }
    },
    mounted() {
        this.createRealGrid({
            domId: 'cfg-annual-salary-pay-master-grid',
            checkbar: 'multi',
            'editable': true,
        });
        this.loadGridData();
    },
}
</script>
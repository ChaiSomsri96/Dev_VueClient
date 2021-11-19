<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'마스터 관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <cfg-mater-code-tab></cfg-mater-code-tab>
            <div>
                <border-box>
                    <border-box-item title="호봉 기준일">
                        <ui-input-date :date="searchForm.applyDate"
                        @change="searchForm.applyDate=$event;"      
                        />
                    </border-box-item>
                    <border-box-item title="급여코드">
                        <ui-dropdown :items="searchForm.payCodeList.items"
                           :value="searchForm.payCodeList.value"
                           @change="searchForm.payCodeList.value=$event.value; searchForm.payCodeList.return=$event;"
                           :options="{
                                                valueField  : 'code',
                                                labelField  : 'message',
                                                tooltipField: 'message'
                                            }" />
                    </border-box-item>
                    <border-box-item button>
                        <button type="button" class="btn btn-md line-1" @click="loadGridData()">
                            <span>검색</span>
                        </button>         
                    </border-box-item>
                </border-box>
                <div class="row">
                    <grid-tool-bar>
                        <button class="btn btn-md flat" @click="payMasterGenerate()"><i class="icon-lineIcon-plus mr-5"></i>
                            급여마스터 생성
                        </button>
                    </grid-tool-bar>
                </div>
                <div class="mb-10">
                    <div id="cfg-hobong-pay-master-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
                </div>
                <div class="tbl-title"><span>※ 기존 급여마스터에 이름, 급여코드, 마스터 시작일이 동일한 자료가 존재할 경우 삭제 후 생성이 됩니다.</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import CfgMaterCodeTab from "./CfgMaterCodeTab";
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';
export default {
    components: {
        CfgMaterCodeTab,
        BorderBox,
        BorderBoxItem,
        GridToolBar
    },
    mixins: [grid],
    data() {
        return {
            searchForm: {
                applyDate: this.getCurrentDate(),
                payCodeList: {
                    value: '',
                    return: null,
                    items: []   
                }
            },
            columns: [
                { fieldName: 'EMP_NAM', header: '이름', editable: false },
                { fieldName: 'HRDEPT_NAM', header: '부서', editable: false },
                { fieldName: 'RANK_NAM', header: '직급', editable: false },
                { fieldName: 'PAY_CLASS', header: '호봉', editable: false },
                { fieldName: 'PAY_CODE', header: '급여코드', editable: false },
                { fieldName: 'PAY_NAM', header: '급여코드명', editable: false },
                { fieldName: 'PAY_AMOUNT', header: '금액',
                 numberFormat: "#,##0", styleName: "right-column", 
                 footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
                 nanText: '0', editable: false },
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
                { fieldName: 'RANK_NAM', dataType: 'text' },
                { fieldName: 'PAY_CLASS', dataType: 'number' },
                { fieldName: 'PAY_CODE', dataType: 'text' },
                { fieldName: 'PAY_NAM', dataType: 'text' },
                { fieldName: 'PAY_AMOUNT', dataType: 'number' },
                { fieldName: 'START_DATE', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
                { fieldName: 'END_DATE', dataType: 'datetime', datetimeFormat: "yyyyMMdd" },
            ],
            rowAttrs: [
                'EID', 'PAYTYPE_NAME', 'HRDEPT_NAME', 'RANK_NAME', 'PAYTYPE_NAM', 'EMP_NAME', 'EMP_NUMBER',
                'EMPRANK_CD', 'RANK_NAM', 'BIRTHDAY', 'HOBONG_VER'
            ]
        }
    },
    methods: {
        async payCodeLoad() {
            try {
                let me = this;
                const { data } = await me.$httpPost({
                    param: {
                        ACTIVE_ONLY: 'YES'
                    },
                    url: '/payroll/code/pay-pay/list'
                });
                if(Array.isArray(data) && data.length > 0) {
                    for(let i = 0; i < data.length; i ++)
                        me.searchForm.payCodeList.items.push({
                            message: data[i]['PAY_NAME'],
                            code: data[i]['PAY_CODE']
                        });
                    me.searchForm.payCodeList.value = data[0]['PAY_CODE'];
                }
            }
            catch(e) {
                console.error("payCodeList asyncData err: ", e);
            }  
        },
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/payroll/hobong/select/emp-list', 
                { 
                    PAY_TYPE: 'P2',
                    APPLY_DATE: this.searchForm.applyDate,
                    PAY_CODE: this.searchForm.payCodeList.value,
                    START_DATE: '',
                    END_DATE: ''
                 }) || [];
                 this.setRealgridData(data || []);
            }
            catch(e) {
                console.error("CfgHobongPayMaster error: ", e);
            }
        },
        payMasterGenerate() { // 급여마스터 생성 버튼
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
                    let selectList = [];
                    for(let i = 0; i < checkedRows.length; i ++) {
                        let _rowData = me.dataProvider.getJsonRow(checkedRows[i]);
                        
                        if( !me.payrollUtil.isEmpty(_rowData['START_DATE']) )
                            _rowData['START_DATE'] = me.getDateStringFromDateObject(_rowData['START_DATE']);
                        else
                            _rowData['START_DATE'] = '';

                        if( !me.payrollUtil.isEmpty(_rowData['END_DATE']) )
                            _rowData['END_DATE'] = me.getDateStringFromDateObject(_rowData['END_DATE']);
                        else 
                            _rowData['END_DATE'] = '';
                        
                        _rowData = {
                            ..._rowData,
                            ..._rowData['ROW_ATTRS']
                        };
                        delete _rowData['ROW_ATTRS'];
                        selectList.push(_rowData);
                    }
                    me.$httpPost({
                        url: '/payroll/hobong/save/hobong-master',
                        param: {
                            'selectList': JSON.stringify(selectList),
                            'formValues': JSON.stringify({"PAY_CODE": me.searchForm.payCodeList.value})
                        },
                        callback: function() {
                            me.toastSuccessMsg('급여마스터가 성공적으로 생성되었습니다.');
                        }
                    });
                }
            });
        }
    },
    mounted() {
        let me = this;
        me.payCodeLoad();       

        me.createRealGrid({
            domId: 'cfg-hobong-pay-master-grid',
            'editable': true,
            'checkbar': 'multi'
        });

        me.loadGridData();
    },
}
</script>

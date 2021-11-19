<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'보고서 디자인'"/>
        <!-- Body 영역 -->
        <div class="content-body">
            <cfg-report-tab></cfg-report-tab>
            <div>
                <div class="row">
                    <grid-tool-bar>
                        <button class="btn btn-md flat" @click="addEmptyData"><i class="icon-lineIcon-plus mr-5"></i>
                            추가
                        </button>
                    </grid-tool-bar>
                </div>
                <div class="row">
                    <div id="salary-slip-grid" style="width: 100%; height: 500px" class="realgrid-type-style">
                    </div>
                </div>
                <div class="tbl-bottom">
                    <button type="button" class="btn btn-lg white"><i class="icon-lineIcon-close mr-5"></i>취소</button>
                    <button type="button" class="btn btn-lg black ml-10" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CfgReportTab from "./CfgReportTab";
import GridToolBar from '@/components/common/GridToolBar';
import grid from '@/mixin/payroll-grid';

const gridData = {
    data: [
        { JL_RULE_NO: 'P1', JL_RULE_NAME: '정기급여 전표', ACCT_CODE_AP: '210010', AP_CODE_GROUPBY: '사업장별',
         FIXED_VALUE1: '고정값1', FIXED_VALUE2: '고정값2', NO_DRCR: 'Y', JL_NEGA_DRCR_REV: 'N',
         UPDATE_TIME:1594738920000, OPER_ID: "30130032", UPDATE_OPID: "30130012", JL_HEAD_COUNT: "N",
         ENTITY_CODE: "BBK", JL_SCOPE_DEF: "N", CREATE_TIME: 1523414400000, FIXED_VALUE4: null,
         FIXED_VALUE3: null
        },

        { JL_RULE_NO: 'B1', JL_RULE_NAME: '상여금 전표', ACCT_CODE_AP: '210010', AP_CODE_GROUPBY: '사업장별',
         FIXED_VALUE1: '고정값1', FIXED_VALUE2: '고정값2', NO_DRCR: 'N', JL_NEGA_DRCR_REV: 'N', 
         
         UPDATE_TIME:1594739120000, OPER_ID: "30130039", UPDATE_OPID: "30130012", JL_HEAD_COUNT: "N",
         ENTITY_CODE: "BBC", JL_SCOPE_DEF: "N", CREATE_TIME: 1523414600000, FIXED_VALUE4: null,
         FIXED_VALUE3: null
        }
    ]
}

export default {
    mixins: [grid],
    components:{
        CfgReportTab,
        GridToolBar
    },
    data() {
        return {
            // grid
            columns: [
                {
                    name: 'JL_RULE_NO',
                    fieldName: 'JL_RULE_NO', 
                    header: '관리번호', 
                    styleCallback: function(grid, dataCell) {
                        var ret = {}
                        
                        if(dataCell.item.rowState == 'created' || dataCell.item.itemState == 'appending' || dataCell.item.itemState == 'inserting') {
                            ret.editable = true;
                        } else {
                            ret.editable = false;   
                        }
                        return ret;
                    }
                },
                { fieldName: 'JL_RULE_NAME', header: '명칭' },
                { fieldName: 'ACCT_CODE_AP', header: '미지급금 계정코드' },

                { fieldName: 'AP_CODE_GROUPBY', header: '미지급금 집계 방법',
                  "sortable": false,
                  "lookupDisplay": true,
                  "values": ["개인별", "코스트센터별", "사업장별"],
                  "labels": ["개인별", "코스트센터별", "사업장별"],
                  "editor": {
                        "type": "dropdown",
                        "dropDownCount": 4
                  }
                },

                { fieldName: 'FIXED_VALUE1', header: '고정값1' },
                { fieldName: 'FIXED_VALUE2', header: '고정값2' },
                { fieldName: 'NO_DRCR', header: '차/대\n구분없음',
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["Y", "N"],
                    "labels": ["Y", "N"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    }
                },
                { fieldName: 'JL_NEGA_DRCR_REV', header: '음수면 차/대를\n바꿈',
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["Y", "N"],
                    "labels": ["Y", "N"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    } 
                },
                this.getIconColumn({headerText: '상세관리', fieldName: 'DETAIL', columnWidth: 70, type: 'detail'}),
                this.getIconColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70, type: 'delete'})
            ],
            fields: [
                { fieldName: 'JL_RULE_NO', dataType: 'text' },
                { fieldName: 'JL_RULE_NAME', dataType: 'text' },
                { fieldName: 'ACCT_CODE_AP', dataType: 'text' },
                { fieldName: 'AP_CODE_GROUPBY', dataType: 'text' },
                { fieldName: 'FIXED_VALUE1', dataType: 'text' },
                { fieldName: 'FIXED_VALUE2', dataType: 'text' },
                { fieldName: 'NO_DRCR', dataType: 'text' },
                { fieldName: 'JL_NEGA_DRCR_REV', dataType: 'text' },
                { fieldName: 'DETAIL', dataType: 'text' },
                { fieldName: 'DELETE', dataType: 'text' },
            ],

            rowAttrs: [
                'UPDATE_TIME', 'OPER_ID', 'UPDATE_OPID', 'JL_HEAD_COUNT', 'ENTITY_CODE', 
                'JL_SCOPE_DEF', 'CREATE_TIME', 'FIXED_VALUE4', 'FIXED_VALUE3'
            ],

            emptyRealGridData: {
                JL_RULE_NO: '', JL_RULE_NAME: '', ACCT_CODE_AP: '', AP_CODE_GROUPBY: '',
                FIXED_VALUE1: '', FIXED_VALUE2: '', NO_DRCR: 'N',  JL_NEGA_DRCR_REV: 'N',
                DETAIL: '', DELETE: ''
            }
        }
    },
    methods: {
        filterObject(_rowData) {
            _rowData = {
                    ..._rowData,
                    ..._rowData['ROW_ATTRS']
            };
            delete _rowData['ROW_ATTRS'];
            delete _rowData['DETAIL'];
            delete _rowData['DELETE'];

            return _rowData;
        },
        loadGridData() {
            /*
            acct/payjlcfg/jlentry-rule/header-select
            보고서 세팅 - 급여전표 - 페이지 로딩 시 api
            */
            let {data} = gridData;
            this.setRealgridData(data || []);
        },
        addRealGridOption() {
        },
        realgridCreatedCallback () {
            let me = this;
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'DELETE') {
                    // 삭제처리
                    me.dataProvider.removeRow(clickData.dataRow);
                }
                else if(clickData.column == 'DETAIL') {
                    if(me.dataProvider.getRowState(clickData.dataRow) != 'created') {
                        let _rowData = me.filterObject(me.dataProvider.getJsonRow(clickData.dataRow));

                        me.$store.dispatch(
                        'cfgreport/setCfgSalarySlipForm',
                        {
                            CFG_SALARY_SLIP_FORM: _rowData
                        });   

                        me.$router.push({name: 'CfgSalarySlipDetail'});
                    }
                }
            }  
        },
        async onSave() { //저장 버튼 클릭
            try {
                let me = this;
                let rows = this.getSaveDeleteRows(this.dataProvider);
                await this.$httpPostBody({
                    url: "/acct/payjlcfg/jlentry-rule/header-save",
                    param: {
                        'saveList': JSON.stringify(this.extractObject(rows.save, ['ACCT_CODE_AP', 'AP_CODE_GROUPBY', 'FIXED_VALUE1', 'FIXED_VALUE2', 'FIXED_VALUE3', 'FIXED_VALUE4', 'JL_RULE_NAME', 'JL_RULE_NO', 'NO_DRCR'])),
                        'delList': JSON.stringify(this.extractObject(rows.delete, ['ACCT_CODE_AP', 'AP_CODE_GROUPBY', 'FIXED_VALUE1', 'FIXED_VALUE2', 'FIXED_VALUE3', 'FIXED_VALUE4', 'JL_RULE_NAME', 'JL_RULE_NO', 'NO_DRCR']))
                    },
                    callback: function () {
                        me.toastSuccessSave();
                    }
                });
                this.loadGridData();
            }
            catch(e) {
                console.error("CfgSalarySlip onSave err: ", e);
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'salary-slip-grid', editable: true});
        this.loadGridData();
    },
}
</script>
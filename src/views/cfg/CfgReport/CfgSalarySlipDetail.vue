<template>
<div>
    <div class="content-header">
        <div class="header-bottom">
            <div class="header-bottom-left">
                <div class="menu-box">
                    <div class="menu-item title">
                        <div class="menu-item-icon">
                            <button type="button" class="btn btn-s menu-item-icon black"  @click="gotoList()">
                            <i class="icon icon-lineIcon-line-arrow-left"><span class="blind">뒤로 가기</span></i>
                            </button>
                        </div>
                        <h1 class="menu-text" data-toggle="tooltip" data-placement="bottom_left" data-animation="false" data-original-title="">
                            {{ cfgSalarySlipForm['JL_RULE_NAME'] }} 급여전표 처리 항목 세팅
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="content-body">
        <div class="row">
            <grid-tool-bar>
                <button class="btn btn-md flat" @click="addEmptyData"><i class="icon-lineIcon-plus mr-5"></i>
                    추가
                </button>
            </grid-tool-bar>
        </div>
        <div class="row">
            <div id="salary-slip-detail-grid" style="width: 100%; height: 500px" class="realgrid-type-style">
            </div>
        </div>
        <div class="tbl-bottom">
            <button type="button" class="btn btn-lg white"><i class="icon-lineIcon-close mr-5"></i>취소</button>
            <button type="button" class="btn btn-lg black ml-10" @click="onSave()"><i class="icon-lineIcon-check mr-5"></i>저장</button>
        </div>
    </div>
</div>
</template>
<script>
import grid from '@/mixin/payroll-grid';
import GridToolBar from '@/components/common/GridToolBar';
import { mapGetters } from 'vuex';
const gridData = {
    data: [
         {
            ACCT_CODE: "510010", ACCT_CODE_AP: "210110", AP_CODE_GROUPBY: "ENTITY", CCENTER_CODE: "",
            DRCR: "차변", EMP_NUMBER: "", EMP_TYPE: "고용형태1", ENTITY_CODE: null,
            FIXED_VALUE1: null, FIXED_VALUE2: null, FIXED_VALUE3: null, FIXED_VALUE4: null,
            GROUP_BY: "코스트센터별", GROUP_BY_IN_TABLE: null, HRDEPT_CODE: "부서1", HRDEPT_GROUP_CD: null,
            JL_HEAD_COUNT: "Y", JL_NEGA_DRCR_REV: "N", JL_RULE_NAME: "급여전표-부서", JL_RULE_NO: "N200",
            JL_SCOPE_DEF: "N", JOBGROUP_CD: "", LINE_NO: null, LINE_REMARK: "임직원 급여 - 고정",
            NO_DRCR: "N", PAY_CODE: "P101-기본급", PAY_ENAME: "", PAY_NAME: "야간근무시간", POSITION_CD: "",
            REAL_DATA: "0", SAVED_ACCT_CODE: null, SAVED_DRCR: null, SAVED_LINE_REMARK: null,
            SUB_CODE: null, USER_DEFINED1: null, USER_DEFINED2: null, USER_DEFINED3: null,
            USER_DEFINED4: null, USER_DEFINED5: null, VIRTUAL_FLAG: "Y"        
         },
         {
            ACCT_CODE: "510010", ACCT_CODE_AP: "210110", AP_CODE_GROUPBY: "ENTITY", CCENTER_CODE: "",
            DRCR: "대변", EMP_NUMBER: "", EMP_TYPE: "고용형태2", ENTITY_CODE: null,
            FIXED_VALUE1: null, FIXED_VALUE2: null, FIXED_VALUE3: null, FIXED_VALUE4: null,
            GROUP_BY: "코스트센터별", GROUP_BY_IN_TABLE: null, HRDEPT_CODE: "부서2", HRDEPT_GROUP_CD: null,
            JL_HEAD_COUNT: "Y", JL_NEGA_DRCR_REV: "N", JL_RULE_NAME: "급여전표-부서", JL_RULE_NO: "N200",
            JL_SCOPE_DEF: "N", JOBGROUP_CD: "", LINE_NO: null, LINE_REMARK: "임직원 급여 - 변동",
            NO_DRCR: "N", PAY_CODE: "P102-고정연장수당", PAY_ENAME: "", PAY_NAME: "야간근무시간", POSITION_CD: "",
            REAL_DATA: "0", SAVED_ACCT_CODE: null, SAVED_DRCR: null, SAVED_LINE_REMARK: null,
            SUB_CODE: null, USER_DEFINED1: null, USER_DEFINED2: null, USER_DEFINED3: null,
            USER_DEFINED4: null, USER_DEFINED5: null, VIRTUAL_FLAG: "Y"        
         }
    ]
}

export default {
    mixins: [grid],
    components: {
        GridToolBar
    },
    computed: {
        ...mapGetters({
            cfgSalarySlipForm: 'cfgreport/getCfgSalarySlipForm'
        })
    },
    data() {
        return {
            //grid
            columns: [
                { fieldName: 'PAY_CODE', header: '급여코드',
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["P101-기본급", "P102-고정연장수당"],
                    "labels": ["P101-기본급", "P102-고정연장수당"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    }
                },
                { fieldName: 'HRDEPT_CODE', header: '부서', 
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["부서1", "부서2"],
                    "labels": ["부서1", "부서2"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 4
                    }
                },
                { fieldName: 'EMP_TYPE', header: '고용형태', 
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["고용형태1", "고용형태2"],
                    "labels": ["고용형태1", "고용형태2"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    }
                },
                { fieldName: 'DRCR', header: '차변/대변', 
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["차변", "대변"],
                    "labels": ["차변", "대변"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 2
                    }
                },
                { fieldName: 'ACCT_CODE', header: '회계코드' },
                { fieldName: 'LINE_REMARK', header: '적요' },
                { fieldName: 'GROUP_BY', header: '집계 기준',
                    "sortable": false,
                    "lookupDisplay": true,
                    "values": ["개인별", "코스트센터별", "사업장별"],
                    "labels": ["개인별", "코스트센터별", "사업장별"],
                    "editor": {
                            "type": "dropdown",
                            "dropDownCount": 4
                    }
                },
                this.getIconColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70, type: 'delete'})
            ],
            fields: [
                { fieldName: 'PAY_CODE', dataType: 'text' },
                { fieldName: 'HRDEPT_CODE', dataType: 'text' },
                { fieldName: 'EMP_TYPE', dataType: 'text' },
                { fieldName: 'DRCR', dataType: 'text' },
                { fieldName: 'ACCT_CODE', dataType: 'text' },
                { fieldName: 'LINE_REMARK', dataType: 'text' },
                { fieldName: 'GROUP_BY', dataType: 'text' },
                { fieldName: 'DELETE', dataType: 'text' },
            ],
            layout: [
                { 
                    name: 'PAYROLL_Group', direction: "horizontal",
                    items: [ "PAY_CODE", "HRDEPT_CODE", "EMP_TYPE" ],
                    header: { text: "급여" }   
                },
                {
                    name: 'ACOUNT_Group', direction: "horizontal",
                    items: [ "DRCR", "ACCT_CODE", "LINE_REMARK", "GROUP_BY" ],
                    header: { text: "회계" }   
                },
                'DELETE'
            ],
            emptyRealGridData: {
                PAY_CODE: '', HRDEPT_CODE: '', EMP_TYPE: '', DRCR: '', ACCT_CODE: '', 
                LINE_REMARK: '', GROUP_BY: '', DELETE: ''
            },
            rowAttrs: [
                'ACCT_CODE_AP', 'AP_CODE_GROUPBY', 'CCENTER_CODE', 'EMP_NUMBER', 'ENTITY_CODE', 'FIXED_VALUE1', 'FIXED_VALUE2',
                'FIXED_VALUE3', 'FIXED_VALUE4', 'GROUP_BY_IN_TABLE', 'HRDEPT_GROUP_CD', 'JL_HEAD_COUNT', 'JL_NEGA_DRCR_REV', 'JL_RULE_NAME', 'JL_RULE_NO',
                'JL_SCOPE_DEF', 'JOBGROUP_CD', 'LINE_NO', 'NO_DRCR', 'PAY_ENAME', 'PAY_NAME', 'POSITION_CD', 'REAL_DATA', 'SAVED_ACCT_CODE',
                'SAVED_DRCR', 'SAVED_LINE_REMARK', 'SUB_CODE', 'USER_DEFINED1', 'USER_DEFINED2', 'USER_DEFINED3', 'USER_DEFINED4', 'USER_DEFINED5', 'VIRTUAL_FLAG'
            ],
        }
    },
    methods: {
        gotoList() {
            this.$router.push({name: 'CfgSalarySlip'});
        },
        /*
        acct/payjlcfg/jlentry-rule/body-select
        보고서 디자인 - 급여전표 처리 항목 세팅
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/acct/payjlcfg/jlentry-rule/body-select', this.cfgSalarySlipForm) || [];
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("CfgSalarySlipDetail loadGridData err: ", e);      
            }
        }, */
        loadGridData() {
            let {data} = gridData;
            this.setRealgridData(data || []);
        },
        addRealGridOption() {
            this.gridView.header.height = 72;
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function (grid, clickData) {
                if (clickData.column == 'DELETE') {
                    // 삭제처리
                    me.dataProvider.removeRow(clickData.dataRow);
                }
            }
        },
        async onSave() {
           try {
               let me = this;
               let rows = this.getSaveDeleteRows(this.dataProvider);
               await this.$httpPostBody({
                    url: "/acct/payjlcfg/jlentry-rule/body-save",
                    param: {
                        'saveList': JSON.stringify(this.extractObject(rows.save, 
                        ['ACCT_CODE', 'ACCT_CODE_AP', 'AP_CODE_GROUPBY', 'CCENTER_CODE', 'DRCR', 'EMP_NUMBER', 'EMP_TYPE', 'ENTITY_CODE', 'FIXED_VALUE1', 'FIXED_VALUE2', 'FIXED_VALUE3', 'FIXED_VALUE4',
                        'GROUP_BY', 'GROUP_BY_IN_TABLE', 'HRDEPT_CODE', 'HRDEPT_GROUP_CD', 'JL_HEAD_COUNT', 'JL_NEGA_DRCR_REV', 'JL_RULE_NAME', 'JL_RULE_NO', 'JL_SCOPE_DEF', 'JOBGROUP_CD',
                        'LINE_NO', 'LINE_REMARK', 'NO_DRCR', 'PAY_CODE', 'PAY_ENAME', 'PAY_NAME', 'POSITION_CD', 'REAL_DATA', 'SAVED_ACCT_CODE', 'SAVED_DRCR', 'SAVED_LINE_REMARK',
                        'SUB_CODE', 'USER_DEFINED1', 'USER_DEFINED2', 'USER_DEFINED3', 'USER_DEFINED4', 'USER_DEFINED5', 'VIRTUAL_FLAG'])),

                        'delList': JSON.stringify(this.extractObject(rows.delete, 
                        ['ACCT_CODE', 'ACCT_CODE_AP', 'AP_CODE_GROUPBY', 'CCENTER_CODE', 'DRCR', 'EMP_NUMBER', 'EMP_TYPE', 'ENTITY_CODE', 'FIXED_VALUE1', 'FIXED_VALUE2', 'FIXED_VALUE3', 'FIXED_VALUE4',
                        'GROUP_BY', 'GROUP_BY_IN_TABLE', 'HRDEPT_CODE', 'HRDEPT_GROUP_CD', 'JL_HEAD_COUNT', 'JL_NEGA_DRCR_REV', 'JL_RULE_NAME', 'JL_RULE_NO', 'JL_SCOPE_DEF', 'JOBGROUP_CD',
                        'LINE_NO', 'LINE_REMARK', 'NO_DRCR', 'PAY_CODE', 'PAY_ENAME', 'PAY_NAME', 'POSITION_CD', 'REAL_DATA', 'SAVED_ACCT_CODE', 'SAVED_DRCR', 'SAVED_LINE_REMARK',
                        'SUB_CODE', 'USER_DEFINED1', 'USER_DEFINED2', 'USER_DEFINED3', 'USER_DEFINED4', 'USER_DEFINED5', 'VIRTUAL_FLAG']))
                    },
                    callback: function () {
                        me.toastSuccessSave();
                    }
                });
               this.loadGridData();
           }
           catch(e) {
               console.error("CfgSalarySlipDetail err: ", e);
           }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'salary-slip-detail-grid', editable: true});
        this.loadGridData();
    },
}
</script>

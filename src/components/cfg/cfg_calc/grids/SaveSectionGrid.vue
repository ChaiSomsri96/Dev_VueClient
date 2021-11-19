<template>
    <div>
        <div class="form-group row mb-0">
            <label class="form-label type2 col-3">
                <span>적립구간</span>
            </label>
        </div>
        <div class="form-group row">
            <div class="col-8">
                <div class="row mb-10">
                    <button class="btn btn-md flat" @click="addData()"><i class="icon-lineIcon-plus mr-5"></i>
                        추가
                    </button>
                </div>
                <div class="row">
                    <div id="save-section-grid" style="width: 100%; height: 250px" class="realgrid-type-style">
                    </div>
                </div>
            </div>
        </div>

        <save-section-modal ref="saveSectionModal" @close="loadGridData()" />
    </div>
</template>

<script>
import SaveSectionModal from '@/components/cfg/cfg_calc/modals/SaveSectionModal';
import grid from '@/mixin/payroll-grid';
import { mapGetters } from 'vuex';
export default {
    mixins: [grid],
    components: {
        SaveSectionModal
    },
    computed: {
        ...mapGetters({
            cfgRetireCalcForm: 'cfgcalc/getCfgRetireCalcForm'
        })
    },
    props: {
        sevProgType: {
            type: String,
            default: ''
        },
        sevControlNo: {
            type: String,
            default: ''
        },
        svcPerMethod: {
            type: String,
            default: ''
        },
        sevProgBorder: {
            type: String,
            default: ''
        }
    },
    data() {
        let me = this;
        return {
            // SEV_PROG_TYPE: '',
            //grid
            fields: [
                { fieldName: 'ACCUMUL_SEV_CONTROL_NO', dataType: 'text' },
                { fieldName: 'PERIOD_TYPE', dataType: 'text' },
                { fieldName: 'SEV_PROG_BRACKET_VAL', dataType: 'number' },
                { fieldName: 'BORDER_TYPE', dataType: 'text' },
                { fieldName: 'SEV_PROG_RATE', dataType: 'number' },
                { fieldName: 'SEV_PROG_ADD_VALUE', dataType: 'number' },
                { fieldName: 'ACTION_UPDATE', dataType: 'text' },
                { fieldName: 'ACTION_DEL', dataType: 'text' },
            ],
            columns: [
                { fieldName: 'ACCUMUL_SEV_CONTROL_NO', header: '관리번호' },
                { fieldName: 'PERIOD_TYPE', header: '기간구분' },
                { fieldName: 'SEV_PROG_BRACKET_VAL', header: '적립구간 시작', 
                  numberFormat: "#,##0", styleName: "right-column"
                },
                { fieldName: 'BORDER_TYPE', header: '경계' },
                { fieldName: 'SEV_PROG_RATE', header: '누진율',
                  numberFormat: "#,##0.000", styleName: "right-column"
                },
                { fieldName: 'SEV_PROG_ADD_VALUE', header: '가산값',
                  numberFormat: "#,##0.000", styleName: "right-column"
                },
                me.getUpdateColumn({headerText: '수정', fieldName: 'ACTION_UPDATE', columnWidth: 70}),
                me.getDeleteColumn({headerText: '삭제', fieldName: 'ACTION_DEL', columnWidth: 70}),
            ]      
        }
    },
    methods: {
        /* setSevProgType(_sevProgType = '') {
            this.SEV_PROG_TYPE = _sevProgType;
        }, */
        async loadGridData() {
            try {
                let {data} = this.cfgRetireCalcForm ? ( await this.$httpGet('/payroll/multiretirecfg/prog-rate/list', {
                    SEV_CONTROL_NO: this.cfgRetireCalcForm.SEV_CONTROL_NO
                }) || []) : ([]);
                this.setRealgridData(data);
            }
            catch(e) {
                console.error("SaveSectionGrid err: ", e);
            }
        },
        addData() {
            this.$refs.saveSectionModal.show({rowData: { ACCUMUL_SEV_CONTROL_NO: this.sevControlNo, PERIOD_TYPE: this.svcPerMethod, SEV_PROG_BRACKET_VAL: '',
                                                        BORDER_TYPE: this.sevProgBorder, SEV_PROG_RATE: null, SEV_PROG_ADD_VALUE: null }, SEV_PROG_TYPE: this.sevProgType});
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellClicked = function(grid, clickData) {
                if (clickData.column == 'ACTION_DEL') {
                    // 삭제처리
                }
                else if(clickData.column == 'ACTION_UPDATE') {
                    let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
                    delete _rowData['ACTION_UPDATE'];
                    delete _rowData['ACTION_DEL'];

                    me.$refs.saveSectionModal.show({rowData: _rowData, SEV_PROG_TYPE: me.sevProgType});
                }
            }
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'save-section-grid'});
        this.loadGridData();
    },
}
</script>
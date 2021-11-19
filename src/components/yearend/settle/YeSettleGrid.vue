<template>
<div>
    <border-box  width="180" v-slot="slotProps">
        <border-box-item title="연도" :width="slotProps.width">
            <ui-dropdown :items="attYear.items"
                        :value="attYear.value"
                        @change="attYear.value=$event.value; attYear.return=$event;"
                        :options="{
                                        valueField  : 'code',
                                        labelField  : 'message',
                                        tooltipField: 'message'
                                    }" />
        </border-box-item>
        <border-box-item title="대상" :width="slotProps.width">
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
            <button type="button" class="btn btn-md line-1" @click="onSearch">
                    <span>검색</span>
            </button>
        </border-box-item>
    </border-box> 

    <border-box>
        <border-box-item button>
            <button class="btn btn-md line-1">
                간소화 Zip 파일 업로드
            </button>
        </border-box-item>
        <border-box-item button>
            <button class="btn btn-md line-1">
                소득공제신고서 조회
            </button>
        </border-box-item>
        <border-box-item button>    
            <button class="btn btn-md line-1">
                근로소득원천징수영수증 조회
            </button>
        </border-box-item>
        <border-box-item button>
            <button class="btn btn-md line-1" @click="end(true, 'FINAL_TAX')">
                마감해제
            </button>
        </border-box-item>
        <border-box-item button>
            <button class="btn btn-md line-1" @click="end(false, 'CLOSED')">
                Draft 표시
            </button>
        </border-box-item>
        <border-box-item button>
            <button class="btn btn-md line-1" @click="end(true, 'CLOSED')">
                Draft 해제
            </button>
        </border-box-item>
        <border-box-item button>
            <button class="btn btn-md line-1" @click="end(false, 'FINAL_TAX')">
                마감
            </button>
        </border-box-item>
    </border-box>
    <div>
        <div id="yearend-settle-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
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
    data() {
        return {
            attYear: {
                value: String(new Date().getFullYear()),
                return: null,
                items: this.getRecentYearList()
            },
            qrySettleType: {
                value: 'ALL',
                return: null,
                items: [
                    {message: '전체', code: 'ALL'},
                    {message: '재직자', code: 'YEAREND'},
                    {message: '퇴직자', code: 'SEV'}
                ]
            },   
            //grid
            fields: [
                { fieldName: 'EMP_NAME', dataType: 'text' }, 
                { fieldName: 'HRDEPT_NAMK', dataType: 'text' }, 
                { fieldName: 'YE_PROGRESS', dataType: 'text' },
                { fieldName: 'DRAFT_YES', dataType: 'text' },
                { fieldName: 'WORK_TIME', dataType: 'text' },
                { fieldName: "METHOD",      dataType: 'text' }
            ],
            columns: [
                { fieldName: 'EMP_NAME', header: '성명', width: 75 }, 
                { fieldName: 'HRDEPT_NAMK', header: '부서', width: 75 }, 
                { fieldName: 'YE_PROGRESS', header: '진행단계', width: 75 }, 
                { fieldName: 'DRAFT_YES', header: 'Draft', width: 50 },
                { fieldName: 'WORK_TIME', header: '최종작업일시', width: 130 },
                { fieldName: 'METHOD', header: "조작", width: 75, type: 'staticButton', buttonLabel: '정산' }
            ],
            rowAttrs: ['EID', 'EMP_NUMBER'],
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpGet('/year-end/admin/deduction/mass-emp/status', {
                    ATT_YEAR: this.attYear.value
                }) || [];
                this.setRealgridData(data);
            } catch(e) {
                console.error("YeSettle loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.setStateBar({
                visible: false
            });
        },
        onSearch() {
            this.loadGridData();
        },     
        async end(release=false, step)      {  // 마감  false , 마감해제 true
            try {
                let checkedRows = this.gridView.getCheckedRows();
                if(checkedRows.length < 1) {
                    this.toastAlertSelect()
                    return;
                }
                let eidList = [];
                for(let i = 0; i < checkedRows.length; i ++) {
                    let _rowData = this.dataProvider.getFieldValues('ROW_ATTRS', checkedRows[i], checkedRows[i]);    
                    eidList.push({'EID': _rowData[0]['EID']});
                }
                let _param = {
                    "ATT_YEAR": this.attYear.value,
                    "CURRENT_STEP": step,
                    "EID_LIST": JSON.stringify(eidList)
                };
                if(step == 'CLOSED') {
                    _param['DRAFT_YES'] = (release ? 'N' : 'Y');
                }
                else {
                    _param['CLOSE_YN'] = (release ? 'N' : 'Y');
                }
                await this.$httpPost({
                    url: (step == 'CLOSED' ? '/year-end/admin/deduction/mass-emp/draft' :'/year-end/admin/deduction/mass-emp/closing'),
                    param: _param
                });
                this.toastSuccessModify();
                this.loadGridData();
            }
            catch(e) {
                console.error("YeSettleGrid end error: ", e);
            }
        },
        // define gridview callback
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellItemClicked = function (grid, index, clickData) {
                // index.dataRow
                let _rowData = me.dataProvider.getJsonRow(index.dataRow);
                me.$emit('doSettle', {EID: _rowData['ROW_ATTRS']['EID'], EMP_NUMBER: _rowData['ROW_ATTRS']['EMP_NUMBER'], EMP_NAME: _rowData['EMP_NAME']});
            };
        }
    },
    mounted() {
        let me = this;
        this.columns[2]['type'] = this.columns[4]['type'] = 'data';
        this.columns[2]['renderer'] = {
            type: "html",
            callback: function(grid, cell, w, h) {
                return me.getYeProgressText(cell.value);
            }
        };
        this.columns[4]['renderer'] = {
            type: "html",
            callback: function(grid, cell, w, h) {
            return me.getDateFromTimeStamp(cell.value);
            }
        };
        this.createRealGrid({'domId': 'yearend-settle-grid', 'checkbar': 'multi'});
        this.loadGridData();
    },
}
</script>
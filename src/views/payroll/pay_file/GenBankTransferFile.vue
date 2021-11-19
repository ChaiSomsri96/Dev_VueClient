<template>   
<div>
    <ui-header :msg="'파일 생성'" />
    <div class="content-body">
        <base-tabs>
            <base-tabs-item label="급여계좌검증" :to="{name: 'PayAccountVerify'}"/>
            <base-tabs-item label="은행이체파일생성" :to="{name: 'GenBankTransferFile'}"/>
            <base-tabs-item label="급여전표생성" :to="{name: 'GenPayCheck'}"/>
        </base-tabs>
        <div>
            <div class="box border-box type2">
                <div class="box-body row">
                    <div class="pull-left search-wrap">
                        <label class="form-label type2 col-1 pr-0">
                            <span>급여일</span>
                        </label>
                        <div class="input-group col-2 pr-0">
                            <ui-month-picker v-model="payrollMonthStart" />
                        </div>
                        <div class="input-group col-2 pr-0">
                            <ui-month-picker v-model="payrollMonthEnd" />
                        </div>
                        <button type="button" id="btnSearch" class="btn btn-md line-1 ml-10" @click="onSearch">
                            <span>검색</span>
                        </button>
                    </div>
                </div>
            </div>

            <border-box width="270" v-slot="slotProps" v-if="isShow">
                <border-box-item title="항목별 겹따옴표 구분" :width="slotProps.width" radio>
                    <ui-radio-button-inline :options="separateByItem" />
                </border-box-item>
                <border-box-item title="언어">
                    <ui-dropdown :items="language.items"
                                   :value="language.value"
                                   @change="language.value=$event.value; language.return=$event;"
                                   :options="{
                                                   valueField  : 'code',
                                                   labelField  : 'message',
                                                   tooltipField: 'message'
                                               }" />
                </border-box-item>
                <border-box-item button>
                    <button type="button" class="btn btn-md line-1" @click="generateBankFile">
                        <span>은행이체파일 생성</span>
                    </button>
                </border-box-item>
            </border-box>
            <div class="row">
              <div class="form-row">
                <button type="button" class="btn btn-md flat" @click="generateBankFile">
                  <span>은행이체파일 생성</span>
                </button>
              </div>
            </div>
            <div>
                <div id="gen-bank-transfer-file-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
            </div>

            <gen-bank-transfer-file-modal ref="genBankTransferFileModal" />
        </div>
    </div>
</div>
</template>

<script>
import BaseTabs from '@/components/common/BaseTabs';
import BaseTabsItem from '@/components/common/BaseTabsItem';
import UiMonthPicker from '@/components/common/UiMonthPicker';
import UiRadioButtonInline from '@/components/common/UiRadioButtonInline';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';
import GenBankTransferFileModal from '@/components/payroll/pay_file/modals/GenBankTransferFileModal';

import grid from '@/mixin/payroll-grid';

export default {
    mixins: [grid],
    components: {
        BaseTabs,
        BaseTabsItem,
        UiMonthPicker,
        UiRadioButtonInline,
        BorderBox,
        BorderBoxItem,
        GenBankTransferFileModal
    },
    data() {
        return {
            isShow:false,
            payrollMonthStart: this.getFirstMonthOfTheYear(),
            payrollMonthEnd: this.getCurrentMonth(),    
            language: {
                value: 'KOREAN',
                return: null,
                items: [{
                    message: '한국어',
                    code: 'KOREAN'
                },{
                    message: '영어',
                    code: 'ENGLISH'
                },{
                    message: '일어',
                    code: 'JAPANESE'
                }]
            },
            separateByItem: { //항목별 겹따옴표 구분
                name: 'separate-by-item',
                value: 'N',
                domOptList: [
                    { value: 'Y', label: '예', id: 'separate-by-item-yes' },
                    { value: 'N', label: '아니오', id: 'separate-by-item-no' }
                ]              
            },

            //grid
          fields: [
            { fieldName: 'PAY_MONTH',  dataType: "data"},
            { fieldName: 'SEQ',     dataType: 'text' },
            { fieldName: 'PAY_DATE', dataType: "data"},
            { fieldName: 'PAYDAY_TYPE_MEMO', dataType: 'text' },
          ],
          columns: [
            { fieldName: 'PAY_MONTH', header: '급여월', width: 100,
              renderer: {
                type: "html",
                callback: function (grid, cell, w, h) {
                  let year = cell.value.toString().slice(0,4)
                  let month = cell.value.toString().slice(4,6)
                  return year+'.'+month;
                }
              } },
            { fieldName: 'SEQ', header: '차수', width: 30 },
            { fieldName: 'PAY_DATE', header: '급여일', width: 120,
              renderer: {
                type: "html",
                callback: function (grid, cell, w, h) {
                  let year = cell.value.toString().slice(0,4)
                  let month = cell.value.toString().slice(4,6)
                  let day = cell.value.toString().slice(6,8)
                  return year+'.'+month+'.'+day;
                }
              } },
            { fieldName: 'PAYDAY_TYPE_MEMO', header: '제목', width: 200, styleName: 'left-column' },
          ]
        }
    },
    methods: {
        async loadGridData() {
            try {
                let { data } = await this.$httpPost({
                    param: {
                        'PAY_MONTH_FROM': this.payrollMonthStart.replace('-', ''),
                        'PAY_MONTH_TO': this.payrollMonthEnd.replace('-', '')
                    },
                    url: '/payroll/code/pay-date/list'
                });
                this.setRealgridData(data.list || []);
            }
            catch(e) {
                console.error("GenBankTransferFile loadGridData err: ", e);
            }
        },  
        addRealGridOption() {
            this.gridView.checkBar.visible=true;
        },
        onSearch() {
            this.loadGridData();
        },
        generateBankFile() {
            let checkedRows = this.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toast({message: this.messages['mustAtLeastOnePayMonthSelect'], type:"error"});
                return;
            }
            let __checkedData = [];
            for(let i = 0; i < checkedRows.length; i ++) { 
                let _rowData = this.dataProvider.getJsonRow(checkedRows[i]);
                __checkedData.push({ 'PAY_MONTH_SEQ': _rowData['PAY_MONTH'] + '-' + _rowData['SEQ'] });
            }
            this.$refs.genBankTransferFileModal.show({
                'DOUBLE_QUOTE': this.separateByItem.value,
                'RPT_LANG': this.language.value,
                'paymonthseqList': __checkedData
            });
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'gen-bank-transfer-file-grid'});
        this.loadGridData();
    }
}
</script>
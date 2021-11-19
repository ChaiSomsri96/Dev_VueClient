<template>
  <base-modal title="급여대장 조회" id="sev-pension-saving-modal" :scroll="false" width="1380">
    <template v-slot:body>
      <border-box width="200" search>
        <border-box-item button>
          <button type="button" id="btnSearch" class="btn btn-md icon-lineIcon-download" @click="downloadRealGridExcel();">
            <span>다운로드</span>
          </button>
        </border-box-item>
        <border-box-item title="기준일">
          <ui-input-date :date="saveDate.value"
                         @change="saveDate.value=$event;" />
        </border-box-item>
      </border-box>
<!--      <button type="button"-->
<!--              class="btn btn-md flat"-->
<!--              @click="downloadRealGridExcel()" >-->
<!--        <i class="icon-lineIcon-download mr-5"></i><span>다운로드</span>-->
<!--      </button>-->
      <div class="row" style="height: 500px;">
        <div id="sev-pension-saving-modal-grid" style="width: 100%; height: 500px" class="realgrid-type-style"></div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="btn-wrap">
        <button class="btn btn-md flat" data-dismiss="modal" @click="onCancel" aria-label="Close">
          <i class="icon-lineIcon-close mr-5"></i>취소
        </button>
        <button class="btn btn-md black" @click="sevPensionSaveRecord();">
          <i class="icon-lineIcon-check mr-5"></i>저장
        </button>
      </div>
    </template>
  </base-modal>
</template>
<script>
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import BorderBox from '@/components/common/BorderBox';
import BorderBoxItem from '@/components/common/BorderBoxItem';

export default {
  mixins: [modal, grid],
  components: {
    BaseModal,
    BorderBox,
    BorderBoxItem,
  },
  data() {
    return {
      empList: [],
      matterList: [],
      saveDate: {
        value: ''
      },
      fields: [ ],
      columns: [],
    }
  },
  async created() {
    this.loadReadlGridColumns();
  },

  methods: {
    onCancel() {
      let me = this;
      me.saveDate.value ='';
      me.empList = [];
      me.matterList = [];
    },

    loadReadlGridColumns() {
      this.columns = [
        { fieldName: 'EMP_NAME', header: '성명', styleName: 'left-column'},
        { fieldName: 'SEV_DATE', header: '기준일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_PENSION_SEQ', header: '차수', styleName: 'right-column'},
        { fieldName: 'E_JOIN_DATE', header: '입사일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SERVICE_YEAR', header: '근속연수', styleName: 'left-column'},
        { fieldName: 'HRDEPT_NAMK', header: '부서', styleName: 'left-column'},
        { fieldName: 'RANK_NAME', header: '직급', styleName: 'left-column'},
        { fieldName: 'EMPTYPE_NAME', header: '직원구분', styleName: 'left-column'},
        { fieldName: 'PAYTYPE_NAME', header: '임금유형', styleName: 'left-column'},
        { fieldName: 'RETIREBASE_DT', header: '중간정산일', datetimeFormat: 'yyyy.MM.dd'},
        { fieldName: 'SEV_RPEN_FINAL_AMT', header: '퇴직연금 적립액', numberFormat: '#,##0', styleName: 'right-column',
          footer: {
            text: '0',
            expression: 'sum',
            numberFormat: '#,##0',
          }
        }
      ]
      this.fields= [
        { fieldName: 'EMP_NAME', dataType: 'text'},
        { fieldName: 'SEV_DATE', dataType: 'datetime',datetimeFormat: 'yyyyMMdd'},
        { fieldName: 'SEV_PENSION_SEQ', dataType: 'text'},
        { fieldName: 'E_JOIN_DATE', dataType: 'datetime',datetimeFormat: 'yyyyMMdd'},
        { fieldName: 'SERVICE_YEAR', dataType: 'text'},
        { fieldName: 'HRDEPT_NAMK', dataType: 'text'},
        { fieldName: 'RANK_NAME', dataType: 'text'},
        { fieldName: 'EMPTYPE_NAME', dataType: 'text'},
        { fieldName: 'PAYTYPE_NAME', dataType: 'text'},
        { fieldName: 'RETIREBASE_DT', dataType: 'datetime',datetimeFormat: 'yyyyMMdd'},
        { fieldName: 'SEV_RPEN_FINAL_AMT', dataType: 'number'}
      ]
    },

    callgrid(){
      this.$parent.loadGridData();
    },

    sevPensionSaveRecord() {
      const me = this;
      let saveDate = me.saveDate.value;
      if( !saveDate || saveDate.length != 8) {
        this.toast({message: '퇴직연금 적립대장 기록일을 입력해주세요.', type:"error"});
        return false;
      }

      let formData = {}
      formData.SEV_RPEN_SAVE_SOURCE = 'A';
      formData.SEV_RPEN_SAVE_TYPE = 'S';
      formData.SEV_RPEN_INPUT_TYPE = 'A';
      formData.SEV_DATE = saveDate;
      // me.callgrid();
      // debugger
      this.$httpPost({
        url: '/payroll/multiretirement/multi-retire-save/new-list',
        param: {
          'matterList': JSON.stringify( me.matterList),
          'eidList': JSON.stringify( me.empList),
          'formData': JSON.stringify( formData)
        },
        callback(){
          me.toastSuccessSave();
          me.callgrid();
        }
      });
          // .then( me.onCancel());
    },

    async loadGridData( param) {
      this.matterList = param.sevPensionList
      try {
        let { data } = await this.$httpPost({
          url: '/payroll/retirement/sev-pension/check-target-list',
          param: {
            'dataList': JSON.stringify( this.matterList)
          }
        });
        for( let i=0; i< data.length; i++) {
          this.empList.push({ EID: data[i].EID, SEV_RPEN_FINAL_AMT: data[i].SEV_RPEN_FINAL_AMT})
        }
        this.setFieldsNColumns();
        this.setRealgridData( data || []);
      }
      catch(e) {
        console.log("SevPensionSavingModal loadGridData error", e);
      }
    },
    //modal
    createDynamicComponent() {
      // this.createGridFrame({
      //   'domId': 'sev-pension-saving-modal-grid'
      // });
      this.createRealGrid({
        'domId': 'sev-pension-saving-modal-grid'
      });
    },
    asyncDynamicComponentData(param) {
      this.loadGridData( param);
    }
  }
}
</script>
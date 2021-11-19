<template>
  <div>
    <table-form :colgroup="['10%', 'auto', '10%', 'auto', '10%', '10%', 'auto', '10%']"
                footer-hide title="부양가족" class-attr="mb-20">
      <template v-slot:body>
        <tr>
          <table-form-label label="부녀자공제"/>
          <table-form-item>
            <input type="text" class="form-control" value='아니오' readonly>
          </table-form-item>
          <table-form-label label="한부모공제"/>
          <table-form-item>
            <input type="text" class="form-control" value='예' readonly>
          </table-form-item>
          <table-form-item>
            <button class="btn btn-md flat"
                @click="openDeductionApplication()"><i class="icon-lineIcon-plus mr-5"></i>
              입력
            </button>
          </table-form-item>
          <table-form-label label="특정장애인"/>
          <table-form-item>
            <input type="text" class="form-control" value='허랑하' readonly>
          </table-form-item>
          <table-form-item>
            <button class="btn btn-md flat"
                    @click="openHandDed()"><i class="icon-lineIcon-plus mr-5"></i>
              입력
            </button>
          </table-form-item>
        </tr>
      </template>
    </table-form>
    <button-panel btn-type="top">
      <template v-slot:start>
        <button class="btn btn-md flat" @click="addDependent()"><i class="icon-lineIcon-plus mr-5"></i>
          추가
        </button>
        <button class="btn btn-md flat" @click="addEvidence()">
          <i class="icon-lineIcon-plus mr-5"></i>증빙등록
        </button>
      </template>
    </button-panel>
    <div>
      <div id="support-family-grid" class="realgrid-type-style" style="width: 100%; height: 500px"></div>
    </div>
    <dependent-modal ref="dependentModal" @close="loadGridData()"/>
    <register-hand-ded-modal ref="registerHandDedModal"/>
    <evidence-input-modal ref="evidInputModal"/>
    <deduction-application-modal ref="deductionApplicationModal" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import grid from '@/mixin/payroll-grid';
import DependentModal from '@/components/yearend/settle/modals/ye_dependents/DependentModal';
import RegisterHandDedModal from '@/components/yearend/settle/modals/ye_dependents/RegisterHandDedModal';
import ButtonPanel from '@/components/common/ButtonPanel';
import TableForm from '@/components/common/TableForm';
import TableFormItem from '@/components/common/TableFormItem';
import TableFormLabel from '@/components/common/TableFormLabel';
import {familyRelationRenderer, familyPersonLivingRenderer} from '@/utils/yearendCodes';
import EvidenceInputModal from "../../../components/yearend/settle/modals/EvidenceInputModal";
import DeductionApplicationModal
  from "../../../components/yearend/settle/modals/ye_dependents/DeductionApplicationModal";

export default {
  mixins: [grid],
  components: {
    EvidenceInputModal,
    DependentModal,
    RegisterHandDedModal,
    ButtonPanel,
    TableForm,
    TableFormItem,
    TableFormLabel,
    DeductionApplicationModal
  },
  computed: {
    ...mapGetters({
      eid: 'yearend/getEid',
      attYear: 'yearend/getAttYear',
      payday: 'yearend/getPayday'
    })
  },
  data() {
    let me = this;
    return {
      step: 'FAMILY',
      // grid
      fields: [
        {fieldName: 'PERSON_NAME', dataType: 'text'},
        {fieldName: 'PERSON_RRN_FULL', dataType: 'text'},
        {fieldName: 'PERSON_AGE', dataType: 'text'},
        {
          fieldName: 'PERSON_INCOME', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("PERSON_INCOME")] == 1)
              return '이하';
            else
              return '초과';
          }
        },
        {
          fieldName: 'PERSON_REL', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
          }
        },
        {
          fieldName: 'PERSON_LIVING', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            return familyPersonLivingRenderer(values[fieldNames.indexOf("PERSON_LIVING")]);
          }
        },
        {
          fieldName: 'PERSON_NATION', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("PERSON_NATION")] == 1)
              return '내국인';
            else
              return '외국인';
          }
        },
        {fieldName: 'PASSPORT_NO', dataType: 'text'},
        {
          fieldName: 'HANDI_DED', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("HANDI_DED")] == '1')
              return '장애인 복지법에 따른 장애인';
            else if (values[fieldNames.indexOf("HANDI_DED")] == '2')
              return '국가유공자예우법에 따른 상이자 등';
            else if (values[fieldNames.indexOf("HANDI_DED")] == '3')
              return '항시치료를 요하는 중증환자';
            else if (values[fieldNames.indexOf("HANDI_DED")] == 'Z')
              return '대상아님';
          }
        },
        {fieldName: 'CURE_DATE', dataType: 'text'},
        {
          fieldName: 'BASIC_DED', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("BASIC_DED")] == 1)
              return 'Y';
            else
              return 'N';
          }
        },
        {
          fieldName: 'ELDER_DED', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("ELDER_DED")] == 1)
              return 'Y';
            else
              return 'N';
          }
        },
        {
          fieldName: 'BIRTH_DED', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("BIRTH_DED")] == 1)
              return '예';
            else
              return '아니오';
          }
        },
        {
          fieldName: 'ADOPTION_DED', dataType: 'text',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if (values[fieldNames.indexOf("ADOPTION_DED")] == 1)
              return '예';
            else
              return '아니오';
          }
        },
        {fieldName: 'UPDATE'},
        {fieldName: 'DELETE', dataType: 'boolean',
          valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
            if(values[fieldNames.indexOf("ROW_ATTRS")].PERSON_REL == '0'){
              return true;
            }
            return false;
          }
        }
      ],
      columns: [
        {fieldName: 'PERSON_NAME', header: '성명', width: 80/*, styleName: "grid-link-column" <- 링크 스타일 */},
        {fieldName: 'PERSON_RRN_FULL', header: '주민등록번호', width: 150},
        {fieldName: 'PERSON_AGE', header: '나이', width: 50},
        {fieldName: 'PERSON_INCOME', header: '연소득'},
        {fieldName: 'PERSON_REL', header: '관계'},
        {fieldName: 'PERSON_LIVING', header: '생계'},
        {fieldName: 'PERSON_NATION', header: '내외국인'},
        {fieldName: 'PASSPORT_NO', header: '여권번호'},
        {fieldName: 'HANDI_DED', header: '장애인'},
        {fieldName: 'CURE_DATE', header: '장애기한'},
        {fieldName: 'BASIC_DED', header: '기본', width: 50},
        {fieldName: 'ELDER_DED', header: '경로', width: 50},
        {fieldName: 'BIRTH_DED', header: '출생', width: 50},
        {fieldName: 'ADOPTION_DED', header: '입양', width: 50},
          me.getUpdateColumn(),
          me.getDeleteColumn()
      ],
      rowAttrs: [
        'YES_ID', 'CARD_DED', 'FEMALE_DED', 'SINGLE_PARENT', 'PERSON_NAME', 'PERSON_BIRTH',
        'PERSON_RRN', 'PERSON_AGE', 'PERSON_INCOME', 'PERSON_REL', 'PERSON_LIVING', 'PERSON_NATION',
        'PASSPORT_NO', 'HANDI_DED', 'CURE_DATE', 'BASIC_DED', 'ELDER_DED', 'BIRTH_DED', 'ADOPTION_DED'
      ]
    }
  },
  methods: {
    async asyncData() {
    },
    async loadGridData() {
      let me = this;
      try {
        let {data} = await me.$httpPost({
          url: '/year-end/employee/deduction/request/next-step-data',
          param: {
            "EID": me.eid,
            "ATT_YEAR": me.attYear,
            "PAYDAY": me.payday,
            "CURRENT_STEP": me.step
          }
        });
        me.setRealgridData(data.list);
      } catch (e) {
        console.error("YeIncome PrevWork loadGridData err: ", e);
      }
    },
    addRealGridOption() {
      this.gridView.setStateBar({
        visible: false
      });
    },
    realgridCreatedCallback() {
      let me = this;
      this.gridView.onCellClicked = function (grid, clickData) {
        if (clickData.column == 'UPDATE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.$refs.dependentModal.show(_rowData['ROW_ATTRS']);
        }
        if (clickData.column == 'DELETE') {
          let _rowData = me.dataProvider.getJsonRow(clickData.dataRow);
          me.delete(_rowData['ROW_ATTRS']);
        }
      }
    },
    addDependent() {
      this.$refs.dependentModal.show();
    },
    openHandDed() {
      this.$refs.registerHandDedModal.show();
    },
    openDeductionApplication() {
      this.$refs.deductionApplicationModal.show();
    },
    async delete(dependent) {
      let me = this;
      // 근로자 본인정보는 삭제 불가.
      if(dependent.PERSON_REL == '0'){
        return;
      }

      me.confirm({
        title: '확인',
        message: '정말 삭제하시겠습니까?',
        yesCallback: async function() {
          let _params = {
            ATT_YEAR: me.attYear,
            EID: me.eid,
            PAYDAY: me.payday,
            CURRENT_STEP: me.step,
            YES_ID: dependent.YES_ID
          };
          try {
            await me.$httpPost({
              url: "/year-end/employee/deduction/request/delete",
              param: _params,
              callback: function() {
                me.toastSuccessDelete();
              }
            });
            me.close();
          }
          catch(e) {
            console.log("DependentModal onDelete: ", e);
          }
        }
      });
    },
  },
  mounted() {
    this.createRealGrid({'domId': 'support-family-grid'});
    this.asyncData();
    this.loadGridData();
  }
}
</script>
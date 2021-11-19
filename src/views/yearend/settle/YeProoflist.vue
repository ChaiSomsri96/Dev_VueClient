<template>
    <div>
        <div class="row">
            <grid-title title="증빙목록">
              <evidence-button :step="step" />
            </grid-title>
        </div>
        <div class="mb-20">
            <div id="evidence-list-grid" class="realgrid-type-style" style="height:250px"></div>
        </div>
        <unsubmit-evid-list />
        <evidence-input-modal ref="evidenceInputModal" />
    </div>
</template>

<script>
import grid from '@/mixin/payroll-grid';
import UnsubmitEvidList from './UnsubmitEvidList';
import EvidenceInputModal from '@/components/yearend/settle/modals/EvidenceInputModal';
import GridTitle from '@/components/common/GridTitle';
import { evidTypeRenderer, getDateTimeFromTimeStamp } from '@/utils/yearendCodes';
import { mapGetters } from 'vuex';
import EvidenceButton from "../../../components/yearend/settle/EvidenceButton";
const rows = [
    { "ITEM": "부양가족", "TARGET": "홍길다", "EVID_TYPE": "주민등록표등본", "FILENAME": "고길동(750101)-2020년도자료.pdf", 
        "TIMES": "3", "REG_DATE": "2021-0119 10:18" }
]
export default {
    components: {
      EvidenceButton,
        UnsubmitEvidList,
        EvidenceInputModal,
        GridTitle
    },
    computed: {
        ...mapGetters({
            eid: 'yearend/getEid',
            attYear: 'yearend/getAttYear',
            payday: 'yearend/getPayday'
        })
    },
    mixins: [grid],
    data() {
        const me = this;
        return {
            step: 'EVID',
            // grid
            fields: [
                { fieldName: 'EVID_TYPE', dataType: 'text', 
                    valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                        return evidTypeRenderer(values[fieldNames.indexOf("EVID_TYPE")]);
                    } 
                }, 
                { fieldName: 'PERSON_NAME', dataType: 'text' }, 
                { fieldName: 'EVID_NAME', dataType: 'text' }, 
                { fieldName: 'FILE_NAME', dataType: 'text' }, 
                { fieldName: 'UPLOAD_BATCH_NO', dataType: 'text' }, 
                { fieldName: 'CREATE_TIME', dataType: 'text',
                    valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                        return getDateTimeFromTimeStamp(values[fieldNames.indexOf("CREATE_TIME")]);
                    }  }, 
                { fieldName: 'VIEW', dataType: 'text'},
                { fieldName: 'DOWNLOAD', dataType: 'text'},
                { fieldName: 'DELETE', dataType: 'text'}
            ],
            columns: [
                { fieldName: 'EVID_TYPE', header: '항목' },
                { fieldName: 'PERSON_NAME', header: '대상자' },
                { fieldName: 'EVID_NAME', header: '증빙종류' },
                { fieldName: 'FILE_NAME', header: '파일이름' },
                { fieldName: 'UPLOAD_BATCH_NO', header: '차수' },
                { fieldName: 'CREATE_TIME', header: '등록일시' },
                me.getIconColumn({headerText: '보기', fieldName: 'VIEW', columnWidth: 70, type: 'view'}),
                me.getIconColumn({headerText: '다운', fieldName: 'DOWNLOAD', columnWidth: 70, type: 'download'}),
                me.getIconColumn({headerText: '삭제', fieldName: 'DELETE', columnWidth: 70, type: 'delete'})
            ]
        }
    },
    methods: {
        async loadGridData() {
            try {
                let {data} = await this.$httpPost({
                    url: '/year-end/employee/evid/select',
                    param: {
                        'EID': 1491, //this.eid,
                        'ATT_YEAR': this.attYear,
                        'CURRENT_STEP': this.step,
                        'PAYDAY': this.payday,
                        'LIST_ALL': 'YES'
                    }
                });
                this.setRealgridData(data || []);
            } catch(e) {
                console.error("Evidence loadGridData err: ", e);
            }
        },
        addEvidence() {
            this.$refs.evidenceInputModal.show({step:this.step});
        }
    },
    mounted() {
        this.createRealGrid({'domId': 'evidence-list-grid', hideFooters: true});
        this.loadGridData();
    }
}
</script>

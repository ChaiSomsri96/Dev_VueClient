<template>
<base-modal title="직계비속(기타) 특정장애인 등록" id="register-hand-ded-modal" :scroll="false" size="large">
    <template v-slot:body>
        <comment-box
        :list="[{'text': '* 특정장애인은 장애인 직계비속의 장애인 배우자를 의미 합니다.'},
                {'text': '* 특정장애인으로 선택한 경우 부양가족 장애인 공제대상 값과 장애기한을 입력해야 합니다.'},]"
        />
        <div class="row mt-20" style="height: 300px;">
            <div id="register-hand-ded-grid" style="width: 100%; height: 300px" class="realgrid-type-style">
            </div>
        </div>
    </template>
    <template v-slot:footer>
        <div class="btn-wrap">
            <button class="btn btn-md flat" data-dismiss="modal" aria-label="Close">
                <i class="icon-lineIcon-close mr-5"></i>닫기
            </button>
        </div>
    </template>
</base-modal>
</template>
<script>
import CommentBox from '@/components/common/CommentBox';
import BaseModal from '@/components/common/BaseModal';
import modal from '@/mixin/modal';
import grid from '@/mixin/payroll-grid';
import { familyRelationRenderer } from '@/utils/yearendCodes';
import { mapGetters } from 'vuex';
export default {
    mixins: [modal, grid],
    components: {
        BaseModal,
        CommentBox
    },
    computed: {
        ...mapGetters({
            eid: 'yearend/getEid',
            payday: 'yearend/getPayday',
            attYear: 'yearend/getAttYear'
        })
    },
    data() {
        return {
            fields: [
                { fieldName: 'PERSON_NAME',  dataType: 'text' }, 
                { fieldName: 'PERSON_RRN_FULL',  dataType: 'text' }, 
                { fieldName: 'PERSON_REL',  dataType: 'text' ,
                    valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                        return familyRelationRenderer(values[fieldNames.indexOf("PERSON_REL")]);
                    }}, 
                { fieldName: 'PERSON_REL_SFLAG',  dataType: 'text' }, 
                { fieldName: "METHOD",      dataType: 'text' }
            ],
            columns: [
                { fieldName: 'PERSON_NAME', header: '성명', editable: false },
                { fieldName: 'PERSON_RRN_FULL', header: '주민등록번호', editable: false },
                { fieldName: 'PERSON_REL', header: '관계코드', editable: false },
                {   name: 'PERSON_REL_SFLAG',
                    fieldName: 'PERSON_REL_SFLAG', header: { "text": '특정장애인' },
                "sortable": false,
                 "lookupDisplay": true, 
                 "values": ["1", "Z"],
                "labels": ["특정장애인", "대상아님"],
                "editor": {
                        "type": "dropdown",
                        "dropDownCount": 4
                    }  },
                { fieldName: 'METHOD', header: "조작", width: 100, type: 'staticButton', buttonLabel: '저장' }
            ],
            rowAttrs: ['YES_ID']      
        }
    },
    methods: {
        async loadGridData() {
            this.gridView.cancel();
            try {
                let { data } = await this.$httpGet('/year-end/employee/family/list', 
                                    {   EID: this.eid, 
                                        PAYDAY: this.payday, 
                                        QRY_CHILD_SPECIAL: 'YES'
                                    });
                this.setRealgridData(data || []);
            }
            catch(e) {
                console.error("RegisterHandDedModal loadGridData err: ", e);
            }
        },
        addRealGridOption() {
            this.gridView.setStateBar({
                visible: false
            });
            this.gridView.setRowIndicator({ visible: false });
        },
        realgridCreatedCallback() {
            let me = this;
            this.gridView.onCellItemClicked = function (grid, index, clickData) {
                me.gridView.commit();
                let _rowData = me.dataProvider.getJsonRow(index.dataRow);
                me.$httpPost({
                    url: '/year-end/employee/family/direct-child-special/save',
                    param: {
                        EID: this.eid,
                        YES_ID: _rowData['ROW_ATTRS']['YES_ID'],
                        ATT_YEAR: me.attYear,
                        PERSON_REL_SFLAG: _rowData['PERSON_REL_SFLAG']
                    },
                    callback: function() {
                        me.toastSuccessSave();
                        me.loadGridData();
                    }
                });
            }
        },
        //modal
        createDynamicComponent() {
            this.createRealGrid({'domId': 'register-hand-ded-grid', 'editable': true});
        },
        asyncDynamicComponentData() {
            this.loadGridData();
        }
    },
}
</script>
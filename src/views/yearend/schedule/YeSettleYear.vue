<template>
    <div>
        <!-- Header 영역 -->
        <ui-header :msg="'일정관리'"/>
        <!-- Body 영역 -->
        <div class="content-body">
          <ye-date-tab></ye-date-tab>
        </div>
    </div>
</template>
<script>
import YeDateTab from './YeDateTab';
import {GridView, LocalDataProvider, ValueType} from "realgrid";

let gridView = GridView;
let dataProvider = LocalDataProvider;
const columns= [
  { fieldName: 'CODE_2DIGIT', header: '2자리 국가코드', width: 110 },
  { fieldName: 'CODE_3DIGIT', header: '3자리 국가코드', width: 110 },
  { fieldName: 'COUNTRY_NAM', header: '국가명(국문)', width: 190 },
  { fieldName: 'COUNTRY_ENAME', header: '국가명(영문)', width: 190 },
  { fieldName: 'SHOW_FLAG', header: '보이기', width: 90 }
];

const fields= [
  { fieldName: 'CODE_2DIGIT', dataType: ValueType.TEXT },
  { fieldName: 'CODE_3DIGIT', dataType: ValueType.TEXT },
  { fieldName: 'COUNTRY_NAM', dataType: ValueType.TEXT },
  { fieldName: 'COUNTRY_ENAME', dataType: ValueType.TEXT },
  { fieldName: 'SHOW_FLAG', dataType: ValueType.TEXT }
];

export default {
  components: {
    YeDateTab
  },
  data: function () {
    return {
      selCode: {}
    }
  },
  methods: {
    async loadData() {

    },

    saveCode:function(){
    },

    download: function() {
      gridView.exportGrid({
        type: 'excel',
        target: 'local',
        fileName: '국가코드.xlsx',
        showProcess: true,
        progressMessage: '엑셀 export중입니다.',
        indicator: false,
        header: true,
        footer: false,
        compatibility: 'MS Excel'
      });
    },
  },
  mounted() {
    let me = this;

  }
}
</script>
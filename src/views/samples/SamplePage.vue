<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'Sample page'"/>
    <!-- body 영역 -->
    <div class="content-body">
      <!-- 검색영역 -->
      <div class="form-group">
        <div class="box border-box type2">
          <div data-v-3c395e1c="" class="box-body row">
            <div data-v-3c395e1c="" class="pull-left search-wrap">
              <div data-v-3c395e1c="" class="row">
                <div data-v-3c395e1c="" class="input-group type-divide col-4 pr-0">
                  <div data-v-3c395e1c="" class="divide-left"><span data-v-3c395e1c=""
                                                                    class="input-group-addon title">카테고리</span></div>
                  <div data-v-3c395e1c="" class="divide-right">
                    <div data-v-3c395e1c="" class="input-group dropdown">
                      <button type="button" data-toggle="dropdown" aria-expanded="false" title="전체"
                              class="form-control dropdown-toggle">전체<i class="icon-lineIcon-line-arrow-down"><span
                          class="blind">열기</span></i></button>
                      <div class="dropdown-menu dropdown-menu-scale" style="width: 100%;">
                        <div class="ndk-scrollbar" style="max-height: 160px;"><a href="#" onclick="return false;"
                                                                                 data-value="" title="전체"
                                                                                 class="dropdown-item ellipsis selected">전체</a><a
                            href="#" onclick="return false;" data-value="1064" title="테스트0528"
                            class="dropdown-item ellipsis">테스트0528</a><a href="#" onclick="return false;"
                                                                         data-value="813" title="테스트6"
                                                                         class="dropdown-item ellipsis">테스트6</a><a
                            href="#" onclick="return false;" data-value="840" title="한국_카테고리_지우지마시오."
                            class="dropdown-item ellipsis">한국_카테고리_지우지마시오.</a><a href="#" onclick="return false;"
                                                                                 data-value="684" title="카테추가2"
                                                                                 class="dropdown-item ellipsis">카테추가2</a><a
                            href="#" onclick="return false;" data-value="720" title="카테추가005"
                            class="dropdown-item ellipsis">카테추가005</a><a href="#" onclick="return false;"
                                                                         data-value="708" title="테스트01(KR)"
                                                                         class="dropdown-item ellipsis">테스트01(KR)</a><a
                            href="#" onclick="return false;" data-value="23" title="테스트03"
                            class="dropdown-item ellipsis">테스트03</a><a href="#" onclick="return false;" data-value="1"
                                                                       title="첫번째 양식 카테고리"
                                                                       class="dropdown-item ellipsis">첫번째 양식
                          카테고리</a><a href="#" onclick="return false;" data-value="26"
                                     title="테스트0111111111111122222222222" class="dropdown-item ellipsis">테스트0111111111111122222222222</a><a
                            href="#" onclick="return false;" data-value="35" title="기본"
                            class="dropdown-item ellipsis">기본</a></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-v-3c395e1c="" class="input-group type-divide col-4 pr-0">
                  <div data-v-3c395e1c="" class="divide-left"><span data-v-3c395e1c=""
                                                                    class="input-group-addon title">양식명</span></div>
                  <div data-v-3c395e1c="" class="divide-right">
                    <div data-v-3c395e1c="" class="input-group"><input data-v-3c395e1c="" id="pledgeName" type="text"
                                                                       class="form-control"></div>
                  </div>
                </div>
                <div data-v-3c395e1c="" class="input-group type-divide col-4 pr-0">
                  <div data-v-3c395e1c="" class="divide-left"><span data-v-3c395e1c=""
                                                                    class="input-group-addon title">사용여부</span></div>
                  <div data-v-3c395e1c="" class="divide-right">
                    <div data-v-3c395e1c="" class="input-group dropdown">
                      <button type="button" data-toggle="dropdown" aria-expanded="false" title="전체"
                              class="form-control dropdown-toggle">전체<i class="icon-lineIcon-line-arrow-down"><span
                          class="blind">열기</span></i></button>
                      <div class="dropdown-menu dropdown-menu-scale" style="width: 100%;">
                        <div class="ndk-scrollbar" style="max-height: 160px;"><a href="#" onclick="return false;"
                                                                                 data-value="" title="전체"
                                                                                 class="dropdown-item ellipsis selected">전체</a><a
                            href="#" onclick="return false;" data-value="1" title="사용"
                            class="dropdown-item ellipsis">사용</a><a
                            href="#" onclick="return false;" data-value="0" title="사용 안 함"
                            class="dropdown-item ellipsis">사용 안 함</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div data-v-3c395e1c="" class="pull-left ml-10">
              <button data-v-3c395e1c="" class="btn btn-md line-1 wide"><span data-v-3c395e1c="">검색</span></button>
            </div>
          </div>
        </div>
      </div>
      <!-- 상단 버튼 영역 -->
      <div class="form-row row">
        <button type="button" class="btn btn-md flat"><i class="icon-lineIcon-download mr-5"></i>다운로드</button>
        <button type="button" class="btn btn-md flat"><i class="icon-lineIcon-roleback mr-5"></i>회수</button>
        <button type="button" class="btn btn-md flat"><i class="icon-lineIcon-minus mr-5"></i>삭제</button>
        <button type="button" class="btn btn-md flat"><i class="icon-lineIcon-plus mr-5"></i>추가</button>
      </div>
      <!-- grid 영역 -->
      <div id="realgrid" style="height: 400px"></div>
      <!-- grid 하단 버튼 영역 -->
      <div class="tbl-bottom">
        <button type="button" class="btn btn-lg white"><i class="icon-lineIcon-close mr-5"></i>취소</button>
        <button type="button" class="btn btn-lg black ml-10"><i class="icon-lineIcon-check mr-5"></i>저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import { GridView, LocalDataProvider, ValueType } from 'realgrid';
//import { columns, fields, rows } from './realgrid-data';

let gridView = GridView; 
let dataProvider = LocalDataProvider;

const fields = [
    { fieldName: 'Name', dataType: ValueType.TEXT, },
    { fieldName: 'FullName', dataType: ValueType.TEXT, },
    { fieldName: 'Age', dataType: ValueType.NUMBER },
    { fieldName: 'Company', dataType: ValueType.TEXT },
    { fieldName: 'Email', dataType: ValueType.TEXT }
];

const columns = [
    { name: "Name", fieldName: "Name", type: "data", width: "80", styles: { textAlignment: "center" },
      header: { text: "Name", showTooltip: true, tooltip:'<span style="color: red;">이름</span>', },
      renderer: { type:"text", showTooltip: true } },
    { name: "FullName", fieldName: "FullName", type: "data", width: "150", styles: { textAlignment: "center" },
      header: { text: "Full Name", showTooltip: false, } },
    { name: "Company", fieldName: "Company", type: "data", width: "220", styles: { "textAlignment": "center" }, header: "Company Name" },
    { name: "Age", fieldName: "Age", type: "data", width: "130", styles: { textAlignment: "center" }, header: { text: "Age", showTooltip: false, }, numberFormat: '0' },
    { name: "Email", fieldName: "Email", type: "data", width: "300", styles: { textAlignment: "center" }, header: { text: "Email", showTooltip: false, }, }
]

const rows = [{
    "Name": "Kessie",
    "FullName": "Vijendra N. Raj",
    "Email": "mus.Donec.dignissim@Praesent.edu",
    "Company": "Arcu Et Pede Incorporated",
    "Age": "17"
},
    {
        "Name": "Evelyn",
        "FullName": "Hridaynath K. Ismail",
        "Email": "fringilla.euismod@elementum.edu",
        "Company": "Aliquam Tincidunt Ltd",
        "Age": "28"
    },
    {
        "Name": "Colleen",
        "FullName": "Kanwalkishore C. Khan",
        "Email": "tellus.non.magna@porttitorvulputate.org",
        "Company": "Ultrices Duis Volutpat Institute",
        "Age": "38"
    },
    {
        "Name": "Velma",
        "FullName": "Dharani P. Patel",
        "Email": "ipsum@orcilobortisaugue.net",
        "Company": "Posuere Associates",
        "Age": "25"
    },
    {
        "Name": "Fallon",
        "FullName": "Preeti M. Singh",
        "Email": "rutrum@orci.com",
        "Company": "Turpis Nec Inc.",
        "Age": "46"
    },
    {
        "Name": "Alexis",
        "FullName": "Karnik Y. Patel",
        "Email": "auctor.nunc.nulla@egestas.net",
        "Company": "Massa Quisque Porttitor Industries",
        "Age": "34"
    },
    {
        "Name": "Camille",
        "FullName": "Satyamurty A. Singh",
        "Email": "Nunc@blanditenimconsequat.co.uk",
        "Company": "Lorem Lorem Luctus PC",
        "Age": "22"
    },
    {
        "Name": "Aristotle",
        "FullName": "Ora C. Rowe",
        "Email": "sed.orci@libero.edu",
        "Company": "Integer Aliquam Corporation",
        "Age": 53
    },
    {
        "Name": "Anthony",
        "FullName": "Alea Bailey",
        "Email": "orci.luctus.et@Cum.ca",
        "Company": "Eros Nam Corp.",
        "Age": 58
    },
    {
        "Name": "Hakeem",
        "FullName": "Kadeem J. Patel",
        "Email": "aliquet.diam.Sed@penatibuset.com",
        "Company": "Ligula Aenean Gravida Consulting",
        "Age": 36
    },
    {
        "Name": "Raja",
        "FullName": "Chloe Valentine",
        "Email": "Cras.dictum@vulputatenisi.ca",
        "Company": "Erat Eget Tincidunt Institute",
        "Age": 40
    },
    {
        "Name": "Shad",
        "FullName": "Zoe P. Boyd",
        "Email": "Sed@semperpretium.edu",
        "Company": "Amet LLP",
        "Age": 22
    },
    {
        "Name": "Autumn",
        "FullName": "Brittany U. Copeland",
        "Email": "sit.amet@interdumSedauctor.co.uk",
        "Company": "Nisi Cum Sociis PC",
        "Age": 36
    }];

export default {
  name: 'RealGrid',
  data: function () {
      return {
          
      }
  },
  methods: {
      loadData: function() {
          dataProvider.setRows(rows);
      }
  },
  mounted() {
    dataProvider = new LocalDataProvider(false);
    gridView = new GridView("realgrid");
    gridView.setDataSource(dataProvider);
    gridView.displayOptions.emptyMessage = "표시할 데이타가 없습니다.";
    gridView.displayOptions.fitStyle = "evenFill";
    dataProvider.setFields(fields);
    gridView.setColumns(columns);
    dataProvider.setRows(rows);
  }
}
</script>

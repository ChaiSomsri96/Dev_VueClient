<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'Form Sample page 1'"/>
    <!-- body 영역 -->
    <div class="content-body">
      <div id="settingWrap" class="form-area">
        <div id="basicSetting" class="form-wrap">
          <h3 class="title-wrap">
            기본 설정</h3>

          <div class="form-group row">
            <label class="form-label col-2 row">
              <span>결산 구분</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="회계 관리에서 설정한 결산 월로 자동 설정 됩니다. 해당 설정 값에 따라 회기에 적용되는 월이 다르게 적용됩니다. 예) 3월 결산은 회기가 4월부터 익년 3월까지 적용됩니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <div class="input-group dropdown col-4 p-0">
                <input type="hidden" name="stlDiv" value="12">

                <button type="button" id="btnStlDiv" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false" disabled="">
                  12월<i class="icon-lineIcon-line-arrow-down"><span class="blind">열기</span></i>
                </button>
                <div class="dropdown-menu">
                  <div class="os-custom-scroll" style="max-height:325px;">
                    <a href="javascript:void(0);" class="dropdown-item " value="1">1월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="2">2월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="3">3월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="4">4월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="5">5월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="6">6월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="7">7월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="8">8월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="9">9월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="10">10월</a>
                    <a href="javascript:void(0);" class="dropdown-item " value="11">11월</a>
                    <a href="javascript:void(0);" class="dropdown-item selected" value="12">12월</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label col-2 row"> <span>정산 가능 기간</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="비용 정산 신청의 정산 가능 기간을 설정합니다. 비용 사용일로부터 Setting 된 값의 일자 내에 정산하지 않으면 정산할 수 없습니다. 단, 0일로 Setting 시 제한 없이 정산 가능합니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <span>사용일 +</span>
              <div class="input-group dropdown col-4">
                <input type="hidden" name="sttlPsbPeri" value="0">

                <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  0일 (무제한)<i class="icon-lineIcon-line-arrow-down"><span class="blind">열기</span></i>
                </button>
                <div class="dropdown-menu">
                  <div class="os-custom-scroll" style="max-height:325px;">
                    <a class="dropdown-item selected" value="0">0일 (무제한)</a>
                    <a class="dropdown-item " value="3">3일</a>
                    <a class="dropdown-item " value="4">4일</a>
                    <a class="dropdown-item " value="5">5일</a>
                    <a class="dropdown-item " value="6">6일</a>
                    <a class="dropdown-item " value="7">7일</a>
                    <a class="dropdown-item " value="8">8일</a>
                    <a class="dropdown-item " value="9">9일</a>
                    <a class="dropdown-item " value="10">10일</a>
                    <a class="dropdown-item " value="11">11일</a>
                    <a class="dropdown-item " value="12">12일</a>
                    <a class="dropdown-item " value="13">13일</a>
                    <a class="dropdown-item " value="14">14일</a>
                    <a class="dropdown-item " value="15">15일</a>
                    <a class="dropdown-item " value="16">16일</a>
                    <a class="dropdown-item " value="17">17일</a>
                    <a class="dropdown-item " value="18">18일</a>
                    <a class="dropdown-item " value="19">19일</a>
                    <a class="dropdown-item " value="20">20일</a>
                    <a class="dropdown-item " value="21">21일</a>
                    <a class="dropdown-item " value="22">22일</a>
                    <a class="dropdown-item " value="23">23일</a>
                    <a class="dropdown-item " value="24">24일</a>
                    <a class="dropdown-item " value="25">25일</a>
                    <a class="dropdown-item " value="26">26일</a>
                    <a class="dropdown-item " value="27">27일</a>
                    <a class="dropdown-item " value="28">28일</a>
                    <a class="dropdown-item " value="29">29일</a>
                    <a class="dropdown-item " value="30">30일</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="bdgUseYnWrap" class="form-group row" style="">
            <label class="form-label col-2 row">
              <span>예산 사용 여부</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="비용 시스템의 예산 기능을 사용할 지 설정합니다. 예산을 사용하지 않으면 예산 통제, 예산 대비 집행 현황 등과 같이 예산과 관련된 일련의 기능을 사용할 수 없습니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioBdgUseYn_Y" name="bdgUseYn" value="Y" class="blind">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioBdgUseYn_N" name="bdgUseYn" value="N" class="blind" checked="">
                <i class="black"></i>N
              </label>
            </div>
          </div>

          <div id="uaplUseYnWrap" class="form-group row" style="">
            <label class="form-label col-2 row">
              <span>비용 계획 사용 여부</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="비용 시스템의 비용 계획 신청 기능을 사용할 지 설정합니다. 사용할 경비에 대한 계획을 제출하여 참석자에게 미리 비용 지출 계획을 공유할 수 있습니다. 신청한 비용계획이 정산으로 이어지게 되어 비용 사용 후 간편하게 정산 신청이 가능합니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioUaplUseYn_Y" name="uaplUseYn" value="Y" class="blind" checked="">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioUaplUseYn_N" name="uaplUseYn" value="N" class="blind">
                <i class="black"></i>N
              </label>
            </div>
          </div>

          <div id="cardLnkPsbYnWrap" class="form-group row" style="">
            <label class="form-label col-2 row">
              <span>카드사 연동 여부</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="카드사 정보를 연동합니다. 연동 시 카드사별 사용 내역을 가져올 수 있습니다. 연동 카드사의 법인 카드 등록 시 카드당 비용이 부과됩니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioCardLnkPsbYn_Y" name="cardLnkPsbYn" value="Y" checked="">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioCardLnkPsbYn_N" name="cardLnkPsbYn" value="N">
                <i class="black"></i>N
              </label>
            </div>
          </div>

          <div id="selfChkUseYnWrap" class="form-group row" style="">
            <label class="form-label col-2 row">
              <span>Self Check 사용 여부</span>
              <button type="button" class="btn btn-s flat solid ml-5" data-toggle="tooltip" data-placement="bottom_left" data-original-title="감사 항목 설정 후 비용계획 • 정산 신청 시 사용 금액, 휴일 사용, 심야 시간 등에 대한 감사 기능을 사용할 수 있으며, 위반 내역/휴일 사용/심야 사용/중복 사용 등에 대한 리포트 기능을 제공하고, 위반 사항에 대한 소명 요청 관리를 할 수 있습니다.">
                <i class="icon-solidIcon-help"><span class="blind">도움말</span></i>
              </button>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioSelfChkUseYn_Y" name="selfChkUseYn" value="Y" checked="">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioSelfChkUseYn_N" name="selfChkUseYn" value="N">
                <i class="black"></i>N
              </label>
            </div>
          </div>
        </div>

        <div id="docSetting" class="form-wrap">
          <h3 class="title-wrap">
            서식 필수 입력 설정</h3>

          <div id="uaplRemkEssYnWrap" class="form-group row" style="">
            <label class="form-label col-2 row">
              <span>비용 계획 신청 상세 내용</span>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioUaplRemkEssYn_Y" name="uaplRemkEssYn" value="Y">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioUaplRemkEssYn_N" name="uaplRemkEssYn" value="N" checked="">
                <i class="black"></i>N
              </label>
            </div>
          </div>

          <div class="form-group row">
            <label class="form-label col-2 row">
              <span>비용 정산 신청 상세 내용</span>
            </label>

            <div class="row col-6">
              <label class="md-check">
                <input type="radio" id="radioSaplRemkEssYn_Y" name="saplRemkEssYn" value="Y" checked="">
                <i class="black"></i>Y
              </label>
              <label class="md-check">
                <input type="radio" id="radioSaplRemkEssYn_N" name="saplRemkEssYn" value="N">
                <i class="black"></i>N
              </label>
            </div>
          </div>
        </div>

        <div id="selfCheckSetting" class="form-wrap" style="">
          <div class="tbl-title">
            <h3>
              Self Check 설정</h3>
            <br>
            <span>설정에 따라 Self Check 조회의 해당 메뉴에서 확인 가능합니다.</span>
          </div>

          <div class="tbl-wrap type2">
            <table class="tbl tbl-type3">
              <colgroup>
                <col style="width: 120px">
                <col style="width: auto">
                <col style="width: 120px">
                <col style="width: auto">
              </colgroup>
              <tbody>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text" title="심야 시간">심야 시간</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="row">
                      <input type="hidden" name="preMnitPtm" id="preMnitPtm" value="2200">
                      <input type="hidden" name="aftMnitPtm" id="aftMnitPtm" value="0700">

                      <div class="input-group col-4 p-0">
                        <input type="text" id="txtPreMnitPtm" value="2200" class="form-control __input_time" data-inputmask-alias="time">
                      </div>

                      <span class="v-c pl-12 pr-12">~</span>

                      <span id="txtNextDay" class="v-c pr-12">익일</span>
                      <div class="input-group col-4 p-0">
                        <input type="text" id="txtAftMnitPtm" value="0700" class="form-control __input_time" data-inputmask-alias="time">
                      </div>
                    </div>
                  </div>
                </td>

                <th>
                  <div class="th-box">
                    <span class="th-text" title="근무외 지역 거리">근무외 지역 거리</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="row">
                      <span class="v-c">사용처 거리</span>
                      <div class="input-group col-5 pr-15">
                        <input type="text" name="workOutsideDistance" value="10" class="form-control __input_number" data-inputmask-alias="numeric" data-inputmask-max="999" data-inputmask-min="0" style="text-align: right;">
                      </div>
                      <span class="v-c">KM 이상</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text" title="동일 시간 중복">동일 시간 중복</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="row">
                      <div class="input-group dropdown col-3 pl-0">
                        <input type="hidden" name="sameTimeOverlap" value="3">

                        <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                          3<i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu">
                          <div class="os-custom-scroll" style="max-height:160px;">
                            <a href="javascript:void(0);" value="1" class="dropdown-item ">1</a>
                            <a href="javascript:void(0);" value="2" class="dropdown-item ">2</a>
                            <a href="javascript:void(0);" value="3" class="dropdown-item selected">3</a>
                            <a href="javascript:void(0);" value="4" class="dropdown-item ">4</a>
                            <a href="javascript:void(0);" value="5" class="dropdown-item ">5</a>
                            <a href="javascript:void(0);" value="6" class="dropdown-item ">6</a>
                            <a href="javascript:void(0);" value="7" class="dropdown-item ">7</a>
                            <a href="javascript:void(0);" value="8" class="dropdown-item ">8</a>
                            <a href="javascript:void(0);" value="9" class="dropdown-item ">9</a>
                            <a href="javascript:void(0);" value="10" class="dropdown-item ">10</a>
                            <a href="javascript:void(0);" value="11" class="dropdown-item ">11</a>
                            <a href="javascript:void(0);" value="12" class="dropdown-item ">12</a>
                          </div>
                        </div>
                      </div>

                      <span class="v-c">시간 내에</span>

                      <div class="input-group dropdown col-3">
                        <input type="hidden" name="sameNumOverlap" value="3">

                        <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                          3<i class="icon-lineIcon-line-arrow-down"></i>
                        </button>

                        <div class="dropdown-menu">
                          <div class="os-custom-scroll" style="max-height:160px;">
                            <a href="javascript:void(0);" value="2" class="dropdown-item ">2</a>
                            <a href="javascript:void(0);" value="3" class="dropdown-item selected">3</a>
                            <a href="javascript:void(0);" value="4" class="dropdown-item ">4</a>
                            <a href="javascript:void(0);" value="5" class="dropdown-item ">5</a>
                            <a href="javascript:void(0);" value="6" class="dropdown-item ">6</a>
                            <a href="javascript:void(0);" value="7" class="dropdown-item ">7</a>
                            <a href="javascript:void(0);" value="8" class="dropdown-item ">8</a>
                            <a href="javascript:void(0);" value="9" class="dropdown-item ">9</a>
                            <a href="javascript:void(0);" value="10" class="dropdown-item ">10</a>
                          </div>
                        </div>
                      </div>

                      <span class="v-c">건 이상 중복</span>
                    </div>
                  </div>
                </td>

                <th>
                  <div class="th-box">
                    <span class="th-text" title="동일 사용처 중복">동일 사용처 중복</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="row">
                      <span class="v-c">동일 사용처에서</span>

                      <div class="input-group dropdown col-4 pl-10 pr-10">
                        <input type="hidden" name="sameUseOverlap" value="2">

                        <button type="button" class="form-control dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                          2<i class="icon-lineIcon-line-arrow-down"></i>
                        </button>
                        <div class="dropdown-menu">
                          <div class="os-custom-scroll" style="max-height:160px;">
                            <a href="javascript:void(0);" value="2" class="dropdown-item selected">2</a>
                            <a href="javascript:void(0);" value="3" class="dropdown-item ">3</a>
                            <a href="javascript:void(0);" value="4" class="dropdown-item ">4</a>
                            <a href="javascript:void(0);" value="5" class="dropdown-item ">5</a>
                            <a href="javascript:void(0);" value="6" class="dropdown-item ">6</a>
                            <a href="javascript:void(0);" value="7" class="dropdown-item ">7</a>
                            <a href="javascript:void(0);" value="8" class="dropdown-item ">8</a>
                            <a href="javascript:void(0);" value="9" class="dropdown-item ">9</a>
                            <a href="javascript:void(0);" value="10" class="dropdown-item ">10</a>
                          </div>
                        </div>
                      </div>

                      <span class="v-c">건 이상 중복</span>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="form-bottom">
          <button type="button" id="btnCancel" class="btn btn-lg flat">
            <i class="icon-lineIcon-close mr-5"></i>
            취소</button>
          <button type="button" id="btnSave" class="btn btn-lg black ml-5">
            <i class="icon-lineIcon-check mr-5"></i>
            저장</button>
        </div>
      </div>
    </div>
  </div>
</template>


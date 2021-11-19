<template>
  <div>
    <!-- Header 영역 -->
    <ui-header :msg="'Form Sample page 3'"/>
    <!-- body 영역 -->
    <div class="content-body">
      <div class="form-area border-0 pb-0">
        <div class="form-wrap">
          <!-- search param -->
          <form id="srchForm" name="srchForm" action="GenrlSlipList" method="get"><input type="hidden" name="companyId" id="parmCompanyId" autocomplete="off">
            <input type="hidden" name="slipMasterId" id="parmSlipMasterId" autocomplete="off">
            <input type="hidden" name="pageNum" value="0" autocomplete="off">
            <input type="hidden" name="ordersGb" value="desc" autocomplete="off">
            <input type="hidden" name="ordersTxt" value="slipYmd" autocomplete="off">
            <input type="hidden" name="num" value="11" autocomplete="off">
            <input type="hidden" name="currentPage" value="1" autocomplete="off">
            <input type="hidden" name="srchStatus" value="" autocomplete="off">
            <input type="hidden" name="srchCurr" value="" autocomplete="off">
            <input type="hidden" name="useYn" value="Y" autocomplete="off">
            <input type="hidden" name="closeYn" value="" autocomplete="off">
            <input type="hidden" name="placeNm" value="" autocomplete="off">
            <input type="hidden" name="placeId" value="" autocomplete="off">
            <input type="hidden" name="srchSlipYmdGb" value="SLP_YMD" autocomplete="off">
            <input type="hidden" name="srchPeriodGb" value="DIR" autocomplete="off">
            <input type="hidden" name="srchSlipStaYmd" value="20210601" autocomplete="off">
            <input type="hidden" name="srchSlipEndYmd" value="20210609" autocomplete="off">
            <input type="hidden" name="srchSlipNo" value="" autocomplete="off">
            <input type="hidden" name="srchCustId" value="" autocomplete="off">
            <input type="hidden" name="srchCustNm" value="" autocomplete="off">
            <input type="hidden" name="srchAcctFrom" value="" autocomplete="off">
            <input type="hidden" name="srchAcctTo" value="" autocomplete="off">
            <input type="hidden" name="srchSlipUserGb" value="REG_USR" autocomplete="off">
            <input type="hidden" name="srchEmpNm" value="" autocomplete="off">
            <input type="hidden" name="srchEmpId" value="" autocomplete="off">
            <input type="hidden" name="srchSettReportId" value="" autocomplete="off">
            <input type="hidden" name="srchSlipRemarkGb" value="RMK" autocomplete="off">
            <input type="hidden" name="srchRemark" value="" autocomplete="off">
          </form><form id="copySlip" name="copySlip" action="GenrlSlipMngCopy" method="post"><input type="hidden" name="slipMasterId" id="slipMasterId" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="copyFrom" name="copyForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><!-- 복사용폼 -->
          <input type="hidden" name="forCrSum" id="forCrSum" value="0" autocomplete="off">
          <input type="hidden" name="forDrSum" id="forDrSum" value="0" autocomplete="off">
          <input type="hidden" name="drSum" id="drSum" value="0" autocomplete="off">
          <input type="hidden" name="crSum" id="crSum" value="0" autocomplete="off">
          <input type="hidden" name="deptCd" id="deptCd" value="e721e2da-29ee-4782-9672-3d2b150ac1a6" autocomplete="off">
          <input type="hidden" name="deptNm" id="deptNm" value="씨지브이" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="authForm" name="authForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><input type="hidden" name="auth" id="auth" value="fnadmin" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="surtax1TempForm" name="surtax1TempForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><!-- 부가세 대급금 -->
          <input type="hidden" name="custIdT" id="custIdT" autocomplete="off">
          <input type="hidden" name="supplyAmtT" id="supplyAmtT" autocomplete="off">
          <input type="hidden" name="vatAmtT" id="vatAmtT" autocomplete="off">
          <input type="hidden" name="taxYmdT" id="taxYmdT" autocomplete="off">
          <input type="hidden" name="assetYnT" id="assetYnT" autocomplete="off">
          <input type="hidden" name="reversYnT" id="reversYnT" autocomplete="off">
          <input type="hidden" name="sendGbT" id="sendGbT" autocomplete="off">
          <input type="hidden" name="supplyAmtChT" id="supplyAmtChT" autocomplete="off">
          <input type="hidden" name="vatAmtChT" id="vatAmtChT" autocomplete="off">
          <input type="hidden" name="placeIdT" id="placeIdT" autocomplete="off">
          <input type="hidden" name="placeNmT" id="placeNmT" autocomplete="off">
          <input type="hidden" name="vatCdT" id="vatCdT" autocomplete="off">
          <input type="hidden" name="vatCdNmT" id="vatCdNmT" autocomplete="off">
          <input type="hidden" name="taxBillTypeT" id="taxBillTypeT" autocomplete="off">
          <input type="hidden" name="taxBillTypeNmT" id="taxBillTypeNmT" autocomplete="off">
          <input type="hidden" name="assetTypeT" id="assetTypeT" autocomplete="off">
          <input type="hidden" name="assetTypeNmT" id="assetTypeNmT" autocomplete="off">
          <input type="hidden" name="notaxNoT" id="notaxNoT" autocomplete="off">
          <input type="hidden" name="noTaxNmT" id="noTaxNmT" autocomplete="off">
          <input type="hidden" name="issueIdT" id="issueIdT" autocomplete="off">
          <input type="hidden" name="editTypeT" id="editTypeT" autocomplete="off">
          <input type="hidden" name="editTypeNmT" id="editTypeNmT" autocomplete="off">
          <input type="hidden" name="preIssueIdT" id="preIssueIdT" autocomplete="off">
          <input type="hidden" name="deemedGbT" id="deemedGbT" autocomplete="off">
          <input type="hidden" name="deemedGbNmT" id="deemedGbNmT" autocomplete="off">
          <input type="hidden" name="dmBuyAmtT" id="dmBuyAmtT" autocomplete="off">
          <input type="hidden" name="dmBuyAmtChT" id="dmBuyAmtChT" autocomplete="off">
          <input type="hidden" name="deemedNumT" id="deemedNumT" autocomplete="off">
          <input type="hidden" name="deemedDenT" id="deemedDenT" autocomplete="off">
          <input type="hidden" name="dmBuyTaxAmtT" id="dmBuyTaxAmtT" autocomplete="off">
          <input type="hidden" name="dmBuyTaxAmtChT" id="dmBuyTaxAmtChT" autocomplete="off">
          <input type="hidden" name="cardNoT" id="cardNoT" autocomplete="off">
          <input type="hidden" name="cardNmT" id="cardNmT" autocomplete="off">
          <input type="hidden" name="cardGbT" id="cardGbT" autocomplete="off">
          <input type="hidden" name="sendYmdT" id="sendYmdT" autocomplete="off">
          <input type="hidden" name="flag" id="flag" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="surtax2TempForm" name="surtax2TempForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><!-- 부가세 예수금 -->
          <input type="hidden" name="custIdT" id="custIdT" autocomplete="off">
          <input type="hidden" name="supplyAmtT" id="supplyAmtT" autocomplete="off">
          <input type="hidden" name="supplyAmtChT" id="supplyAmtChT" autocomplete="off">
          <input type="hidden" name="vatAmtT" id="vatAmtT" autocomplete="off">
          <input type="hidden" name="vatAmtChT" id="vatAmtChT" autocomplete="off">
          <input type="hidden" name="taxYmdT" id="taxYmdT" autocomplete="off">
          <input type="hidden" name="assetYnT" id="assetYnT" autocomplete="off">
          <input type="hidden" name="reversYnT" id="reversYnT" autocomplete="off">
          <input type="hidden" name="sendGbT" id="sendGbT" autocomplete="off">
          <input type="hidden" name="placeIdT" id="placeIdT" autocomplete="off">
          <input type="hidden" name="placeNmT" id="placeNmT" autocomplete="off">
          <input type="hidden" name="vatCdT" id="vatCdT" autocomplete="off">
          <input type="hidden" name="vatCdNmT" id="vatCdNmT" autocomplete="off">
          <input type="hidden" name="zeroTaxGbT" id="zeroTaxGbT" autocomplete="off">
          <input type="hidden" name="zeroTaxGbNmT" id="zeroTaxGbNmT" autocomplete="off">
          <input type="hidden" name="expReportNoT" id="expReportNoT" autocomplete="off">
          <input type="hidden" name="shipYmdT" id="shipYmdT" autocomplete="off">
          <input type="hidden" name="exchCurrCdT" id="exchCurrCdT" autocomplete="off">
          <input type="hidden" name="exchCurrNmT" id="exchCurrNmT" autocomplete="off">
          <input type="hidden" name="exchRateT" id="exchRateT" autocomplete="off">
          <input type="hidden" name="exchRateChT" id="exchRateChT" autocomplete="off">
          <input type="hidden" name="forSupplyAmtT" id="forSupplyAmtT" autocomplete="off">
          <input type="hidden" name="forSupplyAmtChT" id="forSupplyAmtChT" autocomplete="off">
          <input type="hidden" name="issueIdT" id="issueIdT" autocomplete="off">
          <input type="hidden" name="editTypeT" id="editTypeT" autocomplete="off">
          <input type="hidden" name="editTypeNmT" id="editTypeNmT" autocomplete="off">
          <input type="hidden" name="preIssueIdT" id="preIssueIdT" autocomplete="off">
          <input type="hidden" name="assetTypeT" id="assetTypeT" autocomplete="off">
          <input type="hidden" name="assetTypeNmT" id="assetTypeNmT" autocomplete="off">
          <input type="hidden" name="sendYmdT" id="sendYmdT" autocomplete="off">
          <input type="hidden" name="flag" id="flag" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="surtax3TempForm" name="surtax3TempForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><!-- 원천세 -->
          <input type="hidden" name="custNmT" id="custNmT" autocomplete="off">
          <input type="hidden" name="custIdT" id="custIdT" autocomplete="off">
          <input type="hidden" name="incomeBaseT" id="incomeBaseT" autocomplete="off">
          <input type="hidden" name="incomeRateT" id="incomeRateT" autocomplete="off">
          <input type="hidden" name="expAmtT" id="expAmtT" autocomplete="off">
          <input type="hidden" name="bzRegNoT" id="bzRegNoT" autocomplete="off">
          <input type="hidden" name="incomeTaxT" id="incomeTaxT" autocomplete="off">
          <input type="hidden" name="inhabitTaxT" id="inhabitTaxT" autocomplete="off">
          <input type="hidden" name="incomeGbT" id="incomeGbT" autocomplete="off">
          <input type="hidden" name="incomeGbNmT" id="incomeGbNmT" autocomplete="off">
          <input type="hidden" name="incomeCdT" id="incomeCdT" autocomplete="off">
          <input type="hidden" name="incomeCdNmT" id="incomeCdNmT" autocomplete="off">
          <input type="hidden" name="incomeTypeT" id="incomeTypeT" autocomplete="off">
          <input type="hidden" name="incomeTypeNmT" id="incomeTypeNmT" autocomplete="off">
          <input type="hidden" name="incomeBaseChT" id="incomeBaseChT" autocomplete="off">
          <input type="hidden" name="expAmtChT" id="expAmtChT" autocomplete="off">
          <input type="hidden" name="incomeTaxChT" id="incomeTaxChT" autocomplete="off">
          <input type="hidden" name="inhabitTaxChT" id="inhabitTaxChT" autocomplete="off">
          <input type="hidden" name="flag" id="flag" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="frmNoteTemp" name="frmNoteTemp" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><!-- 어음 -->
          <input type="hidden" name="noteCdT" id="noteCdT" value="" autocomplete="off">
          <input type="hidden" name="noteNoT" id="noteNoT" value="" autocomplete="off">
          <input type="hidden" name="procTypeT" id="procTypeT" value="" autocomplete="off">
          <input type="hidden" name="procTypeNmT" id="procTypeNmT" value="" autocomplete="off">
          <input type="hidden" name="noteGbT" id="noteGbT" value="" autocomplete="off">
          <input type="hidden" name="noteGbNmT" id="noteGbNmT" value="" autocomplete="off">
          <input type="hidden" name="noteTypeT" id="noteTypeT" value="" autocomplete="off">
          <input type="hidden" name="noteTypeNmT" id="noteTypeNmT" value="" autocomplete="off">
          <input type="hidden" name="bankCdT" id="bankCdT" value="" autocomplete="off">
          <input type="hidden" name="bankCdNmT" id="bankCdNmT" value="" autocomplete="off">
          <input type="hidden" name="slipMasterIdT" id="slipMasterIdT" value="" autocomplete="off">
          <input type="hidden" name="slipDetailIdT" id="slipDetailIdT" value="" autocomplete="off">
          <input type="hidden" name="placeIdT" id="placeIdT" value="" autocomplete="off">
          <input type="hidden" name="noteAmtT" id="noteAmtT" value="" autocomplete="off">
          <input type="hidden" name="acctCdT" id="acctCdT" value="" autocomplete="off">
          <input type="hidden" name="procT" id="procT" value="" autocomplete="off">
          <input type="hidden" name="dealYmdT" id="dealYmdT" value="" autocomplete="off">
          <input type="hidden" name="publYmdT" id="publYmdT" value="" autocomplete="off">
          <input type="hidden" name="matuYmdT" id="matuYmdT" value="" autocomplete="off">
          <input type="hidden" name="custIdT" id="custIdT" value="" autocomplete="off">
          <input type="hidden" name="custNmT" id="custNmT" value="" autocomplete="off">
          <input type="hidden" name="noteRemarkT" id="noteRemarkT" value="" autocomplete="off">
          <input type="hidden" name="publIdT" id="publIdT" value="" autocomplete="off">
          <input type="hidden" name="flag" id="flag" autocomplete="off">
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form><form id="slipMaster" name="slipMaster" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><div class="tbl-title">
          <h3>전표 기본 정보</h3>
          <span class="pull-right ess front">필수 입력 사항입니다.</span>
        </div>
          <div class="tbl-wrap type2" style="overflow: visible;">
            <table class="tbl tbl-type3 dropScroll">
              <colgroup>
                <col style="width: 10%">
                <col style="width: auto">
                <col style="width: 10%">
                <col style="width: auto">
                <col style="width: 10%">
                <col style="width: auto">
              </colgroup>
              <tbody>
              <tr>
                <th>
                  <div class="th-box">
											<span class="th-text ess" title="전표 번호">
												<span>전표 번호</span>
											</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="text" name="slipNo" class="form-control" placeholder="" value="" id="slipNo" autocomplete="off" readonly="">
                      <input type="hidden" name="companyId" id="companyId" value="e721e2da-29ee-4782-9672-3d2b150ac1a6" autocomplete="off">
                      <input type="hidden" name="settStatus" id="settStatus" value="1" autocomplete="off">
                      <input type="hidden" name="requYmd" id="requYmd" value="" autocomplete="off">
                      <input type="hidden" name="settYmd" id="settYmd" value="" autocomplete="off">
                      <input type="hidden" name="returnYmd" id="returnYmd" value="" autocomplete="off">
                      <input type="hidden" name="slipMasterId" id="slipMasterId" value="8425" autocomplete="off">
                      <input type="hidden" name="nonJournalSlipYn" id="nonJournalSlipYn" value="" autocomplete="off">
                      <input type="hidden" name="nonJournalYn" id="nonJournalYn" value="" autocomplete="off">
                      <input type="hidden" name="checkRevers" id="checkRevers" value="N" autocomplete="off">
                      <input type="hidden" name="bizType" id="bizType" value="GL" autocomplete="off">
                      <input type="hidden" name="status" id="status" value="N" autocomplete="off">
                      <input type="hidden" name="expsSeq" id="expsSeq" value="0" autocomplete="off">
                      <input type="hidden" name="placeId" id="placeId" value="224" autocomplete="off">
                      <input type="hidden" name="fileCnt" id="fileCnt" value="0" autocomplete="off">
                      <input type="hidden" id="placeNm" value="CGV사업장" autocomplete="off">
                      <input type="hidden" name="mstIptCurrFmt" id="mstIptCurrFmt" value="moneyDecimal0" autocomplete="off">
                      <input type="hidden" id="decimalPoint" value="2" autocomplete="off">
                      <input type="hidden" id="settingExepense" value="Y" autocomplete="off">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text ess" title="전표일">
												전표일<span class="blind">필수</span>
											</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group date">
                      <input type="text" id="dpSlipYmd" class="form-control input_date input_datepicker essential" data-inputmask-alias="date" onchange="checkDate(this)" autocomplete="off" value="2021.06.09">
                      <input type="hidden" id="slipYmd" name="slipYmd" value="20210609" autocomplete="off">
                      <button type="button" class="input-group-addon calendar btn btn-s white" onclick="return false;">
                        <i class="icon-lineIcon-calendar daterpickerClick"></i>
                      </button>
                      <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text ess" title="증빙일">
												증빙일</span>
                    <span class="ico ico_necess">
												<span class="blind">
													필수</span>
											</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group date">
                      <input type="text" id="dpProofYmd" class="form-control input_date essential" data-inputmask-alias="date" onchange="checkDate(this)" autocomplete="off" value="2021.06.09">
                      <input type="hidden" id="proofYmd" name="proofYmd" value="20210609" autocomplete="off">
                      <button type="button" class="input-group-addon calendar btn btn-s white" onclick="return false;">
                        <i class="icon-lineIcon-calendar daterpickerClick">
                          <span class="blind">증빙일</span>
                        </i>
                      </button>
                      <div class="daterangepicker dropdown-menu ltr single opensright"><div class="time-line" style="display: none;"></div><div class="calendar left single" style="display: block;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="calendar right" style="display: none;"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" style="display: none;"><i class="fa fa-calendar glyphicon glyphicon-calendar" style="display: none;"></i><div class="calendar-time" style="display: none;"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="input-group-wrap" style="display: none;"><div class="input-group time"></div></div><div class="calendar-table"></div></div><div class="ranges" style="display: none;"><div class="range_inputs"><button class="cancelBtn white btn btn-md mh-3" type="button"><i class="icon-lineIcon-close mr-5"></i>취소</button><button class="applyBtn black btn btn-md mh-3" disabled="disabled" type="button"><i class="icon-lineIcon-check mr-5"></i>적용</button> </div></div></div></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text" title="사업장">사업장</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group dropdown">
                      <button type="button" id="btnPlace" name="button" class="form-control dropdown-toggle selected selecteChange" data-toggle="dropdown" aria-expanded="false" title="CGV사업장">
                        CGV사업장<i class="icon-lineIcon-line-arrow-down">
                        <span class="blind"></span>
                      </i>
                      </button>
                      <div class="dropdown-menu dropdown-menu-scale scroll-max-10 mCustomScrollbar _mCS_2 mCS-autoHide ndk-scrollbar" style="max-height: 350px; overflow: visible;"><div id="mCSB_2" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 324px;"><div id="mCSB_2_container" class="mCSB_container" style="position:relative; top:0; left:0;" dir="ltr">
                        <a href="javascript:void(0);" class="dropdown-item selected" onclick="placeSet('224','CGV사업장')" value="224" tabindex="0">
                          <span>CGV사업장</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('265','CGV2')" value="265" tabindex="0">
                          <span>CGV2</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('272','test213')" value="272" tabindex="0">
                          <span>test213</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('273','test4')" value="273" tabindex="0">
                          <span>test4</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('279','가나다수산')" value="279" tabindex="0">
                          <span>가나다수산</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('315','test111111111111')" value="315" tabindex="0">
                          <span>test111111111111</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('510','test 사업장')" value="510" tabindex="0">
                          <span>test 사업장</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('524','새로운 사업장명')" value="524" tabindex="0">
                          <span>새로운 사업장명</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('550','6976798')" value="550" tabindex="0">
                          <span>6976798</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('582','CGV ko')" value="582" tabindex="0">
                          <span>CGV ko</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('783','ABC Corporation')" value="783" tabindex="0">
                          <span>ABC Corporation</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('784','세무신고용사업장')" value="784" tabindex="0">
                          <span>세무신고용사업장</span>
                        </a>
                        <a href="javascript:void(0);" class="dropdown-item " onclick="placeSet('1280','이멕스 사업장 123')" value="1280" tabindex="0">
                          <span>이멕스 사업장 123</span>
                        </a>
                      </div></div><div id="mCSB_2_scrollbar_vertical" class="mCSB_scrollTools mCSB_2_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: block;"><div class="mCSB_draggerContainer"><div id="mCSB_2_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; display: block; height: 248px; max-height: 314px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="등록자">
												등록자<span class="blind">필수</span>
											</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="hidden" name="empId" value="96b02530-82de-41c8-8223-3055c74e705e" id="empId" autocomplete="off">
                      <a href="#" class="" empid="96b02530-82de-41c8-8223-3055c74e705e">
                        <input type="text" class="form-control pr-15 link-txt" value="(AA) 관리자" id="empNm" autocomplete="off" empid="96b02530-82de-41c8-8223-3055c74e705e" disabled="" readonly="">
                      </a>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="승인자">
												승인자</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="hidden" name="apprEmpId" value="" id="apprEmpId" autocomplete="off">
                      <a href="#" class="link-txt" empid="">
                        <input type="text" class="form-control pr-15 link-txt" value="" id="apprEmpNm" disabled="" readonly="" autocomplete="off">
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
											<span class="th-text ess" title="통화">
												통화</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <!-- 통화 -->
                    <div class="dropdown input-group col-6 pl-0 pr-5">
                      <div class="input-group" data-toggle="dropdown">
                        <input type="text" class="form-control type-two-button selecteChange essential" placeholder="통화입력" name="currCd" value="KRW" id="currCd" onkeyup="exchAuto(this,event.keyCode)" title="통화 코드 검색" autocomplete="off">
                        <button type="button" name="exchClButton" id="exchClButton" class="btn btn-s solid btn-delete" style="" onclick="exchClear()">
                          <i class="icon-solidIcon-cancel-default">
                            <span class="blind">검색어 삭제</span>
                          </i>
                        </button>
                        <button type="button" name="exchButton" id="exchButton" style="" class="btn btn-s btn_search" onclick="listOpen(this,'30')">
                          <i class="icon-lineIcon-search">
                            <span class="blind">검색</span>
                          </i>
                        </button>
                      </div>
                      <div class="dropdown-menu input-search-table" id="exTableDiv" style="display: none;">
                        <div>
                          <table class="tbl min-w-350">
                            <caption>통화 조회 팝업입니다.</caption>
                            <colgroup>
                              <col style="width:50%">
                              <col style="width:50%">
                            </colgroup>
                            <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                            <thead class="no-drag">
                            <tr>
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="통화">통화</span>
                                </div>
                              </th>
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="환율">환율</span>
                                </div>
                              </th>
                            </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="tbody scroll-max-10 mCustomScrollbar _mCS_3 mCS-autoHide mCS_no_scrollbar" style="max-height: 270px; position: relative; overflow: visible;"><div id="mCSB_3" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 0px;"><div id="mCSB_3_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                          <table class="tbl min-w-300" id="exTable">
                            <tbody id="extBody">
                            <tr id="exBody">
                              <td>
                                <input type="hidden" id="currCdC" value="KRW" autocomplete="off">
                                <input type="hidden" id="exchRateC" value="1.0" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="currCdT">KRW</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="exchRateT" title="1">1</span>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div></div><div id="mCSB_3_scrollbar_vertical" class="mCSB_scrollTools mCSB_3_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_3_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                      </div>
                    </div>
                    <div class="input-group col-6 pl-0 pr-0">
                      <input type="text" name="exchRate" id="exchRate" value="1.0" placeholder="사용자 환율" style="display: none;" class="form-control essential" data-inputmask-alias="inputCurrency" autocomplete="off">
                    </div>
                    <!-- 통화 end -->
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="역분개 가능">
												역분개 가능</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <label class="md-check">
                        <input type="radio" id="radio1" name="reversYnM" value="Y" checked="" autocomplete="off"><i class="black"></i>Y
                      </label>
                      <label class="md-check">
                        <input type="radio" id="radio2" name="reversYnM" value="N" autocomplete="off"><i class="black"></i>N
                      </label>
                      <input type="hidden" id="reversYn" name="reversYn" value="Y" autocomplete="off">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="참고 전표">
												참고 전표</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="text" name="referSlipNo" id="referSlipNo" class="form-control type-two-button" value="" placeholder="" readonly="" title="참고 전표 검색" autocomplete="off">
                      <button type="button" name="clearRefer" id="clearRefer" class="btn btn-s solid" onclick="refersClears()" style="display:none">
                        <i class="icon-solidIcon-cancel-default">
                          <span class="blind"></span>
                        </i>
                      </button>
                      <button type="button" class="btn btn-s btn_search" onclick="referSlipOpen()" name="button">
                        <i class="icon-lineIcon-search">
                          <span class="blind">검색</span>
                        </i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
											<span class="th-text" title="등록자의견">
												등록자의견</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="" name="accountOpinion" value="" id="accountOpinion" autocomplete="off">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="승인자의견">
												승인자의견</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="" name="approOpinion" value="" id="approOpinion" autocomplete="off">
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
											<span class="th-text ess" title="적요">
												적요</span>
                    <span class="ico ico_necess">
												<span class="blind">필수</span>
											</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="text" class="form-control essential pr-15" placeholder="" name="remarks" value="" id="remarks" autocomplete="off">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="파일 첨부">
												파일 첨부</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <input type="file" name="receipts" id="upload_form" class="blind" autocomplete="off">
                    <button type="button" class="btn btn-md line-1" id="fileBtn" onclick="fileClick()">
                      <i class="icon-lineIcon-upload mr-5"></i><span>파일 첨부</span>
                    </button>
                    <div id="divAddAtchTooltip" class="item-list-layer-area ml-10">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
											<span class="th-text" title="전표 유형">
												전표 유형</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group" id="settReportB">
                      <input type="text" class="form-control" placeholder="" value="일반전표" readonly="" autocomplete="off">
                      <input type="hidden" name="settReportId" id="settReportId" value="0" autocomplete="off">
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
            <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
          </div></form></div>
        <div class="form-wrap">
          <div class="tbl-title">
            <h3>전표 상세 내역</h3>
          </div>
          <div class="tbl-wrap type2 divide" style="overflow: visible;">
            <form id="detailForm" name="detailForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><table class="tbl tbl-type3 tbl-divide-left width-percent-70">
              <colgroup>
                <col style="width:13%">
                <col style="width:auto">
                <col style="width:13%">
                <col style="width:18%">
                <col style="width:13%">
                <col style="width:auto">
              </colgroup>
              <tbody>
              <tr>
                <th colspan="6" class="tbl-group-title">
                  <div class="th-box">
                    <span class="th-text" title="기본 항목">기본 항목</span>
                  </div>
                </th>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888 ess" title="계정 과목"><span class="ess">계정 과목</span></span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="dropdown input-group">
                      <div class="input-group" data-toggle="dropdown" aria-expanded="true">
                        <input type="text" id="acctCdNm" class="form-control type-two-button essential" autocomplete="off" placeholder="계정 과목 검색" onkeyup="acctAuto(this)" title="계정 과목 검색">
                        <button type="button" id="acctCdClear" class="btn btn-s solid" style="display: none" onclick="acctClear()">
                          <i class="icon-solidIcon-cancel-default">
                            <span class="blind"></span>
                          </i>
                        </button>
                        <button type="button" id="acctCdButton" class="btn btn-s btn_search" onclick="listOpen(this,'10')">
                          <i class="icon-lineIcon-search">
                            <span class="blind">검색</span>
                          </i>
                        </button>
                      </div>
                      <input type="hidden" name="acctCd" id="acctCd" autocomplete="off" value="">
                      <input type="hidden" name="slipMasterId" id="slipMasterId" autocomplete="off" value="8425">
                      <input type="hidden" name="slipDetailId" id="slipDetailId" autocomplete="off" value="">
                      <input type="hidden" name="bondGb" id="bondGb" autocomplete="off" value="">
                      <input type="hidden" name="ledgerId" id="ledgerId" autocomplete="off">
                      <input type="hidden" name="companyId" id="companyId" autocomplete="off">
                      <input type="hidden" name="placeId" id="placeId" autocomplete="off">
                      <input type="hidden" name="exchRate" id="exchRate" autocomplete="off">
                      <input type="hidden" name="exchYam" id="exchYmd" autocomplete="off">
                      <input type="hidden" name="currCd" id="currCd" autocomplete="off">
                      <input type="hidden" name="proofYmd" id="proofYmd" autocomplete="off">
                      <input type="hidden" name="status" id="status" value="I" autocomplete="off">
                      <input type="hidden" name="tempWrtYmd" id="tempWrtYmd" autocomplete="off" value="">
                      <input type="hidden" name="wrtYmd" id="wrtYmd" autocomplete="off" value="">
                      <input type="hidden" name="buyFlag" id="buyFlag" autocomplete="off" value="">
                      <input type="hidden" name="buyFlag2" id="buyFlag2" autocomplete="off" value="">
                      <input type="hidden" name="saleFlag" id="saleFlag" autocomplete="off" value="">
                      <input type="hidden" name="saleFlag2" id="saleFlag2" autocomplete="off" value="">
                      <input type="hidden" name="ledgerName" id="ledgerName" autocomplete="off">
                      <div class="dropdown-menu input-search-table" id="acctTable" style="display: none;">
                        <div>
                          <table class="tbl min-w-350">
                            <caption></caption>
                            <colgroup>
                              <col style="width:40%">
                              <col style="width:60%">
                            </colgroup>
                            <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                            <thead class="no-drag">
                            <tr class="">
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="계정 코드">계정 코드</span>
                                </div>
                              </th>
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="계정 과목">계정 과목</span>
                                </div>
                              </th>
                            </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="tbody scroll-max-10 mCustomScrollbar _mCS_4 mCS-autoHide mCS_no_scrollbar" style="max-height: 270px; position: relative; overflow: visible;"><div id="mCSB_4" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 0px;"><div id="mCSB_4_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                          <table class="tbl min-w-350" id="acctTableT">
                            <caption></caption>
                            <colgroup>
                              <col style="width:40%">
                              <col style="width:60%">
                            </colgroup>
                            <tbody class="no-drag" id="acctTableB">
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11110100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="현금" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11110100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">현금</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11110300" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="당좌예금" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11110300</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">당좌예금</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11110400" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="보통예금(원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11110400</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">보통예금(원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11110500" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="보통예금(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11110500</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">보통예금(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11112100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="정기적금(원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11112100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">정기적금(원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11112200" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="정기적금(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11112200</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">정기적금(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11114100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="정기예금(원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11114100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">정기예금(원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11114200" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="정기예금(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11114200</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">정기예금(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11116100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="저축성보험" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11116100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">저축성보험</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11120100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="단기금융상품(원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11120100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">단기금융상품(원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11120200" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="단기금융상품(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11120200</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">단기금융상품(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11122100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="단기대여금" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11122100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">단기대여금</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11122109" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(단기대여금)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11122109</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(단기대여금)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="외상매출금(원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">외상매출금(원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130109" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(외상매출금-원화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130109</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(외상매출금-원화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130200" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="외상매출금(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130200</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">외상매출금(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130209" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(외상매출금-외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130209</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(외상매출금-외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130300" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="받을어음" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="40" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="어음" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130300</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">받을어음</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130309" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(받을어음)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130309</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(받을어음)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130400" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="받을어음(전자발행채권)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="40" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="어음" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130400</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">받을어음(전자발행채권)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11130409" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(전자발행채권)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11130409</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(전자발행채권)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11140100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="유가증권" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11140100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">유가증권</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150100" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="미수금" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150100</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">미수금</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150109" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(미수금)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150109</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(미수금)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150800" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="미수금(외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150800</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">미수금(외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150809" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(미수금-외화)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150809</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(미수금-외화)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150900" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="미수금(기타)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="1" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150900</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">미수금(기타)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11150909" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(미수금-기타)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11150909</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(미수금-기타)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11156009" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="대손충당금(미수수익)" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11156009</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">대손충당금(미수수익)</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="acctCdC" value="11160000" autocomplete="off">
                                <input type="hidden" id="acctNmC" value="선급금" autocomplete="off">
                                <input type="hidden" id="invoCread" value="3" autocomplete="off">
                                <input type="hidden" id="acctModule" value="" autocomplete="off">
                                <input type="hidden" id="acctModuleNm" value="" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="acctCdV">11160000</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="acctNmV">선급금</span>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div></div><div id="mCSB_4_scrollbar_vertical" class="mCSB_scrollTools mCSB_4_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_4_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" title="라인 적요">라인 적요</span>
                  </div>
                </th>
                <td colspan="3">
                  <div class="td-box">
                    <div class="dropdown input-group">
                      <div class="input-group" data-toggle="dropdown">
                        <input type="text" class="form-control pr-15 selected selecteChange" placeholder="" name="remarks" id="remarksDe" title="라인 적요" autocomplete="off">
                        <button type="button" id="remarkB" class="btn btn-s solid">
                          <i class="icon-lineIcon-line-arrow-down">
                            <span class="blind">목록 열기</span>
                          </i>
                        </button>
                      </div>
                      <div class="dropdown-menu dropdown-menu-scale scroll-max-10 mCustomScrollbar _mCS_5 mCS-autoHide ndk-scrollbar mCS_no_scrollbar" id="remaDiv" style="max-height: 150px; overflow: visible; display: none;"><div id="mCSB_5" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 1px;"><div id="mCSB_5_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                        <ul id="remarksUi" class="list-section row"></ul>
                      </div></div><div id="mCSB_5_scrollbar_vertical" class="mCSB_scrollTools mCSB_5_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_5_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; height: 0px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888 ess" title="차변 금액">차변 금액</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="hidden" name="forDrAmt" value="" id="forDrAmt" autocomplete="off">
                      <input type="text" class="form-control pr-10" placeholder="" name="forDrAmtCh" id="forDrAmtCh" autocomplete="off" onchange="drCrComChange(1)" data-inputmask-alias="moneyDecimal0" value="" style="text-align: right;">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" title="대변 금액"><span class="ess">대변 금액</span></span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="input-group">
                      <input type="hidden" name="forCrAmt" value="" id="forCrAmt" autocomplete="off">
                      <input type="text" class="form-control pr-10" placeholder="" name="forCrAmtCh" id="forCrAmtCh" onchange="drCrComChange(2)" data-inputmask-alias="moneyDecimal0" value="" autocomplete="off" style="text-align: right;">
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" title="보조 화면"><span id="viewEss" class="">보조 화면</span></span>
                  </div>
                </th>
                <td>
                  <div class="td-box v-c" title="보조 화면">
                    <div class="input-group">
                      <button type="button" id="viewPop" class="btn btn-sm line-1" onclick="viewPopup()" style="display: none;">
                        <span id="viewNm"></span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" id="custTitle" title="거래처">거래처</span>
                  </div>
                </th>
                <td>
                  <div class="td-box">
                    <div class="dropdown input-group">
                      <div class="input-group" data-toggle="dropdown">
                        <input type="text" class="form-control type-two-button" id="custNm" autocomplete="off" onkeyup="custAuto(this)" title="거래처 검색" placeholder="거래처 검색">
                        <button type="button" id="custClearB" onclick="custClear()" style="display: none" class="btn btn-s solid btn-delete">
                          <i class="icon-solidIcon-cancel-default">
                            <span class="blind">검색어 삭제</span>
                          </i>
                        </button>
                        <button type="button" class="btn btn-s btn_search" id="custSearchB" onclick="listOpen(this,'20')">
                          <i class="icon-lineIcon-search">
                            <span class="blind">검색</span>
                          </i>
                        </button>
                        <input type="hidden" name="custId" id="custId" autocomplete="off" value="">
                        <input type="hidden" name="bzRegNo" id="bzRegNo" autocomplete="off">
                      </div>
                      <div class="dropdown-menu input-search-table" id="custDiv" style="display: none;">
                        <div>
                          <table class="tbl min-w-300">
                            <caption></caption>
                            <colgroup>
                              <col style="width:50%">
                              <col style="width:50%">
                            </colgroup>
                            <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                            <thead class="no-drag">
                            <tr>
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="거래처명">거래처명</span>
                                </div>
                              </th>
                              <th>
                                <div class="th-box">
                                  <span class="th-text ellipsis" title="사업자등록번호">사업자등록번호</span>
                                </div>
                              </th>
                            </tr>
                            </thead>
                          </table>
                        </div>
                        <div class="tbody scroll-max-10 mCustomScrollbar _mCS_6 mCS-autoHide mCS_no_scrollbar" id="custDiv" style="max-height: 270px; position: relative; overflow: visible;"><div id="mCSB_6" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: 0px;"><div id="mCSB_6_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                          <table class="tbl min-w-300" id="custTable">
                            <caption></caption>
                            <colgroup>
                              <col style="width:50%">
                              <col style="width:50%">
                            </colgroup>
                            <tbody id="custBody">
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000831" autocomplete="off">
                                <input type="hidden" id="custNmL" value="	(주) 인터파크" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="220-81-47821" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">	(주) 인터파크</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="220-81-47821">220-81-47821</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000660" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(사)한국여성발명협회" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="212-82-06563" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(사)한국여성발명협회</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="212-82-06563">212-82-06563</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000802" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(사)한국의약품수출입협회" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1208200203" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(사)한국의약품수출입협회</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1208200203">1208200203</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000857" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주) 이맥스정보기술" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1238614136" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주) 이맥스정보기술</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1238614136">1238614136</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000647" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)E&amp;G(이앤지)" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="134-86-87527" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)E&amp;G(이앤지)</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="134-86-87527">134-86-87527</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000777" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)두보식품" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1358118538" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)두보식품</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1358118538">1358118538</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000848" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)디제이에스시스템" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1078830424" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)디제이에스시스템</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1078830424">1078830424</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000551" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)맨파워코리아" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1208185831" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)맨파워코리아</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1208185831">1208185831</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000701" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)민디자인플래닛" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="616-86-04799" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)민디자인플래닛</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="616-86-04799">616-86-04799</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000629" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)비스토스" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="120-86-25954" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)비스토스</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="120-86-25954">120-86-25954</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000787" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)비즈메디코리아" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="1098600806" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)비즈메디코리아</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="1098600806">1098600806</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000673" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)생활낙원" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="301-81-32627" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)생활낙원</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="301-81-32627">301-81-32627</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000772" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)성진포머" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="5148122967" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)성진포머</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="5148122967">5148122967</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000658" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)센서웨이" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="209-81-42232" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)센서웨이</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="209-81-42232">209-81-42232</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000817" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)소프트탑텐" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="2148676990" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)소프트탑텐</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="2148676990">2148676990</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000713" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)신성메디칼" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="896-87-00232" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)신성메디칼</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="896-87-00232">896-87-00232</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000665" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)싱크피플" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="220-87-80759" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)싱크피플</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="220-87-80759">220-87-80759</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000620" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)아기와나" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="105-86-64429" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)아기와나</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="105-86-64429">105-86-64429</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000628" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)아이앤씨테크놀로지" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="120-81-67380" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)아이앤씨테크놀로지</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="120-81-67380">120-81-67380</span>
                                </div>
                              </td>
                            </tr>
                            <tr id="trBody">
                              <td>
                                <input type="hidden" id="custIdL" value="000680" autocomplete="off">
                                <input type="hidden" id="custNmL" value="(주)알비엘코리아" autocomplete="off">
                                <input type="hidden" id="bzRegNoL" value="324-87-00061" autocomplete="off">
                                <div class="td-box">
                                  <span class="td-text" id="custIdV">(주)알비엘코리아</span>
                                </div>
                              </td>
                              <td>
                                <div class="td-box">
                                  <span class="td-text ellipsis" id="bzRegNoV" title="324-87-00061">324-87-00061</span>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div></div><div id="mCSB_6_scrollbar_vertical" class="mCSB_scrollTools mCSB_6_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_6_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" title="부서">부서</span>
                  </div>
                </th>
                <td>
                  <div class="td-box v-c">
                    <div class="input-group">
                      <div class="input-group dropdown resizable">
                        <!--1:임시저장, 4:반려, 6:승인취소-->
                        <input type="text" name="deptNm" id="srchDeptNm" class="form-control" value="씨지브이" autocomplete="off" data-range="DEPT" data-org-search-type="AC_TYPE_SC1">
                        <!-- [D] #search-highlight-btn 클릭시, .resizable.type-input에 active클래스 추가  -->
                        <button type="button" name="btnDept" class="btn btn-s white" onclick="menuOpens(this)">
                          <i class="icon-lineIcon-treemenu"></i>
                        </button>
                        <input type="hidden" value="e721e2da-29ee-4782-9672-3d2b150ac1a6" name="deptCd" id="deptNo" autocomplete="off">
                        <div class="dropdown-menu" style="max-width: 300px;">
                          <div class="autocompleteScrollbar" style="max-height: 350px; min-width: 200px; position: relative; overflow: visible;">
                          </div>
                        </div>
                        <div class="menu-container">
                          <div class="menu-kit">
                            <div id="menu-resizable" class="menu-resizable horizontal" style="height: 300px;">
                              <div class="menu-scroll scroll-max-horizontalvertical mCustomScrollbar _mCS_32 mCS-autoHide" style="height: 300px; overflow: visible;" ui-jp="mCustomScrollbar"><div id="mCSB_32" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical_horizontal mCSB_outside" style="max-height: none;"><div id="mCSB_32_container" class="mCSB_container mCS_x_hidden mCS_no_scrollbar_x" style="position: relative; top: 0px; left: 0px; width: 100%;" dir="ltr">
                                <div class="menu-kit-area jstree jstree-1 jstree-default" id="tree_area" role="tree" aria-multiselectable="true" tabindex="0" aria-activedescendant="e721e2da-29ee-4782-9672-3d2b150ac1a6" aria-busy="false"><ul class="jstree-container-ul jstree-children" role="group"><li role="treeitem" aria-selected="false" aria-level="1" aria-labelledby="e721e2da-29ee-4782-9672-3d2b150ac1a6_anchor" aria-expanded="true" id="e721e2da-29ee-4782-9672-3d2b150ac1a6" class="jstree-node  jstree-open jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="e721e2da-29ee-4782-9672-3d2b150ac1a6_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>씨지브이</span></a><ul role="group" class="jstree-children"><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202102000017_anchor" aria-expanded="true" id="cgv202102000017" class="jstree-node  jstree-open"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202102000017_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>부서코드 들어오나</span></a><ul role="group" class="jstree-children"><li role="treeitem" aria-selected="false" aria-level="3" aria-labelledby="cgv202105000030_anchor" id="cgv202105000030" class="jstree-node  jstree-leaf jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202105000030_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>부서입니다</span></a></li></ul></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202102000016_anchor" id="cgv202102000016" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202102000016_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>왜 안들어와</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202102000015_anchor" id="cgv202102000015" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202102000015_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>뭐지2222</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202102000014_anchor" id="cgv202102000014" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202102000014_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>테스트부</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv2008000665_anchor" id="cgv2008000665" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2008000665_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>회계그룹</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202102000018_anchor" id="cgv202102000018" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202102000018_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>부서코드 잘 들어오나</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv2008000661_anchor" aria-expanded="true" id="cgv2008000661" class="jstree-node  jstree-open"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2008000661_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>Developers Group</span></a><ul role="group" class="jstree-children"><li role="treeitem" aria-selected="false" aria-level="3" aria-labelledby="cgv2008000662_anchor" id="cgv2008000662" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2008000662_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>Service Team</span></a></li><li role="treeitem" aria-selected="false" aria-level="3" aria-labelledby="cgv2008000663_anchor" id="cgv2008000663" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2008000663_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>운영팀</span></a></li><li role="treeitem" aria-selected="false" aria-level="3" aria-labelledby="cgv2009000676_anchor" aria-expanded="true" id="cgv2009000676" class="jstree-node  jstree-open jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2009000676_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>운영2팀</span></a><ul role="group" class="jstree-children"><li role="treeitem" aria-selected="false" aria-level="4" aria-labelledby="cgv202105000025_anchor" id="cgv202105000025" class="jstree-node  jstree-leaf jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202105000025_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>운영3팀</span></a></li></ul></li></ul></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv2008000670_anchor" aria-expanded="true" id="cgv2008000670" class="jstree-node  jstree-open"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2008000670_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>서비스그룹</span></a><ul role="group" class="jstree-children"><li role="treeitem" aria-selected="false" aria-level="3" aria-labelledby="cgv2009000677_anchor" id="cgv2009000677" class="jstree-node  jstree-leaf jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2009000677_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>서비스1팀</span></a></li></ul></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv2009000678_anchor" id="cgv2009000678" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv2009000678_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>Group F&amp;A</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv202101000006_anchor" id="cgv202101000006" class="jstree-node  jstree-leaf"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv202101000006_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>아르바이트가 뒤로와</span></a></li><li role="treeitem" aria-selected="false" aria-level="2" aria-labelledby="cgv_parttime_anchor" id="cgv_parttime" class="jstree-node  jstree-leaf jstree-last"><i class="jstree-icon jstree-ocl" role="presentation"></i><a class="jstree-anchor" href="#" tabindex="-1" id="cgv_parttime_anchor"><i class="jstree-icon jstree-themeicon" role="presentation"></i><span>아르바이트</span></a></li></ul></li></ul></div>
                              </div></div><div id="mCSB_32_scrollbar_vertical" class="mCSB_scrollTools mCSB_32_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: block;"><div class="mCSB_draggerContainer"><div id="mCSB_32_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px; height: 91px; display: block; max-height: 244px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div><div id="mCSB_32_scrollbar_horizontal" class="mCSB_scrollTools mCSB_32_scrollbar mCS-minimal-dark mCSB_scrollTools_horizontal" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_32_dragger_horizontal" class="mCSB_dragger" style="position: absolute; min-width: 50px; width: 0px; left: 0px;"><div class="mCSB_dragger_bar"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="th-box">
                    <span class="th-text text-888" title="스케쥴">스케쥴</span>
                  </div>
                </th>
                <td>
                  <div class="td-box v-c">
                    <div class="input-group">
                      <button type="button" class="btn btn-sm line-1" id="schB" onclick="openPopSchedule()" style="display: none;">
                        <span>스케쥴 관리</span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
              <div>
                <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
              </div></form><table class="tbl tbl-type3 tbl-divide-right width-percent-30">
            <colgroup>
              <col style="width:auto">
            </colgroup>
            <tbody>
            <tr>
              <th colspan="2" class="tbl-group-title divide-line">
                <div class="th-box">
                  <span class="th-text" title="관리 항목">관리 항목</span>
                </div>
              </th>
            </tr>
            <tr>
              <td colspan="3" rowspan="3" class="divide-line">
                <div class="td-box" style="height:105px;">
                  <div class="input-group text-center pt-35" style="display: block" id="nodata">
                    관리 항목이 없습니다.</div>
                  <div class="input-group">
                    <form id="mgtForm" name="mgtForm" action="/fns/manager/GenrlSlipMng?companyId=e721e2da-29ee-4782-9672-3d2b150ac1a6&amp;slipMasterId=8425&amp;pageNum=0&amp;rowsPerPage=15&amp;rowsPerPageNm=15%EA%B0%9C%EC%94%A9+%EB%B3%B4%EA%B8%B0&amp;ordersGb=desc&amp;ordersTxt=slipYmd&amp;num=11&amp;currentPage=0&amp;srchStatus=&amp;srchCurr=&amp;useYn=Y&amp;closeYn=&amp;placeNm=&amp;placeId=&amp;srchSlipYmdGb=SLP_YMD&amp;srchPeriodGb=DIR&amp;srchSlipStaYmd=20210601&amp;srchSlipEndYmd=20210609&amp;srchSlipNo=&amp;srchCustId=&amp;srchCustNm=&amp;srchAcctFrom=&amp;srchAcctFromNm=&amp;srchAcctTo=&amp;srchAcctToNm=&amp;srchSlipUserGb=REG_USR&amp;srchEmpNm=&amp;srchEmpId=&amp;srchSettReportId=&amp;srchSlipRemarkGb=RMK&amp;srchRemark=&amp;reversYn=" method="post"><div class="scroll-max-10 mCustomScrollbar _mCS_7 mCS-autoHide mCS_no_scrollbar" style="max-height: 105px; height: auto; overflow: visible; width: auto; position: relative;"><div id="mCSB_7" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: none;"><div id="mCSB_7_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
                      <div class="tbody" id="mgtDiv" style="display: none;">
                        <input type="hidden" name="slipMasterId" id="slipMasterId" autocomplete="off">
                        <input type="hidden" name="slipDetailId" id="slipDetailId" autocomplete="off">
                        <input type="hidden" name="companyId" id="companyId" autocomplete="off">
                        <input type="hidden" name="status" id="status" value="N" autocomplete="off">
                        <input type="hidden" name="cnt" id="cnt" autocomplete="off">
                        <table id="mgtTable" class="tbl">
                          <caption>
                            <span class="blind">관리 항목 영역입니다.</span>
                          </caption>
                          <colgroup>
                            <col style="width:20%">
                            <col>
                          </colgroup>
                          <tbody id="mgtTbody">

                          </tbody>
                        </table>
                      </div>
                    </div></div><div id="mCSB_7_scrollbar_vertical" class="mCSB_scrollTools mCSB_7_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_7_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
                      <div>
                        <input type="hidden" name="_csrf" value="dea454e0a25a78d61a28a8e184865bccfcecbe2e8db9f807f90dcd81e4fea5777e73dda63d82f36f5e90e685f285265a" autocomplete="off">
                      </div></form></div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
          </div>
        </div>
        <div class="form-bottom pb-20" id="divBtnDtl">
          <button type="button" name="modifyCancel" id="modifyCancel" onclick="modifyCancelB()" class="btn btn-md flat" data-dismiss="modal" aria-label="Close"><i class="icon-lineIcon-close mr-5"></i>취소</button>
          <button type="button" name="deleteDetail" id="deleteDetail" onclick="deleteDetail()" class="btn btn-md ml-5" style="display: none;"><i class="icon-lineIcon-del-content mr-5"></i>내역 삭제</button>
          <button type="button" name="addDetail" id="addDetail" onclick="addDetail()" class="btn btn-md black ml-5"><i class="icon-lineIcon-check mr-5"></i>내역 저장</button>
          <button type="button" name="modifyDetail" id="modifyDetail" class="btn btn-md black ml-5" style="display: none" onclick="modifyUpdate()">
            내역 저장</button>
        </div>
      </div>
      <div class="form-wrap">
        <div class="tbl-wrap border-0" style="overflow: visible;">
          <div class="scroll-tbl">
            <div class="thead no-border no-after">
              <!-- [D] 리스트 없을 경우, .tbl에 no-list클래스 추가 -->
              <table class="tbl tbl-type2">
                <caption>
									<span class="blind">
										전표 상세 내역 영역입니다. 기본 항목으로 계정 과목에 따라 라인 적요, 차변 금액, 대변 금액, 보조 화면, 거래처, 부서, 스케쥴을 입력합니다. 계정 과목에 따른 관리 항목을 표시하고, 입력합니다.
기본 항목과 관리 항목을 입력한 후에 내역 저장 버튼을 클릭합니다.</span>
                </caption>
                <colgroup>
                  <col style="width: 5%">
                  <col style="width: 10%">
                  <col style="width: 15.22%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 12%">
                  <col style="width: 10.84%">
                  <col style="width:15px;">
                </colgroup>
                <!-- [D] 드래그 막을 경우, no-drag클래스 추가 -->
                <thead class="no-drag">
                <tr>
                  <th scope="col" rowspan="2">
                    <div class="th-box">
                      <span class="th-text" title="계정 코드">계정 코드</span>
                    </div>
                  </th>
                  <th scope="col" rowspan="2">
                    <div class="th-box">
                      <span class="th-text" title="계정 과목">계정 과목</span>
                    </div>
                  </th>
                  <th scope="col" rowspan="2">
                    <div class="th-box">
                      <span class="th-text" title="라인 적요">라인 적요</span>
                    </div>
                  </th>
                  <th scope="col" colspan="2" class="text-center pr-10">
                    <div class="th-box">
                      <span class="th-text" title="입력 통화">입력 통화</span>
                    </div>
                  </th>
                  <th scope="col" colspan="2" class="text-center pr-10">
                    <div class="th-box">
                      <span class="th-text" title="기준 통화">기준 통화</span>
                    </div>
                  </th>
                  <th scope="col" rowspan="2">
                    <div class="th-box">
                      <span class="th-text" title="거래처">거래처</span>
                    </div>
                  </th>
                  <th scope="col" rowspan="2">
                    <div class="th-box">
                      <span class="th-text" title="부서">부서</span>
                    </div>
                  </th>
                  <th>
                    <div class="th-box"></div>
                  </th>
                </tr>
                <tr>
                  <th class="pl-10">
                    <div class="th-box" scope="col">
                      <span class="th-text" title="차변">차변</span>
                    </div>
                  </th>
                  <th>
                    <div class="th-box" scope="col">
                      <span class="th-text" title="대변">대변</span>
                    </div>
                  </th>
                  <th>
                    <div class="th-box" scope="col">
                      <span class="th-text" title="차변">차변</span>
                    </div>
                  </th>
                  <th class="border-r" scope="col">
                    <div class="th-box">
                      <span class="th-text" title="대변">대변</span>
                    </div>
                  </th>
                  <th class="border-0">
                    <div class="th-box"></div>
                  </th>
                </tr>
                </thead>
              </table>
            </div>
            <div class="scroll-max-10 mCustomScrollbar _mCS_8 mCS-autoHide mCS_no_scrollbar" style="max-height: 500px; height: auto; overflow: visible; width: auto; position: relative;"><div id="mCSB_8" class="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style="max-height: none;"><div id="mCSB_8_container" class="mCSB_container mCS_y_hidden mCS_no_scrollbar_y" style="position:relative; top:0; left:0;" dir="ltr">
              <div class="tbody">
                <table class="tbl tbl-type2" id="slipD">
                  <caption>
										<span class="blind">
											전표 상세 내역 영역입니다. 기본 항목으로 계정 과목에 따라 라인 적요, 차변 금액, 대변 금액, 보조 화면, 거래처, 부서, 스케쥴을 입력합니다. 계정 과목에 따른 관리 항목을 표시하고, 입력합니다.
기본 항목과 관리 항목을 입력한 후에 내역 저장 버튼을 클릭합니다.</span>
                  </caption>
                  <colgroup>
                    <col style="width: 5%">
                    <col style="width: 10%">
                    <col style="width: 15.22%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                    <col style="width: 11%">
                    <col style="width: 12%">
                    <col style="width: 10.84%">
                    <col style="width:15px;">
                  </colgroup>
                  <tbody>

                  <tr rowspan="4" id="trBody"><td colspan="8"><div class="td-box"><span class="td-text">등록된 내용이 없습니다.</span></div></td></tr></tbody>
                </table>
              </div>
            </div></div><div id="mCSB_8_scrollbar_vertical" class="mCSB_scrollTools mCSB_8_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style="display: none;"><div class="mCSB_draggerContainer"><div id="mCSB_8_dragger_vertical" class="mCSB_dragger" style="position: absolute; min-height: 50px; height: 0px; top: 0px;"><div class="mCSB_dragger_bar" style="line-height: 50px;"></div></div><div class="mCSB_draggerRail"></div></div></div></div>
            <div class="tfoot">
              <table class="tbl tbl-type2">
                <caption></caption>
                <colgroup>
                  <col style="width: 5%">
                  <col style="width: 10%">
                  <col style="width: 15.22%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 11%">
                  <col style="width: 12%">
                  <col style="width: 10.84%">
                  <col style="width:15px;">
                </colgroup>
                <tfoot>
                <tr class="bg_highlight_type2">
                  <td colspan="3">
                    <div class="td-box">
                      <span class="td-text text-right" title="합계">합계</span>
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                      <span class="td-text text-right" id="forDrSumCh" title="">0</span>
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                      <span class="td-text text-right" id="forCrSumCh" title="">0</span>
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                      <span class="td-text text-right" id="drSumCh" title="">0</span>
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                      <span class="td-text text-right" id="crSumCh" title="">0</span>
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                    </div>
                  </td>
                  <td>
                    <div class="td-box">
                    </div>
                  </td>
                </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="tbl-bottom mt-0" id="divBtnMst">
        <button type="button" name="cancelB" id="cancelB" onclick="slipCancel()" class="btn btn-lg flat" data-dismiss="modal" aria-label="Close"><i class="icon-lineIcon-close mr-5"></i>취소</button>
        <button type="button" name="printC" onclick="slipPrint()" class="btn btn-lg ml-5"><i class="icon-lineIcon-print mr-5"></i>인쇄</button>
        <button type="button" name="slipCopyB" id="rejectB" onclick="reject()" class="btn btn-lg ml-5" style="display: none;">반려</button>
        <button type="button" name="noJournalB" id="noJournalB" onclick="noJournal()" class="btn btn-lg ml-5" style="display: none;"><i class="icon-lineIcon-roleback mr-5"></i>전표 역분개</button>
        <button type="button" name="slipCopyB" id="slipCopyB" onclick="slipCopy()" class="btn btn-lg ml-5"><i class="icon-lineIcon-copy mr-5"></i>전표 복사</button>
        <button type="button" name="tempSaveB" id="tempSaveB" onclick="tempSave()" class="btn btn-lg ml-5"><i class="icon-lineIcon-temporary-storage mr-5"></i>임시 저장</button>
        <button type="button" name="apprRequstB" id="apprRequstB" onclick="apprRequst()" class="btn btn-lg ml-5"><i class="icon-lineIcon-confirm-request mr-5"></i>승인 요청</button>
        <button type="button" name="apprB" id="apprB" onclick="appr()" class="btn btn-lg black ml-5" style=""><i class="icon-lineIcon-check mr-5"></i>승인</button>
      </div>
    </div>
  </div>
</template>


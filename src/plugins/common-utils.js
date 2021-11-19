var defaultButtonMessage = {
    buttonOk: "OK",
    buttonCancel: "Cancel",
    alertTitle: "Alert"
};
var messageLoadingLayer = "잠시만 기다려주세요.";
function _isEmpty(value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true
    } else {
        return false
    }
}
function _callMakeModal(modalId, title, message, yesBtnNm, noBtnNm, yesCallback, noCallback, isNoButton) {
    var addModal = "";
    var yesBuutonId = modalId + "_yesBtn";
    var noBuutonId = modalId + "_noBtn";

    $("#" + modalId).remove();

    addModal += "<div class='modal' id='" + modalId + "' tabindex='-1' role='dialog' aria-hidden='true' style='display: none;'>";
    addModal += "<div class='modal-dialog modal-sm' role='document'>";
    addModal += "<div class='modal-content'><div class='modal-header'>";
    addModal += "<h2 class='modal-title'>" + title + "</h2>";
    addModal += "<button type='button' class='btn btn-m flat btn-close " + modalId + "_XBtn' data-dismiss='modal' aria-label='Close'>";
    addModal += "<i class='icon-lineIcon-close'></i>";
    addModal += "</button></div><div class='modal-body'>";
    addModal += "<p class='text-left mb-10'>" + message + "</div>";
    addModal += "<div class='modal-footer'><div class='btn-wrap'>";
    if (isNoButton) {
        addModal += "<button type='button' id='" + noBuutonId + "' class='btn btn-md flat' data-dismiss='modal' aria-label='Close'><i class='icon-lineIcon-close mr-5'></i>" + noBtnNm + "</button>";
    }
    addModal += "<button type='button' id='" + yesBuutonId + "' class='btn btn-md black ml-5'><i class='icon-lineIcon-check mr-5'></i>" + yesBtnNm + "</button>";
    addModal += "</div></div></div></div></div>";            
    
    $("body").append(addModal);
    var $_confirm = $("#" + modalId);
    $_confirm.modal({backdrop: 'static', show: true});

    if (yesCallback && typeof yesCallback === 'function') {
        $(document).off("click", "#" + yesBuutonId);
        $(document).on("click", "#" + yesBuutonId, function () {
            $_confirm.modal("hide");
            yesCallback();
        });
    } else {
        $(document).off("click", "#" + yesBuutonId);
        $(document).on("click", "#" + yesBuutonId, function () {
            $_confirm.modal("hide");
        });
    }

    if (noCallback && typeof noCallback === 'function') {
        $(document).off("click", "#" + noBuutonId);
        $(document).on("click", "#" + noBuutonId, function () {
            $_confirm.modal("hide");
            noCallback();
        });

        $(document).off("click", "." + modalId + "_XBtn");
        $(document).on("click", "." + modalId + "_XBtn", function () {
            $_confirm.modal("hide");
            noCallback();
        });
    }
}

function _callMakeMobileModal(modalId, title, message, yesBtnNm, noBtnNm, yesCallback, noCallback, isNoButton) {
    var addModal = "";
    var yesBuutonId = modalId + "_yesBtn";
    var noBuutonId = modalId + "_noBtn";
    
    $("#" + modalId).remove();

    addModal += "<div class='modal' id='" + modalId + "' tabindex='-1' role='dialog' aria-hidden='true' style='display: none;'>";
    addModal += "<div class='modal-dialog modal-m notice' role='document'>";
    addModal += "<div class='modal-content'>";
    addModal += "<div class='modal-header'>";
    addModal += "<h2 class='modal-title'>" + title + "</h2>";
    addModal += "</div>";
    addModal += "<div class='modal-body'>";
    addModal += "<p>" + message + "</p>";
    addModal += "</div>";
    addModal += "<div class='modal-footer'><div class='btn-wrap'>";
    if (isNoButton) {
        addModal += "<button type='button' id='" + noBuutonId + "' class='btn btn-md flat' data-dismiss='modal' aria-label='Close'><i class='icon-lineIcon-close mr-5'></i>" + noBtnNm + "</button>";
    }
    addModal += "<button type='button' id='" + yesBuutonId + "' class='btn btn-md black ml-5'><i class='icon-lineIcon-check mr-5'></i>" + yesBtnNm + "</button>";
    addModal += "</div></div></div></div>";   
    $("body").append(addModal);
    var $_confirm = $("#" + modalId);
    $_confirm.modal({backdrop: 'static', show: true});    

    if (yesCallback && typeof yesCallback === 'function') {
        $(document).off("click", "#" + yesBuutonId);
        $(document).on("click", "#" + yesBuutonId, function () {
            $_confirm.modal("hide");
            yesCallback();
        });
    }else{
        $(document).on("click", "#" + yesBuutonId, function () {
            $_confirm.modal("hide");
        });
    }

    if (noCallback && typeof noCallback === 'function') {
        $(document).off("click", "#" + noBuutonId);
        $(document).on("click", "#" + noBuutonId, function () {
            $_confirm.modal("hide");
            noCallback();
        });
    }else{
        $(document).on("click", "#" + noBuutonId, function () {
            $_confirm.modal("hide");
        });
    }    
}

/*  로딩 기능  */
// var _callLoadingCnt = 0;
function _callLoading(flag) {
    var loading = $("body").children("div#loading-ui").html();
    if (flag) {
        // _callLoadingCnt++;
        if (_isEmpty(loading) && loading != "") {
            $("body").append(' <div class="loader loader-lg is-active type-full" id="loading-ui"></div> ');
        } else {
            $("#loading-ui").show();
        }                
    } else {
        // if (--_callLoadingCnt == 0) {
        $("#loading-ui").hide();
        // }   
    }
}

export default {
    install(Vue, options) {
        Vue.prototype.$mergeProp = function(source, target) {
            return {
                ...source,
                ...target
            }
        }

        Vue.prototype.$addMethodButtonToGridData = function(data, buttonLabel = '', fieldName = '') {
            if(!Array.isArray(data) || buttonLabel == '' || fieldName == '')
                return  data;
            for(let i = 0; i < data.length; i ++)
                data[i][fieldName] = buttonLabel;
            return data;
        }

        Vue.prototype.$addObjectToGridData = function(data, keys = [], name = '') {
            if(!Array.isArray(data))
                return  data;
            if(name == '')
                return data;
            for(let i = 0; i < data.length; i ++) {
                data[i][name] = {};
                for(let j = 0; j < keys.length; j ++) {
                    data[i][name][keys[j]] = Object.prototype.hasOwnProperty.call(data[i], keys[j]) ? data[i][keys[j]] : null;
                }
            }

            return data;
        }

        Vue.prototype.getCurrentDate = function() {
            let today = new Date();
            return today.getFullYear() + 
                (today.getMonth() < 9 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1) ) + 
                (today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate() )
        }

        Vue.prototype.getCurrentMonth = function() {
            let today = new Date();
            return today.getFullYear() + (today.getMonth() < 9 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1) );
        }

        Vue.prototype.getFirstMonthOfTheYear = function() {
            let today = new Date();
            return today.getFullYear() + '01';
        }

        Vue.prototype.getLastYearCurrentMonth = function() {
            let today = new Date();
            return (today.getFullYear() - 1) +
                   (today.getMonth() < 9 ? ('0' + (today.getMonth()+1)) : (today.getMonth()+1) ) + '01';
        }

        Vue.prototype.getThisYearNextMonth = function() {
            let today = new Date();
            return today.getFullYear() +
                   (today.getMonth() < 8 ? ('0' + (today.getMonth() + 1 + 1)) : (
                        today.getMonth() == 11 ? (today.getMonth()+1) : (today.getMonth()+2)
                       ) ) + '01';
        }

        Vue.prototype.getDateFormat = function(date) {
            let _format = '';
            _format = [date.slice(0, 4), '-', date.slice(4)].join('');
            _format = [_format.slice(0, 7), '-', _format.slice(7)].join('');
            return _format;
        }

        Vue.prototype.getDateDiff = function(date1, date2) {
            return (new Date(date1).getTime() - new Date(date2).getTime() >= 0) ? true :  false
        }

        Vue.prototype.getRecentYearList = function() {
            let _today = new Date(), _yearList = [];
            for(let i = 0; i < 3; i ++)
                _yearList.push({message: String(_today.getFullYear() - i), code: String(_today.getFullYear() - i)});
            return _yearList;
        }

        Vue.prototype.getDonaYearList = function() {
            let _today = new Date(), _yearList = [];
            for(let i = 0; i < 10; i ++)
                _yearList.push({message: String(_today.getFullYear() - i), code: String(_today.getFullYear() - i)});
            return _yearList;
        }

        Vue.prototype.openPdf = function(data, title = '') {
            const url = window.URL.createObjectURL(new Blob([data], {type: 'application/pdf'}));
            var win = window.open(url);
            setTimeout(() => {          
                win.document.title = (title == '' ? 'title' : title)       }, 500)             
        }

        Vue.prototype.downloadPdf = function(data, title = '') {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', title);
            document.body.appendChild(link);
            link.click();
        }

        Vue.prototype.getDateFromTimeStamp = function(_timestamp) {
            let date = new Date(Math.round(_timestamp ));
            return String(date.getFullYear()) + 
                    (date.getMonth() < 9 ? ( '0' + (date.getMonth() + 1) ) : (date.getMonth() + 1)) + 
                    (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate() );
        }

        Vue.prototype.getDateStringFromDateObject = function(date) {
            return String(date.getFullYear()) +
                    (date.getMonth() < 9 ? ( '0' + (date.getMonth() + 1) ) : (date.getMonth() + 1)) + 
                    (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate() );
        }

        Vue.prototype.getYeProgressText = function(yeProgress) {
            let _yeProgressText = '';
            switch(yeProgress) {
                case 'INIT':
                    _yeProgressText = '작업준비';
                    break;
                case 'BASE':
                    _yeProgressText = '기본사항';
                    break;
                case 'YEAR_INCOME':
                    _yeProgressText = '연소득';
                    break;
                case 'FAMILY':
                    _yeProgressText = '부양가족';
                    break;
                case 'NTS_FILE':
                    _yeProgressText = '국세청 파일처리';
                    break;
                case 'INSURANCE':
                    _yeProgressText = '보험료';
                    break;
                case 'MEDICINE':
                    _yeProgressText = '의료비';
                    break;
                case 'EDUCATION':
                    _yeProgressText = '교육비';
                    break;
                case 'CREDIT_CARD':
                    _yeProgressText = '신용카드';
                    break;
                case 'DONATION':
                    _yeProgressText = '기부금';
                    break;
                case 'SAVINGS':
                    _yeProgressText = '연금저축';
                    break;
                case 'HOUSE_LOAN':
                    _yeProgressText = '주택자금';
                    break;
                case 'OTHERS':
                    _yeProgressText = '기타';
                    break;
                case 'FOREIGN_TAX':
                    _yeProgressText = '외납세액';
                    break;
                case 'EVID':
                    _yeProgressText = '증빙목록';
                    break;
                case 'FINAL_TAX':
                    _yeProgressText = '정산내역';
                    break;
                case 'CLOSED':
                    _yeProgressText = '마감';
                    break;
                case 'OK':
                    _yeProgressText = '성공';
                    break;
                case 'FAIL':
                    _yeProgressText = '경고';
                    break;
                case 'DOING':
                    _yeProgressText = '진행';
                    break;
                default: 
                    _yeProgressText = '대기';
                    break;
            }
            return _yeProgressText;
        }

        Vue.prototype.getYearEndPathName = function(yeProgress) {
            let pathName = 'YeBasics';
            switch(yeProgress) {
                case 'BASE':
                    pathName = 'YeBasics';
                    break;
                case 'YEAR_INCOME':
                    pathName = 'YeAnnualIncome';
                    break;
                case 'FAMILY':
                    pathName = 'YeDependents';
                    break;
                case 'NTS_FILE':
                    pathName = 'YeNationalFile';
                    break;
                case 'INSURANCE':
                    pathName = 'InsuranceFee';
                    break;
                case 'MEDICINE':
                    pathName = 'MedicalExpense';
                    break;
                case 'EDUCATION':
                    pathName = 'EducationalExpense';
                    break;
                case 'CREDIT_CARD':
                    pathName = 'CreditCard';
                    break;
                case 'DONATION':
                    pathName = 'Donation';
                    break;
                case 'SAVINGS':
                    pathName = 'PensionSaving';
                    break;
                case 'HOUSE_LOAN':
                    pathName = 'HomeRental';
                    break;
                case 'OTHERS':
                    pathName = 'HousingMortgage';
                    break;
                case 'FOREIGN_TAX':
                    pathName = 'ForeignTax';
                    break;
                case 'EVID':
                    pathName = 'YeProoflist';
                    break;
                case 'FINAL_TAX':
                    pathName = 'YeSettlementDetails';
                    break;
                case 'CLOSED':
                    pathName = 'YeSettlementDetails';
                    break;
            }
            return pathName;
        }
        Vue.prototype.jsonStringifyV2 = function(param) {
            for(const [key, value] of Object.entries(param)) {
                if(value == '')
                    delete param[key];
            }
            return JSON.stringify(param);
        }
        Vue.prototype.extractObject = function(target = [], param = []) {
            let returnData = [];
            for(let i = 0; i < target.length; i ++) {
                let _item = {};
                for(let j = 0; j < param.length; j ++) {
                    _item[param[j]] = target[i][param[j]] ? target[i][param[j]] : '';
                }
                returnData.push(_item);
            }
            return returnData;
        }
        /**
         * 토스트 메시지
         *
         *    this.toast({message:"출력할 토스트 메시지", type:"success", callback:function(){console.log("콜백")}});
         *    this.toast({message:"출력할 토스트 메시지", type:"error"});
         *    this.toast({message:"출력할 토스트 메시지", type:"failed"});
         *    this.toast({message:"출력할 토스트 메시지", type:"success", callback:function(){console.log("콜백")}, callbackDelayMsec:2000});
         *
         *   {
         *       message  : 메시지
         *       type     : success, failed, error
         *       callback : 토스트 닫힌 후 실행할 함수 (토스트가 5초 동안 보이고 사라짐)
         *       callbackDelayMsec : 토스트 닫힘과 관계없이 지정된 시간 이후 callback호출 (0 ~ 5000ms 지정 가능)
         *   }
         * @param param
         * @returns {*}
         */
        Vue.prototype.toast = function(param) {
            param = (param) ? param : {};
            // param.message, param.type, param.callback, param.callbackDelayMsec
            let delayMsec = -1;
            if ($.isNumeric(param.callbackDelayMsec) && Number(param.callbackDelayMsec) >= 0 && param.callbackDelayMsec <= 5000) {
                delayMsec = param.callbackDelayMsec;
            }
        
            $.notify({
                message: param.message || ''
            }, {
                type: param.type || '',
                onClosed: function () {
                    if (typeof param.callback === 'function' && delayMsec == -1) {
                        param.callback();
                    }
                    // 더블 클릭 방지 위해 버튼 비활성한거 해제
                    var $_target = $(".preventDupClick");
                    $_target.prop("disabled", false);
                    $_target.removeClass("preventDupClick");
                }
            });
            
            if (typeof param.callback === 'function' && delayMsec >= 0) {
                setTimeout(function () {
                    param.callback();
                }, delayMsec);
            }
        }
        /**
         * Confirm 메시지
         *
         *    common_popup.confirm({
         *        modalId : "saveBtnConfirm1",
         *        title   : "컨펌창 타이틀",
         *        message : "출력할 컨펌 메시지",
         *        yesBtnNm: "확인",
         *        noBtnNm : "취소",
         *        yesCallback: function(){console.log("Y콜백");},
         *        noCallback : function(){console.log("n콜백");}});
         *
         *   {
         *       modalId : 컨펌창 구분을 위한 고유id지정
         *       title   : 컨펌창 타이틀
         *       message : 메시지명
         *       yesBtnNm: yes 버튼명
         *       noBtnNm : no 버튼명
         *       yesCallback : yes 버튼 콜백 함수 지정
         *       noCallback  : no 버튼 콜백 함수 지정
         *   }
         * @param param
         */
        Vue.prototype.confirm = function(param) {
            param = (param) ? param : {};
            let title = param.title || defaultButtonMessage.alertTitle;
            let message = param.message || '';
            let yesBtnNm = param.yesBtnNm || defaultButtonMessage.buttonOk;
            let noBtnNm = param.noBtnNm || defaultButtonMessage.buttonCancel;
            _callMakeModal(param.modalId, title, message, yesBtnNm, noBtnNm, param.yesCallback, param.noCallback, true);
        }

        Vue.prototype.confirmDelete = function(yesCallback) {
            _callMakeModal(
                'modalIdDeletePopup',
                defaultButtonMessage.alertTitle,
                '정말 삭제하시겠습니까?',
                defaultButtonMessage.buttonOk,
                defaultButtonMessage.buttonCancel,
                yesCallback,
                null,
                true);
        }

        /**
         * Confirm 메시지 ( 모바일 )
         *
         *    common_popup.mobile_confirm({
         *        modalId : "saveBtnConfirm1",
         *        title   : "컨펌창 타이틀",
         *        message : "출력할 컨펌 메시지",
         *        yesBtnNm: "확인",
         *        noBtnNm : "취소",
         *        yesCallback: function(){console.log("Y콜백");},
         *        noCallback : function(){console.log("n콜백");}});
         *
         *   {
         *       modalId : 컨펌창 구분을 위한 고유id지정
         *       title   : 컨펌창 타이틀
         *       message : 메시지명
         *       yesBtnNm: yes 버튼명
         *       noBtnNm : no 버튼명
         *       yesCallback : yes 버튼 콜백 함수 지정
         *       noCallback  : no 버튼 콜백 함수 지정
         *   }
         * @param param
         */
         Vue.prototype.mobile_confirm = function (param) {
            param = (param) ? param : {};
            let title = param.title || defaultButtonMessage.alertTitle;
            let modalId = 'mobileBtnConfirm';
            let message = param.message || '';
            let yesBtnNm = param.yesBtnNm || defaultButtonMessage.buttonOk;
            let noBtnNm = param.noBtnNm || defaultButtonMessage.buttonCancel; 

            _callMakeMobileModal( modalId , title , message, yesBtnNm, noBtnNm, param.yesCallback, param.noCallback, true);
         };
        /**
         * Alert 메시지
         *
         *    common_popup.alert({
                 modalId : "saveBtnConfirm1",
                 title   : "알럿창 타이틀",
                 message : "출력할 메시지",
                 yesBtnNm: "확인",
                 yesCallback: function(){console.log("Y콜백");}});
         *------------------
         *   {
         *       modalId : 컨펌창 구분을 위한 고유id지정
         *       title   : 컨펌창 타이틀
         *       message : 메시지명
         *       yesBtnNm: yes 버튼명
         *       yesCallback : yes 버튼 콜백 함수 지정
         *   }
         *
         * @param param
         */        
         Vue.prototype.alert = function(param) {
            param = (param) ? param : {};
            let title = param.title || defaultButtonMessage.alertTitle;
            let message = param.message || '';
            let yesBtnNm = param.yesBtnNm || defaultButtonMessage.buttonOk;          

            _callMakeModal(param.modalId, title, message, yesBtnNm, null, param.yesCallback, null, false);
        }

        /**
         * Alert 메시지 ( 모바일 )
         *
         *    common_popup.mobile_alert({
                 modalId : "modal_mobileAlert",
                 title   : "알럿창 타이틀",
                 message : "출력할 메시지",
                 yesBtnNm: "확인",
                 yesCallback: function(){console.log("Y콜백");}});
         *------------------
         *   {
         *       modalId : 컨펌창 구분을 위한 고유id지정
         *       title   : 컨펌창 타이틀
         *       message : 메시지명
         *       yesBtnNm: yes 버튼명
         *       yesCallback : yes 버튼 콜백 함수 지정
         *   }
         *
         * @param param
         */       
         Vue.prototype.mobile_alert = function (param) {
            param = (param) ? param : {};
            let modalId = 'modal_mobileAlert';  
            let title = param.title || defaultButtonMessage.alertTitle;
            let message = param.message || '';
            let yesBtnNm = param.yesBtnNm || defaultButtonMessage.buttonOk;

            _callMakeMobileModal( modalId , title , message, yesBtnNm, null, param.yesCallback, null, false);  
         }
         /**
         * 로딩바 (테이블내)
         *   {
         *       isFlag : true, false
         *   }
         * @param param
         */
        Vue.prototype.loading = function (param) {
            param = (param) ? param : {};
            _callLoading(param.isFlag);
        };
        /*
         * 로딩 모달을 팝업시킴. :: (전체화면)
         * ex) common_popup.callModalLoading(true);
         * ex) common_popup.callModalLoading(false);
         * */
        Vue.prototype.callModalLoading = function(flag) {
            let deferred = $.Deferred();           
            if (flag) {
                if ($("#modalLoadingLayer").length == 0) {
                    var addModal = "";
                    addModal += "<div class='modal' id='modalLoadingLayer' role='dialog' tabindex='-1' style='display: none;' aria-hidden='true' data-backdrop='static' data-keyboard='false'>";
                    addModal += "<div class='modal-dialog modal-sm-type2' role='document'>";
                    addModal += "<div class='modal-content text-center'>";
                    addModal += "<div class='loader loader-xlg is-active type2 mt-80'></div>";
                    addModal += "<p class='modal-info mt-20'>" + messageLoadingLayer + "</p>";
                    addModal += "</div></div></div>";
                    $("body").append(addModal);
                }
                $("#modalLoadingLayer").modal("show");
            } else {
                $("#modalLoadingLayer").modal("hide");
            }
            return deferred.resolve();
        }
        /* 
         * 로딩 모달을 팝업시킴. :: (모바일)
         * ex) common_popup.callMobileModalLoading(true);
         * ex) common_popup.callMobileModalLoading(false);
         * */
        Vue.prototype.callMobileModalLoading = function (flag) {
            let deferred = $.Deferred();
            if (flag) { 
                if ($("#modalMobileLoadingLayer").length == 0) {
                    var addModal = "";
                    addModal += "<div class='modal' id='modalMobileLoadingLayer' role='dialog' tabindex='-1' style='display: none;' aria-hidden='true' data-backdrop='static' data-keyboard='false'>";
                    addModal += "<div class='modal-dialog modal-m no-header' role='document'>";
                    addModal += "<div class='modal-content text-center'>";
                    addModal += "<div class='loader loader-xlg is-active type2 mt-40'></div>";
                    addModal += "<p class='modal-info mt-20 mb-20'>" + messageLoadingLayer + "</p>";
                    addModal += "</div></div></div>";
                    $("body").append(addModal);
                }
                $("#modalMobileLoadingLayer").modal("show");
            }
            else {
                $("#modalMobileLoadingLayer").modal("hide");
            }     
            return deferred.resolve();
        }
    }
}
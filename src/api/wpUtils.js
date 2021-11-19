/**
 * 공통 유틸리티 모음
 */
export default {
    /**
     * Check Null
     * - 주의 : 공백 문자열인 경우 false 를 반환한다.
     *
     * @param obj
     * @return {boolean}
     */
    isNull(obj) {
        return obj === undefined || obj === null || obj.toString() === 'undefined' || obj.toString() === 'null';
    },
    isNotNull(obj) {
        return !this.isNull(obj);
    },

    /**
     * Check Empty
     *
     * @param obj
     * @return {boolean}
     */
    isEmpty(obj) {
        return obj === undefined || obj === null || obj.toString() === '' || obj.toString() === 'undefined' || obj.toString() === 'null';
    },
    isNotEmpty(obj) {
        return !this.isEmpty(obj);
    },

    /**
     * 입력된 실수를 문자열 표현법으로 표현하는 함수
     *
     * @param amt {number|string} 문자열로 출력할 실수
     * @return {string} 문자열로 바뀐 실수(천단위 구분 컴마, 음수/양수, 소숫점 뒤 0제거)
     * @example commonUtils.formatAmt(12345.67)   => 12,345.67
     *          commonUtils.formatAmt(12345)      => 12,345
     *          commonUtils.formatAmt("12345.60") => 12,345.6
     */
    formatAmt(amt) {
        if (amt == null || amt === "") {
            return "";
        }

        let sAmt = this.delComma(amt);

        if (sAmt.indexOf(".") != -1) { // 소숫점 끝자리 0 제거
            sAmt = sAmt.replace(/(0+$)/, "");
        }

        const parts = sAmt.split(".");
        const sInteger = parts[0] ? parts[0] : "0"; // 정수부
        const sDecimal = parts[1] ? parts[1] : ""; // 소수부

        return this.putComma(sInteger) + (sDecimal ? "." + sDecimal : "");
    },

    /**
     * 입력된 실수를 문자열 표현법으로 표현하는 함수 (소숫점 고정 표현이 필요한 경우)
     *
     * @param amt {number|string} 문자열로 출력할 실수
     * @param place {number} 소숫점 고정 표현할 자릿수
     * @returns {string}
     * @example commonUtils.formatAmt(12345.6789, 2) => 12,345.67
     *          commonUtils.formatAmt(12345, 2)      => 12,345.00
     *          commonUtils.formatAmt(12345.6, 2)    => 12,345.60
     */
    formatAmtDecimal(amt, place) {
        if (amt == null || amt === "") {
            return "";
        }
        if (place == null || place.constructor !== Number) {
            return this.formatAmt(amt);
        }

        let sAmt = this.delComma(amt);

        let parts = sAmt.split(".");
        let sInteger = parts[0] ? parts[0] : "0"; // 정수부
        let sDecimal = parts[1] ? parts[1] : ""; // 소수부

        if (place === 0) { // 소숫점 표시 안하는 경우
            return this.putComma(sInteger);
        }

        if (place === sDecimal.length) { // 자릿수 일치하는 경우
            // none
        } else if (place > sDecimal.length) { // 자릿수 부족
            let diff = place - sDecimal.length;
            for (let i = 0; i < diff; i++) {
                sDecimal += "0";
            }
        } else { // 자릿수 초과
            sDecimal = sDecimal.substr(0, place);
        }
        return this.putComma(sInteger) + "." + sDecimal;
    },

    /**
     * 문자열을 실수로 변환
     *
     * @param str
     * @return {number}
     * @example commonUtils.formatAmtReverse("1,234,567.89")
     */
    formatAmtReverse(str) {
        return Number(this.delComma(str));
    },

    /**
     * 숫자 데이타에 콤마를 입력
     *
     * @param n 숫자 값
     * @return {string} 콤마 입력된 문자열
     * @example commonUtils.putComma(12345.66)
     */
    putComma(n) {
        if (isNaN(n))
            return n;
        let reg = /(^[+-]?\d+)(\d{3})/;
        n += '';
        while (reg.test(n))
            n = n.replace(reg, '$1' + ',' + '$2');
        return n;
    },

    /**
     * 콤마 구분자 삭제
     *
     * @param value {string|number}
     * @return {string} 콤마 구분자 삭제된 문자열
     * @example commonUtils.delComma("1,2345.66")
     */
    delComma(value) {
        return value.toString()
            .replace(/,/g, "")
            .replace(/ /g, "");
    },

    /**
     * 기본 포멧 적용된 날짜를 사용자 포멧 적용된 날짜로 변환
     *
     * @param vDate 기본 포멧 적용된 날짜 (yyyyMMdd)
     * @return {string} 사용자 포멧 적용된 날짜
     * @example commonUtils.formatDate("20180101")
     */
    formatDate(vDate) {
        vDate = vDate.replace(/[\s*\-/.\\]/g, "");
        if (this.isEmpty(vDate)) {
            return "";
        } else {
            let df = this.getCookie('NCPWP_DATEFORMAT');
            if (this.isEmpty(df)) { // TODO : Cookie 에 'NCPWP_DATEFORMAT'가 없는 경우가 존재하여 임시로 Default 처리함.
                df = "yyyy.MM.dd";
            }
            let year = vDate.substr(0, 4);
            let month = vDate.substr(4, 2);
            let day = vDate.substr(6, 2);
            return df.replace("yyyy", year).replace("MM", month).replace("dd", day);
        }
    },

    /**
     * 사용자 포멧 적용된 날짜를 기본 포멧 적용된 날짜로 변환
     *
     * @param vDate 사용자 포멧 적용된 날짜
     * @return {string} 기본 포멧 적용된 날짜 (yyyyMMdd)
     * @example commonUtils.formatDateReverse("2018.01.01")
     */
    formatDateReverse(vDate) {
        if (vDate.indexOf("yyyy") == -1 && vDate.indexOf("mm") == -1 && vDate.indexOf("dd") == -1) {
            let df = this.getCookie('NCPWP_DATEFORMAT');
            if (this.isEmpty(df)) { // TODO : Cookie 에 'NCPWP_DATEFORMAT'가 없는 경우가 존재하여 임시로 Default 처리함.
                df = "yyyy.MM.dd";
            }
            let year = vDate.substr(df.indexOf("yyyy"), 4);
            let month = vDate.substr(df.indexOf("MM"), 2);
            let day = vDate.substr(df.indexOf("dd"), 2);
            return String(year) + String(month) + String(day);
        } else {
            return "";
        }
    },

    /**
     * 쿠키값 리턴
     *
     * @param cname 쿠키 문자열
     * @return {string} 쿠키값 리턴
     * @example commonUtils.getCookie('NCPWP_DATEFORMAT')
     */
    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    /**
     * Group By
     *
     * @param dataList
     * @param key
     * @return {{key, groupDataList[]}, ...}
     */
    groupBy(dataList, key) {
        return dataList.reduce(function (carry, el) {
            var group = el[key];

            if (carry[group] === undefined) {
                carry[group] = []
            }

            carry[group].push(el)
            return carry
        }, {})
    },

    /**
     * 정렬 (오름차순 + 내림차순)
     *
     * @param dataList  정렬할 데이터 목록
     * @param sortField 정렬할 필드명
     * @param sortVal   정렬 조건 ("ASC"/"DESC")
     */
    sort(dataList, sortField, sortVal) {
        dataList.sort((prev, next) => {
            if (sortVal === "ASC") {
                return prev[sortField] < next[sortField] ? -1 : prev[sortField] > next[sortField] ? 1 : 0;
            } else if (sortVal === "DESC") {
                return prev[sortField] < next[sortField] ? 1 : prev[sortField] > next[sortField] ? -1 : 0;
            }
        });
    },

    /**
     * 정렬 (오름차순 + 내림차순 + 기본정렬)
     *
     * - 정렬조건이 공백인 경우 기본정렬이 오름차순으로 수행된다.
     *
     * @param dataList     정렬할 데이터 목록
     * @param sortField    정렬할 필드명
     * @param sortVal      정렬 조건 ("ASC"/"DESC"/"")
     * @param defaultField 기본정렬시 사용할 필드명
     */
    sortAndDefault(dataList, sortField, sortVal, defaultField) {
        dataList.sort((prev, next) => {
            if (sortVal === "ASC") {
                return prev[sortField] < next[sortField] ? -1 : prev[sortField] > next[sortField] ? 1 : 0;
            } else if (sortVal === "DESC") {
                return prev[sortField] < next[sortField] ? 1 : prev[sortField] > next[sortField] ? -1 : 0;
            } else if (sortVal === "") { // 기본 정렬
                return prev[defaultField] < next[defaultField] ? -1 : prev[defaultField] > next[defaultField] ? 1 : 0;
            }
        });
    },

    /**
     * Internet Explorer 여부 판별
     *
     * @return {boolean} true : Internet Explorer, false : Other Browser
     */
    isIE() {
        let agent = navigator.userAgent.toLowerCase();
        if ((navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
            return true;
        }
        return false;
    },

    /**
     * Firefox Browser 여부 판별
     *
     * @returns {boolean} true : Firefox Browser, false : Other Browser
     */
    isFF() {
        let agent = navigator.userAgent;
        if (/firefox/i.test(agent)) {
            return true;
        }
        return false;
    },

    /**
     * 가로 스크롤 생성 여부 체크
     *
     * @param el DOM Element
     * @returns {boolean}
     */
    hasHScrollbar(el) {
        return el ? el.scrollWidth > el.offsetWidth : false;
    },

    /**
     * 세로 스크롤 생성 여부 체크
     *
     * @param el DOM Element
     * @returns {boolean}
     */
    hasVScrollbar(el) {
        return el ? el.scrollHeight > el.offsetHeight : false;
    },

    /**
     * Ajax 호출시 주소표시줄 URL 변경 및 History 생성
     *  - 파라미터에서 데이터를 추출하여 GET URL 을 생성한다.
     *  - 값이 Empty 인 경우 제외 한다.
     *  - 해당 함수 호출 후에는 popstate event 핸들링 하도록 구현한다.
     *  - 참고 : title 제어는 지원하지 않는 브라우져가 많으므로 구현 안함.
     *
     *  ex) 현재 URL : https://workcol.ncpworkpalce.com/bcs/test
     *     1) url : null
     *        param : {"p1" : "v1", "p2" : "v2"}
     *        -> 변경된 URL : https://workcol.ncpworkpalce.com/bcs/test?p1=v1&p2=v2
     *
     *     2) url : "/bcs/search"
     *        param : {"p1" : "v1", "p2" : "v2"}
     *        -> 변경된 URL : https://workcol.ncpworkpalce.com/bcs/search?p1=v1&p2=v2
     *
     *     3) url : "view"
     *        param : null
     *        -> 변경된 URL : https://workcol.ncpworkpalce.com/bcs/view
     *
     * @param data  Hisotry 에 저장할 데이터 (Object|null)
     * @param url   URL 변경이 필요한 경우 (String|null)
     * @param param 파라미터 (Object)
     */
    pushState: function (data, url, param) {
        let str = "",
            isFirst = true,
            separator = "?";

        // 변경할 URL 이 존재하는 경우
        if (this.isNotEmpty(url)) {
            str = url;
        }

        // 파라미터가 존재하는 경우
        if (this.isNotEmpty(param)) {
            for (let name in param) {
                let value = param[name];
                if (this.isNotEmpty(value)) {
                    str += (separator + encodeURIComponent(name) + "=" + encodeURIComponent(value));

                    if (isFirst) {
                        separator = "&";
                        isFirst = false;
                    }
                }
            }
        }

        // URL 과 파라미터 모두 없는 경우
        if (this.isEmpty(url) && this.isEmpty(param)) {
            str = location.href.split("?")[0]; // '?' 뒤만 제거한다.
        }

        history.pushState(data, null, str);
    },

    /**
     * UUID 생성 (v4 랜덤값)
     *
     * @return {string}
     */
    generateUUIDv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}
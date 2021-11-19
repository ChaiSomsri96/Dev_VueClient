export const houseSurvey = {
    'l2': // 장기주택저당차입금.
        {
            H10: {
                name: 'H10', text: `근로자의 국적`, value: '',
                hide: true,
                domOptList: [{label: '내국인', value: 'A'}, {label: '외국인', value: 'B'},]
            },
            H20: {
                name: 'H20', text: `근로자의 거주 구분`, value: '',
                hide: true,
                domOptList: [{label: '거주자', value: 'A'}, {label: '비거주자', value: 'B'},]
            },
            H30: {
                name: 'H30',
                text: `차입금 채무자`,
                hide: true, value: '',
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'H40'},
                    {label: '부양가족', value: 'B', nextStep: false},]
            },
            H40: {
                name: 'H40',
                text: `차입대상`,
                hide: true, value: '',
                domOptList: [{label: '주택', value: 'A', nextStep: 'J10'},
                    {label: '주택분양권', value: 'B', nextStep: 'K10'},
                    {label: '오피스텔', value: 'C', nextStep: false},]
            },
            J10: {
                name: 'J10',
                text: `연말(12월31일)현재 세대 전체의 주택소유`,
                hide: true, value: '',
                domOptList: [{label: '1채', value: 'A', nextStep: 'J20'},
                    {
                        label: '2채', value: 'B', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J11"},
                            {condition: ["START_DT", ">=", "20060101"], to: false}
                        ]
                    },  //차입일
                    {label: '3채이상', value: 'C', nextStep: false},]
            },
            J11: {
                name: 'J11',
                text: `2005.12.31 이전 차입금 주택 보유 현황`,
                hide: true, value: '', vertical: true,
                domOptList: [{
                    label: '05.12.31 이전에 2주택 보유자로서 연말 현재 2주택자인 경우 (*단, 실제 거주하고 있는 주택에 대해서만 공제 가능)',
                    value: 'A', nextStep: 'J20'
                }, {
                    label: '05.12.31 이전에 1주택 보유자로 06년 이후 주택을 추가 취득하여 2주택자인 경우',
                    value: 'B', nextStep: false
                },]
            },
            J20: {
                name: 'J20',
                text: `주택 소유자(명의자)`,
                hide: true, value: '',
                domOptList: [
                    {label: '근로자 본인 (타인과 공동명의 포함)', value: 'A', nextStep: 'J30'},
                    {label: '부양가족', value: 'B', nextStep: false},]
            },
            J30: {
                name: 'J30',
                text: `연말(12월31일)현재 보유 주택의 전용면적의 크기`,
                hide: true, value: '', vertical: true,
                domOptList: [{label: '국민주택규모(85㎡)이하', value: 'A', nextStep: 'J40'},
                    {
                        label: '국민주택규모 이상', value: 'B', nextStep: [
                            {condition: ["START_DT", ">=", "20140101"], to: "J40"},
                            {condition: ["START_DT", "<", "20140101"], to: false}
                        ]
                    },] //차입일
            },
            J40: {
                name: 'J40',
                text: `해당 주택 취득 당시의 상태`,
                hide: true, value: '',
                domOptList: [{label: '무주택자', value: 'A', nextStep: 'J50'},
                    {
                        label: '1주택자', value: 'B', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J50"},
                            {condition: ["START_DT", ">=", "20140101"], to: "J50"},
                            {to: false}
                        ]
                    }, //차입일
                    {
                        label: '2주택자', value: 'C', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J50"},
                            {condition: ["START_DT", ">=", "20060101"], to: false},
                        ]
                    }, //차입일
                ]
            },
            J50: {
                name: 'J50',
                text: `주택의 차입일 당시 기준시가`,
                hide: true, value: '',
                domOptList: [{label: '3억원 이하', value: 'A', nextStep: 'J60'},
                    {
                        label: '4억원 이하', value: 'B', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J60"},
                            {condition: ["START_DT", ">=", "20140101"], to: "J60"},
                            {to: false}
                        ]
                    },  //차입일
                    {
                        label: '5억원 이하', value: 'C', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J60"},
                            {condition: ["START_DT", ">=", "20190101"], to: "J60"},
                            {to: false}
                        ]
                    },  //차입일
                    {
                        label: '5억원 초과', value: 'D', nextStep: [
                            {condition: ["START_DT", "<=", "20051231"], to: "J60"},
                            {to: false}
                        ]
                    },  //차입일
                ]
            },
            J60: {
                name: 'J60',
                text: `연말(12월 31일) 현재 근로자 본인의 세대주 여부`,
                hide: true, value: '',
                domOptList: [{
                    label: '세대주', value: 'A', nextStep: [
                        {condition: ["START_DT", "<=", "20051231"], to: "J80"},
                        {to: "J70"}
                    ]
                },  //차입일
                    {label: '세대원', value: 'B', nextStep: 'J60B'},
                ]
            },
            J60B: {
                name: 'J60B',
                text: `세대주가 주택관련공제를 받는지 여부`,
                hide: true, value: '',
                domOptList: [
                    {label: '공제받지 않음', value: 'A', nextStep: 'J60C'},
                    {label: '공제받음', value: 'B', nextStep: false},
                ]
            },
            J60C: {
                name: 'J60C',
                text: `해당주택 실제 거주 여부`,
                hide: true, value: '',
                domOptList: [
                    {label: '거주하고 있음', value: 'A', nextStep: 'J70'},
                    {label: '거주하지 않음', value: 'B', nextStep: false},
                ]
            },
            J70: {
                name: 'J70',
                text: `당해연도중 2주택 보유기간`,
                hide: true, value: '',
                domOptList: [{label: '없음', value: 'A', nextStep: 'J80'},
                    {label: '3개월 이하', value: 'B', nextStep: 'J80'},
                    {
                        label: '3개월  초과', value: 'C', nextStep: [
                            {condition: ["START_DT", ">=", "20140101"], to: "J80"},
                            {to: false}
                        ]
                    }, //차입일
                ]
            },
            J80: {
                name: 'J80',
                text: `차입금 상환기간`,
                hide: true, value: '',
                domOptList: [{label: '15년이상', value: 'A', nextStep: 'J90'},
                    {
                        label: '10년이상', value: 'B', nextStep: [
                            {condition: ["START_DT", "<=", "20031231"], to: "J90"},
                            {condition: ["START_DT", ">=", "20150101"], to: "J80B"},
                            {to: false}
                        ]
                    },  //차입일
                    {label: '10년미만', value: 'C', nextStep: false},
                ]
            },
            J80B: {
                name: 'J80B',
                text: `금리 및 차입금 상환방식`,
                hide: true, value: '', vertical: true,
                domOptList: [{label: '고정금리 또는 비거치식상환', value: 'A', nextStep: 'J90'},
                    {label: '그 밖의 대출', value: 'B', nextStep: false},]
            },
            J90: {
                name: 'J90',
                text: `차입시기`,
                hide: true, value: '', vertical: true,
                domOptList: [{label: '소유권이전 등기일로부터 3개월이내', value: 'A', nextStep: 'J100'},
                    {
                        label: '소유권이전 등기일로부터 3개월이후', value: 'B', nextStep: [
                            {condition: ["START_DT", "<=", "20001031"], to: "J100"},
                            {to: "J92"}
                        ]
                    },] //차입일
            },
            J92: {
                name: 'J92',
                text: `대출상품 변경 및 추가차입 여부`,
                hide: true, value: '', vertical: true,
                domOptList: [{label: '대출상품을 변경했고 차입금은 증가되지 않고 동일함', value: 'A', nextStep: 'J100'},
                    {label: '대출상품을 변경했고 차입금이 증가됨', value: 'B', nextStep: 'J100'},
                    {label: '현재 주택에 대한 추가 담보대출', value: 'C', nextStep: false},]
            },
            J100: {
                name: 'J100',
                text: `차입금 만기일 전 중도상환 여부 `,
                hide: true, value: '', vertical: true,
                domOptList: [{label: '중도상환 해당 없음', value: 'A', nextStep: 'L10'},
                    {
                        label: '차입기간 15년이상 경과한 후 중도상환',
                        value: 'B', nextStep: 'L10'
                    }, {
                        label: '차입기간 15년미만 경과한 후 중도상환',
                        value: 'C', nextStep: false
                    },
                    {label: '대출상품 변경으로 인한 중도상환(금융기관이 잔액을 직접 상환하고 저당권을 설정하는 형태)', value: 'D', nextStep: 'L10'},]
            },
            K10: {
                name: 'K10',
                text: `해당 주택분양권 취득 당시 주택소유 여부`,
                hide: true, value: '',
                domOptList: [
                    {label: '무주택', value: 'A', nextStep: 'K20'},
                    {label: '유주택', value: 'B', nextStep: false},
                ]
            },
            K20: {
                name: 'K20', text: `연중 분양권 보유 갯수`,
                hide: true, value: '',
                domOptList: [
                    {label: '1개', value: 'A', nextStep: 'K30'},
                    {label: '2개 이상', value: 'B', nextStep: false},
                ]
            },
            K30: {
                name: 'K30',
                text: `연말(12월31일)현재 분양권 보유 여부`,
                hide: true, value: '',
                domOptList: [
                    {label: '보유', value: 'A', nextStep: 'K40'},
                    {label: '미보유(처분)', value: 'B', nextStep: false},
                ]
            },
            K40: {
                name: 'K40',
                text: `주택분양권에 대한 차입금 종류`,
                hide: true, value: '', vertical: true,
                domOptList: [
                    {label: '주택완공시 장기주택저당차입금으로 전환할 조건의 차입금', value: 'A', nextStep: 'K50'},
                    {label: '이외의 차입금', value: 'B', nextStep: false},
                ]
            },
            K50: {
                name: 'K50',
                text: `연말(12월 31일) 현재 근로자 본인의 세대주 여부`,
                hide: true, value: '',
                domOptList: [
                    {label: '세대주', value: 'A', nextStep: 'K60'},
                    {label: '세대주 아님', value: 'B', nextStep: false},]
            },
            K60: {
                name: 'K60',
                text: `주택분양권의 차입일 당시 분양가격 또는 조합원입주권 가격`,
                hide: true, value: '',
                domOptList: [
                    {label: '3억원 이하', value: 'A', nextStep: 'L10'},
                    {
                        label: '4억원 이하', value: 'B', nextStep: [
                            {condition: ["START_DT", ">=", "20140101"], to: "L10"},
                            {to: false}
                        ]
                    },
                    {label: '4억원 초과', value: 'C', nextStep: false},]
            },
            L10: {
                name: 'L10', text: '',
                hide: true, value: '', domOptList: [],
                isFinal: true,
                guide: `
                        <h3 class="title-wrap">* 장기주택저당차입금 공제대상입니다. 아래의 서류를 제출해 주세요.</h3>
                        <div class="form-group row" >
                          <ul>
                            <ol>장기주택저당차입금 이자상환 명세서</ol>
                            <ol>주민등록표 등본</ol>
                            <ol>건물등기부등본 또는 분양계약서</ol>
                            <ol>개별주택가격 확인서 또는 공동주택가격 확인서</ol>
                            <ol>대출계약서 사본</ol>
                          </ul>
                        </div>
                        <div class="form-group row" >
                          <div>* 장기주택저당차입금 이자상환 명세서 : 대출상품 변경자는 은행에서 발급한 서류 (안내 팝업창 참조)를 제출해야 하고,
                           채무자가 공동명의인 경우 채무분담비율을 확인할 수 있는 서류를 제출해야 함. 그 이외는 국세청 간소화 서류로 가능함)</div>
                          <div>* 대출계약서 사본 : 대출상품 변경자만 해당되며, 변경전과 변경후 계약서 사본 모두 제출</div>
                        </div>
                      `
            }
        },
    'l3': // 월세액
        {
            R30: {
                name: 'R30',
                text: `총급여`, hide: true,
                domOptList: [{label: '7천만원 이하', value: 'A'}, {label: '7천만원 초과', value: 'B'},]
            },
            R10: {
                name: 'R10',
                hide: true,
                text: `근로자의 국적`,
                domOptList: [{label: '내국인', value: 'A'}, {label: '외국인', value: 'B'},]
            },
            R20: {
                name: 'R20',
                hide: true, text: `근로자의 거주 구분`,
                domOptList: [{label: '거주자', value: 'A'}, {label: '비거주자', value: 'B'},]
            },
            R40: {
                name: 'R40',
                hide: true, text: `연말(12월31일)현재 근로자 본인의 세대주 여부`,
                domOptList: [{label: '세대주', value: 'A', nextStep: 'R50'}, {label: '세대원', value: 'B', nextStep: 'R40B'},]
            },
            R40B: {
                name: 'R40B',
                hide: true, text: `세대주가 주택관련공제를 받는지 여부`,
                domOptList: [{label: '공제받지 않음', value: 'A', nextStep: 'R50'}, {
                    label: '공제받음',
                    value: 'B',
                    nextStep: false
                },]
            },
            R50: {
                name: 'R50',
                hide: true, text: `연말(12월31일)현재 세대 전체의 주택소유 여부`,
                domOptList: [{label: '무주택', value: 'A', nextStep: 'R100'}, {label: '유주택', value: 'B', nextStep: false},]
            },
            R100: {
                name: 'R100',
                hide: true, text: `근로자의 주민등록표등본상 주소와 임대차계약서상 주소지의 일치 여부`,
                domOptList: [{label: '주소지가 같은 임차주택', value: 'A', nextStep: 'R60'}, {
                    label: '다른 주택',
                    value: 'B',
                    nextStep: false
                },]
            },
            R60: {
                name: 'R60',
                hide: true, text: `임대차계약서상의 임차인`,
                domOptList: [
                    {label: '근로자 본인', value: 'A', nextStep: 'R70'},
                    {label: '기본공제대상자인 부양가족', value: 'B', nextStep: 'R70'},
                    {label: '기본공제대상자가 아닌 부양가족', value: 'C', nextStep: false}
                ]
            },
            R70: {
                name: 'R70',
                hide: true, text: `월세 지급자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'R80'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            R80: {
                name: 'R80',
                hide: true, text: `임차주택(주거용 오피스텔, 고시원 포함)의 크기`,
                domOptList: [
                    {label: '국민주택규모(85㎡)이하', value: 'A', nextStep: 'R90'},
                    {label: '국민주택규모 이상이지만 기준시가 3억원 이하', value: 'B', nextStep: 'R90'},
                    {label: '국민주택규모 이상이고 기준시가 3억원 초과', value: 'C', nextStep: false},
                ]
            },
            R90: {
                name: 'R90',
                hide: true, text: `임차주택(주거용 오피스텔, 고시원 포함)의 종류`,
                domOptList: [{label: '주거용', value: 'A', nextStep: 'S10'}, {label: '기타', value: 'B', nextStep: false},]
            },
            S10: {
                name: 'S10', text: '',
                hide: true, value: '', domOptList: [],
                isFinal: true,
                guide: `
                        <h3 class="title-wrap">* 월세액 공제대상입니다. 아래의 서류를 제출해 주세요.</h3>
                        <div class="form-group row" >
                          <ul>
                            <ol>주민등록표 등본</ol>
                            <ol>임대차계약서 사본</ol>
                            <ol>현금영수증, 계좌이체영수증, 무통장 입금증 등 주택임대인에게 월세액을 지급하였음을 증명하는 서류</ol>
                          </ul>
                        </div>
                      `
            }
        },
    'l4': // 주택임차 - 대출기관
        {
            A10: {
                name: 'A10',
                hide: true,
                text: `근로자의 국적`,
                domOptList: [{label: '내국인', value: 'A'}, {label: '외국인', value: 'B'},]
            },
            A20: {
                name: 'A20',
                hide: true, text: `근로자의 거주 구분`,
                domOptList: [{label: '거주자', value: 'A'}, {label: '비거주자', value: 'B'},]
            },
            A22: {
                name: 'A22',
                hide: true, text: `차입금 변경여부(1월1일부터 12월31일 사이)`,
                domOptList: [{label: '예', value: 'A', nextStep: 'A23'}, {label: '아니오', value: 'B'},]
            },
            A23: {
                name: 'A23',
                hide: true, text: `주소 변경여부(1월1일부터 12월31일 사이)`,
                domOptList: [{label: '예', value: 'A', nextStep: 'A30'}, {label: '아니오', value: 'B', nextStep: false},]
            },
            A30: {
                name: 'A30',
                hide: true, text: `연말(12월 31일) 현재 세대 전체의 주택소유 여부`,
                domOptList: [{label: '무주택', value: 'A', nextStep: 'A40'}, {label: '유주택', value: 'B', nextStep: false},]
            },
            A40: {
                name: 'A40',
                hide: true, text: `임차주택(주거용 오피스텔 포함)의 전용면적의 크기`,
                domOptList: [{label: '국민주택규모(85㎡)이하', value: 'A', nextStep: 'A50'}, {
                    label: '국민주택규모 이상',
                    value: 'B',
                    nextStep: false
                },]
            },
            A50: {
                name: 'A50',
                hide: true, text: `임차주택의 임대차계약서 상의 계약자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'A60'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            A60: {
                name: 'A60',
                hide: true, text: `임차차입금의 채무자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'A70'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            A70: {
                name: 'A70',
                hide: true, text: `연말(12월31일)현재 근로자 본인의 세대주 여부`,
                domOptList: [{label: '세대주', value: 'A', nextStep: 'B10'}, {label: '세대원', value: 'B', nextStep: 'A70B'},]
            },
            A70B: {
                name: 'A70B',
                hide: true, text: `세대주가 주택관련공제를 받는지 여부`,
                domOptList: [{label: '공제받지 않음', value: 'A', nextStep: 'B10'}, {
                    label: '공제받음',
                    value: 'B',
                    nextStep: false
                },]
            },
            B10: {
                name: 'B10',
                hide: true,
                text: `차입처`,
                domOptList: [{label: '금융기관', value: 'A', nextStep: 'C10'}, {label: '기타', value: 'B', nextStep: false},]
            },
            C10: {
                name: 'C10',
                hide: true, text: `차입금 종류`,
                domOptList: [{
                    label: '임대차계약서상 입주일과 주민등록등본상 전입일 중 빠른날 전후 3개월 이내 차입한 차입금',
                    value: 'A', nextStep: 'C40'
                }, {
                    label: '전세계약 연장(갱신)으로 신규,추가 차입한 경우, 계약 연장(갱신) 전후 3개월 내 차입한 차입금',
                    value: 'B', nextStep: 'C40'
                }, {
                    label: '다른 전세 주택으로 이사한 경우, 종전 전세주택의 입주일과 주민등록등본상 전입일 중 빠른 날 전후 3개월 이내 차입한 차입금',
                    value: 'C', nextStep: 'C40'
                }, {
                    label: '그외 차입금',
                    value: 'D', nextStep: false
                }]
            },
            C40: {
                name: 'C40',
                hide: true, text: `임차보증금이 대출기관에서 임대인 계좌로 송금여부`,
                domOptList: [
                    {label: '대출기관에서 임대인 계좌로 직접 송금', value: 'A', nextStep: 'E10'},
                    {label: '대출기관에서 임대인 계좌로 직접 송금하지 않음', value: 'B', nextStep: false}
                ]
            },
            E10: {
                name: 'E10', text: '',
                hide: true, value: '', domOptList: [],
                isFinal: true,
                guide: `
                        <h3 class="title-wrap">* 공제대상입니다. 아래의 서류를 제출해 주세요.</h3>
                        <div class="form-group row" >
                          <ul>
                            <ol>주택자금상환증명서 (국세청 간소화 서비스로 대체 가능) </ol>
                            <ol>주민등록표등본</ol>
                            <ol>임대차계약서 사본</ol>
                            <ol>설문지 체크 항목에서 안내에서 설명한 서류(대상자에 한함)</ol>
                          </ul>
                        </div>
                      `
            }
        },
    'l5': // 주택임차 - 거주자간
        {
            A10: {
                name: 'A10',
                hide: true,
                text: `근로자의 국적`,
                domOptList: [{label: '내국인', value: 'A', nextStep: ''}, {label: '외국인', value: 'B', nextStep: false},]
            },
            A20: {
                name: 'A20',
                hide: true, text: `근로자의 거주 구분`,
                domOptList: [{label: '거주자', value: 'A', nextStep: 'A21'}, {label: '비거주자', value: 'B', nextStep: false},]
            },
            A21: {
                name: 'A21',
                hide: true, text: `총급여`,
                domOptList: [{label: '5천만원 이하', value: 'A', nextStep: 'A22'}, {
                    label: '5천만원초과',
                    value: 'B',
                    nextStep: false
                },]
            },
            A22: {
                name: 'A22',
                hide: true, text: `차입금 변경여부(1월1일부터 12월31일 사이)`,
                domOptList: [{label: '예', value: 'A', nextStep: 'A23'}, {label: '아니오', value: 'B', nextStep: 'A23'},]
            },
            A23: {
                name: 'A23',
                hide: true, text: `주소 변경여부(1월1일부터 12월31일 사이)`,
                domOptList: [{label: '예', value: 'A', nextStep: 'A30'}, {label: '아니오', value: 'B', nextStep: 'A30'},]
            },
            A30: {
                name: 'A30',
                hide: true, text: `연말현재 세대 전체의 주택소유 여부`,
                domOptList: [{label: '무주택', value: 'A', nextStep: 'A40'}, {label: '유주택', value: 'B', nextStep: false},]
            },
            A40: {
                name: 'A40',
                hide: true, text: `임차주택(주거용 오피스텔 포함)의 크기`,
                domOptList: [{label: '국민주택규모(85㎡)이하', value: 'A', nextStep: 'A50'}, {
                    label: '국민주택규모 이상',
                    value: 'B',
                    nextStep: false
                },]
            },
            A50: {
                name: 'A50',
                hide: true, text: `임차주택의 계약자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'A60'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            A60: {
                name: 'A60',
                hide: true, text: `임차차입금의 채무자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'A70'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            A70: {
                name: 'A70',
                hide: true, text: `연말(12월31일)현재 근로자 본인의 세대주 여부`,
                domOptList: [{label: '세대주', value: 'A', nextStep: 'B10'}, {label: '세대원', value: 'B', nextStep: 'A70B'},]
            },
            A70B: {
                name: 'A70B',
                hide: true, text: `세대주가 주택관련공제를 받는지 여부`,
                domOptList: [{label: '공제받지 않음', value: 'A', nextStep: ''}, {
                    label: '공제받음',
                    value: 'B',
                    nextStep: false
                },]
            },
            B10: {
                name: 'B10',
                hide: true,
                text: `차입처`,
                domOptList: [{label: '개인', value: 'A', nextStep: 'D10'}, {label: '기타', value: 'B', nextStep: false},]
            },
            D10: {
                name: 'D10',
                hide: true, text: `차입금 종류`,
                domOptList: [{
                    label: '입주일과 전입일 중 빠른날 전후 1개월 이내 차입한 차입금',
                    value: 'A', nextStep: 'D30'
                }, {
                    label: '전세계약 연장(갱신)으로 신규,추가 차입한 경우, 계약 연장(갱신) 전후 1개월 내 차입한 차입금',
                    value: 'B', nextStep: 'D30'
                }, {
                    label: '다른 전세 주택으로 이사한 경우, 종전 전세주택의 입주일과 전입일 중 빠른 날 전후 1개월 이내에 차입한 차입금',
                    value: 'C', nextStep: 'D30'
                }, {
                    label: '그외 차입금',
                    value: 'D', nextStep: false
                },]
            },
            D30: {
                name: 'D30',
                hide: true,
                text: `이자율`,
                domOptList: [
                    {label: '예', value: 'A', nextStep: 'E10'},
                    {label: '아니오', value: 'B', nextStep: false}
                ]
                /**
                 * ***아래의 차입시기별로 이자율 상이("대출일" 기준으로 D30 코드에 이자율 반영)
                 12.02.28이전            12.02.28~13.02.27                13.02.28~14.03.13                    14.03.14~15.03.12                15.03.13~16.03.15                16.03.16~17.03.09                17.03.10~18.03.20                    18.03.21~19.03.19                    19.03.20~20.3.12                20.3.13이후
                 3.7%            4.0%                3.4%                    2.9%                2.5%                1.8%                1.6%                    1.8%                    2.1%                    1.8%
                 */
            },
            E10: {
                name: 'E10', text: '',
                hide: true, value: '', domOptList: [],
                isFinal: true,
                guide: `
                        <h3 class="title-wrap">* 공제대상입니다. 아래의 서류를 제출해 주세요.</h3>
                        <div class="form-group row" >
                          <ul>
                            <ol>주택자금상환증명서</ol>
                            <ol>주민등록표 등본</ol>
                            <ol>임대차계약서 사본</ol>
                            <ol>금전소비대차계약서 사본</ol>
                            <ol>계좌이체영수증, 무통장입금증 등 원리금 상환을 증명할 수 있는 서류</ol>
                          </ul>
                        </div>
                      `
            }
        },
    'l6': // 주택마련저축
        {
            M09: {
                name: 'M09',
                hide: true, text: `근로자의 총급여`,
                domOptList: [{label: '7천만원 이하', value: 'A', nextStep: ''}, {
                    label: '7천만원 초과',
                    value: 'B',
                    nextStep: false
                },]
            },
            M10: {
                name: 'M10',
                hide: true,
                text: `근로자의 국적`,
                domOptList: [{label: '내국인', value: 'A', nextStep: ''}, {label: '외국인', value: 'B', nextStep: false},]
            },
            M20: {
                name: 'M20',
                hide: true, text: `근로자의 거주 구분`,
                domOptList: [{label: '거주자', value: 'A', nextStep: ''}, {label: '비거주자', value: 'B', nextStep: false},]
            },
            M30: {
                name: 'M30',
                hide: true, text: `연말(12월31일)현재 근로자 본인의 세대주 여부`,
                domOptList: [{label: '세대주', value: 'A', nextStep: 'M60'}, {label: '세대원 ', value: 'B', nextStep: false},]
            },
            M60: {
                name: 'M60',
                hide: true, text: `세대구성원의 주택 보유현황`,
                domOptList: [{
                    label: '연중 계속 무주택',
                    value: 'A', nextStep: 'M40'
                }, {
                    label: '국민주택규모 이하이고, 저축 가입당시 (또는 저축가입 후 주택을 취득한 경우에는 주택을 취득할 당시)의 주택의 기준시가 3억원 이하인 주택 1채 보유',
                    value: 'B', nextStep: false
                    // (-->09.12.31이전 가입한 청약저축 또는 근로자주택마련저축은 계속, 나머지는 종료)
                }, {
                    label: '국민주택규모 이하이고, 저축 가입당시 (또는 저축가입 후 주택을 취득한 경우에는 주택을 취득할 당시)의 주택의 기준시가 3억원 초과인 주택 1채 보유',
                    value: 'C'
                    // (-->05.12.31이전 가입한 청약저축 또는 09.12.31이전 가입한 근로자주택마련저축은 계속, 나머지는 종료)
                }, {
                    label: '국민주택규모 초과 주택 보유하거나 2채 이상 보유',
                    value: 'D'
                }
                ]
            },
            M40: {
                name: 'M40',
                hide: true, text: `저축 가입자`,
                domOptList: [{label: '근로자 본인', value: 'A', nextStep: 'M50'}, {
                    label: '부양가족',
                    value: 'B',
                    nextStep: false
                },]
            },
            M50: {
                name: 'M50', hide: true,
                text: `중도해지 여부`,
                domOptList: [{label: '중도 해지 안 했음', value: 'A', nextStep: 'N10'}, {
                    label: '주택당첨 사유로 중도 해지',
                    value: 'B',
                    nextStep: false
                }, {
                    label: '기타 사유로 중도 해지',
                    value: 'C'
                },]
            },
            N10: {
                name: 'N10', text: '',
                hide: true, value: '', domOptList: [],
                isFinal: true,
                guide: `
                        <h3 class="title-wrap">* 공제대상입니다. 아래의 서류를 제출해 주세요.</h3>
                        <div class="form-group row" >
                          <ul>
                            <ol>주택마련저축납입증명서 (국세청 간소화 서비스로 대체 가능)</ol>
                          </ul>
                        </div>
                      `
            }
        }
}

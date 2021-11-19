const dataCodeRenderer = function(value) {
    switch(value) {
        case 'G0003':
            return '의료비';
        case 'G0025':
            return '의료기기 구입비용';
        case 'G0026':
            return '안경 또는 콘택트렌즈 구입비용';
        case 'G0027':
            return '보청기 또는 장애인 보장구 구입비용';
        case 'G0034':
            return '산후조리원비용';
        case 'G0040':
            return '실손보험-배제액';
    }
    return value;
}
const gridData = {
    'NATIONALTAX_A102': {
        "title": "보장성 보험, 장애인전용보장성보험",
        "fields": [
            { fieldName: 'BUSNID', dataType: 'text' },
            { fieldName: 'TRADE_NM', dataType: 'text' },
            { fieldName: 'INSU1_NM', dataType: 'text' },
            { fieldName: 'NAME', dataType: 'text' },
            { fieldName: 'SUM', dataType: 'number' }
        ],
        "columns": [
            { fieldName: 'BUSNID', header: "사업자번호" },
            { fieldName: 'TRADE_NM', header: "상호" },
            { fieldName: 'INSU1_NM', header: "주피보험자" },
            { fieldName: 'NAME', header: "계약자" },
            { fieldName: 'SUM', header: "금액",
              numberFormat: "#,##0", 
              styleName: "right-column", 
              footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
              nanText: '0'
            }
        ]       
    },
    'NATIONALTAX_B101Y': {
        "title": "의료비",
        "fields": [
            { fieldName: 'BUSNID', dataType: 'text' },
            { fieldName: 'TRADE_NM', dataType: 'text' },
            { fieldName: 'NAME', dataType: 'text' },
            { fieldName: 'DAT_CD', dataType: 'text',
                valueCallback: function (prod, dataRow, fieldName, fieldNames, values) {
                    return dataCodeRenderer(values[fieldNames.indexOf("DAT_CD")]);
                } },
            { fieldName: 'MEDI_SUM', dataType: 'number' },
            { fieldName: 'REFUTE_SUM', dataType: 'number' }
        ],
        "columns": [
            { fieldName: 'BUSNID', header: "사업자번호" },
            { fieldName: 'TRADE_NM', header: "상호" },
            { fieldName: 'NAME', header: "이름" },
            { fieldName: 'DAT_CD', header: "종류" },
            { fieldName: 'MEDI_SUM', header: "의료비금액",
            numberFormat: "#,##0", 
            styleName: "right-column", 
            footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
            nanText: '0'},
            { fieldName: 'REFUTE_SUM', header: "실손보험금액",
            numberFormat: "#,##0", 
            styleName: "right-column", 
            footer: {header: "0", expression: "sum", numberFormat: "#,##0",},
            nanText: '0' }
        ]
    }
}
export default gridData
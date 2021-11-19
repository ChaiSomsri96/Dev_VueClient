export default {
    methods: {

        download: function () {
            this.downloadRealGridExcel(this.excelFileName);
        },

        findCheckedSingleRow: function(){
            let me = this;
            let checkedRows = me.gridView.getCheckedRows();
            if(checkedRows.length < 1) {
                this.toast({message: '데이터를 선택해 주세요.', type:"error"});
                return false;
            }
            if(checkedRows.length > 1) {
                this.toast({message: '데이터를 하나만 선택해 주세요.', type:"error"});
                return false;
            }
            return me.dataProvider.getJsonRow(checkedRows[0]);
        },

        saveCode:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code){
                me.gridView.commit();
                me.$httpPost({
                    param: code,
                    url: me.saveUrl,
                    callback: function () {
                        me.toastSuccessSave();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        saveCodePostBody:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code){
                me.gridView.commit();
                me.$httpPostBody({
                    param: code,
                    sendRequestBody: true,
                    url: me.saveUrl,
                    callback: function () {
                        me.toastSuccessSave();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        insertCode:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if( code){
                me.gridView.commit();
                me.$httpPost({
                    param: code,
                    url: me.insertUrl,
                    callback: function () {
                        me.toastSuccessInsert();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        insertCodePostBody:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if( code){
                me.gridView.commit();
                me.$httpPostBody({
                    param: code,
                    url: me.insertUrl,
                    callback: function () {
                        me.toastSuccessInsert();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        updateCode:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code){
                me.gridView.commit();
                me.$httpPost({
                    param: code,
                    url: me.updateUrl,
                    callback: function () {
                        me.toastSuccessUpdate();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        updateCodePostBody:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code){
                me.gridView.commit();
                me.$httpPostBody({
                    param: code,
                    url: me.updateUrl,
                    callback: function () {
                        me.toastSuccessUpdate();
                        me.reloadRealGrid();
                    }
                });
            }
        },

        deleteCode:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code) {
                me.gridView.commit();
                me.confirmDelete(function () {
                    me.$httpPost({
                        param: code,
                        url: me.deleteUrl,
                        callback: function () {
                            me.toastSuccessDelete();
                            me.reloadRealGrid();
                        }
                    });
                });
            }
        },

        deleteCodePostBody:function(){
            let me = this;
            let code = me.findCheckedSingleRow();
            if(code) {
                me.gridView.commit();
                me.confirmDelete(function () {
                    me.$httpPostBody({
                        param: code,
                        url: me.deleteUrl,
                        callback: function () {
                            me.toastSuccessDelete();
                            me.reloadRealGrid();
                        }
                    });
                });
            }
        },

        addRealGridOption: function () {
            let me = this;
            me.gridView.checkBar.visible = true;
            me.gridView.setCheckBar({exclusive: true});
            me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
                let value = grid.getValue(dataRow, field);
                let fieldName = grid.getColumn(field).fieldName;
                if (fieldName !== 'BANK_CODE') {
                    grid.commit();
                    return;
                }
                grid.commit();
            };

            me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
                if (me.dataProvider.getRowState(newIndex.dataRow) !== 'created') {
                    grid.setColumnProperty('BANK_CODE', 'editable', false);
                } else {
                    grid.setColumnProperty('BANK_CODE', 'editable', true);
                }
            };
        }
    }
}
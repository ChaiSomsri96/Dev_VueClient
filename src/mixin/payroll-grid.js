export default {
    data() {
        return {
            gridView: null,
            dataProvider: null,
            staticButtonColumnIds: []
        }
    },
    methods: {
        getSaveDeleteRows(provider, params={}){
            let stateRows = provider.getAllStateRows();
            let saveList = [];
            let deleteList = [];
            let setRowInfo = function( stateList, state, list){
                let rows = stateList[state];
                if(rows && rows.length > 0) {
                    for (let i = 0; i < rows.length; i++) {
                        let row = provider.getJsonRow(rows[i]);
                        let rowAttr = row['ROW_ATTRS'];
                        delete row['ROW_ATTRS'];
                        list.push({...rowAttr, ...row, ...params});
                    }
                }
            };

            setRowInfo(stateRows, 'created',saveList);
            setRowInfo(stateRows, 'updated',saveList);
            setRowInfo(stateRows, 'deleted',deleteList);

            return {
                save: saveList,
                delete: deleteList
            }
        },
        getCudRows(provider){
            let stateRows = provider.getAllStateRows();
            let createList = [];
            let updateList = [];
            let deleteList = [];
            for (let i = 0; i < stateRows.created.length; i++) {
                createList.push(provider.getJsonRow(stateRows.created[i]));
            }
            for (let i = 0; i < stateRows.updated.length; i++) {
                updateList.push(provider.getJsonRow(stateRows.updated[i]));
            }
            for (let i = 0; i < stateRows.deleted.length; i++) {
                deleteList.push(provider.getJsonRow(stateRows.deleted[i]));
            }
            return {
                create: createList,
                update: updateList,
                delete: deleteList
            }
        },
        getDeleteColumn( opts) {
            const cOptions = opts ? opts: {};
            let options = {
                fieldName: cOptions.fieldName || 'DELETE',
                columnWidth: cOptions.columnWidth || 70,
                headerText: cOptions.headerText || '삭제'
            };
            return {
                fieldName: options.fieldName,
                width: options.columnWidth,
                type: "data",
                header: {text: options.headerText},
                editable:false,
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if(cell.value){
                            return '';
                        }
                        return `<button type="button" class="btn btn-s flat solid btn-up">
                                  <i name="up" class="icon-solidIcon-cancel-red"><span class="blind">delete</span></i>
                              </button>`;
                    }
                }
            }
        },
        /**
         * 만약 renderer.callback 함수의 인자값 cell.value 가 true 를 반환하면
         * 해당 칼럼은 보여주지 않는다.
         * @param cOptions
         * @returns {{editor: {textReadOnly: boolean, type: string}, renderer: {callback: ((function(*, *, *, *): (string))|*), type: string}, fieldName: string, width: number, header: {text: string}, type: string}}
         */
        getUpdateColumn( opts) {
            const cOptions = opts ? opts: {};
            let options = {
                fieldName: cOptions.fieldName || 'UPDATE',
                columnWidth: cOptions.columnWidth || 70,
                headerText: cOptions.headerText || '수정'
            };
            return {
                fieldName: options.fieldName,
                width: options.columnWidth,
                type: "data",
                header: { text: options.headerText },
                editable: false,
                renderer: cOptions.renderer || {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        if(cell.value){
                            return '';
                        }
                        return `<button type="button" class="btn btn-s flat solid btn-down">
                                      <i name="down" class="icon-solidIcon-edit"><span class="blind">update</span></i>
                                </button>`;
                    }
                }
            }
        },
        getIconColumn( options ) {
            return {
                fieldName: options.fieldName,
                width: options.columnWidth || 100,
                type: "data",
                header: {
                    text: options.headerText
                },
                editor: {
                    type: "text",
                    textReadOnly: true
                },
                renderer: {
                    type: "html",
                    callback: function (grid, cell, w, h) {
                        return `<span class="td-icon">
                                  <button type="button" class="btn btn-s flat solid btn-up">` +
                                  (options.type == 'delete' ? `<i name="up" class="icon-solidIcon-cancel-red">` : 
                                  (options.type == 'view' ?  `<i name="up" class="icon-lineIcon-view-small">` :
                                  (options.type == 'save' ? `<i name="up" class="icon-lineIcon-object-storage">`:
                                  (options.type == 'detail' ? `<i name="up" class="icon-solidIcon-sight">`:
                                  `<i name="up" class="icon-lineIcon-download">`
                                  )))) +
                                `<span class="blind">${options.type}</span></i>
                                  </button>
                                </span>`;
                    }
                },
                editable: false
            }
        },
        createGridFrame(param) {
            const me = this;
            const realgridDomId = param.domId;
            const gridParent = param.gridParent || 'panel';
            const editable = param.editable || false;
            const editEventAdd = param.editEventAdd || false;
            const useDelete = param.useNormalDelete || false;
            const uniqueKeys = param.uniqueKeys;
            const autoLoad = Object.prototype.hasOwnProperty.call(param, 'autoLoad') ? param.autoLoad : true;
            const {view, dataProvider} = window.workplace.realGrid({
                domId: realgridDomId // 'realgrid',
            });
            const rowEditableFunction = param.rowEditableFunction || false;
            const rowEditableFalseCallback = param.rowEditableFalseCallback || false;

            this.dataLoadFunction = param.dataLoadFunction || null;
            this.dataProvider = dataProvider; // new LocalDataProvider(false);
            this.dataProvider.setOptions({
                softDeleting: true,
                deleteCreated: true
            });

            this.gridView = view; // new GridView(realgridDomId);
            this.gridView.setDataSource(this.dataProvider);
            this.gridView.displayOptions.emptyMessage = "No data to display.";
            this.gridView.displayOptions.fitStyle = "evenFill";
            this.gridView.setOptions({
                hideDeletedRows: true,
                stateBar: {visible: editable}
            });

            if (gridParent != 'modal') {
                this.gridView.displayOptions.fitStyle = "even";
            }
            if(param.hideFooters){
                this.gridView.footers.visible = false;
            }

            if (param.checkbar) { // single or multi
                this.gridView.setCheckBar({exclusive: param.checkbar === 'single'});
                this.gridView.checkBar.visible = true;
            } else {
                this.gridView.checkBar.visible = false;
            }

            if (editable) {
                this.gridView.setEditOptions({
                    editable: true,
                    updatable: true,
                    insertable: true,
                    appendable: true
                });

                me.gridView.onCellEdited = function (grid, itemIndex, dataRow, field) {
                    grid.commit();
                };
            }
            if (editEventAdd) {
                // me.gridView.checkBar.visible = true;
                // me.gridView.setCheckBar({exclusive: true});
                me.gridView.onCurrentChanging = function (grid, oldIndex, newIndex) {
                    if (me.dataProvider.getRowState(newIndex.dataRow) !== 'created') {
                        grid.setColumnProperty(uniqueKeys[0], 'editable', false);
                    } else {
                        grid.setColumnProperty(uniqueKeys[0], 'editable', true);
                    }
                };
            }
            if (useDelete){
                this.gridView.onCellClicked = function (grid, clickData) {
                    if (clickData.column == 'DELETE') {
                        if (me.gridView.isItemEditing() || me.gridView.isItemEditing()) {
                            me.toastAlertEditing();
                            return false;
                        }
                        if (me.dataProvider.getRowState(clickData.dataRow) == 'created') {
                            me.dataProvider.removeRow(clickData.dataRow);
                            return;
                        }
                        me.confirm({
                            title: '확인',
                            message: '삭제하시겠습니까?',
                            yesCallback: async function () {
                                me.dataProvider.removeRow(clickData.dataRow);
                            }
                        });
                    }
                }
            }
            if(rowEditableFunction){
                me.gridView.onCurrentRowChanged = function (grid, oldRow, newRow) {
                    if(newRow < 0){
                        grid.setEditOptions({
                            "editable": true
                        });
                        return;
                    }
                    if((oldRow == newRow)){
                        return;
                    }

                    let row = me.dataProvider.getJsonRow(newRow);
                    const rowEditable = rowEditableFunction(row);
                    grid.setEditOptions({
                        "editable": rowEditable
                    });
                    if(!rowEditable && rowEditableFalseCallback){
                        rowEditableFalseCallback(row);
                    }
                }
            }

            if (Object.prototype.hasOwnProperty.call(this, 'addRealGridOption')) {
                this.addRealGridOption();
            }
            if (Object.prototype.hasOwnProperty.call(this, 'realgridCreatedCallback')) {
                this.realgridCreatedCallback();
            }

            if (param.dataLoadFunction && autoLoad) {
                this.loadRealgridAsyncData();
            }
        },
        setFieldsNColumns() {
            if (Object.prototype.hasOwnProperty.call(this, 'rowAttrs')) {
                if (Array.isArray(this.rowAttrs)) {
                    this.fields.push({fieldName: 'ROW_ATTRS', dataType: "object"})
                    this.columns.push({
                        name: 'ROW_ATTRS', fieldName: 'ROW_ATTRS', type: 'data',
                        header: 'ROW_ATTRS', visible: false
                    });
                }
            }
            this.dataProvider.setFields(this.fields);
            for (let i = 0; i < this.columns.length; i++) {
                if (Object.prototype.hasOwnProperty.call(this.columns[i], 'type') && this.columns[i]['type'] == 'staticButton') {
                    this.columns[i] = {
                        ...this.columns[i],
                        'name': this.columns[i]['fieldName'],
                        'type': 'data',
                        'editable': false,
                        'renderer': {
                            'type': 'button'
                        }
                    };
                    this.staticButtonColumnIds.push(i);
                }
            }
            this.gridView.setColumns(this.columns);
            if (Object.prototype.hasOwnProperty.call(this, 'layout') && Array.isArray(this.layout) && this.layout.length > 0) {
                this.gridView.setColumnLayout(this.layout);
            }
        },
        /**
         * realgrid 생성.
         * 컴포넌트 gridView 와 dataProvider 를 생성한다.
         * param: {
         *   realgridDomId: realgrid dom id
         *   gridParent: modal or another
         *   editable: true or false
         * }
         * , ,
         */
        createRealGrid(param) {
            this.createGridFrame(param);
            this.setFieldsNColumns();
        },
        async loadRealgridAsyncData() {
            let fc = this.dataLoadFunction;
            let {data} = await fc.call();
            this.setRealgridData(data || []);
        },
        reloadRealGrid() {
            this.loadRealgridAsyncData();
        },
        /**
         * realgrid 데이터 주입.
         * @param data
         */
        setRealgridData(data) {
            //add static button
            if (this.staticButtonColumnIds.length > 0) {
                for (let i = 0; i < this.staticButtonColumnIds.length; i++)
                    data = this.$addMethodButtonToGridData(data, this.columns[this.staticButtonColumnIds[i]]['buttonLabel'], this.columns[this.staticButtonColumnIds[i]]['fieldName']);
            }
            //add row attributes
            if (Object.prototype.hasOwnProperty.call(this, 'rowAttrs')) {
                if (Array.isArray(this.rowAttrs)) {
                    data = this.$addObjectToGridData(data, this.rowAttrs, 'ROW_ATTRS');
                }
            }
            this.dataProvider.setRows(data);
        },
        /**
         * realgrid excel export
         * @param title
         */
        downloadRealGridExcel(title) {
            let me = this;
            this.gridView.exportGrid({
                type: 'excel',
                target: 'local',
                fileName: (title || me.excelFileName) + '.xlsx',
                showProcess: true,
                progressMessage: 'now downloading....',
                indicator: false,
                header: true,
                footer: false,
                compatibility: 'MS Excel'
            });
        },
        /**
         * 빈 데이터 맨 앞에 추가
         * data 에 emptyRealGridData 가 정의되어 있어야 한다.
         */
        addEmptyData: function () {
            let me = this;
            me.gridView.commit();
            me.dataProvider.insertRow(0,me.emptyRealGridData || {});
            me.gridView.setCurrent({ itemIndex: 0});
            me.gridView.setEditOptions({
                "editable": true
            });
            // me.gridView.checkRow(rowIdx - 1, true, true);
        },
        /**
         * 빈 데이터 맨 뒤에 추가
         * data 에 emptyRealGridData 가 정의되어 있어야 한다.
         */
        addEmptyDataToLast: function () {
            let me = this;
            let rowIdx;
            me.gridView.commit();
            me.dataProvider.addRow(me.emptyRealGridData || {});
            rowIdx = me.gridView.getDataSource().getRowCount();
            me.gridView.setCurrent({
                itemIndex: rowIdx
            });
            me.gridView.checkRow(rowIdx - 1, true, true);
        },
        getCheckedValues: function () {
            let checkedRows = this.gridView.getCheckedRows();
            let retValues = [];
            if (checkedRows.length < 1) {
                return [];
            }
            for (let i = 0; i < checkedRows.length; i++) {
                let row = this.dataProvider.getJsonRow(checkedRows[i]);
                retValues.push(row);
            }
            return retValues;
        }
    }
}
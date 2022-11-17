import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state: {
        selectedPattern: "",
        weekTopic: [],
        focus: new Date(),
        fRows: 30,
        fCols: 30,
        sortByAlgo: 0,
        overviewLevel: 1,
        clickedTableRow: "",
        clickedMatrixCell: "",
        hoveroverValue: "",
        hoverOverPattern: {},
        clickPattern: "",
        compCells: [],
        focusTemporal: 0
    },
    mutations: {
        changeCompCells(state, compCells) {
            var arrTemp = compCells.split(";");
            arrTemp.splice(-1, 1);
            arrTemp = arrTemp.join(";");
            if (state.compCells.length < 2) {
                state.compCells.push(arrTemp);
            } else {
                state.compCells = [arrTemp];
            }
        },
        changeHoverOverValue(state, val) {
            state.hoveroverValue = val;
        },
        changePattern(state, pattern) {
            state.selectedPattern = pattern;
        },
        changeClickPattern(state, pattern) {
            state.clickPattern = pattern;
        },
        changeHoverOverPattern(state, pattern) {
            state.hoverOverPattern = pattern;
        },
        changeSortAlgo(state, sortByAlgo) {
            state.sortByAlgo = sortByAlgo;
        },
        changeFRows(state, fRows) {
            state.fRows = fRows;
        },
        changeFCols(state, fCols) {
            state.fCols = fCols;
        },
        changeFocus(state, focus) {
            state.focus = focus;
        },
        changeWeekTopic(state, topic) {
            state.weekTopic = topic;
        },
        changeOverview(state, level) {
            state.overviewLevel = level;
        },
        clickMatrixCell(state, cell) {
            state.clickedMatrixCell = cell;
        },
        clickTableRow(state, row) {
            state.clickedTableRow = row;
        },
        changeFocusTemporal(state, time) {
            state.focusTemporal = time;
        }
    },
    getters: {
        getCompCells: state => state.compCells,
        getPattern: state => state.selectedPattern.prefix,
        getHoverOverPattern: state => state.hoverOverPattern,
        getHoverOverValue: state => {
            let val = +state.hoveroverValue.split(";")[0];
            return val;
        },
        getClickPattern: state => state.clickPattern,
        getSortAlgo: state => state.sortByAlgo,
        getFCols: state => (state.fCols / 10) | 0,
        getFocusChange: state => state.focus,
        getFRows: state => (state.fRows / 10) | 0,
        getOverview: state => state.overviewLevel,
        getClickedTableRow: state => state.clickedTableRow,
        getClickedMatrixCell: state => state.clickedMatrixCell,
        getFocusTemporal: state => state.focusTemporal
    }
});

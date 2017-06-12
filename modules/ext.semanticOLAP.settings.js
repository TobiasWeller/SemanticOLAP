var propertiesLoaded = false;
var categoriesLoaded = false;
var zNodesCategory = [];
var zNodesProperty = [];
var previousFatherNode = '';
var settingCategory = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        dblClickExpand: false
    },
    callback: {
        onRightClick: onRightClickTree,
        onDrop: myOnDrop,
        beforeDrop: myBeforeDrop
    }
};

var settingProperty = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        dblClickExpand: false
    }
    ,
    callback: {
        onRightClick: onRightClickTree,
        onDrop: myOnDrop,
        beforeDrop: myBeforeDrop
    }
};
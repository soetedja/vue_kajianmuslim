(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.populateTreeSelect = function (listItem, grpName = 'All') {
        var options = []
        var groups = []
        for (var i = 0; i < listItem.length; i++) {
            var groupName = listItem[i].group_name === undefined ? grpName : listItem[i].group_name
            if (!groups[groupName]) {
            groups[groupName] = []
            }
            var endLabel = groupName === grpName ? '' : ' - ' + groupName
            groups[groupName].push({
              id: listItem[i].id,
              label: listItem[i].name + endLabel
            })
        }
        options = []
        for (var groupName2 in groups) {
            options.push({
            id: groupName2,
            label: groupName2,
            children: groups[groupName2]
            })
        }
        return options
    }

    $.fn.populateSelectedOption = function (selectedOptions, allOptions) {
        if (!selectedOptions) return
        var result = []
        selectedOptions.forEach(function(item, key) {
            if (isNaN(item)) {
            var children = allOptions.find(x => x.id === item).children
            for (var idx in children) {
                result.push(children[idx].id)
            }
            } else {
                result.push(item)
            }
        })
        return result
    }

    $.fn.loadTreeOption = function(privs, allPrivileges) {
        if (!allPrivileges) return privs
        allPrivileges.forEach(function(item, key) {
            var isAll = true
            var idc = []
            item.children.forEach(function(citem, ckey) {
            if (privs && privs.indexOf(citem.id) === -1) {
                isAll = false
            } else {
                idc.push(citem.id)
            }
            })
            if (isAll && privs) {
                privs.push(item.id)
                idc.map(function(c) {
                    var idxc = privs.indexOf(c)
                    privs.splice(idxc, 1)
                })
            }
        })
        return privs
    }
})(jQuery);
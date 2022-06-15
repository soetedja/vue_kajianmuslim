;(function($) {
  'use strict'
  $.fn.addMarker = function(listItem, grpName = 'All') {
    var options = []
    var groups = []
    for (var i = 0; i < listItem.length; i++) {
      var groupName =
        listItem[i].group_name === undefined ? grpName : listItem[i].group_name
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
})(jQuery)

;(function($) {
  'use strict'
  // First, checks if it isn't implemented yet.
  if (!String.prototype.format) {
    String.prototype.format = function($args) {
        var args = $args ? $args : arguments
        var offset = 0
        if ($args) {
            args = $args
            offset = 1
        }
        return this.replace(/{(\d+)}/g, function(match, number) {
            var idx = parseInt(number) + offset
            return typeof args[idx] !== 'undefined' ? args[idx] : match
        })
    }
  }
})(jQuery)

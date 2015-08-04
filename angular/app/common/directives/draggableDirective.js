(function() {
	'use strict';
	
	angular
		.module('app')
		.directive('draggable', draggable);
		
	draggable.$inject = ['$document'];
	
	function draggable($document) {
		var directive = {
			link: link,
			restrict: 'A'
		};
		
		function link(scope, element, attrs) {
			var startX = 0,
				startY = 0,
				x = 0, 
				y = 0;
				
			element.css({
				position: 'relative',
				cursor: 'pointer'
			});
			
			function mousemove(event) {
				y = event.screenY - startY;
				x = event.screenX - startX;
				
				element.css({
					top: y + 'px', 
					left: x + 'px'
				});
			}
			
			function mouseup(event) {
				$document.off('mousemove', mousemove);
				$document.off('mouseup', mouseup);
			}
			
			element.on('mousedown', function(event) {
				event.preventDefault();
				startX = event.screenX - x;
				startY = event.screenY - y;
				
				$document.on('mousemove', mousemove);
				$document.on('mouseup', mouseup);
			});
		}
		
		return directive;
	}
})();
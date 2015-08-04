(function(){
	'use strict';
	angular.module('app')
		.controller('mainController', [
			'$scope',
			'productService',
			mainController
		]);
		
	function mainController($scope, $pservice) {
		var vm = this;
		$scope.title = "This is some title";
	};
})();



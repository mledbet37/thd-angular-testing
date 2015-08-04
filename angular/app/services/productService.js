(function() {
	'use strict';
	angular
		.module('app')
		.service('productService', productService);
		
	productService.$inject = [ '$http' ];
	
	function productService($http) {
		// enclose our get methods in a closure;
		 var productRepo = (function() {
			 var repo = {
				getProducts: getProductData 
			 };
			 
			 function getProductData() {
				 return $http.get('getProductData')
				 	.then(function(response) {
						 return response.data;
					 });
			 }
			 
			 return repo;
		 })();		
		
		
		// define the data we'll expose.
		var pdata = {
			products: productRepo	// .getProducts();
		};
		return pdata;
	}
})();
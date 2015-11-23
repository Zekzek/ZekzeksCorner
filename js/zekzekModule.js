var zekzekApp = angular.module('zekzekApp', []);

zekzekApp.controller('zekzekCtrl', function($scope, $http) {

	$scope.page = {};
	$scope.page.viewPage = {};
	
	$scope.getPageList = function() {
		$http.get('json/pageList.json')
       .then(function(result){
			$scope.pageList = result.data.pages;
			for (var i in $scope.pageList) {
				if($scope.pageList[i].value) {
					$scope.getPage($scope.pageList[i].value);
					$scope.pageList[i].json = $scope[$scope.pageList[i].value];
				}
			}
        });
	}
	
	$scope.getPage = function(pageValue) {
		$http.get('json/' + pageValue + '.json')
       .then(function(result){
          $scope[pageValue] = result.data;
		  $scope.linkJsonToPageList(result.data, pageValue);
        });
	}
	
	$scope.getResume = function() {
		$http.get('json/resume.json')
       .then(function(result){
          $scope.resume = result.data;
		  $scope.linkJsonToPageList(result.data, 'resume');
        });
	}
	
	$scope.getFromSpace = function() {
		$http.get('json/fromSpace.json')
       .then(function(result){
          $scope.fromSpace = result.data;
		  $scope.linkJsonToPageList(result.data, 'fromSpace');
        });
	}
	
	$scope.getSchmesh = function() {
		$http.get('json/schmesh.json')
       .then(function(result){
          $scope.schmesh = result.data;
		  $scope.linkJsonToPageList(result.data, 'schmesh');
        });
	}
	
	$scope.linkJsonToPageList = function(json, pageValue) {
		if ($scope.pageList) {
			for (var i in $scope.pageList) {
				if ($scope.pageList[i].value == pageValue) {
					$scope.pageList[i].json = json;
					return;
				}
			}
		}
	}
	
	$scope.linkTo = function(pageValue, link) {
		if(pageValue) {
			$scope.goToPage(pageValue);
		}
		else if (link) {
			window.location.href = link;
		}
	}
	
	$scope.goToPage = function(pageValue) {
		console.debug("goToPage(" + pageValue + ")");
		for (var i in $scope.pageList) {
			if ($scope.pageList[i].value == pageValue) {
				$scope.page.viewPage = $scope.pageList[i];
				scroll(0,0);
				console.debug("$scope.page.viewPage = " + $scope.pageList[i].value);
				return;
			}
		}
	}
	
	$scope.initPage = function() {
		console.debug("$scope.pageList");
		console.debug($scope.pageList);
		if ($scope.pageList) {
			console.debug("$scope[$scope.pageList[0].value]");
			console.debug($scope[$scope.pageList[0].value]);
			if ($scope[$scope.pageList[0].value]) {
				console.debug("$scope[$scope.pageList[0].value].json");
				console.debug($scope[$scope.pageList[0].value].json);
			}
		}
		if ($scope.pageList && $scope[$scope.pageList[0].value]) {
			$scope.goToPage('' + $scope.pageList[0].value);
		}
		else {
			setTimeout(function(){
				$scope.initPage();
				$scope.$apply();
			}, 100);
		}
	}
	
	$scope.getPageList();
	$scope.initPage();
	
	setInterval(function() {
		console.debug($scope.page.viewPage);
	}, 1000);
  });
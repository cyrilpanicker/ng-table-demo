angular.module('app',['ngTable'])
.controller('MainController',function($scope,$http,NgTableParams){

    $scope.usersTable = new NgTableParams({
        page: 1,
        count: 50,
        pagerSeriesCount: 1,
        sortable: false,
        blockCaching: true,
        paginate: false,
        groupBy: null,
        serverSideGrouping: false,
        test:'test'
    }, {
        getServerData: getUsers,
        getData: getUsers,
        getCachedData:getUsers
    });

    console.log($scope.usersTable);

    // function getUsers($defer,params){
    //     $http({method:'GET',url:'/users.json'}).then(function(response){
    //         $defer.resolve(response.data,params);
    //     });
    // }

    function getUsers(params){
        return $http({method:'GET',url:'/users.json'}).then(function(response){
            params.total(response.data.total);
            return response.data.results;
        });
    }

});

// function getCachedAssignedJobs($defer, params) {
//     $scope.jobQueueModel.isUpdating = true;
//     if ($scope.jobQueueApiResponse.resultSet && $scope.jobQueueApiResponse.resultSet.length) {
//         $defer.resolve($scope.jobQueueApiResponse);
//         $scope.jobQueueModel.isUpdating = false;
//     } else {
//         getAssignedJobs($defer, params);
//     }
// }

// function getAssignedJobs($defer, params) {
//     $scope.jobQueueModel.isUpdating = true;
//     var statusKey = $scope.jobQueueModel.selectedStatus ? $scope.jobQueueModel.selectedStatus.statusKey : null;
//     myJobsFactory.getAssignedJobs({
//         startPage: params.pagerData.startPage,
//         endPage: params.pagerData.endPage,
//         pageSize: $scope.config.assignedJobsPageSize,
//         statusKey: statusKey
//     }).then(function (data) {
//         $scope.jobQueueModel.isUpdating = false;
//         if (!data) {
//             //TODO : go to error page
//         } else if (!data.requests.length && !data.statuses.length) {
//             //status is checked above since there could be requests existing for other statuses
//             $state.go($scope.config.states.TABS_WITH_NO_JOBS_ASSIGNED); //show Start button (StartJob.html)
//         } else {
//             $scope.jobQueueModel.statuses = data.statuses;
//             $scope.jobQueueApiResponse.resultSet = data.requests;
//             $scope.jobQueueApiResponse.totalItems = data.totalRowCount;
//             $defer.resolve($scope.jobQueueApiResponse);
//             $scope.jobQueueModel.isUpdating = false;
//         }
//     });
// }
angular.module('music4BizApp')
    .controller('playerHelpCtrl', function ($scope, $sce, playerHelpService) {

        $scope.playerHelp = {};
        var myCustomTemplates = {
            textAlign: function(context) {
                return "<li><div class='btn-group'>" +
                    "<a class='btn btn-default' data-wysihtml5-command='justifyLeft' data-wysihtml5-command-value='&justifyLeft;' title= 'Align text left'>" +
                    "<span class='glyphicon glyphicon-align-left'></span></a>" +
                    "<a class='btn btn-default' data-wysihtml5-command='justifyCenter' data-wysihtml5-command-value='&justifyCenter;' title= 'Align text center'>" +
                    "<span class='glyphicon glyphicon-align-center'></span></a>" +
                    "<a class='btn btn-default' data-wysihtml5-command='justifyRight' data-wysihtml5-command-value='&justifyRight;' title= 'Align text right'>" +
                    "<span class='glyphicon glyphicon-align-right'></span></a>" +
                    "</li>";
            }
        };
        $scope.getPlayerHelp = function () {
            playerHelpService.getPlayerHelp().then(function (data) {
                $scope.playerHelp = data;
                //$scope.playerHelp.Text = $sce.trustAsHtml($scope.playerHelp.Text);
                $('#helpText').html($scope.playerHelp.Text);
                $('#helpText').wysihtml5({
                   "toolbar": {     
                        "font-styles": true, //Font styling, e.g. h1, h2, etc. Default true
                        "emphasis": true, //Italics, bold, etc. Default true
                        "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
                        "html": false, //Button which allows you to edit the generated HTML. Default false
                        "link": false, //Button to insert a link. Default true
                        "image": false, //Button to insert an image. Default true,
                        "color": true, //Button to change color of font  
                        "blockquote": false, //Blockquote  
                        "textAlign": true
                    },
                    customTemplates: myCustomTemplates,
                    stylesheets: ["Content/wysiwyg-color.css", "Content/main.css", "Content/bootstrap3-wysihtml5.css"]
                });


            });
        }


        $scope.savePlayerHelp = function () {
            $scope.playerHelp.Text = $('#helpText').val();
            playerHelpService.savePlayerHelp($scope.playerHelp);

        }

        $scope.$on('getCookieMessage', function () {
            getCookieMessages();
        });








        $scope.getPlayerHelp();
    });
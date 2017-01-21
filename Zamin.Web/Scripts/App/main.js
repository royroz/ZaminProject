angular.module('music4BizApp', ['ui.bootstrap', 'ui.sortable']);


function showLoader() {
    $('#loader').show();
}

function hideLoader() {
    $('#loader').hide();
}


$('.timepicker').timepicker(
    //{
    //    minuteStep: 1,
    //    template: 'modal',
    //    appendWidgetTo: 'body',
    //    showSeconds: true,
    //    showMeridian: false,
    //    defaultTime: false
    //}
);
$('.datepicker').datepicker({
    autoclose: true
});


$('.datepicker').on('changeDate', function (ev) {
    $(this).datepicker('hide');
});
$('.monthPicker').datepicker({
    autoclose: true,
   format: "mm/yyyy",
    viewMode: "months", 
    minViewMode: "months",
    startView: "months"
});
$('.monthPicker').on('changeDate', function (ev) {
    $(this).datepicker('hide');
});
var VAT = 1.17;
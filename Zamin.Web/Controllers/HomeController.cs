using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Amazon.AWSSupport.Model;
using MailChimp.Types;
using Microsoft.Ajax.Utilities;
using Music4Biz.Consts;
using Music4Biz.Enums;
using Music4Biz.Models;
using Music4Biz.SalesForceDal;
using Music4Biz.Web.Attributes;
using Music4Biz.WebModels;
using Muzisc4Biz.Helpers;
using Muzisc4Biz.Models;
using Muzisc4Biz.Models.SalesForce;
using Muzisc4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    [Administrator]
    public class HomeController : BaseController
    {

        public ActionResult Index()
        {
            return View();
        }

        //---------------------------General Functions----------------------------------------------------------------

        //public ActionResult UpdateHomePageCharts()
        //{
        //    UpdatePlayListChartData();
        //   // UpdateLicenseChartData();
        //    //TODO add other charts update
        //    return RedirectToAction("Index");
        //}

        public JsonResult GetInitData()
        {
            //var trialUsersNum = UOW.ChartRepository.GetTrialUsersNum();
            //var activeClientsNum = UOW.ChartRepository.GetActiveClientNum();
            var year = DateTime.Now.Year;
            var fromDate = "01/" + year;
            var toDate = "12/" + year;
            var activeLicensesNum = UOW.ChartRepository.GetActiveLicensesNum();
            var trialLicensesNum = UOW.ChartRepository.GetTrialLicensesNum();
            var json = new JsonResult()
            {
                Data = new
                {
                    trialLicensesNum,
                    activeLicensesNum,
                    fromDate,
                    toDate
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return json;
        }


        //-------------------------SongsByPublisher Chart Functions---------------------------------------------------

        public JsonResult GetPublishersBySongsChartData()
        {
            var publishers = UOW.PublisherRepository.GetAllPublishers();
            var songsWithoutPublisher = UOW.SongRepository.GetSongsWithoutPublisherCount();
            var jsonData = publishers.Select(AutoMapper.Mapper.Map<Publisher, SongsByPublisherChartWebModel>).ToList();
            jsonData.Add(new SongsByPublisherChartWebModel()
            {
                data = songsWithoutPublisher,
                label = "No Publisher"
            });
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }
        public ActionResult PrintSongsByPublisherChart()
        {
            var songsByPublisherList = UOW.ChartRepository.GetSongsByPublisher();
            return View(songsByPublisherList);
        }

        [HttpPost]
        public JsonResult MailSongsByPublisherChart(string emailAddress)
        {
            var file = GetSongsByPublisherCsvByteArr();
            var fileContent = Convert.ToBase64String(file);

            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.SongsByPublishers, Resources.Charts.SongsByPublisherFileName);
            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }

        public FileResult ExcelSongsByPublisherChart()
        {
            var fileName = Resources.Charts.SongsByPublisherFileName;
            var result = GetSongsByPublisherCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        private Byte[] GetSongsByPublisherCsvByteArr()
        {
            var csvWebModelList = UOW.ChartRepository.GetSongsByPublisher();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.SongsByPublisher);
            return result;
        }



        //-------------------------SongsByPerformer Chart Functions---------------------------------------------------

        public FileResult ExcelSongsByPerformersChart()
        {
            var fileName = Resources.Charts.SongsByPerformerFileName;
            var result = GetSongsByPerformersCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        [HttpPost]
        public JsonResult MailSongsByPerformersChart(string emailAddress)
        {
            var file = GetSongsByPerformersCsvByteArr();
            var fileContent = Convert.ToBase64String(file);

            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.SongsByPerformers, Resources.Charts.SongsByPerformerFileName);
            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }

        private Byte[] GetSongsByPerformersCsvByteArr()
        {
            var csvWebModelList = UOW.ChartRepository.GetSongsByPerformers();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.SongsByPerformers);
            return result;
        }

        //-------------------------PlayList Chart Functions---------------------------------------------------

        //public JsonResult UpdatePlayListChartData()
        //{
        //    var success = UOW.ChartRepository.UpdatePlayListChartData();
        //    return Json(success, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetPlayListChartData()
        {
            var json = UOW.ChartRepository.GetPlayListChartData();
            return json;
        }

        public JsonResult MailPlayListsChart(string emailAddress)
        {
            var file = GetRecomendationsCsvByteArr();
            var fileContent = Convert.ToBase64String(file);
            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.PlayListsCsv, Resources.Charts.PlayListFileName);

            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }


        public FileResult ExcelPlayListsChart()
        {
            var fileName = Resources.Charts.PlayListFileName;
            var result = GetRecomendationsCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        public ActionResult PrintPlayListsChart()
        {
            var playLists = UOW.ChartRepository.GetRecommendationsExcelData();
            var csvWebModelList = playLists.Select(AutoMapper.Mapper.Map<Recommendation, CsvWebModel>).ToList();

            var completedCsvWemModel = UOW.ChartRepository.AddRecommendationAttrToModel(csvWebModelList);

            return View(completedCsvWemModel);
        }

        private Byte[] GetRecomendationsCsvByteArr()
        {
            var recommendations = UOW.ChartRepository.GetRecommendationsExcelData();
            var csvWebModelList = recommendations.Select(AutoMapper.Mapper.Map<Recommendation, CsvWebModel>).ToList();
            var completedCsvWemModel = UOW.ChartRepository.AddRecommendationAttrToModel(csvWebModelList);

            var result = UOW.ChartRepository.ExportToExcel(completedCsvWemModel, ChartTypeEnum.PlayLists);
            return result;
        }

        //-------------------------Licenses Chart Functions---------------------------------------------------
        public JsonResult GetLicenseChartData()
        {
            var json = UOW.ChartRepository.GetLicenseChartData();
            return json;
        }

        //public JsonResult UpdateLicenseChartData()
        //{
        //    var success = UOW.ChartRepository.UpdateLicenseChartData();
        //    return Json(success, JsonRequestBehavior.AllowGet);
        //}

        public FileResult ExcelLicensesChart()
        {
            var fileName = Resources.Charts.LicensesFileName;
            var result = GetLicensesCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        [HttpPost]
        public JsonResult MailLicensesChart(string emailAddress)
        {
            var file = GetLicensesCsvByteArr();
            var fileContent = Convert.ToBase64String(file);
            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.LicensesCsv, Resources.Charts.LicensesFileName);

            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);

        }


        public ActionResult PrintLicensesChart()
        {
            //  var dal = new SalesForceData();
            //  var client = dal.Authenticate();
            //if (!client.IsAuthenticated) return null;

            var licenses = UOW.LicenceRepository.GetLicenses();

            var csvWebModelList = licenses.Select(AutoMapper.Mapper.Map<License, CsvWebModel>).ToList();

            return View(csvWebModelList);
        }

        private Byte[] GetLicensesCsvByteArr()
        {
            // var dal = new SalesForceData();
            // var client = dal.Authenticate();
            //if (!client.IsAuthenticated) return null;

            var licenses = UOW.LicenceRepository.GetLicenses();
            var csvWebModelList = licenses.Select(AutoMapper.Mapper.Map<License, CsvWebModel>).ToList();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.Licenses);

            return result;
        }

        //Active License Count
        public FileResult ExcelActiveLicensesCount()
        {
            var fileName = Resources.Charts.ActiveLicensesExcelFileName;
            var result = GetActiveLicensesCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        public ActionResult PrintActiveLicensesCount()
        {
            //var dal = new SalesForceData();
            //var client = dal.Authenticate();
            //if (!client.IsAuthenticated) return null;

            var licenses = UOW.LicenceRepository.GetActiveLicenses();

            var csvWebModelList = licenses.Select(AutoMapper.Mapper.Map<License, CsvWebModel>).ToList();

            return View("PrintLicensesChart", csvWebModelList);
        }
        public JsonResult MailActiveLicensesCount(string emailAddress)
        {
            var file = GetActiveLicensesCsvByteArr();
            var fileContent = Convert.ToBase64String(file);
            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.ActiveLicenses, Resources.Charts.LicensesFileName);

            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }

        private byte[] GetActiveLicensesCsvByteArr()
        {
            //var dal = new SalesForceData();
            //var client = dal.Authenticate();
            //if (!client.IsAuthenticated) return null;

            var activeLicenses = UOW.LicenceRepository.GetActiveLicenses();
            var csvWebModelList = activeLicenses.Select(AutoMapper.Mapper.Map<License, CsvWebModel>).ToList();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.Licenses);

            return result;
        }

        //Trial licenses
        public FileResult ExcelTrialLicenses()
        {
            var fileName = Resources.Charts.TrialLicensesExcelFileName;
            var result = GetTrialLicensesCsvByteArr();
            return File(result, "text/csv", fileName);
        }

        public JsonResult MailTrialLicenses(string emailAddress)
        {
            var file = GetTrialLicensesCsvByteArr();
            var fileContent = Convert.ToBase64String(file);
            var success = UOW.EmailRepository.SendCsvMail(emailAddress, fileContent, MandrilTemlatesNames.TrialLicenses, Resources.Charts.LicensesFileName);

            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }
        public ActionResult PrintTrialLicenses()
        {
            var dal = new SalesForceData();
            var client = dal.Authenticate();
            if (!client.IsAuthenticated) return null;

            var licenses = dal.GetSalesForceLicensesWithPackagesAndAccount(client).Where(l => l.SalesForcePackage.IsTestPackage && l.Expiration >= DateTime.Now.Date);

            var csvWebModelList = licenses.Select(AutoMapper.Mapper.Map<SalesForceLicense, CsvWebModel>).ToList();

            return View("PrintLicensesChart", csvWebModelList);
        }

        private byte[] GetTrialLicensesCsvByteArr()
        {
            var dal = new SalesForceData();
            var client = dal.Authenticate();
            if (!client.IsAuthenticated) return null;

            var licenses = dal.GetSalesForceLicensesWithPackagesAndAccount(client);
            var activeLicenses = licenses.Where(l => l.SalesForcePackage.IsTestPackage && l.Expiration >= DateTime.Now.Date);
            var csvWebModelList = activeLicenses.Select(AutoMapper.Mapper.Map<SalesForceLicense, CsvWebModel>).ToList();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.Licenses);

            return result;
        }

        //----------------------------------Incomes chart----------------------------------------------------------

        public JsonResult GetIncomeChartData(string fromDate, string toDate)
        {
            DateTime from = DateTime.Now;
            DateTime to = DateTime.Now;

            var success = DateTime.TryParse(fromDate, out from);
            if (success) success = DateTime.TryParse(toDate, out to);
            if (!success) return Json(false, JsonRequestBehavior.AllowGet);
            to = to.AddMonths(1);
            var payments = UOW.ChartRepository.GetIncomeChartData(from, to);
            return Json(payments, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MailIncomes(string emailAddress, string fromDate, string toDate)
        {
            DateTime from = DateTime.Now;
            DateTime to = DateTime.Now;

            var success = DateTime.TryParse(fromDate, out from);
            if (success) success = DateTime.TryParse(toDate, out to);
            if (!success) return null;
            to = to.AddMonths(1);

            var file = GetIncomesCsvByteArr(from, to);
            var fileContent = Convert.ToBase64String(file);
            success = UOW.EmailRepository.SendCsvIncomesMail(emailAddress, fromDate, toDate, fileContent, MandrilTemlatesNames.Incomes, Resources.Charts.TotalIncomesFileName);

            if (!success)
            {
                SetErrorMessage(Resources.Charts.FailedSendingMail);
                return Json(false);
            }

            SetSuccessMessage(Resources.Charts.SuccessSendingMail);
            return Json(true);
        }

        public ActionResult PrintIncomes(string fromDate, string toDate)
        {
            DateTime from = DateTime.Now;
            DateTime to = DateTime.Now;

            var success = DateTime.TryParse(fromDate, out from);
            if (success) success = DateTime.TryParse(toDate, out to);
            if (!success) return null;
            to = to.AddMonths(1);
            var incomes = UOW.ChartRepository.GetIncomesCsv(from, to);
            ViewBag.fromDate = fromDate;
            ViewBag.toDate = toDate;
            return View(incomes);
        }

        public FileResult ExcelIncomes(string fromDate, string toDate)
        {
            DateTime from = DateTime.Now;
            DateTime to = DateTime.Now;
            var success = DateTime.TryParse(fromDate, out from);
            if (success) success = DateTime.TryParse(toDate, out to);
            if (!success) return null;

            var fileName = Resources.Charts.TotalIncomesFileName;
            var result = GetIncomesCsvByteArr(from , to);
            return File(result, "text/csv", fileName);

        }

        private byte[] GetIncomesCsvByteArr(DateTime from, DateTime to)
        {
            var incomes = UOW.ChartRepository.GetIncomeChartData(from, to);
            var csvWebModelList = incomes.Select(AutoMapper.Mapper.Map<IncomesChart, CsvWebModel>).ToList();
            var result = UOW.ChartRepository.ExportToExcel(csvWebModelList, ChartTypeEnum.Incomes);

            return result;
        }
      



        public string SF()
        {
            var dal = new SalesForceData();
            var client = dal.Authenticate();
            var result = "can't authenticate";
            if (!client.IsAuthenticated) return result;
            try
            {
                var records = dal.GetSalesForceLicenses(client);
                var packages = dal.GetSalesForcePackages(client);
                var account = dal.GetSalesForceAccounts(client);

                var sb = new StringBuilder();
                foreach (var record in records)
                {
                    sb.AppendLine(record.ToString());
                }
                result = sb.ToString();
            }
            catch (Exception e)
            {
                result = e.ToString();
            }

            return result;
        }

    }
}
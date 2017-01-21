using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Music4Biz.Consts;
using Muzisc4Biz.Enums;
using Muzisc4Biz.Models;
using Muzisc4Biz.WebModels.WebSite;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    public class CmsController : BaseController
    {
        [HttpGet]
        public ActionResult Pdf()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Pdf(HttpPostedFileBase eula, HttpPostedFileBase faq, HttpPostedFileBase instructions)
        {

            HandleFile(eula, PdfType.Eula);
            HandleFile(faq, PdfType.Faq);
            HandleFile(instructions, PdfType.Instructions);

            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        public ActionResult PortfolioItems()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetPortfolios()
        {
            var portfolios = UOW.WebsiteRepository.GetAllActivePortfolios().ToList();
            var webModels = portfolios.Select(AutoMapper.Mapper.Map<PortfolioItem, PortfolioItemWebModel>);
            return Json(webModels, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SavePortfolio(PortfolioItemWebModel portfolioItem)
        {
            var success = false;
            if (portfolioItem.ImageFile != null)
            {
                var fileName = portfolioItem.ImageFile.FileName;
                var directory = Consts.CmsConsts.PortfolioAbsolutPath;
                if (System.IO.File.Exists(directory + fileName))
                {
                    var fileNameWithoutExt = Path.GetFileNameWithoutExtension(fileName);
                    var fileExt = Path.GetExtension(fileName);
                    fileName = fileNameWithoutExt + Guid.NewGuid().ToString() + fileExt;
                }
                portfolioItem.ImageFile.SaveAs(directory + fileName);
                portfolioItem.image = fileName;
            }
            else
            {
                portfolioItem.image = null;
            }
            success = UOW.WebsiteRepository.SavePortfolio(portfolioItem);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
            return Json(success);

        }

        public void RemovePortfolio(int itemId)
        {
            var success = UOW.WebsiteRepository.RemovePortfolioItem(itemId);
            if (success) SetSuccessMessage();
            else SetErrorMessage();
        }

        public void SavePortfolioItemsOrder(List<PortfolioItemWebModel> portfolioItems)
        {
            var success = UOW.WebsiteRepository.SavePortfolioItemsOrder(portfolioItems);
            if (success)
            {
                SetSuccessMessage();
            }
            else
            {
                SetErrorMessage();
            }

        }

        private void HandleFile(HttpPostedFileBase file, PdfType pdfType)
        {
            if (file == null || file.ContentLength <= 0) return;
            var fileName = string.Format("{0}\\{1}.pdf", CmsConsts.PdfPath, pdfType.ToString());

            if (System.IO.File.Exists(fileName))
            {
                try
                {
                    System.IO.File.Delete(fileName);
                }
                catch (IOException)
                {
                    return;
                }
            }

            file.SaveAs(fileName);
        }

        
    }
}
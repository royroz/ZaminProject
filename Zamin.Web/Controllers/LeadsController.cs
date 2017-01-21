using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Muzisc4Biz.Models;
using Muzisc4Biz.WebModels;

namespace Music4Biz.Web.Controllers
{
    [Authorize]
    public class LeadsController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetData()
        {
            var leads = UOW.LeadRepository.GetLeads();
            var data = leads.Select(AutoMapper.Mapper.Map<Lead, LeadWebModel>).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeStarStatus(int leadId)
        {
            var lead = UOW.LeadRepository.GetLead(leadId);
            if (lead == null)
            {
                return Json(false);
            }
            lead.IsStared = !lead.IsStared;
            var status = UOW.Save();
            return Json(status.Success);
        }


        [HttpPost]
        public JsonResult MarkAsRead(int leadId)
        {
            var lead = UOW.LeadRepository.GetLead(leadId);
            if (lead == null)
            {
                return Json(false);
            }
            lead.IsRead = true;
            var status = UOW.Save();
            return Json(status.Success);
        }


    }
}
using System;
using System.Web.Mvc;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method,
                AllowMultiple = true, Inherited = true)]
public class EnableCorsAttribute : FilterAttribute, IActionFilter
{
    private const string IncomingOriginHeader = "Origin";
    private const string OutgoingOriginHeader = "Access-Control-Allow-Origin";
    private const string OutgoingMethodsHeader = "Access-Control-Allow-Methods";
    private const string OutgoingAgeHeader = "Access-Control-Max-Age";

    public void OnActionExecuted(ActionExecutedContext filterContext)
    {
        // Do nothing
    }

    public void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var isLocal = filterContext.HttpContext.Request.IsLocal;
        var originHeader =
             filterContext.HttpContext.Request.Headers.Get(IncomingOriginHeader);
        var response = filterContext.HttpContext.Response;

        if (!String.IsNullOrWhiteSpace(originHeader) &&
            (isLocal || IsAllowedOrigin(originHeader)))
        {
            response.AddHeader(OutgoingOriginHeader, originHeader);
            response.AddHeader(OutgoingMethodsHeader, "GET,POST,OPTIONS");
            response.AddHeader(OutgoingAgeHeader, "3600");
        }
    }

    protected bool IsAllowedOrigin(string origin)
    {
        return origin.Contains("music4.biz");
    }
}
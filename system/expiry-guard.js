

(() => {
  function parseYMD(str) {
    const s = String(str || "").trim();
    const m = s.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/);
    if (!m) return null;

    const y = +m[1], mo = +m[2], d = +m[3];
    const dt = new Date(y, mo - 1, d);

    // validate real date (prevents 2026/02/31 etc.)
    if (dt.getFullYear() !== y || dt.getMonth() !== (mo - 1) || dt.getDate() !== d) return null;
    return dt;
  }

  function isExpired(expiryStr) {
    const exp = parseYMD(expiryStr);
    if (!exp) return false;

    // date-only compare; valid THROUGH the expiry date (inclusive)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const expiry = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
    return today > expiry; // expired if today is after expiry date
  }

  function showExpiredScreen() {
    document.body.innerHTML = `
 

<html lang="ar" dir="rtl">
    <head>
        <title>إصدار شهادة صحية</title>
        <link rel="icon" type="image/x-icon" href="https://apps.balady.gov.sa/BALADYCDN/Content/images/fav.ico">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, viewport-fit=cover">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="content">
        <meta name="author" content="content">
        <meta name="robots" content="noindex">
        <link rel="icon" type="image/png" sizes="16x16" href="https://apps.balady.gov.sa/BALADYCDN/Content/images/fav.png">
        <link rel="icon" type="image/x-icon" href="https://apps.balady.gov.sa/BALADYCDN/Content/images/fav.ico">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/icons/fontawesome5/css/all.css" rel="stylesheet" type="text/css">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/plugins/select2/css/select2.min.css" rel="stylesheet">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/css/app.min.css" rel="stylesheet" type="text/css">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/unified_identity_assets/css/app.min.css" rel="stylesheet" type="text/css">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/HijriDatePicker/jquery.calendars.picker.css" rel="stylesheet">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/Validation.css" rel="stylesheet">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/plugins/DataTables/jquery.dataTables.min.css" rel="stylesheet">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/plugins/DataTables/Style.css" rel="stylesheet">
        <link href="https://apps.balady.gov.sa/BALADYCDN/Content/style.css?v=1" rel="stylesheet" type="text/css">
     
       
      

<body>

  <!-- Header -->
  <div class="site-header-cont">
    <header class="site-header inner-header-login">
      <div class="container-fluid">
        <nav class="navbar navbar-expand-lg">
          <a class="navbar-brand" href="https://balady.gov.sa/ar" target="_blank" rel="noopener">
        
          </a>

          <!-- Optional (simple) menu structure, same classes -->
          <div class="mainHeader w-100">
            <div class="container-fluid">
              <div class="row">
                <div class="col d-flex columns">
                  <div class="region region--header">
                    <div id="block-sitebranding" class="clearfix site-branding block block-system block-system-branding-block">
                      <a href="https://balady.gov.sa/ar" rel="home" class="site-branding__logo" target="_blank" rel="noopener">
                        <img src="https://balady.gov.sa/themes/custom/balady_new/logo.svg" alt="الرئيسية" />
                      </a>
                    </div>
                  </div>

                  <nav class="navbar navbar-expand-lg position-static header-mobile-container">
                    <button class="navbar-toggler" type="button"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 30 30" width="30px" height="30px">
                        <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z
                                 M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z
                                 M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
                      </svg>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <div class="region region--header-content">
                        <nav aria-labelledby="block-balady-main-menu-menu" id="block-balady-main-menu" class="block block-menu navigation menu--main">
                          <h2 class="visually-hidden block-title" id="block-balady-main-menu-menu">القائمة الرئيسية</h2>
                          <div class="block-content">
                            <ul class="menu" aria-hidden="false">
                              <li class="menu-item menu-item--expanded dropdown menu-item-first menu-level-0 menu-count-1" aria-hidden="false">
                          
                          
                          
      </div>
      <span class="clr"></span>
    </header>
  </div>



              <div class="row">
                <div class="col-12">
                  <div class="sub-heading"></div>
          
          <div class="form-steps-cont-new"></div>
                </div>
                
                  </div>
                                    <div class="col-md-12">
                                        <div class="alert alert-info mb-4">
                                            <p class="m-0">
                                                <span>
                                                    تنبية تجديد الرخصة قبل انتهاء موعدها                            <br/>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
            </div>
            <section class="page-container">
                <div class="section pt-0 mt-1 mt-md-4">
                    <div class="container p-0">
                        <div class="card p-lg-4">
                            <div class="alert alert-danger">
                                &bull;الشهادة الصحية غير سارية<BR>
                                &bull;الرقم المرجعي للخطأ: <B>B1768567791941 </B>
                            </div>
                        </div>
                    </div>
                </div>
  


    `;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const fld = document.getElementById("fldGregExpiry");
    const expiryVal = fld ? fld.value : "";
    if (isExpired(expiryVal)) showExpiredScreen();
  });
})();





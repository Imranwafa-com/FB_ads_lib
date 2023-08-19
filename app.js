$(document).ready(function() {

  const version = "0.9";

  function getSessionId(){
    let regText = /"sessionId":"(\w+-\w+-\w+-\w+-\w+)"/;
    let matchReg = regText.exec(document.documentElement.innerHTML);
    let sessionId = matchReg[1];

    return sessionId;
  }

  function getPageId(){
    let regText = /view_all_page_id=(\d+)/;
    let matchReg = regText.exec(document.documentElement.innerHTML);
    let pageId = matchReg[1];

    return pageId;
  }

  function getAccountId(){
    let regText = /"ACCOUNT_ID":"(\d+)"/;
    let matchReg = regText.exec(document.documentElement.innerHTML);
    let accountId = matchReg[1];

    return accountId;
  }

  function getTokens(){
    const textBodyScript = $("script").text().split("[");
    const tokenLsd = textBodyScript[searchTokens(textBodyScript).indexLsdToken];
    const tokenDtsg = textBodyScript[searchTokens(textBodyScript).indexDtsgToken];

    const str1 = new RegExp('],{"token":"', "");
    const str2 = new RegExp('"},323],', "");
    const str3 = new RegExp('"},258],', "");


    function searchTokens(arr) {
      const lsdText = '"LSD",';
      const dtsgText = '"DTSGInitialData",';

      let indexLsdToken = 0;
      let indexDtsgToken = 0;

      $.each(arr, function(index, el) {
         if (el === lsdText) {
          indexLsdToken = index + 1;
         }
         if (el === dtsgText) {
          indexDtsgToken = index + 1;
         }
      });
        
      return {
        indexLsdToken,
        indexDtsgToken,
      }
    } 


    return {
      lsdToken: tokenLsd.replace(str1, '').replace(str2, ''),
      dtsgToken: tokenDtsg.replace(str1, '').replace(str3, '')
    }
  }

  function getDataTokens(){
    const sessionId = getSessionId();
    const pageId = getPageId();
    const accountId = getAccountId();
    const {lsdToken, dtsgToken} = getTokens();


    return {
      sessionId,
      pageId,
      accountId,
      lsdToken,
      dtsgToken,
    }
  }

  function translate(e){
    const $this = $(e.target);

    let sourceText = $this.parent().parent().find(".textTranslate").text();
    let sourceLang = 'auto';
    let targetLang = localStorage.getItem('language');
    let string = [];
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`;


    $this.parent().parent().find(".textOrigin").text(sourceText);
    
    $.getJSON(url, function(data) {
      $.each(data[0], function(index, val) {
        string.push(val[0]);
      });
      
      $this.parent().parent().find(".textTranslate").text(string.join(''));

      $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslateReverse-js">return</button>`);
      $this.remove();

     

    }).fail(function() {
      alert("Translation is currently not possible!")
    });

  }

  function translateReverse(e){
    const $this = $(e.target);

    let sourceText = $this.parent().parent().find(".textOrigin").text();
    $this.parent().parent().find(".textTranslate").text(sourceText);
    $this.parent().parent().find(".textOrigin").text("");

    $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslate-js">translate</button>`);
    $this.remove();

  }

  function translateInfo(e){
    const $this = $(e.target);

    let sourceText = $this.parent().find(".textTranslateInfo").text();
    let sourceLang = 'auto';
    let targetLang = localStorage.getItem('language');

    let string = [];
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`;


    $this.parent().find(".textOriginInfo").text(sourceText);
    
    $.getJSON(url, function(data) {
      $.each(data[0], function(index, val) {
        string.push(val[0]);
      });
      
      $this.parent().find(".textTranslateInfo").text(string.join(''));

      $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslateInfo buttonTranslateInfoReverse-js">return</button>`);
      $this.remove();

     

    }).fail(function() {
      alert("Translation is currently not possible!")
    });


  }

  function translateInfoReverse(e){
    const $this = $(e.target);

    let sourceText = $this.parent().find(".textOriginInfo").text();
    $this.parent().find(".textTranslateInfo").text(sourceText);
    $this.parent().find(".textOriginInfo").text("");

    $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslateInfo buttonTranslateInfo-js">translate</button>`);
    $this.remove();

  }

  function translateTitle(e){
    const $this = $(e.target);

    let sourceText = $this.parent().find(".textTranslateTitle").text();
    let sourceLang = 'auto';
    let targetLang = localStorage.getItem('language');
    let string = [];

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`;


    $this.parent().find(".textOriginTitle").text(sourceText);
    
    $.getJSON(url, function(data) {
      $.each(data[0], function(index, val) {
        string.push(val[0]);
      });
      
      $this.parent().find(".textTranslateTitle").text(string.join(''));

      $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslateTitle buttonTranslateTitleReverse-js">return</button>`);
      $this.remove();

     

    }).fail(function() {
      alert("Translation is currently not possible!")
    });

  }

  function translateTitleReverse(e){
    const $this = $(e.target);

    let sourceText = $this.parent().find(".textOriginTitle").text();
    $this.parent().find(".textTranslateTitle").text(sourceText);
    $this.parent().find(".textOriginTitle").text("");

    $this.parent().append(`<button type="button" class="buttonTranslate buttonTranslateTitle buttonTranslateTitle-js">translate</button>`);
    $this.remove();

  }


  $("body").on('click', ".buttonTranslate-js", translate);
  $("body").on('click', ".buttonTranslateReverse-js", translateReverse);


  $("body").on('click', ".buttonTranslateInfo-js", translateInfo);
  $("body").on('click', ".buttonTranslateInfoReverse-js", translateInfoReverse);


  $("body").on('click', ".buttonTranslateTitle-js", translateTitle);
  $("body").on('click', ".buttonTranslateTitleReverse-js", translateTitleReverse);


  async function handleAds(params, path){
    const {accountId, lsdToken, dtsgToken} = getDataTokens();

    const options = {
        "method": "POST",
        "body": `__user=${accountId}&__a=1&fb_dtsg=${dtsgToken}&lsd=${lsdToken}`, 
        "credentials": "include",
        "mode": "cors",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "ru,en-US;q=0.7,en;q=0.3",
            "Content-Type": "application/x-www-form-urlencoded",
            "X-FB-LSD": lsdToken,
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
        }
    }

    const strParams = new URLSearchParams(params).toString();
    const url = `https://www.facebook.com/ads/library/async/${path}/?${strParams}`;
    const data = await fetch(url, options);
    let response = await data.text();
    responseString = response.substring(9);


    const dataJson = JSON.parse(responseString);


    return dataJson;
  }

  async function getSearchAds(){
    const {sessionId, pageId} = getDataTokens();

    const params = {
        "session_id":sessionId,
        "count": 30,
        "active_status":"all",
        "ad_type":"all",
        "countries[0]":"ALL",
        "view_all_page_id":pageId,
        "media_type":"all",
        "search_type":"page",
    };

    const data = await handleAds(params, "search_ads");
    return data;
  }

  async function getPageInfo(){
    const {sessionId, pageId} = getDataTokens();

    const ad_archive_id = $(".x1rg5ohu.x67bb7w > .x8t9es0.xw23nyj.xo1l8bm.x63nzvj.x6lvj10.xq9mrsl.x1h4wwuj.xeuugli").text();
    const ad_arc_id = ad_archive_id.split(" ")[1];

    const params = {
        "session_id":sessionId,
        // "view_all_page_id":pageId,
        "ad_archive_id": ad_arc_id,
        "countries":"ALL"
    };

    const data = await handleAds(params, "insights");

    return data;
    
  }

  async function getSearchFilters(){
    const {sessionId, pageId} = getDataTokens();

    const params = {
        "session_id":sessionId,
        "group_by_modes[0]":7,
        "active_status":"all",
        "ad_type":"all",
        "country":"ALL",
        "source":"page-transparency-widget",
        "page_ids[0]":pageId,
        "media_type":"all",
        "view_all_page_id":pageId
    };

    const data = await handleAds(params, "search_filters");

    return data;
  }

  async function getDataAds() {
    try {
      const results = await getSearchAds();
      const geo = await getSearchFilters();
      const pageInfo = await getPageInfo();

      
      const countriesGeo = Object.keys(geo.payload['3']);
      let countriesGeoStr = countriesGeo.join(", ");

      const langGeo = Object.keys(geo.payload['7']);
      let langGeoStr = langGeo.join(", ");

      const src = $("div[role='dialog'] video").attr("src");
      const textId = $("body div[role='dialog'] span");
      let id = null;

      let publisher = null;
      let page_like_count = null;
      let collationCount = null;
      let ad_creative_id = null;
      let cta_text = null;
      let display_format = null;
      let title = null;
      let link_description = null;
      let link_url = null;
      let creation_time = null;
      let stateMediaRunLabel = null;
      let date_profileCreationDate_moment = null;
      let date_creation_time_moment = null;
      let date_stateMediaRunLabel_moment = null;
      let startDate = null;
      let date_startDate_moment = null;
      let profileCreationDate = pageInfo.payload.pageInfo.profileCreationDate || null;
      let langGeoStrData = null;
      let countriesGeoStrData = null;

      if (countriesGeo.length > 0) {
        countriesGeoStrData = `${countriesGeoStr} <a data-label="cpaLabel" target="_blank" class="linkPageMeta" href="https://cpa.rip/raznoe/code-list/">Decryption</a>`;
      }

      if (langGeo.length > 0) {
        langGeoStrData = `${langGeoStr} <a data-label="cpaLabel" target="_blank" class="linkPageMeta" href="https://cpa.rip/raznoe/code-list/#Kody_azykov_ISO_639-1">Decryption</a>`;
      }

      textId.map(function(index, el){
        if (!$(el).children().is("div") && $(el).text().includes("ID:")) {
          id = $(el).text().replace("ID: ", '');
        }
      });

      results.payload.results.forEach(function(el){
        el.find(function(it){
          if (it.adArchiveID === id) {

            if (it.publisherPlatform) {
              publisher = it.publisherPlatform;
            }
            
            if (it.snapshot.page_like_count) {
              page_like_count = it.snapshot.page_like_count;
            }

            if (it.collationCount) {
              collationCount = it.collationCount;
            }

            if (it.snapshot.ad_creative_id) {
              ad_creative_id = it.snapshot.ad_creative_id;
            }

            if (it.snapshot.cta_text) {
              cta_text = it.snapshot.cta_text;
            }

            if (it.snapshot.title) {
              title = `<div class="textTranslate">${it.snapshot.title}</div><div class="textOrigin"></div>`;
            }

            if (it.snapshot.link_description) {
              link_description = `<div class="textTranslate">${it.snapshot.link_description}</div><div class="textOrigin"></div>`;
            }

            if (it.snapshot.link_url) {
              link_url = it.snapshot.link_url;
            }

            if (it.snapshot.creation_time) {
              creation_time = it.snapshot.creation_time;
            }

            if (it.stateMediaRunLabel) {
              stateMediaRunLabel = it.stateMediaRunLabel;
            }

            if (it.snapshot.display_format) {
              display_format = it.snapshot.display_format;
            }

            if (it.startDate) {
              startDate = it.startDate;
            }
          }
          
        }); 
      }); 

      if (profileCreationDate) {
        let date_profileCreationDate = Math.round((+new Date(profileCreationDate).getTime()) * 1000);
        date_profileCreationDate_moment = moment(date_profileCreationDate).format("DD.MM.YYYY" + " (UTC)");
      }

      if (creation_time) {
        let date_creation_time = Math.round((+new Date(creation_time).getTime()) * 1000);
        date_creation_time_moment = moment(date_creation_time).format("DD.MM.YYYY hh:mm:ss" + " (UTC)");
      }

      if (stateMediaRunLabel) {
        let date_stateMediaRunLabel = Math.round((+new Date(stateMediaRunLabel).getTime()) * 1000);
        date_stateMediaRunLabel_moment = moment(date_stateMediaRunLabel).format("DD.MM.YYYY hh:mm:ss" + " (UTC)");
      }

      if (startDate) {
        let date_startDate = Math.round((+new Date(startDate).getTime()) * 1000);
        date_startDate_moment = moment(date_startDate).format("DD.MM.YYYY" + " (UTC)");
      }

      const publisherPlatformStr = publisher && publisher.join(", ");


      const data = [
        ["Ads geo", countriesGeoStrData],
        ["Ads targeting language", langGeoStrData],
        ["videoDowl", src],
        ["The number of ads with this text and creativity (collationCount)", collationCount],
        ["Entity type (entityType)", pageInfo.payload.pageInfo.entityType],
        ["Page ID (pageID)", pageInfo.payload.pageInfo.pageID],
        ["Page name (pageName)", pageInfo.payload.pageInfo.pageName],
        ["Ad start date (stateMediaRunLabel)", date_stateMediaRunLabel_moment],
        ["Publisher platform (publisherPlatform)", publisherPlatformStr],
        ["Ad creative ID (ad_creative_id)", ad_creative_id],
        ["Call to action text (cta_text)", cta_text],

        ["Ad format (display_format)", display_format],
        ["Ad title (title)", title],
        ["Link description (link_description)", link_description],
        ["URL (link_url)", link_url],
        ["Creation/changing time (creation_time)", date_creation_time_moment],
        ["Ad start date (startDate)", date_startDate_moment],
        ["Fanpage category (pageCategory)", pageInfo.payload.pageInfo.pageCategory],
        ["Number of FB fanpage subscribers (likes)", pageInfo.payload.pageInfo.likes],
        ["Number of FB fanpage subscribers (page_like_count)", page_like_count],
        ["Profile creation date (profileCreationDate)", date_profileCreationDate_moment],
        ["Number of Instagram subscribers (igFollowers)", pageInfo.payload.pageInfo.igFollowers],
        ["Whether the page was renamed before or not (shouldUsePageRename)", pageInfo.payload.pageInfo.shouldUsePageRename],



      ]

      // chrome.runtime.sendMessage(data);


      return data;

    } catch(e) {
      console.log(e);
    }
  }

  async function addHtml(){
    try {

      $(".blockInfoWiget").remove();
      $(".buttonTranslateInfo").remove();
      $(".buttonTranslateTitle").remove();
      let parentBlock = $(".x2izyaf.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x9f619.x78zum5.xdt5ytf.xdj266r.xqmxbcd.x1yztbdb.xmupa6y.xjd2vgl").parent();
      let classActived = "";


      if (parentBlock.length === 0) {
        parentBlock = $(".x78zum5.xdt5ytf.xdj266r.x11i5rnm.x1hq5gj4.xmupa6y.xjd2vgl");
        classActived = "blockInfoWigetActived";
      }

      parentBlock.append(`<div class="blockInfoWiget ${classActived}"><div class="blockInfoWigetWrap"><svg class="preloaderInfoMeta preloaderInfoMetaLoad" width="50px" height="50px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="background:0 0"><circle cx="75" cy="50" fill="#1771ed" r="6.39718"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.875s"></animate></circle><circle cx="67.678" cy="67.678" fill="#1771ed" r="4.8"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.75s"></animate></circle><circle cx="50" cy="75" fill="#1771ed" r="4.8"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.625s"></animate></circle><circle cx="32.322" cy="67.678" fill="#1771ed" r="4.8"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.5s"></animate></circle><circle cx="25" cy="50" fill="#1771ed" r="4.8"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.375s"></animate></circle><circle cx="32.322" cy="32.322" fill="#1771ed" r="4.80282"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.25s"></animate></circle><circle cx="50" cy="25" fill="#1771ed" r="6.40282"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="-0.125s"></animate></circle><circle cx="67.678" cy="32.322" fill="#1771ed" r="7.99718"><animate attributeName="r" values="4.8;4.8;8;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="1s" repeatCount="indefinite" begin="0s"></animate></circle></svg></div></div>`);
      const parentBlockWrap = $(".blockInfoWigetWrap");

      


      const dataAds = await getDataAds();

      if (dataAds.length > 0) {

        const textdef = $(".textOriginInfo").text();
        if (textdef.length > 0) {
          $(".textOriginInfo").parent().find(".textTranslateInfo").text(textdef);
        }
        $(".textOriginInfo").remove();



        const textTitle = $(".textOriginTitle").text();
        if (textTitle.length > 0) {
          $(".textOriginTitle").parent().find(".textTranslateTitle").text(textTitle);
        }
        $(".textOriginTitle").remove();

        
        const title = $("._7jyr span.x8t9es0.x1fvot60.xo1l8bm.xxio538.x108nfp6.xq9mrsl.x1h4wwuj.xeuugli");
        title.children().children().children().addClass("textTranslateTitle");
        title.append('<div class="textOriginTitle"></div>');
        title.append('<button type="button" class="buttonTranslate buttonTranslateTitle buttonTranslateTitle-js">translate</button>');




        parentBlockWrap.append('<table class="tablePageInfo"></table>');
        const table = $(".tablePageInfo");
        parentBlockWrap.prepend('<div class="headTableBlock"><div class="headTableBlockWrap"></div></div>');
        const headTableBlockWrap = $(".headTableBlockWrap");
        const addInfoBlock = $(".x8t9es0.x1uxerd5.xrohxju.x108nfp6.xq9mrsl.x1h4wwuj.x117nqv4.xeuugli.x1e56ztr").parent();
        addInfoBlock.append('<div class="textOriginInfo"></div>');
        addInfoBlock.append('<button type="button" class="buttonTranslate buttonTranslateInfo buttonTranslateInfo-js">translate</button>');


        addInfoBlock.find(".x8t9es0.x1fvot60.xo1l8bm.xxio538.x108nfp6.xq9mrsl.x1h4wwuj.xeuugli").addClass("textTranslateInfo");

        $(".preloaderInfoMeta").remove();
      
        dataAds.map(function(index, elem) {
        let text = index[0];
        let data = index[1];

        if (data === true) {
          data = "Yes";
        }

        if (data === false) {
          data = "No";
        }

        let item = `<tr>
                    <td>${text}</td>
                    <td>${data}</td>
                  </tr>`;

        let button = `<div class="linkDowlBlock">
                        <button type="button" class="buttonDowlVideo">Download video</button>
                      </div>`;



        if (String(data).includes('https') || String(data).includes('http')) {
          if (!String(data).includes('cpaLabel')) {
            item = `<tr>
                    <td>${text}</td>
                    <td class="itemInfoMetaDataLinkPar"><div class="itemInfoMetaDataLink"><a target="_blank" href="${data}">${data}</a></div></td>
                  </tr>`;
          }
        }

        if (text !== "videoDowl") {
          if (data) {
            table.append(item);
          }
        }

        if (text === "videoDowl" && data) {
          headTableBlockWrap.prepend(button);
        }
        
      });

        const logo = ``;

        headTableBlockWrap.append(`<div class="logoCpaHead"><a target="_blank" href="https://cpa.rip/">${logo}</a></div>`);
        parentBlockWrap.append('<div class="footTableBlock"><div class="footTableBlockWrap">The best offers and top bids <a href="https://partners.cpa.rip/">Partners.CPA.RIP</a></div></div>');
        parentBlockWrap.append(`<div class="footInfoTableBlock"><div class="footInfoTableBlockWrap">beta version ${version}</div></div>`);

        $(".textTranslate").parent().append(`<button type="button" class="buttonTranslate buttonTranslate-js">translate</button>`);

      }
      else{
        $(".preloaderInfoMeta").remove();
        parentBlockWrap.append(`<div class="blockErrorPage"><p>Data retrieval error. The error occurs in two cases, the first is when you simply reload the page, the second is when the Facebook account is blocked from accessing this data.</p> <br> 1. Reload the page and try again. <br> 2. You need to use a new Facebook account.</div>`);
      }



    } catch(e) {
      const parentBlockWrap = $(".blockInfoWigetWrap");
      $(".preloaderInfoMeta").remove();
      parentBlockWrap.append(`<div class="blockErrorPage"><p>Data retrieval error. The error occurs in two cases, the first is when you simply reload the page, the second is when the Facebook account is blocked from accessing this data.</p> <br> 1. Reload the page and try again. <br> 2. You need to use a new Facebook account.</div>`);
      console.log(e);
    }

  }

  function handleSelectLanguage(e) {
    localStorage.setItem('language', e.target.value);

    $(".buttonNavRefresh__js").click();
  }

  function generateLanguage() {
    const selectLang = $(".selectPageInput_js");
    let isLang = localStorage.getItem('language');
    const language = [
      { 
        slug: "zh-CN",
        language: "CHINESE",
      },
      { 
        slug: "es",
        language: "SPANISH",
      },
      { 
        slug: "en",
        language: "ENGLISH",
      },
      { 
        slug: "hi",
        language: "HINDI",
      },
      { 
        slug: "ar",
        language: "ARABIC",
      },
      { 
        slug: "pt",
        language: "PORTUGUESE",
      },
      { 
        slug: "ru",
        language: "RUSSIAN",
      },
      { 
        slug: "ja",
        language: "JAPANESE",
      },
      { 
        slug: "tr",
        language: "TURKISH",
      },
      { 
        slug: "ko",
        language: "KOREAN",
      },
      { 
        slug: "fr",
        language: "FRENCH",
      },
      { 
        slug: "de",
        language: "GERMAN",
      },
      { 
        slug: "it",
        language: "ITALIAN",
      },
      { 
        slug: "uk",
        language: "UKRAINIAN",
      }
    ];

    if (!isLang) {
      localStorage.setItem('language', "ru");
    }

    let slectedLang = localStorage.getItem('language');

    language.map(function(elem) {
      const item = `<option value="${elem.slug}">${elem.language}</option>`;
      const itemSelected = `<option selected value="${elem.slug}">${elem.language}</option>`;

      if (elem.slug === slectedLang) {
        selectLang.append(itemSelected);
      }
      else{
        selectLang.append(item);
      }
      
    });
  }

  function getRefreshBtn() {
    const btn = `<button class="buttonNavHelp buttonNavRefresh__js" type="button">
                          <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 438.529 438.528" style="enable-background:new 0 0 438.529 438.528;"
                             xml:space="preserve">
                              <path style="fill:#ffffff;" d="M433.109,23.694c-3.614-3.612-7.898-5.424-12.848-5.424c-4.948,0-9.226,1.812-12.847,5.424l-37.113,36.835
                                c-20.365-19.226-43.684-34.123-69.948-44.684C274.091,5.283,247.056,0.003,219.266,0.003c-52.344,0-98.022,15.843-137.042,47.536
                                C43.203,79.228,17.509,120.574,5.137,171.587v1.997c0,2.474,0.903,4.617,2.712,6.423c1.809,1.809,3.949,2.712,6.423,2.712h56.814
                                c4.189,0,7.042-2.19,8.566-6.565c7.993-19.032,13.035-30.166,15.131-33.403c13.322-21.698,31.023-38.734,53.103-51.106
                                c22.082-12.371,45.873-18.559,71.376-18.559c38.261,0,71.473,13.039,99.645,39.115l-39.406,39.397
                                c-3.607,3.617-5.421,7.902-5.421,12.851c0,4.948,1.813,9.231,5.421,12.847c3.621,3.617,7.905,5.424,12.854,5.424h127.906
                                c4.949,0,9.233-1.807,12.848-5.424c3.613-3.616,5.42-7.898,5.42-12.847V36.542C438.529,31.593,436.733,27.312,433.109,23.694z"/>
                              <path style="fill:#ffffff;" d="M422.253,255.813h-54.816c-4.188,0-7.043,2.187-8.562,6.566c-7.99,19.034-13.038,30.163-15.129,33.4
                                c-13.326,21.693-31.028,38.735-53.102,51.106c-22.083,12.375-45.874,18.556-71.378,18.556c-18.461,0-36.259-3.423-53.387-10.273
                                c-17.13-6.858-32.454-16.567-45.966-29.13l39.115-39.112c3.615-3.613,5.424-7.901,5.424-12.847c0-4.948-1.809-9.236-5.424-12.847
                                c-3.617-3.62-7.898-5.431-12.847-5.431H18.274c-4.952,0-9.235,1.811-12.851,5.431C1.807,264.844,0,269.132,0,274.08v127.907
                                c0,4.945,1.807,9.232,5.424,12.847c3.619,3.61,7.902,5.428,12.851,5.428c4.948,0,9.229-1.817,12.847-5.428l36.829-36.833
                                c20.367,19.41,43.542,34.355,69.523,44.823c25.981,10.472,52.866,15.701,80.653,15.701c52.155,0,97.643-15.845,136.471-47.534
                                c38.828-31.688,64.333-73.042,76.52-124.05c0.191-0.38,0.281-1.047,0.281-1.995c0-2.478-0.907-4.612-2.715-6.427
                                C426.874,256.72,424.731,255.813,422.253,255.813z"/>
                          </svg>
                      </button>`;

    return btn;
  }

  function getSelectLang() {
    const select = `<select name="lang" class="selectPageInput selectPageInput_js"></select>`;

    return select;  
  }

  function getButtonToggle() {
    const button = `<button type="button" class="buttonToggleNav buttonToggleNav_js">
                        <img src="https://github.com/Imranwafa-com/FB_ads_lib/blob/main/icons/FB(5).png?raw=true">
                            
                          </img>
                      </button>`;

    return button;
  }

  function getHtmlBlockFixed(){
    const refreshBtn = getRefreshBtn();
    const selectLang = getSelectLang();
    const buttonToggle = getButtonToggle();
    
    const html =`<div class="blockNavAdHelper">
    <div class="buttonToggleNavBlock">
    ${buttonToggle}
  </div>  
    <style>
    .bodys {
        background-color: #1E1E1E;
        color: white;
        width: 250px;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center; 
        margin: 0;
    }
    
    .ttext {
        font-size: 20px;
        margin-bottom: 10px;
    }
    
    .ttex {
      color:red;
        display: block;
        font-size: 14px;
    }
    
    .bodys input[type="checkbox"] {
        appearance: none;
        -webkit-appearance: none;
        width: 40px;
        height: 20px;
        background-color: #444;
        border-radius: 10px;
        position: relative;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    .bodys input[type="checkbox"]:before {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 16px;
        height: 16px;
        background-color: #666;
        border-radius: 50%;
        transition: transform 0.3s, background-color 0.3s;
    }
    
    .bodys input[type="checkbox"]:checked {
        background-color: darkred;
    }
    
    .bodys input[type="checkbox"]:checked:before {
        transform: translateX(20px);
        background-color: white;
    }
</style>
                  <div class="bodys"><center>
                  <h1 style="color: red;"class="ttext">FBFinder</h1>
                  <label class="ttex" for="autoOpenAds">Auto Open Ads</label>
                  <input type="checkbox" id="autoOpenAds">
                  <label class="ttex" for="rmADS">Filter under 3</label>
                  <input type="checkbox" id="rmADS">
                  <label class="ttex" for="bttni">new tab button for all ads</label>
                  <input type="checkbox" id="bttni">
                  <label class="ttex" for="ExcludeBtn">Exclude filter</label>
                  <input type="checkbox" style="padding-top:10%;" id="ExcludeBtn" >
                  
              </center></div>
                  </div>`;

    $("body").append(html);
    generateLanguage();
  }

  function toggleBlockFixed(){
    $(".blockNavAdHelper").toggleClass("noneActive");
  }

  function removeBlockFixed(){
    if (!$(".blockNavAdHelper").hasClass("noneActive")) {
      $(".blockNavAdHelper").addClass("noneActive");
    }
    
  }

  async function downloadVideo() {
    try {
      const src = $("div[role='dialog'] video").attr("src");
      const response = await fetch(src);
      const data = await response.blob();

      const ref = document.createElement("a");
      ref.href = URL.createObjectURL(data);
      ref.download = "video.mp4";
      ref.click();
    } catch (error) {
      alert("Error downloading video");
    }
  }

  
   getHtmlBlockFixed();


    

  $("body").on('click', ".buttonDowlVideo", downloadVideo);

  $(".selectPageInput_js").on('change', handleSelectLanguage);

  $(".buttonNavRefresh__js").on('click', addHtml);

  $(".buttonToggleNav_js").on('click', toggleBlockFixed);

  $(window).on('scroll', removeBlockFixed);



});


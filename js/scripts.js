$(document).ready(function() {
	let textRu = "Информация об объявлении";
	let textEng = "See ad details";

	let textRuTab = "Открыть в новой вкладке";
	let textEngTab = "Open in new tab";
	let textmain = textEng;
	let textmainTab = textEngTab;
	console.log(document);
	let link = "";
    function addBtns() {
		const elements = $("body div");		
		elements.map(function(index, elem) {
			const textEl = $(elem).text() === textRu || $(elem).text() === textEng;			
			if ($(elem).text() === textRu) {
				textmain = textRu;
				
			}

			if ($(elem).hasClass("x8t9es0 x1fvot60 xxio538 x1heor9g xuxw1ft x6ikm8r x10wlt62 xlyipyv x1h4wwuj x1pd3egz xeuugli")) {
				if (textEl) {
					if (!$(elem).parent().parent().parent().parent().parent().parent().hasClass("parentItemAdsMeta")) {
						$(elem).parent().parent().parent().parent().parent().parent().addClass('parentItemAdsMeta');

						const id = $(elem).parents(".parentItemAdsMeta").find("span.x8t9es0.xw23nyj.xo1l8bm.x63nzvj.x108nfp6.xq9mrsl.x1h4wwuj.xeuugli:contains('ID:')").text().replace("ID: ", '');

						$(elem).parent().parent().parent().parent().parent().append(`<div class="btnInfoMeta"> <a target="_blank" class="btnInfoMetaLink" href="https://www.facebook.com/ads/library/?id=${id}">${textmainTab}</a> </div>`);
						$(elem).parent().parent().parent().parent().parent().addClass('wrapBtn');
						 // Extract code from all <strong> fields, split by spaces, convert to integer, and check if >= 3
		 $("strong").each(function(index, elem) {
            const code = $(elem).text();
            const codeParts = code.split(" ");
            const firstPart = parseInt(codeParts[0]);
            if (!isNaN(firstPart) && firstPart >= 3) {
                // Here, you can perform your desired action for values >= 3
				link = "https://www.facebook.com/ads/library/?id="+id;
                console.log("Ad that is scaling wiht >= 3 ads on creative: \n\tNumber of Ads Per Creative:", firstPart,"\n\tAd Link: ",link);
				const autoOpenAdsCheckbox = document.getElementById('autoOpenAds');
                                
                                // Check if the toggle switch is enabled
                                if (autoOpenAdsCheckbox.checked) {
                                    console.log("Opening link:", link);
                                    window.open(link, '_blank');
                                }
				
            //console.log("Opening link:", link);
			// window.open(link, '_blank');
            }
        });
					}
				}
			}
		
		});
		
	}

	setTimeout(addBtns, 2000);

	addBtns();
	$(window).on('scroll', addBtns);



	function openModalAds() {
		const modal = $('body > div[data-visualcompletion]').length;
		if (modal) {
			$('body > div[data-visualcompletion]').find('.btnInfoMeta').parent().find('[aria-busy]').click();
		}
	}

	openModalAds();
	setTimeout(openModalAds, 2000);


});

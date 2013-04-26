// Plugin code will be encapsulated in this anonymous function.
(function($) {
	$.widget("ui.tilenews", {
		
		options : {
			api_key : null,
			sport : null,
			league : null,
			lang : "en",
			region : "US",
		},
		
		
		_create : function() {
			var me = this;
			var el = me.element;
			var o = me.options;
			var endpoint = "/news";
			if (o.lang === "es") {
				endpoint = "/news/headlines";
			}
			var resource = (o.sport == null ? "" : "/" + o.sport) + (o.league == null ? "" : "/" + o.league);
			
			$.ajax({
				url : "https://api.espn.com/v1/sports" + resource + endpoint,
				data : {
					apiKey : o.api_key,
					lang : o.lang,
					region : o.region,
					limit : 50,
					_accept : "application/json"
				},
				async: false,
				dataType : "json",
				success : function(data) {
					if (data.status != null && data.status === "success") {
						$(el).addClass("ui-container");
						
						var srcList = [];
						var headlines = data.headlines;
						if (headlines != null && headlines.length > 0) {
							$.each(headlines, function(i, headline) {
								var images = headline.images;
								if (images != null && images.length > 0) {
									$.each(images, function(j, image) {
										// Only show distinct list of images
										var src = image.url;
										if (image.width == 576 && srcList.indexOf(src) == -1) {
											srcList.push(src);
											var caption = headline.linkText;
											var description = headline.description;
											var webUrl = headline.links.web.href;
											
											// Create the tile news elements
											var divEl = $("<div class='ui-tile'></div>").appendTo(el);
											var imgEl = $("<img>").attr({ src : src, alt : caption, width : 500, height : 313}).appendTo(divEl);
											
											// Create the tile news elements caption and calculate its position
											var capEl = $("<div></div>").addClass("ui-widget ui-caption").css({ backgroundColor : "#000", color : "#fff", width : divEl.width() }).insertAfter(imgEl);
											var capText = $("<a></a>").text(imgEl.attr("alt")).attr({ href : webUrl, target : "_blank" }).appendTo(capEl);
											var width = imgEl.width() - parseInt(capEl.css("paddingLeft")) - parseInt(capEl.css("paddingRight"));
											var capHeight = capEl.outerHeight() - parseInt(capEl.css("paddingTop")) + parseInt(capEl.css("paddingBottom"));
											capEl.css({
												width : width,
												top : imgEl.offset().top + imgEl.height() - capHeight, 
												left : imgEl.offset().left,
												display: "block"  
										    });
											
											me._trigger("added", null, capEl);
											
											// Create the tile news description and calculate its position
											var descEl = $("<div></div>").text(description).addClass("ui-widget ui-description").css({ color : "#fff", width : divEl.width() }).insertBefore(capEl);
											var descHeight = descEl.outerHeight() - parseInt(descEl.css("paddingTop")) + parseInt(descEl.css("paddingBottom"));
											descEl.css({
												width : width,
												top : (imgEl.offset().top + imgEl.height() - descHeight) - capHeight,
												left : imgEl.offset().left,
												display: "none"  
										    });
											
											me._trigger("added", null, descEl);
											
											divEl.hover(
												// mouseenter
												function(el) {
													descEl.css({ display: "block" });
												},
												// mouseleave
												function(el) {
													descEl.css({ display: "none" });
												}
											);
											
											// Break out of inner loop
											return false;
										}
									});
								}
							});
							
							// Recalculate the position of the caption and description div elements when news 
							// tiles are wrapped when the window is resized
							$(window).resize(function() {
								$(".ui-caption").each(function(idx, capDiv) {
									tileDiv = capDiv.parentNode;
									capDivHeight = $(capDiv).outerHeight() - parseInt($(capDiv).css("paddingTop")) + parseInt($(capDiv).css("paddingBottom"));
									$(capDiv).css({
										top: $(tileDiv).offset().top + $(tileDiv).height() - capDivHeight + 2,
										left: $(tileDiv).offset().left + 2
									});
								});
								
								$(".ui-description").each(function(idx, descDiv) {
									tileDiv = descDiv.parentNode;
									capDiv = descDiv.nextSibling;
									capDivHeight = $(capDiv).outerHeight() - parseInt($(capDiv).css("paddingTop")) + parseInt($(capDiv).css("paddingBottom"));
									descDivHeight = $(descDiv).outerHeight() - parseInt($(descDiv).css("paddingTop")) + parseInt($(descDiv).css("paddingBottom"));
									$(descDiv).css({
										top: ($(tileDiv).offset().top + $(tileDiv).height() - descDivHeight + 2) - capDivHeight,
										left: $(tileDiv).offset().left + 2
									});
								}); 
						    });
						}
					}
					else {
						// TODO: Handle this
					}
				},
				error : function() {
					// TODO: Handle this
				}
			});
		},
		
		destroy: function() {
			// Remove the elements
			this.element.next().remove();
			// Unbind any events
			$(window).unbind("resize");
			$(".ui-tile").each(function(idx, tileDiv) {
				$(tileDiv).unbind("mouseenter");
				$(tileDiv).unbind("mouseleave");
			});
		},
	});
}) (jQuery);

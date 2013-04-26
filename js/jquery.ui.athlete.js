(function($) {
	$.widget("ui.athlete", {
		
		options : {
			api_key : null,
			sport : null,
			league : null,
			athlete_ids : null,
			show_career_stats : false,
			lang : "en"
		},
		
		_create : function() {
			var me = this;
			var el = me.element;
			var o = me.options;
			var resource = "/" + o.sport + "/" + o.league;
			var statstypeparam = (o.show_career_stats ? "career" : "season");
			var athleteIds = o.athlete_ids.split(",");
			var endpoint = "";
			
			if (athleteIds) {
				for (var i = 0; i < athleteIds.length; i++) {
					endpoint = "/athletes/" + athleteIds[i];
					
					$.ajax({
						url : "https://api.espn.com/v1/sports" + resource + endpoint,
						data : {
							apiKey : o.api_key,
							lang : o.lang,
							enable : "statistics,logos",
							statstype : statstypeparam,
							_accept : "application/json"
						},
						dataType : "json",
						success : function(data) {
							if (data.status != null && data.status === "success") {
								var $el = $("<div></div>").appendTo(el);
								$el.addClass("ui-athlete-container");
								
								var leagues = data.sports[0].leagues;
								if (leagues != null && leagues.length == 1) {
									var athletes = leagues[0].athletes;
									if (athletes != null && athletes.length == 1) {
										var athlete = athletes[0];
										var mugshotHref = athlete.headshots.xlarge.href;
										mugshotHref = mugshotHref.substring(0, mugshotHref.indexOf("&")) + "&w=396&h=300";
										var logoHref = athlete.team.logos.large.href;
										logoHref = logoHref.substring(0, logoHref.indexOf("&")) + "&w=300&h=300";
										
										var divs = $el.children();
										if (divs !== undefined && divs.length == 3) {
											var $logoDiv = $(divs[0]);
											$logoDiv.addClass("ui-athlete-team-logo").css("background-image", "url('" + logoHref + "')");
											$logoDiv.css({ top : $el.offset().top, left : $el.offset().left });
											
											var $mugshotDiv = $(divs[1]);
											$mugshotDiv.addClass("ui-athlete-mugshot").css("background-image", "url('" + mugshotHref + "')");
											
											
										}
									}
									else {
										// TODO: No athletes returned
									}
								}
								else {
									// TODO: No league returned 
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
				}
			}
		},
		
		destroy : function() {
			
		}
	});
}) (jQuery);
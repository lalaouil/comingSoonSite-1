jQuery(document).ready(function (event) {
	var projectsContainer = $('.projects-container'),
		navigation = $('.primary-nav'),
		triggerNav = $('.nav-trigger'),
		logo = $('.logo');
	
	triggerNav.on('click', function () {
		if (triggerNav.hasClass('project-open')) {
			//close project
			projectsContainer.removeClass('project-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$(this).children('.project-info').scrollTop(0).removeClass('has-boxshadow');

			});
			triggerNav.add(logo).removeClass('project-open');
		} else {
			//trigger navigation visibility
			triggerNav.add(projectsContainer).add(navigation).toggleClass('nav-open');
		}
	});

	projectsContainer.on('click', '.single-project', function () {
		var selectedProject = $(this);
		if (projectsContainer.hasClass('nav-open')) {
			//close navigation
			triggerNav.add(projectsContainer).add(navigation).removeClass('nav-open');
		} else {
			//open project
			selectedProject.addClass('selected');
			projectsContainer.add(triggerNav).add(logo).addClass('project-open');
		}
	});

	projectsContainer.on('click', '.scroll', function () {
		//scroll down when clicking on the .scroll arrow
		var visibleProjectContent =  projectsContainer.find('.selected').children('.project-info'),
			windowHeight = $(window).height();

		visibleProjectContent.animate({'scrollTop': windowHeight}, 300);
	});

	//add/remove the .has-boxshadow to the project content while scrolling 
    var scrolling = false;
    projectsContainer.find('.project-info').on('scroll', function () {
	    if (!scrolling) {
            (!window.requestAnimationFrame) ? setTimeout(updateProjectContent, 300) : window.requestAnimationFrame(updateProjectContent);
		    scrolling = true;
	    }
    });

	function updateProjectContent() {
		var visibleProject = projectsContainer.find('.selected').children('.project-info'),
			scrollTop = visibleProject.scrollTop();
		(scrollTop > 0) ? visibleProject.addClass('has-boxshadow') : visibleProject.removeClass('has-boxshadow');
		scrolling = false;
	}
});
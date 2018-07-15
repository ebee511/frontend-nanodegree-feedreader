/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will run against the application.
 */

/* All of the tests are within the $() function,
 * to ensure they don't run until the DOM is ready
 * since some of these tests may require DOM elements. 
 */

$(function() {
   /*  This test suite is all about the RSS feeds definitions */
    describe('RSS Feeds', function() {
        /* Tests ensure the allFeeds variable has been defined and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Test ensures feed has a URL defined and the URL is not empty */
        it('have url defined', function() {
            //create a loop
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });

        /* Test ensures feed has a name defined and the name is not empty */
        it('have name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });
    });

    /* This test suite is all about the menu */
    describe('The menu', function() {
        /* Test ensures the menu element is hidden by default. */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
         /* Test ensures the menu changes visibility when the menu icon is clicked. 
          * Menu should display on click, and hide on second click.
          */
        it('changes visibility on click', function() {
            $('.menu-icon-link').click()
            expect($('body').hasClass('menu-hidden')).toEqual(false);
            $('.menu-icon-link').click()
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
    });

    /* Test suite about loading the initial feed entries */
    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('there is at least a single entry in the feed', function() {
            expect($('.feed > .entry-link').length).not.toBe(0);
        });
    });

    /* Test suite about loading a new feed */
    describe('New Feed Selection', function() {
        /* Test ensures a new feed is loaded by the loadFeed 
         * function that the content actually changes.
         */
        var firstFeed,
            secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                });
            });
        });

        it('new feed content changes', function(done) {
            /* compare the data from first loaded feed to second loaded feed */
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        });
    });
}());

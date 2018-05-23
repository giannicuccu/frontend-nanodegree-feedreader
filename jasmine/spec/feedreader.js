/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('Has valid URL', () => {
            // URL VALIDATION REGEX PATTERN FROM:
            //https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url

            const urlPattern =  new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?'+ // port
            '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            const filterURLS = allFeeds => allFeeds.filter(feed => !urlPattern.test(feed.url));
            const invalidURLS = filterURLS(allFeeds);
            expect(invalidURLS.length).toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('Has valid Name', () => {
            const namePattern =  new RegExp('^.{1,48}$'); 
            const filterNames = allFeeds => allFeeds.filter(feed => !namePattern.test(feed.name.trim()));
            const invalidNames = filterNames(allFeeds);
            expect(invalidNames.length).toBe(0);
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', () => {            
                const bodyClass = document.querySelector('body').classList.contains('menu-hidden');
                const menuElement = document.body.getElementsByClassName('slide-menu')[0];            
                // console.dir(menuElement);
                // const menuStyle = window.getComputedStyle(menuElement, null);
                // console.dir(menuStyle);
                // console.dir(menuElement.getBoundingClientRect());
                const bounding = menuElement.getBoundingClientRect();
                //console.dir(bounding)
                bounding.left === bounding.x && bounding.left + bounding.width === 0? leftPosCheck = true: leftPosCheck = false;

                expect(bodyClass).toBe(true);
                expect(leftPosCheck).toBe(true);
            });
    

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('Menu visibility is toggled by icon click', () => {
                const menuToggler = document.getElementsByClassName('menu-icon-link')[0];

                menuToggler.click();
                let bodyClass = document.querySelector('body').classList.contains('menu-hidden');
                expect(bodyClass).toBe(false);

                menuToggler.click();
                bodyClass = document.querySelector('body').classList.contains('menu-hidden');
                expect(bodyClass).toBe(true);
            });

         });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial entries', () => {
        
   
    /* Write a test that ensures when the loadFeed
    * function is called and completes its work, there is at least
    * a single .entry element within the .feed container.
    * Remember, loadFeed() is asynchronous so this test will require
    * the use of Jasmine's beforeEach and asynchronous done() function.
    */  
        beforeEach(function(done){
                loadFeed(0, ()=>done());
               
            });


        it('Load feed completed', (done) => {
                let feedList = document.querySelectorAll('.feed  .entry');
                expect(feedList.length).toBeGreaterThan(0);            
                done();
            });



    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
                
          
        /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */       
        beforeEach(function(done) {
            // get the .feed el innerHTML
            this.InitialContent = document.querySelectorAll('.feed')[0].innerHTML;
            // get a random index
            let randomFeedIndex = Math.floor(Math.random() * ((allFeeds.length-1) - 1 + 1) + 1);
            console.log(randomFeedIndex);
            // load other feed
            loadFeed(randomFeedIndex, ()=>done());
            
            });

        it('Change content', function(done) {            
                updatedContent = document.querySelectorAll('.feed')[0].innerHTML;            
                expect(this.InitialContent).not.toEqual(updatedContent);
                done();
            });
        
        // reload the first feed after the test
        afterEach(function(done){
            loadFeed(0, ()=>done());
            done();
        });
         
        });
}());

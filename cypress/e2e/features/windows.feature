Feature: Browser windows

    @Fixtures
    Scenario: Test new tab
        Given I access DemoQA Windows menu page
        When I click on the New Tab button
        Then I can see content in new tab

    @Fixtures
    Scenario: Test new window
        Given I access DemoQA Windows menu page
        When I click on the New Window button
        Then I can see content in new window

    @Fixtures
    Scenario: Test new window message
        Given I access DemoQA Windows menu page
        When I click on the New Window Message button
        Then I can see message in new window
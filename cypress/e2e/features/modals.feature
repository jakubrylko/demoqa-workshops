Feature: Modal dialogs

    @Fixtures
    Scenario: Test small modal content
        Given I access DemoQA Modals menu page
        When I click on the Small modal button
        Then I can see Small modal
        And Its content matches json file

    @Fixtures
    Scenario: Test large modal content
        Given I access DemoQA Modals menu page
        When I click on the Large modal button
        Then I can see Large modal
        And Its content matches txt file
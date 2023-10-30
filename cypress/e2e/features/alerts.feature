Feature: Alerts

    @Stub
    Scenario: Click first button to see alert
        Given I access DemoQA Alerts menu page
        When I click on the first Click Me button
        Then I should see the message You clicked a button


    Scenario: Click second button, alert will appear after 5 seconds
        Given I access DemoQA Alerts menu page
        When I click on the second Click Me button
        And I wait 5 seconds
        Then I should see the message This alert appeared after 5 seconds

    @Stub
    Scenario Outline: Click third button, confirm box will appear
        Given I access DemoQA Alerts menu page
        When I click on the third Click Me button
        And I click on the <button> button
        Then I should see the message You selected <button>

        Examples:
            | button |
            | Ok     |
            | Cancel |

    Scenario: Click fourth button, prompt box will appear
        Given I access DemoQA Alerts menu page
        When I click on the fourth Click Me button
        And I enter my name
        Then I should see the message that contains my name
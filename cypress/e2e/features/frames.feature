Feature: Frames

    Scenario Outline: Test frames content
        Given I access DemoQA Alerts Windows page
        When I click on the frames menu
        Then I can see a <size> frame
        And <size> frame has a content This is a sample page

        Examples:
            | size  |
            | Large |
            | Small |
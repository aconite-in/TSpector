Feature: Running Cucumber with Protractor

    Background:
        Given User is on "HomePage"

    Scenario: Protractor and Cucumber Test
        When User types "admin" in "UserName"
        When User types "12345" in "Password"
        When User clicks "proceedButton"